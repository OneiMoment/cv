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
      name: "محمد عبدالله العتيبي",
      title: "مدير مشاريع وتقنية معلومات والخدمات الحكومية",
      location: "جدة، المملكة العربية السعودية",
      email: "mohammed@alotaibi.site",
      phone: "+966583809000",
      github: "https://github.com/OneiMoment",
      linkedin: "https://www.linkedin.com/in/your-username",
      birthDate: "21 نوفمبر 1985"
    },
    summary: "متخصص في تقنية المعلومات والخدمات الحكومية مع خبرة طويلة في إدارة المشاريع والبنية التحتية. أسعى لتطوير حلول مبتكرة وتحسين الأداء التقني في القطاع الحكومي.",
    skills: [
      { 
        label: "أنظمة التشغيل", 
        items: [
          { name: "Linux", level: 90 },
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
        year: "2007 - 2009",
        details: "درجة 82 من 100 بمعدل جيد جداً"
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
        company: "جهة قطاع صناعي", 
        role: "مدير تقنية المعلومات والخدمات الحكومية", 
        period: "2016 — 2022",
        details: "قيادة فريق تقني متعدد التخصصات وإدارة البنية التحتية الحكومية",
        achievements: [
          "ﺗﺄﺳﻴﺲ وإدارة أﻧﻈﻤﺔ اﻟﺸﺒﻜﺔ اﻟﻜﺘﺮوﻧﻴﺔ ﻣﻦ Fiber و Ethernet و Wireless Network.",
          "ﺗﺄﺳﻴﺲ وإدارة أﺟﻬﺰة اﻟﺤﺎﺳﺐ اﻟﻲ واﻟﻄﺎﺑﻌﺎت ﻣﻦ ﺗﺠﻤﻴﻊ وﺗﺮﻛﻴﺐ وﺻﻴﺎﻧﺔ ﺑﺘﺄﻣﻴﻨﻬﺎ وﺗﺜﻴﺒﺖ اﻟﺒﺮاﻣﺞ اﻟﻤﻜﺘﺒﻴﺔ واﻟﺤﻤﺎﻳﺔ وﺗﺜﺒﻴﺖ اﻧﻈﻤﺔ اﻟﺘﺸﻐﻴﻠﻴﺔ ﻣﺜـﻞ Windows و Linux و macOS و Cloud PC و virtual PC.",
          "ﺗﺄﺳﻴﺲ وإدارة أﺟﻬﺰة اﻟﺮاوﺗﺮ وأﺟﻬﺰة firewalls واﻟﺘﺤﻜﻢ ﺑﻤﺮور اﻟﺒﻴﺎﻧﺎت واﻻﺗﺼﺎﻻت واﻻﻧﺘﺮﻧﺖ ورﺑﻂ اﻟﻤﻮاﻗﻊ واﻟﻤﺴﺘﻮدﻋﺎت ب VPN.",
          "ﺗﺄﺳﻴﺲ وإدارة ﺳﻴﺮﻓﺮات اﻟﺴﻨﺘﺮاﻻت PBX وﺗﺤﻮﻳﻼت اﻟﻤﻮﻇﻔﻴﻦ ب VOIP ورﺑﻄﻬﺎ ﺑﺄرﻗﺎم اﻟﻤﻨﺸﺄة.",
          "ﺗﺄﺳﻴﺲ وإدارة ﺳﻴﺮﻓﺮات اﻟـ NAS و SAN واﻟﺒﻴﺎﻧﺎت اﻟﻤﺎﻟﻴﺔ واﻟﻤﺤﺎﺳﺒﻴﺔ وﺗﺄﻣﻴﻨﻬﺎ ورﺑﻄﻬﺎ ﻣﻊ أﻧﻈﻤﺔ ERP.",
          "ﺗﻮزﻳﻊ اﻟﺼﻼﺣﻴﺎت ﻟﻠﻤﻮﻇﻔﻴﻦ ﻋﻠﻰ ﻛﻞ اﻟﻤﺴﺘﻮﻳﺎت.",
          "ﺗﺄﺳﻴﺲ وإدارة أﻧﻈﻤﺔ ﻛﺎﻣﻴﺮات اﻟﻤﺮاﻗﺒﺔ.",
          "ﺗﺄﺳﻴﺲ وإدارة أﻧﻈﻤﺔ اﻟﺒﺼـﻤﺔ واﻟﺤﻀـﻮر واﻻﻧﺼﺮاف واﻟﺘﺤﻜﻢ ﺑﺎﻟﻮﺻـﻮل ﺑﺎﺑﻮاب، وإﺿﺎﻓﺔ وﺗﺤﺪﻳﺚ ﺑﻴﺎﻧﺎت اﻟﻤﻮﻇﻔﻴﻦ ورﺑﻂ اﺟﻬﺰة ﻓﻲ داﺧﻞ اﻟﻤﻨﺸﺄة وﺧﺎرﺟﻬﺎ ﻓﻲ ﺣﺎل ﺗﻌﺪد اﻟﻤﻮاﻗﻊ.",
          "ﺗﺄﺳﻴﺲ وإدارة أﻧﻈﻤﺔ اﻟﻌﻤﻞ ﻋﻦ ﺑﻌـﺪ ﻣﺜـﻞ teams واﻟﺘﺨﺰﻳﻦ اﻟﺴﺤﺎﺑﻲ ورﺑﻄﻬﺎ ﺑﺴﻴﺮﻓﺮ اﻳﻤﻴﻞ اﻟﺨﺎص ﺑﺎﻟﻤﻨﺸﺄة.",
          "إدارة اﻟﺨﺪﻣﺎت اﻟﺤﻜﻮﻣﻴﺔ ﻟﻠﻤﻨﺸﺄة ﻣﺜﻞ أﺑﺸﺮ واﻟﺘﺄﻣﻴﻨﺎت اﺟﺘﻤﺎﻋﻴﺔ و وزارة اﻟﻌﻤﻞ وﻏﻴﺮﻫﺎ.",
          "تأسيس إدارة أنظمة الموارد البشرية والمتابعة من داخل المنشأة"
        ]
      },
      { 
        company: "جهة قطاع مقاولات - مع وزارة الشؤون البلدية والقروية", 
        role: "مدير تنفيذي للعقد والمشاريع", 
        period: "2003 — 2016",
        details: "إدارة المشاريع الهندسية والتقنية والمقاولات",
        achievements: [
          "ﺣﻀﻮر ﻓﺘﺢ اﻟﻤﻈﺎرﻳﻒ واﻟﻤﻨﺎﻗﺼﺎت ﻓﻲ اﻟﺠﻬﺎت اﻟﺤﻜﻮﻣﻴﺔ.",
          "ﺗﻮﻗﻴﻊ اﻟﻌﻘﻮد واﺳﺘﻼم ﻣﻮاﻗﻊ اﻟﻤﺸﺎرﻳﻊ ﺑﻤﺤﺎﺿﺮ رﺳﻤﻴﺔ.",
          "إعداد وتنسيق الخطط لتنفيذ مشاريع الاﻧﺎرة في طرق ومناطق السكنية والإشراف على استخراج ﺮﺧﺺالحفر اللازمة.",
          "ﺗﺴﻜﻴﻦ وﺗﺠﻬﻴﺰ اﻟﻌﻤﺎﻟﺔ واﻟﻜﺎدر اﻟﻔﻨﻲ وﺗﻮﻓﻴﺮ اﻟﻤﻌﺪات واﻟﻤﻮاد اﻟﻼزﻣﺔ وﺻﺮف وإﻋﺪاد ﻣﺴﻴﺮات اﻟﺮواﺗﺐ. ",
          "إﻋﺪاد اﻟﻤﺴﺘﺨﻠﺼﺎت اﻟﻤﺎﻟﻴﺔ ﻣﻦ اﻟﺒﻠﺪﻳﺎت والاﻣﺎﻧﺎت وﻣﺤﺎﺿﺮ اﻟﺘﺴﻠﻴﻢ اﻟﻨﻬﺎﺋﻲ وﻣﺘﺎﺑﻌﺔ ﺻﺮف اﻟﻤﺴﺘﺨﻠﺼﺎت اﻟﺨﺘﺎﻣﻴﺔ.",
          "إعداد المتطلبات والموازنات والبحث اللازم للمشاريع. ",
          "معالجة وتحسين المشاريع ومتابعة المراحل المختلفة. "
        ]
      }
    ],
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "ممتازة" }
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
      name: "Mohammed Abdullah Al Otaibi",
      title: "IT Manager & Government Services Specialist",
      location: "Jeddah, Saudi Arabia",
      email: "mohammed@alotaibi.site",
      phone: "+966583809000",
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
          { name: "macOS", level: 95 }
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
        details: "Score 82 out of 100 with very good grade"
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
        company: "Industrial sector entity", 
        role: "IT Manager & Government Services Director", 
        period: "2016 — 2022",
        details: "Leading a multidisciplinary technical team and managing government infrastructure",
        achievements: [
          "Establish and manage networks from Fiber, Ethernet, and Wireless Network.",
          "Establish and manage computers and printers from our collection, installation, maintenance, and security, and install software, security, and install operating systems such as Windows, Linux, macOS, Cloud PC, and virtual PC.",
          "Establish and manage routers and firewalls, and control data, communications, the Internet, website connections, and warehouses via VPN.",
          "Establish and manage PBX internet servers and convert employees via VOIP, and connect them to the establishment's numbers.",
          "Establish and manage NAS and SAN internet servers, financial and accounting data, and security, and connect them to ERP systems.",
          "Distribute privileges to employees at all levels.",
          "Establish and manage monitoring cameras systems.",
          "Establish and manage camera, presence, departure, and control of access via doors, add and update employee data, and connect devices inside and outside the establishment in case of site expansion.",
          "Establish and manage remote work systems such as teams, cash storage, and connect them to the establishment's private email servers.",
          "Establish and manage remote work systems such as teams, cash storage, and connect them to the establishment's private email servers.",
          "Human resources systems management"
        ]
      },
      { 
        company: "Construction sector entity - with the Ministry of Municipal and Rural Affairs", 
        role: "Executive Manager of Contracts & Projects", 
        period: "2003 — 2016",
        details: "Management of engineering, technical and contracting projects",
        achievements: [
          "Attendance at the opening of tenders and negotiations in the governmental departments.",
          "Signing contracts and receiving the locations of the projects in official papers.",
          "Preparing and coordinating plans to implement lighting projects in residential roads and areas and supervising the extraction of necessary drilling permits.",
          "Housing and preparing the workers and technical staff and providing the necessary equipment and materials and issuing and preparing the schedules of the salaries.",
          "Preparation of financial statements from municipalities, ‏municipality, final delivery reports and follow-up on the disbursement of the acquired assets.",
          "Project requirements and budget preparation. ",
          "Project improvement and phase management. "
        ]
      }
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Excellent" }
    ]
  }
};
