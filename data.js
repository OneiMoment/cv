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
      name: "محمد عبدالله العثيبي",
      title: "مدير مشاريع وتقنية معلومات والخدمات الحكومية",
      location: "جدة، المملكة العربية السعودية",
      email: "mohammed.alotaibi1@outlook.com",
      phone: "+966 583809000",
      github: "https://github.com/OneiMoment",
      linkedin: "https://www.linkedin.com/in/your-username",
      birthDate: "21 نوفمبر 1985"
    },
    summary: "متخصص في تقنية المعلومات والخدمات الحكومية مع خبرة طويلة في إدارة المشاريع والبنية التحتية. أسعى لتطوير حلول مبتكرة وتحسين الأداء التقني في القطاع الحكومي.",
    skills: [
      { 
        label: "أنظمة التشغيل", 
        items: [
          { name: "Linux", level: 85 },
          { name: "Windows", level: 95 },
          { name: "macOS", level: 95 }
        ] 
      },
      { 
        label: "الشبكات والبنية التحتية", 
        items: [
          { name: "Wireless Network", level: 92 },
          { name: "Ethernet & Fiber", level: 90 },
          { name: "VPN", level: 88 },
          { name: "Firewalls", level: 90 }
        ] 
      },
      { 
        label: "البرمجيات والخدمات", 
        items: [
          { name: "Cloud & Virtual PC", level: 85 },
          { name: "ERP Systems", level: 85 },
          { name: "PBX & VOIP", level: 88 },
          { name: "Email & Messaging", level: 90 }
        ] 
      },
      { 
        label: "الكفاءات الإدارية", 
        items: [
          { name: "إدارة المشاريع", level: 92 },
          { name: "الإشراف والتطوير", level: 88 },
          { name: "التخطيط الاستراتيجي", level: 85 },
          { name: "إدارة الفريق", level: 90 }
        ] 
      }
    ],
    certifications: [
      { 
        title: "CCNA Exploration: Network Fundamentals", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "كاليفورنيا - الولايات المتحدة"
      },
      { 
        title: "CCNA Exploration: Routing Protocols and Concepts", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "كاليفورنيا - الولايات المتحدة"
      },
      { 
        title: "CCNA Exploration: LAN Switching and Wireless", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "كاليفورنيا - الولايات المتحدة"
      },
      { 
        title: "IELTS Academic Overall Band Score 5.0", 
        issuer: "Department Of Language Studies - Unitec Institute of Technology",
        date: "2015",
        location: "نيوزيلندا - أوكلاند"
      }
    ],
    education: [
      { 
        degree: "دبلوم تقنية المعلومات - تخصص الشبكات", 
        institution: "معهد العالمية للحاسب والتقنية", 
        year: "2009 - 2007",
        details: "درجة 100 من 82 بمعدل ممتاز"
      },
      { 
        degree: "دبلوم علوم الحاسب - تخصص تقنية الشبكات", 
        institution: "معهد بدرة - جدة", 
        year: "بعد 2009",
        details: "مدة التدريب سنتان"
      },
      { 
        degree: "اجتياز الاختبار الشامل للتدريب التقني والمهني", 
        institution: "المؤسسة العامة للتدريب التقني والمهني", 
        year: "2010",
        details: "برنامج شامل في التقنية والمهارات العملية"
      }
    ],
    experience: [
      { 
        company: "جهة حكومية - وزارة الخدمات الحكومية", 
        role: "مدير تقنية المعلومات والخدمات الحكومية", 
        period: "2022 — الآن",
        details: "قيادة فريق تقني متعدد التخصصات وإدارة البنية التحتية الحكومية",
        achievements: [
          "إدارة البنية التحتية للشبكات اللاسلكية و Ethernet و Fiber",
          "تأسيس وإدارة أجهزة الحاسب وتثبيت البرامج والتطبيقات",
          "إدارة الأنظمة التشغيلية المختلفة (Linux, Windows, macOS)",
          "تصميم وإدارة حلول Cloud PC و Virtual PC",
          "تأسيس وإدارة سيرفرات البيانات والشبكات",
          "إدارة أنظمة الجدران النارية (Firewalls)",
          "إدارة خدمات VPN والمستودعات",
          "تأسيس وإدارة أنظمة البدل الهاتفي PBX والخطوط الصوتية VOIP",
          "تأسيس وإدارة سيرفرات البريد الإلكتروني والرسائل النصية SMS والمستودعات",
          "تأسيس وإدارة أنظمة ERP ووصل وربطها بأنظمة المستودعات",
          "توزيع صلاحيات المستخدمين وإدارة حسابات البريد والمستودعات",
          "تأسيس وإدارة أنظمة البحث والتطوير والتحسين بالتواصل بالتحليل",
          "تأسيس إدارة أنظمة الموارد البشرية والمتابعة من داخل المنشأة",
          "تأسيس وإدارة أنظمة كاملة المشاريع والتقارير والخطط",
          "إدارة المشاريع والخدمات الحكومية مع وزارة العمل وغيرها"
        ]
      },
      { 
        company: "مؤسسة العثيبي للتجارة والمقاولات", 
        role: "مدير تنفيذي للعقد والمشاريع", 
        period: "2016 — 2006",
        details: "إدارة المشاريع الهندسية والتقنية والمقاولات",
        achievements: [
          "حضور فتح المظاريات والمفاوضات في الجهات الحكومية",
          "تجميع العقود وتنسيقها واستلام مواقع المشاريع",
          "إعداد وتنسيق خطط المشاريع والإشراف والمتابعة",
          "تأسيس وتدريب فريق العمل والمهارات والكفاءات",
          "تصنيف الحالات والكفاءات والمهارات للعمل بالمشاريع",
          "إعداد المتطلبات والموازنات والبحث اللازم للمشاريع",
          "معالجة وتحسين المشاريع ومتابعة المراحل المختلفة"
        ]
      }
    ],
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "جيد (IELTS 5.0)" }
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
      name: "Mohammed Abdullah Al-Otaibi",
      title: "IT Manager & Government Services Specialist",
      location: "Jeddah, Saudi Arabia",
      email: "mohammed.alotaibi1@outlook.com",
      phone: "+966 583809000",
      github: "https://github.com/OneiMoment",
      linkedin: "https://www.linkedin.com/in/your-username",
      birthDate: "November 21, 1985"
    },
    summary: "Specialized in Information Technology and Government Services with extensive experience in project management and infrastructure. Committed to developing innovative solutions and improving technical performance in the government sector.",
    skills: [
      { 
        label: "Operating Systems", 
        items: [
          { name: "Linux", level: 90 },
          { name: "Windows", level: 95 },
          { name: "macOS", level: 80 }
        ] 
      },
      { 
        label: "Networking & Infrastructure", 
        items: [
          { name: "Wireless Networks", level: 92 },
          { name: "Ethernet & Fiber", level: 90 },
          { name: "VPN", level: 88 },
          { name: "Firewalls", level: 90 }
        ] 
      },
      { 
        label: "Software & Services", 
        items: [
          { name: "Cloud & Virtual PC", level: 85 },
          { name: "ERP Systems", level: 85 },
          { name: "PBX & VOIP", level: 88 },
          { name: "Email & Messaging", level: 90 }
        ] 
      },
      { 
        label: "Management Skills", 
        items: [
          { name: "Project Management", level: 92 },
          { name: "Team Leadership", level: 88 },
          { name: "Strategic Planning", level: 85 },
          { name: "Team Development", level: 90 }
        ] 
      }
    ],
    certifications: [
      { 
        title: "CCNA Exploration: Network Fundamentals", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "California, United States"
      },
      { 
        title: "CCNA Exploration: Routing Protocols and Concepts", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "California, United States"
      },
      { 
        title: "CCNA Exploration: LAN Switching and Wireless", 
        issuer: "Cisco Networking Academy",
        date: "2010",
        location: "California, United States"
      },
      { 
        title: "IELTS Academic Overall Band Score 5.0", 
        issuer: "Department Of Language Studies - Unitec Institute of Technology",
        date: "2015",
        location: "Auckland, New Zealand"
      }
    ],
    education: [
      { 
        degree: "Diploma in Information Technology - Network Specialization", 
        institution: "Al-Alamiah Institute for Computers and Technology", 
        year: "2007 - 2009",
        details: "Score 100 out of 82 with excellent grade"
      },
      { 
        degree: "Diploma in Computer Science - Network Technology Specialization", 
        institution: "Badrah Institute, Jeddah", 
        year: "After 2009",
        details: "Two years of training period"
      },
      { 
        degree: "Comprehensive Exam in Technical and Vocational Training", 
        institution: "General Organization for Technical and Vocational Training", 
        year: "2010",
        details: "Comprehensive program in technology and practical skills"
      }
    ],
    experience: [
      { 
        company: "Government Agency - Ministry of Government Services", 
        role: "IT Manager & Government Services Director", 
        period: "2022 — Present",
        details: "Leading a multidisciplinary technical team and managing government infrastructure",
        achievements: [
          "Management of wireless networks, Ethernet and Fiber infrastructure",
          "Installation and management of computer systems and software",
          "Administration of various operating systems (Linux, Windows, macOS)",
          "Design and management of Cloud PC and Virtual PC solutions",
          "Establishment and management of database and network servers",
          "Administration of firewall systems",
          "VPN services and storage management",
          "Establishment and management of PBX telephone exchange and VOIP services",
          "Setup and management of email servers, SMS and storage systems",
          "Installation and management of ERP systems",
          "User access management and email account administration",
          "Research and development systems management",
          "Human resources systems management",
          "Project and reporting systems management",
          "Government services management with various ministries"
        ]
      },
      { 
        company: "Al-Otaibi Trading & Contracting Company", 
        role: "Executive Manager of Contracts & Projects", 
        period: "2006 — 2016",
        details: "Management of engineering, technical and contracting projects",
        achievements: [
          "Attending bid openings and negotiations with government agencies",
          "Compilation and coordination of contracts",
          "Project planning and supervision",
          "Team building and skills development",
          "Case classification and competency assessment",
          "Project requirements and budget preparation",
          "Project improvement and phase management"
        ]
      }
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Excellent" }
    ]
  }
};
