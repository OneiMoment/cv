let currentLang = 'ar';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
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

function toggleSearch() {
  const searchBar = document.getElementById('searchBar');
  searchBar.classList.toggle('hidden');
  if (!searchBar.classList.contains('hidden')) {
    document.getElementById('searchInput').focus();
  }
}

function filterContent() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (!searchTerm) {
    document.querySelectorAll('.skill-category, .education-item, .experience-item, .certification-card').forEach(el => {
      el.style.display = '';
      el.style.opacity = '1';
    });
    return;
  }

  document.querySelectorAll('.skill-category').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      el.style.display = '';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0.3';
    }
  });

  document.querySelectorAll('.education-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      el.style.display = '';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0.3';
    }
  });

  document.querySelectorAll('.experience-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      el.style.display = '';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0.3';
    }
  });

  document.querySelectorAll('.certification-card').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      el.style.display = '';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '0.3';
    }
  });
}

function downloadPDF() {
  const element = document.querySelector('main');
  const opt = {
    margin: 10,
    filename: `CV-${cvData[currentLang].personal.name.replace(/\s+/g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  html2pdf().set(opt).from(element).save();
}

(function() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem('language') || 'ar';
  document.documentElement.setAttribute("data-theme", savedTheme);
  currentLang = savedLang;
})();

function renderCV() {
  const d = cvData[currentLang];
  
  // Update page language and direction
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  
  // Update PDF label
  const pdfLabel = document.getElementById('pdfLabel');
  if (currentLang === 'ar') {
    pdfLabel.textContent = 'تحميل PDF';
  } else {
    pdfLabel.textContent = 'PDF';
  }

  // Header
  document.getElementById('name').textContent = d.personal.name;
  document.getElementById('title').textContent = d.personal.title;
  document.getElementById('location').textContent = d.personal.location;

  const contacts = document.getElementById('contacts');
  contacts.innerHTML = `
    <li>📧 <a href="mailto:${d.personal.email}">${d.personal.email}</a></li>
    <li>📞 ${d.personal.phone}</li>
    <li>💻 <a href="${d.personal.github}" target="_blank" rel="noopener">GitHub</a></li>
    <li>🔗 <a href="${d.personal.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
  `;

  // Summary
  document.getElementById('summaryTitle').textContent = d.labels.summary;
  document.getElementById('summary').textContent = d.summary;

  // Skills with Progress Bars
  document.getElementById('skillsTitle').textContent = d.labels.skills;
  const skillsEl = document.getElementById('skills');
  skillsEl.innerHTML = "";
  d.skills.forEach((category, idx) => {
    const div = document.createElement('div');
    div.className = 'skill-category';
    
    let skillsHTML = `<h3>${category.label}</h3>`;
    category.items.forEach(item => {
      skillsHTML += `
        <div class="skill-item">
          <div class="skill-name">
            <span>${item.name}</span>
            <span>${item.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" style="width: ${item.level}%"></div>
          </div>
        </div>
      `;
    });
    
    div.innerHTML = skillsHTML;
    skillsEl.appendChild(div);
  });

  // Certifications
  const certSection = document.getElementById('certificationsSection');
  if (d.certifications && d.certifications.length > 0) {
    certSection.classList.remove('hidden');
    document.getElementById('certificationsTitle').textContent = d.labels.certifications;
    const certsEl = document.getElementById('certifications');
    certsEl.innerHTML = "";
    d.certifications.forEach(cert => {
      const div = document.createElement('div');
      div.className = 'certification-card';
      div.innerHTML = `
        <h3>${cert.title}</h3>
        <p><strong>${cert.issuer}</strong></p>
        <p>${cert.date}</p>
        ${cert.url ? `<a href="${cert.url}" target="_blank" rel="noopener">📎 ${currentLang === 'ar' ? 'عرض الشهادة' : 'View Certificate'}</a>` : ''}
      `;
      certsEl.appendChild(div);
    });
  } else {
    certSection.classList.add('hidden');
  }

  // Education
  document.getElementById('educationTitle').textContent = d.labels.education;
  const eduEl = document.getElementById('education');
  eduEl.innerHTML = "";
  d.education.forEach(e => {
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
      <h3>${e.degree}</h3>
      <p><strong>${e.institution}</strong> — ${e.year}</p>
      ${e.details ? `<p class="details-text">${e.details}</p>` : ''}
    `;
    eduEl.appendChild(div);
  });

  // Experience
  document.getElementById('experienceTitle').textContent = d.labels.experience;
  const expEl = document.getElementById('experience');
  expEl.innerHTML = "";
  d.experience.forEach(x => {
    const div = document.createElement('div');
    div.className = 'experience-item';
    let achievementsHTML = '';
    if (x.achievements && x.achievements.length > 0) {
      achievementsHTML = `
        <ul class="achievements">
          ${x.achievements.map(a => `<li>✓ ${a}</li>`).join('')}
        </ul>
      `;
    }
    div.innerHTML = `
      <h3>${x.role}</h3>
      <p><strong>${x.company}</strong> — ${x.period}</p>
      ${x.details ? `<p class="details-text">${x.details}</p>` : ''}
      ${achievementsHTML}
    `;
    expEl.appendChild(div);
  });

  // Languages
  document.getElementById('languagesTitle').textContent = d.labels.languages;
  const langEl = document.getElementById('languages');
  langEl.innerHTML = "";
  d.languages.forEach(l => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${l.name}</strong><br><span style="font-size: 12px; opacity: 0.7;">${l.level}</span>`;
    langEl.appendChild(li);
  });

  // Update search bar placeholder
  const searchInput = document.getElementById('searchInput');
  if (currentLang === 'ar') {
    searchInput.placeholder = 'ابحث عن مهارة أو خبرة...';
  } else {
    searchInput.placeholder = 'Search for skills or experience...';
  }
}

renderCV();
