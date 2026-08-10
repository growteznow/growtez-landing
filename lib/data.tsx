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
  { src: "/assets/logo/launching-soon.png", title: "Restaurant SaaS (Coming Soon)", category: "SaaS Product",                  year: "2024" },
  { src: "/assets/logo/logo-srl.png",       title: "SRL Academy",                   category: "Coaching Institute",            year: "2024" },
  { src: "/assets/logo/logo-ak.svg",        title: "A.K. Enterprises, Goa",         category: "Deep Cleaning & Detailing",     year: "2024" },
  { src: "/assets/logo/logo-sukrit.avif",   title: "Sukrit Infrastructure",         category: "Construction & Infrastructure", year: "2024" },
  { src: "/assets/logo/logo-nfo.avif",      title: "NFO Exams",                     category: "Education Olympiads",           year: "2024" },
  { src: "/assets/logo/logo-attendify.png", title: "Attendify",                     category: "Mobile App",                    year: "2024" },
  { src: "/assets/logo/logo-nucleon.png",   title: "Nucleon Coaching Institutes",   category: "IIT-JEE & NEET Preparation",    year: "2024" },
  { src: "/assets/logo/logo-enza.png",      title: "Enza Hybrid Seeds",             category: "Agricultural Science",          year: "2024" },
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
