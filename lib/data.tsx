import {
  Smartphone, Code2, Bot, Palette, BarChart3, Globe,
} from "lucide-react";

export const services = [
  { icon: <Smartphone size={24} />, title: "App development",   desc: "Mobile products built for performance, scalability, and delightful everyday use.",                      tag: "Mobile",            large: false },
  { icon: <Code2      size={24} />, title: "Web development",   desc: "Websites, web apps, and systems engineered for reliable growth.",                                       tag: "Frontend · Backend",large: true  },
  { icon: <Bot        size={24} />, title: "AI integration",    desc: "Custom AI workflows and automation that make operations faster and smarter.",                           tag: "AI · Automation",   large: false },
  { icon: <Palette    size={24} />, title: "UI/UX Design",      desc: "User-centered design solutions that create engaging and intuitive digital experiences.",                tag: "Design",            large: false },
  { icon: <BarChart3  size={24} />, title: "Digital marketing", desc: "Focused roadmaps and strategies that connect product decisions to measurable business outcomes.",       tag: "Marketing",         large: false },
];

export const stats = [
  { end: 120, suffix: "+", label: "Projects Shipped"  },
  { end: 98,  suffix: "%", label: "Client Retention"  },
  { end: 14,  suffix: "+", label: "Countries Served"  },
  { end: 5,   suffix: "★", label: "Average Rating"    },
];

export const process = [
  { num: "01", title: "Discovery & Strategy", desc: "We deep-dive into your goals, users, and market. Every decision starts with clarity." },
  { num: "02", title: "Design & Prototype",   desc: "High-fidelity prototypes that feel real before a line of code is written." },
  { num: "03", title: "Build & Iterate",      desc: "Agile sprints. Constant demos. You see progress every single week." },
  { num: "04", title: "Launch & Scale",       desc: "Zero-downtime deployment, monitoring, and ongoing optimisation as you grow." },
];

export const portfolio = [
  {
    slug: "pariksha-os",
    src: "/assets/logo/launching-soon.png",
    title: "ParikshaOS",
    category: "Operating System",
    year: "2026",
    client: "ParikshaOS",
    role: "Full-Stack Development · UI/UX Design · System Architecture",
    description: "A next-generation operating system built from the ground up for Indian competitive exam preparation — blending distraction-free computing with AI-powered study tools.",
    challenge: "Students preparing for exams like JEE, NEET, and UPSC are constantly distracted by social media and entertainment on their devices. Existing solutions offer basic app-blocking but fail to provide a holistic, purpose-built environment for focused study.",
    solution: "We designed and developed ParikshaOS as a full desktop operating system that replaces distractions with a curated suite of study tools — integrated AI tutoring, smart scheduling, collaborative study rooms, and performance analytics — all wrapped in a minimal, beautiful interface that keeps focus where it belongs.",
    gallery: ["/bg1.png", "/bg2.png", "/bg3.png"],
    coverImage: "/bg1.png",
    liveUrl: "https://parikshaos.com",
  },
  {
    slug: "restaurant-saas",
    src: "/assets/logo/launching-soon.png",
    title: "Restaurant SaaS (Coming Soon)",
    category: "SaaS Product",
    year: "2024",
    client: "Internal Product",
    role: "Product Design · Full-Stack Development · Cloud Infrastructure",
    description: "A comprehensive restaurant management platform that unifies ordering, inventory, staff scheduling, and customer analytics into a single elegant dashboard.",
    challenge: "Most restaurant owners juggle multiple disconnected tools for ordering, inventory, and staff management — leading to data silos, operational inefficiency, and missed revenue opportunities.",
    solution: "We built an all-in-one SaaS platform with real-time order tracking, AI-powered inventory predictions, automated staff scheduling, and a customer-facing progressive web app — all running on a scalable cloud infrastructure designed for zero downtime.",
    gallery: ["/portfolio_saas.png", "/bg2.png", "/bg3.png"],
    coverImage: "/portfolio_saas.png",
  },
  {
    slug: "srl-academy",
    src: "/assets/logo/logo-srl.png",
    title: "SRL Academy",
    category: "Coaching Institute",
    year: "2024",
    client: "SRL Academy",
    role: "Web Development · Brand Identity · Digital Strategy",
    description: "A modern digital presence for one of the region's fastest-growing coaching institutes, designed to attract students and streamline admissions.",
    challenge: "SRL Academy had no meaningful online presence. Their enrollment process was entirely manual, and prospective students couldn't discover course offerings, faculty credentials, or success stories online.",
    solution: "We crafted a high-converting website with integrated lead capture forms, a dynamic course catalog, student testimonials with video, and an SEO strategy that brought organic visibility within weeks of launch.",
    gallery: ["/srl-academy.png", "/bg1.png", "/bg2.png"],
    coverImage: "/srl-academy.png",
    liveUrl: "https://srlacademyedu.com/",
  },
  {
    slug: "ak-enterprises",
    src: "/assets/logo/logo-ak.svg",
    title: "A.K. Enterprises, Goa",
    category: "Deep Cleaning & Detailing",
    year: "2024",
    client: "A.K. Enterprises",
    role: "Web Design · Development · Local SEO",
    description: "A professional web presence for Goa's premium deep cleaning and car detailing service, built to convert local searches into booked appointments.",
    challenge: "The client was relying entirely on word-of-mouth and WhatsApp for bookings. They had zero digital footprint in a market where customers increasingly search online before booking cleaning services.",
    solution: "We built a fast, mobile-first website with service breakdowns, before/after galleries, pricing transparency, and a one-tap WhatsApp booking flow — paired with local SEO that put them on the map for key Goa-area searches.",
    gallery: ["/ak-enterprise.png", "/bg3.png", "/bg1.png"],
    coverImage: "/ak-enterprise.png",
    liveUrl: "https://akenterprisesgoa.in/",
  },
  {
    slug: "sukrit-infrastructure",
    src: "/assets/logo/logo-sukrit.avif",
    title: "Sukrit Infrastructure",
    category: "Construction & Infrastructure",
    year: "2024",
    client: "Sukrit Infrastructure",
    role: "Web Development · Social Media · Brand Positioning",
    description: "A commanding digital presence for a construction and infrastructure company, designed to communicate trust, scale, and engineering excellence.",
    challenge: "Sukrit Infrastructure needed to compete for large government and private contracts. Without a professional website or social proof, they were losing bids to competitors who appeared more established online.",
    solution: "We developed a bold, imagery-driven website showcasing completed projects with detailed case studies, an interactive project map, client testimonials, and integrated social media management that built ongoing credibility.",
    gallery: ["/bg2.png", "/bg1.png", "/bg3.png"],
    coverImage: "/bg2.png",
  },
  {
    slug: "nfo-exams",
    src: "/assets/logo/logo-nfo.avif",
    title: "NFO Exams",
    category: "Education Olympiads",
    year: "2024",
    client: "NFO Exams",
    role: "Full-Stack Development · UI/UX Design · Payment Integration",
    description: "A complete digital platform for India's national-level Olympiad examinations — from student registration and exam scheduling to result publishing and certificate generation.",
    challenge: "NFO was managing thousands of Olympiad registrations manually through spreadsheets and email. The process was error-prone, couldn't scale, and offered a poor experience for both students and administrators.",
    solution: "We built a full-stack platform with automated registration flows, Razorpay payment integration, a real-time admin dashboard for exam management, automated result computation, and digital certificate generation — cutting administrative overhead by over 80%.",
    gallery: ["/bg3.png", "/bg2.png", "/bg1.png"],
    coverImage: "/bg3.png",
  },
  {
    slug: "attendify",
    src: "/assets/logo/logo-attendify.png",
    title: "Attendify",
    category: "Mobile App",
    year: "2024",
    client: "Attendify",
    role: "Mobile Development · Backend API · UI Design",
    description: "A smart attendance tracking mobile app that uses geofencing and biometric verification to eliminate proxy attendance in educational institutions.",
    challenge: "Traditional attendance systems — roll calls and manual registers — are slow, inaccurate, and easily gamed. Institutions needed a modern, tamper-proof solution that also provided analytics.",
    solution: "We developed a cross-platform mobile app with GPS-based geofencing, facial recognition check-in, real-time dashboards for faculty, and automated attendance reports — making the entire process touchless and fraud-proof.",
    gallery: ["/portfolio_mobile.png", "/bg1.png", "/bg2.png"],
    coverImage: "/portfolio_mobile.png",
  },
  {
    slug: "nucleon-coaching",
    src: "/assets/logo/logo-nucleon.png",
    title: "Nucleon Coaching Institutes",
    category: "IIT-JEE & NEET Preparation",
    year: "2024",
    client: "Nucleon Coaching Institutes",
    role: "Web Development · Content Strategy · SEO",
    description: "A conversion-focused website for a leading IIT-JEE and NEET coaching institute, built to establish authority and drive student enrollments.",
    challenge: "Nucleon had strong offline results but poor digital discoverability. Competing coaching brands with weaker results but better websites were capturing online leads.",
    solution: "We designed a results-driven website highlighting toppers, faculty profiles, and study material — backed by an aggressive SEO and content strategy that significantly improved their search visibility and enrollment conversion rates.",
    gallery: ["/bg1.png", "/bg3.png", "/bg2.png"],
    coverImage: "/bg1.png",
    liveUrl: "https://nucleongroup.in/",
  },
  {
    slug: "enza-hybrid-seeds",
    src: "/assets/logo/logo-enza.png",
    title: "Enza Hybrid Seeds",
    category: "Agricultural Science",
    year: "2024",
    client: "Enza Hybrid Seeds",
    role: "Web Design · E-commerce · Brand Identity",
    description: "A comprehensive digital platform for an agricultural seed company, making it easy for farmers and distributors to browse, compare, and order hybrid seed varieties online.",
    challenge: "Enza's product catalog was only available in printed brochures. Distributors and farmers had no way to browse varieties, check availability, or place orders digitally — limiting reach to only face-to-face sales.",
    solution: "We created a clean, accessible website with a searchable seed catalog, detailed product pages with growing guides, a distributor locator, and a streamlined order inquiry system — extending Enza's reach far beyond their traditional sales territory.",
    gallery: ["/portfolio_brand.png", "/bg2.png", "/bg3.png"],
    coverImage: "/portfolio_brand.png",
  },
];

export const communityTestimonials = [
  { 
    quote: "growtez helped us build a professional website that truly represents our brand. Their social media management has boosted our online presence and helped us connect with more clients.", 
    name: "Sukrit Infrastructure", 
    role: "Construction Company, Assam",
    logo: "/assets/logo/logo-sukrit.avif"
  },
  { 
    quote: "The team at growtez built us a clean, functional, and easy-to-navigate website. Their work has made our platform more accessible for students, and we’re extremely happy with the results.", 
    name: "NFOExams", 
    role: "Education Platform, Rajasthan",
    logo: "/assets/logo/logo-nfo.avif"
  },
  { 
    quote: "growtez designed and developed our website exactly the way we wanted. The smooth experience and timely delivery showed their professionalism and commitment.", 
    name: "Nucleon Coaching Institute", 
    role: "Education Platform, Kolkata",
    logo: "/assets/logo/logo-nucleon.png"
  },
];

export const webPricingPlans = [
  {
    name: "Starter Pack",
    price: "₹ 10,000",
    desc: "Perfect for small businesses and new startups",
    features: [
      { text: "5–7 page modern responsive website(Mostly Frontend)", included: true },
      { text: "Basic branding kit (logo placement, brand colors, fonts)", included: true },
      { text: "Email & chat support (within 24 hours response)", included: true },
      { text: "3 Months Free Support", included: true },
      { text: "Free SSL & 1 year standard hosting", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "No e-commerce or advanced integrations", included: false },
      { text: "Limited SEO depth (no backlinks or blog strategy)", included: false },
      { text: "No Payment Gateway Setup", included: false },
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Growth Pack",
    price: "₹ 15,000",
    desc: "For businesses ready to grow & sell online",
    features: [
      { text: "10-15 page modern responsive website(with full Backend)", included: true },
      { text: "Custom UI Design on Page Builders", included: true },
      { text: "Admin Dashboard + Blog Setup", included: true },
      { text: "Analytics dashboard (Google Analytics, Search Console, Ads)", included: true },
      { text: "6 Months Support", included: true },
      { text: "Priority support (email + chat, 12-hour response time)", included: true },
      { text: "Hosting + SSL included for 1 year", included: true },
      { text: "Support is not 24/7 (business hours only)", included: false },
      { text: "Limited custom integrations (CRM/ERP need enterprise pack)", included: false },
    ],
    highlighted: true,
    tag: "MOST POPULAR PLAN",
    cta: "Get Started"
  },
  {
    name: "Enterprise Pack",
    price: "Custom Price",
    desc: "For large organizations, corporates, and enterprises that need unlimited scalability & premium support.",
    features: [
      { text: "Completely custom web development (websites, portals, e-commerce)", included: true },
      { text: "Unlimited pages, complex integrations (ERP, CRM, APIs, automation)", included: true },
      { text: "API Development & Integrations", included: true },
      { text: "Dashboard, Analytics, or Custom CMS", included: true },
      { text: "Full-scale SEO (on-page, off-page, global targeting, backlink campaigns, content clusters)", included: true },
      { text: "24/7 premium support (phone, WhatsApp, chat, email)", included: true },
      { text: "Hosting & Domain Guidance", included: true },
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export const appPricingPlans = [
  {
    name: "Starter App",
    price: "₹ 25,000",
    desc: "Simple mobile apps for small businesses",
    features: [
      { text: "Cross-platform app (Android + iOS) using Flutter/React Native", included: true },
      { text: "Simple UI/UX design (modern, responsive layouts)", included: true },
      { text: "Basic API integrations (payment gateway OR third-party API)", included: true },
      { text: "Basic analytics (Firebase/Google Analytics)", included: true },
      { text: "3 Months Support", included: true },
      { text: "Limited backend (basic database only, no scalability)", included: false },
      { text: "No advanced custom features (chat, maps, AI, real-time tracking)", included: false },
      { text: "No Advanced Integrations", included: false },
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Growth App",
    price: "₹ 45,000",
    desc: "Feature-rich apps for growing businesses",
    features: [
      { text: "Fully functional cross-platform app (Android + iOS)", included: true },
      { text: "Custom UI/UX Design", included: true },
      { text: "Advanced features (real-time chat, maps, geolocation)", included: true },
      { text: "Custom backend with database", included: true },
      { text: "6 Months Support", included: true },
      { text: "Integration with third-party APIs (payment, analytics, etc.)", included: true },
      { text: "Complex enterprise-level integrations (ERP/CRM, AI modules, etc. not included)", included: false },
      { text: "Support available only during business hours", included: false },
    ],
    highlighted: true,
    tag: "MOST POPULAR PLAN",
    cta: "Get Started"
  },
  {
    name: "Enterprise App",
    price: "Custom Price",
    desc: "Complex apps with advanced functionality",
    features: [
      { text: "Native iOS + Android + Web App", included: true },
      { text: "Complex Backend Architecture", included: true },
      { text: "Complex features (AI/ML integration, IoT, blockchain, AR/VR, advanced geolocation, real-time tracking, video/audio streaming)", included: true },
      { text: "Robust backend with scalable cloud infrastructure (AWS/Azure/GCP)", included: true },
      { text: "Multi-level admin dashboards + role-based access", included: true },
      { text: "Third-party API Integrations", included: true },
      { text: "DevOps & Security Implementation", included: true },
      { text: "12 Months Support", included: true },
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export const teamMembers = [
  { name: "Shahid Anowar", role: "A creative mind at growtez, always bringing fresh perspectives and smart solutions to the table.", img: "/shahid3.jpg" },
  { name: "Faruk Khan", role: "Blends technical skills with strategic thinking to make every project stand out.", img: "/faruk2.jpeg" },
  { name: "Sanjeev Iqbal Ahmed", role: "A detail-driven team player, turning ideas into polished and impactful digital experiences.", img: "/sanjeev.jpeg" },
  { name: "Sourav Sharma", role: "Combines innovation with adaptability, ensuring every challenge becomes an opportunity.", img: "/sourav.jpeg" },
  { name: "Mridul Roy", role: "Fueled by collaboration and curiosity, constantly pushing growtez towards bigger possibilities.", img: "/mridul.jpg" }
];

export const marqueeTechItems    = ["Next.js","React","Node.js","TypeScript","PostgreSQL","AWS","Figma","Flutter","TensorFlow","Kubernetes"];
export const marqueeServiceItems = ["Web Development","App Development","AI Integration","Brand Identity","Growth Marketing","Digital Strategy"];
