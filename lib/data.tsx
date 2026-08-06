import {
  Smartphone, Code2, Bot, Palette, BarChart3, Globe,
} from "lucide-react";

export const services = [
  { icon: <Smartphone size={24} />, title: "App Development",  desc: "Native iOS & Android or cross-platform apps built for performance, scalability, and delightful UX.", tag: "Mobile",           large: false },
  { icon: <Code2      size={24} />, title: "Web Development",  desc: "Responsive, blazing-fast websites and web apps tailored precisely to your brand and business goals.", tag: "Frontend · Backend", large: true  },
  { icon: <Bot        size={24} />, title: "AI Integration",   desc: "Custom AI workflows, chatbots, and predictive analytics to supercharge your operational efficiency.", tag: "AI · Automation",   large: false },
  { icon: <Palette    size={24} />, title: "Brand Identity",   desc: "Logos, guidelines, motion assets—every touch point refined into one cohesive brand world.",           tag: "Design",            large: false },
  { icon: <BarChart3  size={24} />, title: "Growth Marketing", desc: "Data-driven campaigns, SEO, and conversion optimisation that measurably grow your revenue.",           tag: "Marketing",         large: false },
  { icon: <Globe      size={24} />, title: "Digital Strategy", desc: "From product roadmap to go-to-market—strategic clarity so every sprint moves the needle.",             tag: "Strategy",          large: false },
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
  { src: "/portfolio_saas.png",   title: "NovaDash",      category: "SaaS Analytics Platform", year: "2025" },
  { src: "/portfolio_mobile.png", title: "Kova Finance",  category: "Mobile Banking App",       year: "2025" },
  { src: "/portfolio_brand.png",  title: "Arkon Studio",  category: "Brand Identity System",    year: "2024" },
];

export const communityTestimonials = [
  { 
    quote: "growtez helped us build a professional website that truly represents our brand. Their social media management has boosted our online presence and helped us connect with more clients.", 
    name: "Sukrit Infrastructure", 
    role: "Construction Company, Assam" 
  },
  { 
    quote: "The team at growtez built us a clean, functional, and easy-to-navigate website. Their work has made our platform more accessible for students, and we’re extremely happy with the results.", 
    name: "NFOExams", 
    role: "Education Platform, Rajasthan" 
  },
  { 
    quote: "growtez designed and developed our website exactly the way we wanted. The smooth experience and timely delivery showed their professionalism and commitment.", 
    name: "Nucleon Coaching Institute", 
    role: "Education Platform, Kolkata" 
  },
];

export const pricingPlans = [
  { name: "Starter",  price: "$2,900",  period: "/ project", desc: "For a focused single product or landing experience.", features: ["1 core deliverable", "2 design revisions", "2-week delivery", "Email support"], highlighted: false },
  { name: "Growth",   price: "$7,500",  period: "/ project", desc: "For teams shipping a full product across web and mobile.", features: ["Web + mobile scope", "Unlimited revisions", "Dedicated project lead", "Priority support", "30-day post-launch care"], highlighted: true },
  { name: "Scale",    price: "Custom",  period: "",          desc: "For ongoing partnerships with AI, brand, and growth work.", features: ["Everything in Growth", "AI integration & automation", "Monthly strategy syncs", "Dedicated Slack channel"], highlighted: false },
];

export const marqueeTechItems    = ["Next.js","React","Node.js","TypeScript","PostgreSQL","AWS","Figma","Flutter","TensorFlow","Kubernetes"];
export const marqueeServiceItems = ["Web Development","App Development","AI Integration","Brand Identity","Growth Marketing","Digital Strategy"];
