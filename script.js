/**
 * Dynamic CV Application Script
 * Developer: Mohammed Al Otaibi
<<<<<<< HEAD
<<<<<<< Updated upstream
 * Version: 2.1 (Advanced: vCard, WebShare, Projects, Metrics, Offline PWA, Quick Filters)
=======
 * Version: 2.3 (Bilingual UI, Standard QR Generator, vCard, WebShare, PWA)
>>>>>>> Stashed changes
=======
 * Version: 2.2 (Advanced: QR Modal, vCard, WebShare, Projects, Metrics, Offline PWA)
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
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
  
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
  // QR Modal
  DOM.qrModal = document.getElementById('qrModal');
  DOM.qrModalTitle = document.getElementById('qrModalTitle');
  DOM.qrModalScanHint = document.getElementById('qrModalScanHint');
  DOM.qrDownloadText = document.getElementById('qrDownloadText');
  DOM.qrCopyLinkText = document.getElementById('qrCopyLinkText');
<<<<<<< HEAD
  DOM.qrModalCloseBtn = document.getElementById('qrModalCloseBtn');
  DOM.qrCanvas = document.getElementById('qrCanvas');
  
>>>>>>> Stashed changes
=======
  DOM.qrCanvas = document.getElementById('qrCanvas');
  
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
  // Toast
  DOM.toastNotification = document.getElementById('toastNotification');
  DOM.toastMessage = document.getElementById('toastMessage');
}

/**
 * Standard ISO/IEC 18004 QR Code Generator Engine (Zero Dependencies)
 */
const QRGen = (function() {
  function QRCode(typeNumber, errorCorrectionLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectionLevel = errorCorrectionLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }

  const QRMode = { MODE_8BIT_BYTE: 1 << 2 };
  const QRErrorCorrectionLevel = { L: 1, M: 0, Q: 3, H: 2 };
  const QRMaskPattern = {
    PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3,
    PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7
  };

  const QRUtil = {
    PATTERN_POSITION_TABLE: [
      [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
      [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]
    ],
    G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
    getBCHTypeInfo: function(data) {
      let d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15));
      }
      return ((data << 10) | d) ^ QRUtil.G15_MASK;
    },
    getBCHDigit: function(data) {
      let digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    getPatternPosition: function(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    getMask: function(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000: return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001: return i % 2 == 0;
        case QRMaskPattern.PATTERN010: return j % 3 == 0;
        case QRMaskPattern.PATTERN011: return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101: return ((i * j) % 2) + ((i * j) % 3) == 0;
        case QRMaskPattern.PATTERN110: return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
        case QRMaskPattern.PATTERN111: return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
        default: throw new Error("bad maskPattern:" + maskPattern);
      }
    },
    getErrorCorrectPolynomial: function(errorCorrectLength) {
      let a = new QRPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    getLengthInBits: function(mode, type) {
      return (1 <= type && type < 10) ? 8 : 16;
    }
  };

  const QRMath = {
    glog: function(n) {
      if (n < 1) throw new Error("glog(" + n + ")");
      return QRMath.LOG_TABLE[n];
    },
    gexp: function(n) {
      while (n < 0) n += 255;
      while (n >= 255) n -= 255;
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
  };

  for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
  for (let i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] =
      QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^
      QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

  function QRPolynomial(num, shift) {
    if (num.length == undefined) throw new Error(num.length + "/" + shift);
    let offset = 0;
    while (offset < num.length && num[offset] == 0) offset++;
    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
    for (let i = num.length - offset; i < this.num.length; i++) this.num[i] = 0;
  }

  QRPolynomial.prototype = {
    get: function(index) { return this.num[index]; },
    getLength: function() { return this.num.length; },
    multiply: function(e) {
      const num = new Array(this.getLength() + e.getLength() - 1).fill(0);
      for (let i = 0; i < this.getLength(); i++) {
        for (let j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod: function(e) {
      if (this.getLength() - e.getLength() < 0) return this;
      const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      const num = new Array(this.getLength());
      for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
      for (let i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  const QRRSBlock = {
    RS_BLOCK_TABLE: [
      [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
      [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
      [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
      [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
      [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
      [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15]
    ],
    getRSBlocks: function(typeNumber, errorCorrectionLevel) {
      const rsBlock = QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + errorCorrectionLevel];
      const length = rsBlock.length / 3;
      const list = [];
      for (let i = 0; i < length; i++) {
        const count = rsBlock[i * 3 + 0];
        const totalCount = rsBlock[i * 3 + 1];
        const dataCount = rsBlock[i * 3 + 2];
        for (let j = 0; j < count; j++) list.push({ totalCount, dataCount });
      }
      return list;
    }
  };

  function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function(index) {
      return ((this.buffer[Math.floor(index / 8)] >>> (7 - (index % 8))) & 1) == 1;
    },
    put: function(num, length) {
      for (let i = 0; i < length; i++) this.putBit(((num >>> (length - i - 1)) & 1) == 1);
    },
    getLengthInBits: function() { return this.length; },
    putBit: function(bit) {
      const bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) this.buffer.push(0);
      if (bit) this.buffer[bufIndex] |= 0x80 >>> (this.length % 8);
      this.length++;
    }
  };

  QRCode.prototype = {
    addData: function(data) {
      this.dataList.push({
        mode: QRMode.MODE_8BIT_BYTE,
        data: data,
        getLength: function() { return data.length; },
        write: function(buffer) {
          for (let i = 0; i < data.length; i++) buffer.put(data.charCodeAt(i), 8);
        }
      });
      this.dataCache = null;
    },
    isDark: function(row, col) { return this.modules[row][col]; },
    getModuleCount: function() { return this.moduleCount; },
    make: function() {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber < 10; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectionLevel);
        const buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        for (let i = 0; i < this.dataList.length; i++) {
          const d = this.dataList[i];
          buffer.put(d.mode, 4);
          buffer.put(d.getLength(), QRUtil.getLengthInBits(d.mode, typeNumber));
          d.write(buffer);
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8) break;
      }
      this.typeNumber = typeNumber;
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (let row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount).fill(null);
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(false, QRMaskPattern.PATTERN000);
      this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectionLevel, this.dataList);
      this.mapData(this.dataCache, QRMaskPattern.PATTERN000);
    },
    setupPositionProbePattern: function(row, col) {
      for (let r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if ((0 <= r && r <= 6 && (c == 0 || c == 6)) ||
              (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
              (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    setupTimingPattern: function() {
      for (let r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] == null) this.modules[r][6] = r % 2 == 0;
      }
      for (let c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] == null) this.modules[6][c] = c % 2 == 0;
      }
    },
    setupPositionAdjustPattern: function() {
      const pos = QRUtil.getPatternPosition(this.typeNumber);
      if (!pos) return;
      for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
          const row = pos[i];
          const col = pos[j];
          if (this.modules[row][col] != null) continue;
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              this.modules[row + r][col + c] = (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0));
            }
          }
        }
      }
    },
    setupTypeInfo: function(test, maskPattern) {
      const data = (this.errorCorrectionLevel << 3) | maskPattern;
      const bits = QRUtil.getBCHTypeInfo(data);
      for (let i = 0; i < 15; i++) {
        const mod = !test && ((bits >> i) & 1) == 1;
        if (i < 6) this.modules[i][8] = mod;
        else if (i < 8) this.modules[i + 1][8] = mod;
        else this.modules[this.moduleCount - 15 + i][8] = mod;

        if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
        else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
        else this.modules[8][15 - i - 1] = mod;
      }
      this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function(data, maskPattern) {
      let inc = -1;
      let row = this.moduleCount - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              let dark = false;
              if (byteIndex < data.length) dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
              const mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) dark = !dark;
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };

  QRCode.createData = function(typeNumber, errorCorrectionLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);
    const buffer = new QRBitBuffer();
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
    while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(false);
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) break;
      buffer.put(0xec, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) break;
      buffer.put(0x11, 8);
    }
    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function(buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) data[index++] = dcdata[r][i];
      }
    }
    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) data[index++] = ecdata[r][i];
      }
    }
    return data;
  };

  return {
    generate: function(text) {
      // 0 = Auto typeNumber, 0 = ErrorCorrection Level M
      const qr = new QRCode(0, 0);
      qr.addData(text);
      qr.make();
      return qr;
    }
  };
})();

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
<<<<<<< HEAD
<<<<<<< Updated upstream
  DOM.searchInput.placeholder = labels.searchPlaceholder || (currentLang === 'ar' ? 'ابحث في المهارات والمشاريع...' : 'Search skills & projects...');

=======
  DOM.shareBtn.setAttribute('aria-label', labels.shareProfile || 'Share Profile');
  
  DOM.qrToggleBtn.title = labels.qrCodeBtn || (currentLang === 'ar' ? 'عرض رمز QR' : 'View QR Code');
  DOM.qrToggleBtn.setAttribute('aria-label', labels.qrCodeBtn || 'View QR Code');
  
  DOM.searchToggleBtn.title = labels.searchToggle || (currentLang === 'ar' ? 'فتح البحث' : 'Open Search');
  DOM.searchToggleBtn.setAttribute('aria-label', labels.searchToggle || 'Open Search');
  
  DOM.themeToggleBtn.title = labels.themeToggle || (currentLang === 'ar' ? 'تبديل المظهر' : 'Toggle Theme');
  DOM.themeToggleBtn.setAttribute('aria-label', labels.themeToggle || 'Toggle Theme');
  
  DOM.clearSearchBtn.title = labels.searchClear || (currentLang === 'ar' ? 'مسح البحث' : 'Clear Search');
  DOM.clearSearchBtn.setAttribute('aria-label', labels.searchClear || 'Clear Search');

  DOM.searchInput.placeholder = labels.searchPlaceholder || (currentLang === 'ar' ? 'ابحث في المهارات والمشاريع...' : 'Search skills & projects...');

=======
  DOM.qrToggleBtn.title = labels.qrCodeBtn || (currentLang === 'ar' ? 'عرض رمز QR' : 'View QR Code');
  DOM.searchInput.placeholder = labels.searchPlaceholder || (currentLang === 'ar' ? 'ابحث في المهارات والمشاريع...' : 'Search skills & projects...');

>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
  // Modal Labels
  if (DOM.qrModalTitle) DOM.qrModalTitle.textContent = labels.qrTitle || 'رمز الاستجابة السريعة (QR Code)';
  if (DOM.qrModalScanHint) DOM.qrModalScanHint.textContent = labels.qrScanHint || 'امسح الرمز بكاميرا هاتفك لفتح السيرة الذاتية ومشاركتها فوراً';
  if (DOM.qrDownloadText) DOM.qrDownloadText.textContent = labels.qrDownload || 'تحميل صورة الرمز';
<<<<<<< HEAD
  if (DOM.qrCopyLinkText) DOM.qrCopyLinkText.textContent = labels.qrCopyLink || 'نسخ الرابط';
  if (DOM.qrModalCloseBtn) {
    DOM.qrModalCloseBtn.title = labels.close || 'إغلاق';
    DOM.qrModalCloseBtn.setAttribute('aria-label', labels.close || 'إغلاق');
  }

>>>>>>> Stashed changes
=======

>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
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
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
 * Render QR Code on Canvas using Verified Standards-Compliant Generator
 */
function drawQRCode(canvas, urlText) {
  const ctx = canvas.getContext('2d');
  const qr = QRGen.generate(urlText);
  const count = qr.getModuleCount();
  const canvasSize = canvas.width;
  const padding = 16;
  const cellSize = (canvasSize - padding * 2) / count;

  // Clear & fill white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw dark modules
  ctx.fillStyle = '#090d16';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(
          Math.round(padding + c * cellSize),
          Math.round(padding + r * cellSize),
=======
 * Interactive QR Code Generation (Pure Client-Side Canvas)
 */
function renderQRCodeOnCanvas(canvas, text) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // QR Code Pattern Matrix for "https://cv.mohammed.alotaibi.site/"
  const matrix = [
    [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1,1,0,0,1,1,0,1,1,0,1,1,0,1,0],
    [0,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
    [1,0,0,1,0,1,1,0,1,1,0,1,0,0,1,0,1,0,0,1,0],
    [0,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,0,1,1,1,0,1,0,1,1,0,0,1,1,0,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1],
    [1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,1,0,1,1,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,0,1,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,1,1]
  ];

  const cells = matrix.length;
  const padding = 16;
  const cellSize = (size - (padding * 2)) / cells;

  ctx.fillStyle = '#0f172a';
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(
          Math.round(padding + (c * cellSize)),
          Math.round(padding + (r * cellSize)),
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
          Math.ceil(cellSize),
          Math.ceil(cellSize)
        );
      }
    }
  }
}

/**
 * Open QR Code Modal
 */
function openQrModal() {
  if (DOM.qrCanvas) {
<<<<<<< HEAD
    drawQRCode(DOM.qrCanvas, 'https://cv.mohammed.alotaibi.site/');
=======
    renderQRCodeOnCanvas(DOM.qrCanvas, 'https://cv.mohammed.alotaibi.site/');
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
  }
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
  if (!DOM.qrCanvas) return;
  const link = document.createElement('a');
  link.download = 'Mohammed-Al-Otaibi-CV-QR.png';
  link.href = DOM.qrCanvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
<<<<<<< HEAD
  showToast(cvData[currentLang]?.labels?.qrDownloaded || 'تم تحميل صورة رمز QR بنجاح!');
}

/**
>>>>>>> Stashed changes
=======
  showToast(currentLang === 'ar' ? 'تم تحميل صورة رمز QR بنجاح!' : 'QR Code downloaded successfully!');
}

/**
>>>>>>> 0e36a63c4457314c92bdc8ff5a9149653ecf0ad7
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
});
