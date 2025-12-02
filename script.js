let currentLang = 'ar';

function setLanguage(lang) {
  currentLang = lang;
  renderCV();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

(function() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
})();

function renderCV() {
  const d = cvData[currentLang];
  document.getElementById('name').textContent = d.personal.name;
  document.getElementById('title').textContent = d.personal.title;
  document.getElementById('location').textContent = d.personal.location;

  const contacts = document.getElementById('contacts');
  contacts.innerHTML = `
    <li>📧 ${d.personal.email}</li>
    <li>📞 ${d.personal.phone}</li>
    <li>💻 <a href="${d.personal.github}">GitHub</a></li>
    <li>🔗 <a href="${d.personal.linkedin}">LinkedIn</a></li>
  `;

  document.getElementById('summaryTitle').textContent = d.labels.summary;
  document.getElementById('summary').textContent = d.summary;

  document.getElementById('skillsTitle').textContent = d.labels.skills;
  const skillsEl = document.getElementById('skills');
  skillsEl.innerHTML = "";
  d.skills.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${s.label}</h3><p>${s.items.join(', ')}</p>`;
    skillsEl.appendChild(div);
  });

  document.getElementById('educationTitle').textContent = d.labels.education;
  const eduEl = document.getElementById('education');
  eduEl.innerHTML = "";
  d.education.forEach(e => {
    eduEl.innerHTML += `<p>${e.degree} — ${e.institution} (${e.year})</p>`;
  });

  document.getElementById('experienceTitle').textContent = d.labels.experience;
  const expEl = document.getElementById('experience');
  expEl.innerHTML = "";
  d.experience.forEach(x => {
    expEl.innerHTML += `<p>${x.role} — ${x.company} (${x.period})</p>`;
  });

  document.getElementById('languagesTitle').textContent = d.labels.languages;
  const langEl = document.getElementById('languages');
  langEl.innerHTML = "";
  d.languages.forEach(l => {
    langEl.innerHTML += `<li>${l.name} — ${l.level}</li>`;
  });
}

renderCV();
