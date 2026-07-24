let currentLang = 'ar';

// DOM Cache for Performance Optimization
const domCache = {
  searchBar: null,
  searchInput: null,
  skillsEl: null,
  eduEl: null,
  expEl: null,
  cersEl: null,
  profileImage: null
};

// Initialize DOM Cache
function initDOMCache() {
  domCache.searchBar = document.getElementById('searchBar');
  domCache.searchInput = document.getElementById('searchInput');
  domCache.skillsEl = document.getElementById('skills');
  domCache.eduEl = document.getElementById('education');
  domCache.expEl = document.getElementById('experience');
  domCache.cersEl = document.getElementById('certifications');
  domCache.profileImage = document.getElementById('profileImage');
}

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

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
  domCache.searchBar.classList.toggle('hidden');
  if (!domCache.searchBar.classList.contains('hidden')) {
    domCache.searchInput.focus();
  }
}

// Optimized filter function
function filterContent() {
  const searchTerm = domCache.searchInput.value.toLowerCase();
  
  if (!searchTerm) {
    document.querySelectorAll('.skill-category, .education-item, .experience-item, .certification-card').forEach(el => {
      el.style.display = '';
      el.style.opacity = '1';
    });
    return;
  }

  // Single query for better performance
  document.querySelectorAll('.skill-category, .education-item, .experience-item, .certification-card').forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.opacity = text.includes(searchTerm) ? '1' : '0.3';
    el.style.display = '';
  });
}

// Debounced filter function
const debouncedFilter = debounce(filterContent, 300);

function downloadPDF() {
  const element = document.querySelector('main');
  const opt = {
    margin: 10,
    filename: `CV-${cvData[currentLang].personal.name.replace(/\s+/g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  try {
  html2pdf().set(opt).from(element).save();
  } catch (error) {
  console.error("Error generating PDF:", error);
  alert("Failed to generate PDF. Please try again.");
  }
}

// Initialize theme and language on page load
(function() {
  const savedTheme = localStorage.getItem("theme") || "dark";
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
  
  // Profile Image - Use image from data or fallback
  if (d.personal.image) {
    domCache.profileImage.src = d.personal.image;
    domCache.profileImage.alt = d.personal.name;
  }

  // Header
  document.getElementById('name').textContent = d.personal?.name || d.en?.personal?.name || '';
  document.getElementById('title').textContent = d.personal?.title || d.en?.personal?.title || '';
  document.getElementById('location').textContent = d.personal?.location || d.en?.personal?.location || '';

  const contactsEl = document.getElementById('contacts');
  contactsEl.innerHTML = `
      <li>📧 <a href="mailto:${d.personal?.email || d.en?.personal?.email}">${d.personal?.email || d.en?.personal?.email}</a></li>
      <li>📞 ${d.personal?.phone || d.en?.personal?.phone}</li>
      <li>💻 <a href="${d.personal?.github || d.en?.personal?.github}" target="_blank" rel="noopener">${d.personal?.github || d.en?.personal?.github}</a></li>
      <li>🔗 <a href="${d.personal?.linkedin || d.en?.personal?.linkedin}" target="_blank" rel="noopener">${d.personal?.linkedin || d.en?.personal?.linkedin}</a></li>
  `;

  // Summary
  document.getElementById('summaryTitle').textContent = d.labels.summary || d.en?.labels?.summary || '';
  document.getElementById('summary').textContent = d.summary || d.en?.summary || '';

  // Skills with Progress Bars
  document.getElementById('skillsTitle').textContent = d.labels.skills;
  domCache.skillsEl.innerHTML = "";
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
    domCache.skillsEl.appendChild(div);
  });

  // Certifications
  const certSection = document.getElementById('certificationsSection');
  if (d.certifications && d.certifications.length > 0) {
    certSection.classList.remove('hidden');
    document.getElementById('certificationsTitle').textContent = d.labels.certifications;
    domCache.cersEl.innerHTML = "";
    d.certifications.forEach(cert => {
      const div = document.createElement('div');
      div.className = 'certification-card';
      div.innerHTML = `
        <h3>${cert.title}</h3>
        <p><strong>${cert.issuer}</strong></p>
        <p>${cert.date}</p>
        ${cert.url ? `<a href="${cert.url}" target="_blank" rel="noopener">📎 ${currentLang === 'ar' ? 'عرض الشهادة' : 'View Certificate'}</a>` : ''}
      `;
      domCache.cersEl.appendChild(div);
    });
  } else {
    certSection.classList.add('hidden');
  }

  // Education
  document.getElementById('educationTitle').textContent = d.labels.education;
  domCache.eduEl.innerHTML = "";
  d.education.forEach(e => {
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
      <h3>${e.degree}</h3>
      <p><strong>${e.institution}</strong> — ${e.year}</p>
      ${e.details ? `<p class="details-text">${e.details}</p>` : ''}
    `;
    domCache.eduEl.appendChild(div);
  });

  // Experience
  document.getElementById('experienceTitle').textContent = d.labels.experience;
  domCache.expEl.innerHTML = "";
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
    domCache.expEl.appendChild(div);
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
  if (currentLang === 'ar') {
    domCache.searchInput.placeholder = 'ابحث عن مهارة أو خبرة...';
  } else {
    domCache.searchInput.placeholder = 'Search for skills or experience...';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initDOMCache();
  renderCV();
});
