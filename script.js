/**
 * Dynamic CV Application Script
 * Developer: Mohammed Al Otaibi
 * Version: 2.6 (Bilingual UI, Standard QR Generator, vCard, WebShare, PWA)
 */

// Application State
let currentLang = 'ar';
let currentTheme = 'dark';
let activeSearchQuery = '';
let activeSkillCategory = 'all';

// DOM Elements Reference Cache
const DOM = {};

/**
 * Initialize DOM Elements Cache
 */
function initDOMCache() {
  DOM.html = document.documentElement;
  DOM.body = document.body;
  
  // Navigation & Controls
  DOM.skipLink = document.getElementById('skipLink');
  DOM.btnAr = document.getElementById('btnAr');
  DOM.btnEn = document.getElementById('btnEn');
  DOM.navBrandName = document.getElementById('navBrandName');
  DOM.themeToggleBtn = document.getElementById('themeToggleBtn');
  DOM.printBtn = document.getElementById('printBtn');
  DOM.pdfBtnText = document.getElementById('pdfBtnText');
  DOM.saveContactBtn = document.getElementById('saveContactBtn');
  DOM.shareBtn = document.getElementById('shareBtn');
  DOM.qrToggleBtn = document.getElementById('qrToggleBtn');
  
  // Search
  DOM.searchToggleBtn = document.getElementById('searchToggleBtn');
  DOM.searchBarContainer = document.getElementById('searchBarContainer');
  DOM.searchInput = document.getElementById('searchInput');
  DOM.clearSearchBtn = document.getElementById('clearSearchBtn');
  DOM.searchResultsCount = document.getElementById('searchResultsCount');

  // Hero Card & Metrics
  DOM.profileImage = document.getElementById('profileImage');
  DOM.heroName = document.getElementById('heroName');
  DOM.heroTitle = document.getElementById('heroTitle');
  DOM.heroLocation = document.getElementById('heroLocation');
  DOM.heroEmail = document.getElementById('heroEmail');
  DOM.heroPhone = document.getElementById('heroPhone');
  DOM.chipEmail = document.getElementById('chipEmail');
  DOM.chipPhone = document.getElementById('chipPhone');
  DOM.chipLinkedin = document.getElementById('chipLinkedin');
  DOM.chipGithub = document.getElementById('chipGithub');
  DOM.metricsContainer = document.getElementById('metricsContainer');

  // Section Headings & Content Areas
  DOM.summaryHeading = document.getElementById('summaryHeading');
  DOM.summaryText = document.getElementById('summaryText');
  
  DOM.projectsSection = document.getElementById('projectsSection');
  DOM.projectsHeading = document.getElementById('projectsHeading');
  DOM.projectsGrid = document.getElementById('projectsGrid');
  
  DOM.skillsHeading = document.getElementById('skillsHeading');
  DOM.skillFilters = document.getElementById('skillFilters');
  DOM.skillsGrid = document.getElementById('skillsGrid');
  
  DOM.experienceHeading = document.getElementById('experienceHeading');
  DOM.experienceTimeline = document.getElementById('experienceTimeline');
  
  DOM.educationHeading = document.getElementById('educationHeading');
  DOM.educationTimeline = document.getElementById('educationTimeline');
  
  DOM.certificationsHeading = document.getElementById('certificationsHeading');
  DOM.certificationsGrid = document.getElementById('certificationsGrid');
  DOM.certificationsSection = document.getElementById('certificationsSection');
  
  DOM.languagesHeading = document.getElementById('languagesHeading');
  DOM.languagesGrid = document.getElementById('languagesGrid');
  
  DOM.footerAuthor = document.getElementById('footerAuthor');
  DOM.footerCopyright = document.getElementById('footerCopyright');
  DOM.footerSub = document.getElementById('footerSub');
  
  // QR Modal
  DOM.qrModal = document.getElementById('qrModal');
  DOM.qrModalTitle = document.getElementById('qrModalTitle');
  DOM.qrModalScanHint = document.getElementById('qrModalScanHint');
  DOM.qrDownloadText = document.getElementById('qrDownloadText');
  DOM.qrCopyLinkText = document.getElementById('qrCopyLinkText');
  DOM.qrModalCloseBtn = document.getElementById('qrModalCloseBtn');
  DOM.qrcodeContainer = document.getElementById('qrcodeContainer');
  
  // Toast & Back-to-top
  DOM.toastNotification = document.getElementById('toastNotification');
  DOM.toastMessage = document.getElementById('toastMessage');
  DOM.backToTopBtn = document.getElementById('backToTopBtn');
}

/**
 * Initialize Application Settings (Theme & Language)
 */
function initSettings() {
  // 1. Language Preference
  const savedLang = localStorage.getItem('cv_lang');
  if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
    currentLang = savedLang;
  } else {
    currentLang = 'ar';
  }

  // 2. Theme Preference
  const savedTheme = localStorage.getItem('cv_theme');
  if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
    currentTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme = 'light';
  } else {
    currentTheme = 'dark';
  }

  applyTheme(currentTheme);
}

/**
 * Apply Theme (Dark / Light)
 */
function applyTheme(theme) {
  currentTheme = theme;
  DOM.html.setAttribute('data-theme', theme);
  localStorage.setItem('cv_theme', theme);
}

/**
 * Toggle Theme
 */
function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

/**
 * Set and Switch Language (AR / EN)
 */
function setLanguage(lang) {
  if (lang !== 'ar' && lang !== 'en') return;
  
  currentLang = lang;
  localStorage.setItem('cv_lang', lang);
  
  // Update HTML Attributes
  DOM.html.setAttribute('lang', lang);
  DOM.html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update Active Tab UI
  if (lang === 'ar') {
    DOM.btnAr.classList.add('active');
    DOM.btnAr.setAttribute('aria-pressed', 'true');
    DOM.btnEn.classList.remove('active');
    DOM.btnEn.setAttribute('aria-pressed', 'false');
  } else {
    DOM.btnEn.classList.add('active');
    DOM.btnEn.setAttribute('aria-pressed', 'true');
    DOM.btnAr.classList.remove('active');
    DOM.btnAr.setAttribute('aria-pressed', 'false');
  }

  activeSkillCategory = 'all';

  // Reset Search if active
  if (activeSearchQuery) {
    clearSearch();
  }

  // Re-render Page Content
  renderCV();
}

/**
 * Toast Notification Helper
 */
let toastTimeout = null;
function showToast(message) {
  if (!DOM.toastNotification) return;
  
  DOM.toastMessage.textContent = message;
  DOM.toastNotification.classList.remove('hidden');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    DOM.toastNotification.classList.add('hidden');
  }, 3000);
}

/**
 * Render Complete CV with Dynamic Data & 100% Translations
 */
function renderCV() {
  const data = cvData[currentLang] || cvData['ar'];
  const labels = data.labels || {};
  const personal = data.personal || {};

  // 1. Accessibility & Navbar Controls
  if (DOM.skipLink) DOM.skipLink.textContent = labels.skipToContent || (currentLang === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content');
  
  if (currentLang === 'ar') {
    document.title = `${personal.name} | سيرة ذاتية تفاعلية - ${personal.title}`;
    DOM.navBrandName.textContent = labels.navBrand || 'السيرة الذاتية المهنية';
  } else {
    document.title = `${personal.name} | Interactive Resume - ${personal.title}`;
    DOM.navBrandName.textContent = labels.navBrand || 'Professional Resume';
  }

  DOM.pdfBtnText.textContent = labels.downloadPdf || (currentLang === 'ar' ? 'تحميل PDF' : 'Download PDF');
  DOM.printBtn.title = labels.printCv || (currentLang === 'ar' ? 'طباعة السيرة' : 'Print CV');
  
  DOM.saveContactBtn.title = labels.saveVCard || (currentLang === 'ar' ? 'حفظ كجهة اتصال' : 'Save Contact');
  DOM.saveContactBtn.setAttribute('aria-label', labels.saveVCard || 'Save Contact');
  
  DOM.shareBtn.title = labels.shareProfile || (currentLang === 'ar' ? 'مشاركة السيرة' : 'Share Profile');
  DOM.shareBtn.setAttribute('aria-label', labels.shareProfile || 'Share Profile');
  
  DOM.qrToggleBtn.title = labels.qrCodeBtn || (currentLang === 'ar' ? 'عرض رمز QR' : 'View QR Code');
  DOM.qrToggleBtn.setAttribute('aria-label', labels.qrCodeBtn || 'View QR Code');
  
  DOM.searchToggleBtn.title = labels.searchToggle || (currentLang === 'ar' ? 'فتح البحث' : 'Open Search');
  DOM.searchToggleBtn.setAttribute('aria-label', labels.searchToggle || 'Open Search');
  
  DOM.themeToggleBtn.title = labels.themeToggle || (currentLang === 'ar' ? 'تبديل المظهر' : 'Toggle Theme');
  DOM.themeToggleBtn.setAttribute('aria-label', labels.themeToggle || 'Toggle Theme');
  
  DOM.clearSearchBtn.title = labels.searchClear || (currentLang === 'ar' ? 'مسح البحث' : 'Clear Search');
  DOM.clearSearchBtn.setAttribute('aria-label', labels.searchClear || 'Clear Search');

  if (DOM.backToTopBtn) {
    DOM.backToTopBtn.title = labels.backToTop || (currentLang === 'ar' ? 'العودة لأعلى الصفحة' : 'Back to top');
    DOM.backToTopBtn.setAttribute('aria-label', labels.backToTop || 'Back to top');
  }

  DOM.searchInput.placeholder = labels.searchPlaceholder || (currentLang === 'ar' ? 'ابحث في المهارات والمشاريع...' : 'Search skills & projects...');

  // Modal Labels
  if (DOM.qrModalTitle) DOM.qrModalTitle.textContent = labels.qrTitle || 'رمز الاستجابة السريعة (QR Code)';
  if (DOM.qrModalScanHint) DOM.qrModalScanHint.textContent = labels.qrScanHint || 'امسح الرمز بكاميرا هاتفك لفتح السيرة الذاتية ومشاركتها فوراً';
  if (DOM.qrDownloadText) DOM.qrDownloadText.textContent = labels.qrDownload || 'تحميل صورة الرمز';
  if (DOM.qrCopyLinkText) DOM.qrCopyLinkText.textContent = labels.qrCopyLink || 'نسخ الرابط';
  if (DOM.qrModalCloseBtn) {
    DOM.qrModalCloseBtn.title = labels.close || 'إغلاق';
    DOM.qrModalCloseBtn.setAttribute('aria-label', labels.close || 'إغلاق');
  }

  // 2. Render Hero Profile Section
  if (personal.image) {
    DOM.profileImage.src = personal.image;
  }
  DOM.profileImage.alt = personal.name;
  DOM.heroName.textContent = personal.name;
  DOM.heroTitle.textContent = personal.title;
  DOM.heroLocation.textContent = personal.location;
  
  DOM.heroEmail.textContent = personal.email;
  DOM.chipEmail.href = `mailto:${personal.email}`;
  DOM.chipEmail.title = labels.emailTooltip || (currentLang === 'ar' ? 'انقر للمراسلة' : 'Click to email');
  
  DOM.heroPhone.textContent = personal.phone;
  DOM.chipPhone.href = `tel:${personal.phone.replace(/\s+/g, '')}`;
  DOM.chipPhone.title = labels.phoneTooltip || (currentLang === 'ar' ? 'انقر للاتصال' : 'Click to call');
  
  if (personal.linkedin) {
    DOM.chipLinkedin.href = personal.linkedin;
    DOM.chipLinkedin.title = labels.linkedinTooltip || 'LinkedIn';
    DOM.chipLinkedin.style.display = 'inline-flex';
  } else {
    DOM.chipLinkedin.style.display = 'none';
  }

  if (personal.github) {
    DOM.chipGithub.href = personal.github;
    DOM.chipGithub.title = labels.githubTooltip || 'GitHub';
    DOM.chipGithub.style.display = 'inline-flex';
  } else {
    DOM.chipGithub.style.display = 'none';
  }

  // 3. Render Metrics Bar
  DOM.metricsContainer.innerHTML = '';
  if (Array.isArray(data.metrics)) {
    data.metrics.forEach(metric => {
      const card = document.createElement('div');
      card.className = 'metric-card';
      card.innerHTML = `
        <div class="metric-value">${metric.value}</div>
        <div class="metric-label">${metric.label}</div>
      `;
      DOM.metricsContainer.appendChild(card);
    });
  }

  // 4. Render Professional Summary
  DOM.summaryHeading.textContent = labels.summary;
  DOM.summaryText.textContent = data.summary || '';

  // 5. Render Featured Projects Section
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    DOM.projectsSection.style.display = '';
    DOM.projectsHeading.textContent = labels.projects || 'المشاريع والمبادرات البارزة';
    DOM.projectsGrid.innerHTML = '';
    
    data.projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      
      let highlightsHTML = '';
      if (Array.isArray(project.highlights)) {
        highlightsHTML = `
          <ul class="project-highlights-list">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        `;
      }

      let tagsHTML = '';
      if (Array.isArray(project.tags)) {
        tagsHTML = `
          <div class="project-tags-row">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="project-title-row">
            <h3 class="project-title">${project.title}</h3>
            <span class="timeline-date-badge">${project.period}</span>
          </div>
          <div class="project-role">${project.role}</div>
          <p class="project-desc" style="margin-top: 8px;">${project.description}</p>
          ${highlightsHTML}
        </div>
        ${tagsHTML}
      `;
      DOM.projectsGrid.appendChild(card);
    });
  } else {
    DOM.projectsSection.style.display = 'none';
  }

  // 6. Render Skills Section & Filter Pills
  DOM.skillsHeading.textContent = labels.skills;
  renderSkillFilters(data.skills, labels);
  renderSkillCards(data.skills);

  // 7. Render Work Experience Timeline
  DOM.experienceHeading.textContent = labels.experience;
  DOM.experienceTimeline.innerHTML = '';
  
  if (Array.isArray(data.experience)) {
    data.experience.forEach(exp => {
      const card = document.createElement('article');
      card.className = 'timeline-card';
      
      let achievementsHTML = '';
      if (Array.isArray(exp.achievements) && exp.achievements.length > 0) {
        achievementsHTML = `
          <ul class="timeline-achievements-list">
            ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
          </ul>
        `;
      }

      card.innerHTML = `
        <div class="timeline-node"></div>
        <div class="timeline-header-row">
          <h3 class="timeline-main-title">${exp.role}</h3>
          <span class="timeline-date-badge"><i class="fa-regular fa-calendar"></i> ${exp.period}</span>
        </div>
        <div class="timeline-org">${exp.company}</div>
        ${exp.details ? `<p class="timeline-description">${exp.details}</p>` : ''}
        ${achievementsHTML}
      `;
      DOM.experienceTimeline.appendChild(card);
    });
  }

  // 8. Render Education Timeline
  DOM.educationHeading.textContent = labels.education;
  DOM.educationTimeline.innerHTML = '';
  
  if (Array.isArray(data.education)) {
    data.education.forEach(edu => {
      const card = document.createElement('article');
      card.className = 'timeline-card';
      
      card.innerHTML = `
        <div class="timeline-node"></div>
        <div class="timeline-header-row">
          <h3 class="timeline-main-title">${edu.degree}</h3>
          <span class="timeline-date-badge"><i class="fa-regular fa-calendar"></i> ${edu.year}</span>
        </div>
        <div class="timeline-org">${edu.institution}</div>
        ${edu.details ? `<p class="timeline-description">${edu.details}</p>` : ''}
      `;
      DOM.educationTimeline.appendChild(card);
    });
  }

  // 9. Render Certifications Grid
  DOM.certificationsHeading.textContent = labels.certifications;
  DOM.certificationsGrid.innerHTML = '';
  
  if (Array.isArray(data.certifications) && data.certifications.length > 0) {
    DOM.certificationsSection.style.display = '';
    data.certifications.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card';
      
      card.innerHTML = `
        <div>
          <h3 class="cert-title">${cert.title}</h3>
          <div class="cert-issuer">${cert.issuer}</div>
        </div>
        <div class="cert-meta-row">
          <span><i class="fa-solid fa-location-dot"></i> ${cert.location || ''}</span>
          <span><i class="fa-regular fa-calendar-check"></i> ${cert.date}</span>
        </div>
        ${cert.url ? `
          <div style="margin-top: 8px;">
            <a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="cert-link">
              ${labels.viewCert || 'View Credential'} <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        ` : ''}
      `;
      DOM.certificationsGrid.appendChild(card);
    });
  } else {
    DOM.certificationsSection.style.display = 'none';
  }

  // 10. Render Languages Grid
  DOM.languagesHeading.textContent = labels.languages;
  DOM.languagesGrid.innerHTML = '';
  
  if (Array.isArray(data.languages)) {
    data.languages.forEach(langItem => {
      const card = document.createElement('div');
      card.className = 'lang-card';
      card.innerHTML = `
        <div class="lang-name">${langItem.name}</div>
        <div class="lang-level">${langItem.level}</div>
      `;
      DOM.languagesGrid.appendChild(card);
    });
  }

  // 11. Update Footer Info
  DOM.footerAuthor.textContent = personal.name;
  DOM.footerCopyright.textContent = `© ${new Date().getFullYear()}`;
  if (DOM.footerSub) {
    DOM.footerSub.textContent = labels.footerSub || (currentLang === 'ar' ? 'سيرة ذاتية تفاعلية مطابقة لمعايير أنظمة التوظيف الحديثة' : 'Interactive CV compliant with modern ATS recruitment standards');
  }
}

/**
 * Render Skill Category Filter Pills
 */
function renderSkillFilters(skills, labels) {
  DOM.skillFilters.innerHTML = '';
  if (!Array.isArray(skills)) return;

  // 'All' Pill
  const allPill = document.createElement('button');
  allPill.className = `filter-pill ${activeSkillCategory === 'all' ? 'active' : ''}`;
  allPill.textContent = labels.filterAll || 'الكل';
  allPill.onclick = () => filterSkillCategory('all');
  DOM.skillFilters.appendChild(allPill);

  skills.forEach(category => {
    const pill = document.createElement('button');
    pill.className = `filter-pill ${activeSkillCategory === category.id ? 'active' : ''}`;
    pill.textContent = category.label;
    pill.onclick = () => filterSkillCategory(category.id);
    DOM.skillFilters.appendChild(pill);
  });
}

/**
 * Filter Skill Category
 */
function filterSkillCategory(categoryId) {
  activeSkillCategory = categoryId;
  const data = cvData[currentLang] || cvData['ar'];
  renderSkillFilters(data.skills, data.labels || {});
  renderSkillCards(data.skills);
}

/**
 * Render Skill Category Cards
 */
function renderSkillCards(skills) {
  DOM.skillsGrid.innerHTML = '';
  if (!Array.isArray(skills)) return;

  const filteredCategories = activeSkillCategory === 'all' 
    ? skills 
    : skills.filter(cat => cat.id === activeSkillCategory);

  filteredCategories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'skill-category-card';
    card.setAttribute('data-category', category.id);
    
    let itemsHTML = '';
    if (Array.isArray(category.items)) {
      category.items.forEach(item => {
        itemsHTML += `
          <div class="skill-item-row">
            <div class="skill-item-header">
              <span class="skill-name">${item.name}</span>
              <span class="skill-pct">${item.level}%</span>
            </div>
            <div class="skill-track">
              <div class="skill-progress-bar" style="width: ${item.level}%;"></div>
            </div>
          </div>
        `;
      });
    }

    card.innerHTML = `
      <h3 class="skill-category-title">${category.label}</h3>
      <div class="skill-items-list">${itemsHTML}</div>
    `;
    DOM.skillsGrid.appendChild(card);
  });
}

/**
 * Toggle Search Drawer
 */
function toggleSearch() {
  const isHidden = DOM.searchBarContainer.classList.contains('hidden');
  if (isHidden) {
    DOM.searchBarContainer.classList.remove('hidden');
    DOM.searchInput.focus();
  } else {
    DOM.searchBarContainer.classList.add('hidden');
    if (activeSearchQuery) {
      clearSearch();
    }
  }
}

/**
 * Handle Live Search Input
 */
let searchDebounceTimer = null;
function handleSearch(query) {
  activeSearchQuery = query.trim();
  
  if (activeSearchQuery) {
    DOM.clearSearchBtn.classList.remove('hidden');
  } else {
    DOM.clearSearchBtn.classList.add('hidden');
  }

  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    filterContent(activeSearchQuery);
  }, 150);
}

/**
 * Clear Search Input and Reset Filter
 */
function clearSearch() {
  DOM.searchInput.value = '';
  DOM.clearSearchBtn.classList.add('hidden');
  activeSearchQuery = '';
  filterContent('');
}

/**
 * Filter Content and Highlight Matches
 */
function filterContent(query) {
  const searchableCards = document.querySelectorAll(
    '.skill-category-card, .timeline-card, .cert-card, .lang-card, .project-card, .metric-card'
  );
  
  if (!query) {
    searchableCards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '1';
    });
    DOM.searchResultsCount.classList.add('hidden');
    return;
  }

  const lowerQuery = query.toLowerCase();
  let matchCount = 0;

  searchableCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const isMatch = text.includes(lowerQuery);
    
    if (isMatch) {
      card.style.display = '';
      card.style.opacity = '1';
      card.style.borderColor = 'var(--accent-primary)';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  DOM.searchResultsCount.classList.remove('hidden');
  const template = cvData[currentLang]?.labels?.searchResults || 'تم العثور على ({count}) نتيجة مطابقة';
  DOM.searchResultsCount.textContent = template.replace('{count}', matchCount);
}

/**
 * Generate and Download vCard (.vcf) Contact Card
 */
function saveContactVCard() {
  const data = cvData[currentLang] || cvData['ar'];
  const p = data.personal || {};

  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN;CHARSET=UTF-8:${p.name}`,
    `N;CHARSET=UTF-8:Al Otaibi;Mohammed;;;`,
    `TITLE;CHARSET=UTF-8:${p.title}`,
    `TEL;TYPE=CELL,VOICE:${p.phone.replace(/\s+/g, '')}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.email}`,
    `URL;CHARSET=UTF-8:https://cv.mohammed.alotaibi.site`,
    `ADR;TYPE=WORK;CHARSET=UTF-8:;;${p.location};;;;`,
    `NOTE;CHARSET=UTF-8:${data.summary ? data.summary.slice(0, 150) : ''}...`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.setAttribute('download', `Mohammed-Al-Otaibi.vcf`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast(cvData[currentLang]?.labels?.vcardDownloaded || 'تم تجهيز ملف جهة الاتصال (vCard) للتحميل!');
}

/**
 * Share Profile via Web Share API or Clipboard Fallback
 */
async function shareProfile() {
  const shareData = {
    title: document.title,
    text: `${cvData[currentLang]?.personal?.name} - ${cvData[currentLang]?.personal?.title}`,
    url: 'https://cv.mohammed.alotaibi.site/'
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyProfileLink();
      }
    }
  } else {
    copyProfileLink();
  }
}

/**
 * Copy Link Fallback
 */
function copyProfileLink() {
  const url = 'https://cv.mohammed.alotaibi.site/';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(cvData[currentLang]?.labels?.copied || 'تم نسخ الرابط للحافظة!');
    });
  }
}

/**
 * Generate QR Code into Container (100% Scannable URL)
 */
let qrInstance = null;
function generateWebsiteQRCode() {
  const targetUrl = 'https://cv.mohammed.alotaibi.site/';
  if (!DOM.qrcodeContainer) return;
  DOM.qrcodeContainer.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    qrInstance = new QRCode(DOM.qrcodeContainer, {
      text: targetUrl,
      width: 220,
      height: 220,
      colorDark: '#090d16',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    // Highly reliable vector image fallback
    const qrImg = document.createElement('img');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(targetUrl)}`;
    qrImg.alt = 'QR Code';
    qrImg.width = 220;
    qrImg.height = 220;
    DOM.qrcodeContainer.appendChild(qrImg);
  }
}

/**
 * Open QR Code Modal
 */
function openQrModal() {
  generateWebsiteQRCode();
  DOM.qrModal.classList.remove('hidden');
}

/**
 * Close QR Code Modal
 */
function closeQrModal() {
  DOM.qrModal.classList.add('hidden');
}

/**
 * Handle Modal Backdrop Click
 */
function handleModalBackdropClick(event) {
  if (event.target === DOM.qrModal) {
    closeQrModal();
  }
}

/**
 * Download QR Code Image
 */
function downloadQrImage() {
  if (!DOM.qrcodeContainer) return;
  const canvas = DOM.qrcodeContainer.querySelector('canvas');
  const img = DOM.qrcodeContainer.querySelector('img');

  let dataUrl = '';
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (img) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const link = document.createElement('a');
    link.download = 'Mohammed-Al-Otaibi-CV-QR.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(cvData[currentLang]?.labels?.qrDownloaded || 'تم تحميل صورة رمز QR بنجاح!');
  }
}

/**
 * Scroll to Top Smoothly
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Print or Save as Vector PDF (ATS-Compliant)
 */
function printOrDownloadPDF() {
  const originalTitle = document.title;
  const personName = (cvData[currentLang]?.personal?.name || 'Mohammed-Al-Otaibi').replace(/\s+/g, '-');
  
  // Set clean filename for print PDF dialog
  document.title = `CV-${personName}`;
  
  // Execute clean vector print
  window.print();
  
  // Restore document title
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

/**
 * Initialize on DOM Content Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initDOMCache();
  initSettings();
  setLanguage(currentLang);

  // Global Keyboard Listener for Modal (Escape Key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.qrModal && !DOM.qrModal.classList.contains('hidden')) {
      closeQrModal();
    }
  });

  // Scroll Listener for Back to Top Button
  window.addEventListener('scroll', () => {
    if (DOM.backToTopBtn) {
      if (window.scrollY > 300) {
        DOM.backToTopBtn.classList.add('visible');
      } else {
        DOM.backToTopBtn.classList.remove('visible');
      }
    }
  });
});
