const cvData = {
  ar: {
    labels: {
      summary: "الملخص المهني",
      skills: "المهارات",
      certifications: "الشهادات والدورات",
      education: "التعليم",
      experience: "الخبرات العملية",
      languages: "اللغات"
    },
    personal: {
      name: "محمد [اسمك الكامل]",
      title: "أخصائي تقنية معلومات",
      location: "جدة، السعودية",
      email: "you@example.com",
      phone: "+966-5X-XXX-XXXX",
      github: "https://github.com/your-username",
      linkedin: "https://www.linkedin.com/in/your-username"
    },
    summary: "متخصص في تقنية المعلومات أسعى لتطوير حلول مبتكرة وتحسين البنية التحتية التقنية.",
    skills: [
      { 
        label: "أنظمة التشغيل", 
        items: [
          { name: "Linux", level: 90 },
          { name: "Windows", level: 85 },
          { name: "macOS", level: 75 }
        ] 
      },
      { 
        label: "الشبكات", 
        items: [
          { name: "TCP/IP", level: 88 },
          { name: "VLAN", level: 82 },
          { name: "VPN", level: 85 },
          { name: "Firewall", level: 80 }
        ] 
      },
      { 
        label: "البرمجة", 
        items: [
          { name: "Python", level: 80 },
          { name: "JavaScript", level: 75 },
          { name: "Bash", level: 85 }
        ] 
      }
    ],
    certifications: [
      { 
        title: "CompTIA Security+", 
        issuer: "CompTIA",
        date: "2023",
        url: "https://example.com"
      },
      { 
        title: "AWS Certified Solutions Architect", 
        issuer: "Amazon Web Services",
        date: "2022",
        url: "https://example.com"
      },
      { 
        title: "Cisco Certified Network Associate (CCNA)", 
        issuer: "Cisco",
        date: "2021",
        url: "https://example.com"
      }
    ],
    education: [
      { 
        degree: "بكالوريوس علوم الحاسب", 
        institution: "جامعة [الاسم]", 
        year: "2020",
        details: "تخصص أمن المعلومات"
      }
    ],
    experience: [
      { 
        company: "شركة [اسم]", 
        role: "مهندس نظم وشبكات", 
        period: "2022 — الآن",
        details: "إدارة البنية التحتية وتحسين الأداء",
        achievements: ["زيادة الإنتاجية بـ 40%", "تقليل أوقات التوقف بـ 60%"]
      },
      { 
        company: "شركة [اسم أخرى]", 
        role: "مسؤول تقنية معلومات", 
        period: "2020 — 2022",
        details: "دعم البنية التحتية وإدارة الخوادم",
        achievements: ["توثيق شامل للنظام"]
      }
    ],
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "ممتاز" }
    ]
  },
  en: {
    labels: {
      summary: "Professional Summary",
      skills: "Skills",
      certifications: "Certifications & Courses",
      education: "Education",
      experience: "Experience",
      languages: "Languages"
    },
    personal: {
      name: "Mohammed [Full Name]",
      title: "IT Specialist",
      location: "Jeddah, Saudi Arabia",
      email: "you@example.com",
      phone: "+966-5X-XXX-XXXX",
      github: "https://github.com/your-username",
      linkedin: "https://www.linkedin.com/in/your-username"
    },
    summary: "IT professional focused on innovative solutions and infrastructure optimization.",
    skills: [
      { 
        label: "Operating Systems", 
        items: [
          { name: "Linux", level: 90 },
          { name: "Windows", level: 85 },
          { name: "macOS", level: 75 }
        ] 
      },
      { 
        label: "Networking", 
        items: [
          { name: "TCP/IP", level: 88 },
          { name: "VLAN", level: 82 },
          { name: "VPN", level: 85 },
          { name: "Firewall", level: 80 }
        ] 
      },
      { 
        label: "Programming", 
        items: [
          { name: "Python", level: 80 },
          { name: "JavaScript", level: 75 },
          { name: "Bash", level: 85 }
        ] 
      }
    ],
    certifications: [
      { 
        title: "CompTIA Security+", 
        issuer: "CompTIA",
        date: "2023",
        url: "https://example.com"
      },
      { 
        title: "AWS Certified Solutions Architect", 
        issuer: "Amazon Web Services",
        date: "2022",
        url: "https://example.com"
      },
      { 
        title: "Cisco Certified Network Associate (CCNA)", 
        issuer: "Cisco",
        date: "2021",
        url: "https://example.com"
      }
    ],
    education: [
      { 
        degree: "B.Sc. Computer Science", 
        institution: "[University Name]", 
        year: "2020",
        details: "Specialization in Information Security"
      }
    ],
    experience: [
      { 
        company: "[Company Name]", 
        role: "Systems & Network Engineer", 
        period: "2022 — Present",
        details: "Infrastructure management and performance optimization",
        achievements: ["Increased productivity by 40%", "Reduced downtime by 60%"]
      },
      { 
        company: "[Another Company]", 
        role: "IT Support Officer", 
        period: "2020 — 2022",
        details: "Infrastructure support and server management",
        achievements: ["Comprehensive system documentation"]
      }
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Excellent" }
    ]
  }
};
