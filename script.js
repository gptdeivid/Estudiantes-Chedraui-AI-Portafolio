/* script.js */
/* Comportamiento: animar barras de habilidades, alternar tema, simular descarga de CV y manejar formulario (simulado) */

document.addEventListener('DOMContentLoaded', () => {
  // Año en footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Animar barras de habilidades
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(pb => {
    const value = Number(pb.dataset.value) || 0;
    const span = pb.querySelector('span');
    // delay animado
    setTimeout(() => { span.style.width = value + '%'; }, 250);
  });

  // Tema toggle
  const themeToggle = document.getElementById('themeToggle');
  // lee preferencia guardada
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('site-theme', next === 'dark' ? 'dark' : 'light');
    updateThemeButton();
  });

  function updateThemeButton(){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }

  // Descargar CV (genera archivo simple en el cliente)
  document.getElementById('downloadCv').addEventListener('click', () => {
    const cvText = generateSimpleCv();
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Suriel_Carrasco.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});

// Genera un CV simple (texto) con la información presente en la página
function generateSimpleCv(){
  const name = 'Ing. Suriel Carrasco';
  const title = 'Especialista en Transformación Digital & Programación';
  const bio = document.querySelector('.lead')?.textContent?.trim() || '';
  const skills = Array.from(document.querySelectorAll('.skill label')).map(l => l.textContent.trim()).join(', ');
  const contactEmail = document.querySelector('.meta-list li:nth-child(3)')?.textContent.replace('Email:','').trim() || 'suriel.carrasco@example.com';

  return `${name}\n${title}\n\nSobre mí:\n${bio}\n\nHabilidades:\n${skills}\n\nContacto:\n${contactEmail}\n\nProyectos destacados:\n- Landing de servicios\n- Automatización escolar\n\n(Archivo generado localmente como demostración)`;
}

// Formulario: simulación de envío
function handleContact(e){
  e.preventDefault();
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  if (!name || !email || !message) {
    alert('Por favor completa todos los campos.');
    return false;
  }
  // Simular envío
  alert(`Gracias, ${name}. Tu mensaje ha sido recibido (simulado).`);
  e.target.reset();
  return false;
}
