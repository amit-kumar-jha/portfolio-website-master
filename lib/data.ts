/* ═══════════════════════════════════════════════════════════
   DATA — All portfolio content sourced from Amit Jha's resume
   ═══════════════════════════════════════════════════════════ */

// ─── Navigation ────────────────────────────────────────────
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "AI", href: "#ai" },
  { name: "Contact", href: "#contact" },
] as const;

// ─── Personal Info ─────────────────────────────────────────
export const personalInfo = {
  name: "Amit Jha",
  title: "Full Stack Engineer & AI Application Developer",
  email: "amitjha167@gmail.com",
  phone: "+91 7046202124",
  location: "Ahmedabad, India",
  linkedin: "https://www.linkedin.com/in/amit-kumar-jha-00405a185/",
  github: "https://github.com/amit-kumar-jha",
  website: "amit-portfolio-six.vercel.app",
  resumeUrl: "/Amit_Jha_Resume_GoDaddy.pdf",
} as const;

// ─── Hero Section ──────────────────────────────────────────
export const heroData = {
  headline: ["Building AI Systems", "That Think,", "Scale,", "and Deliver."],
  subtitle:
    "Full Stack Engineer with 5+ years building production-grade AI-powered applications, enterprise SaaS platforms, and scalable cloud infrastructure. Shipping intelligent systems that create measurable business impact.",
  roles: [
    "Full Stack Engineer",
    "AI Application Developer",
    "AI Agent Builder",
    "Product Engineer",
    "System Architect",
  ],
} as const;

// ─── About Section ─────────────────────────────────────────
export const aboutData = {
  headline: "The Engineer Behind the Code",
  summary: [
    "Full Stack Engineer with 5+ years of experience designing, building, and operating production-grade web applications and distributed systems using React.js, Next.js, Node.js, TypeScript, and Go.",
    "Proven track record delivering high-performance frontends — animated landing pages, real-time dashboards, SaaS platforms — alongside scalable REST API microservices deployed on AWS (EC2, S3, CloudWatch, Lambda) and cloud infrastructure.",
    "Currently building and shipping AI-powered full-stack applications at GetOnCRM — integrating OpenAI GPT API, local LLMs (Ollama), WhatsApp Business API automation, and Salesforce CRM integrations into production Node.js services.",
  ],
  philosophy: [
    {
      title: "Ship Production-Grade",
      description: "Every system I build is designed for production — scalable, tested, monitored, and deployed with CI/CD pipelines.",
    },
    {
      title: "Engineer for Scale",
      description: "From database schema design to microservice architecture, I think in systems that handle real-world traffic and complexity.",
    },
    {
      title: "AI-First Thinking",
      description: "I integrate AI at the core — from GPT-powered automation to local LLM pipelines — building intelligence into every product.",
    },
  ],
  education: {
    degree: "Bachelor of Engineering in Computer Science",
    location: "Ahmedabad, India",
    period: "Aug 2016 – Nov 2020",
  },
} as const;

// ─── Experience Section ────────────────────────────────────
export const experienceData = [
  {
    id: "getoncrm",
    company: "GetOnCRM Solutions",
    role: "Software Engineer — Full Stack & AI Application Developer",
    location: "Ahmedabad, India",
    period: "May 2025 – Present",
    type: "Full-time",
    description:
      "Architect and deliver full-stack AI-powered web applications using Next.js 15, React 19, TypeScript, and Node.js/Express.js backends — building internal tooling, client dashboards, and automation platforms deployed on AWS.",
    achievements: [
      "Built and deployed a production AI Agent platform with a visual drag-and-drop workflow builder (React Flow), real-time execution tracing, and OpenAI GPT API integration — enabling non-technical users to design multi-step AI workflows",
      "Engineered WhatsApp Business API automation platform for Parasteel — integrating OpenAI GPT for AI-powered customer response handling, order status updates, and quotation automation; processing 500+ customer interactions/month",
      "Built Slack-Salesforce integration for sales and service reps — using Slack Bolt SDK + Salesforce REST API + OpenAI GPT to parse natural-language Slack queries into structured CRM API calls, reducing context-switching by 40%",
      "Developed full-stack AI content generation suite integrating OpenAI Chat Completions API and Function Calling — implementing streaming responses via SSE; engineered local LLM pipelines using Ollama reducing external API costs by 60%",
      "Built intelligent Slack Bot automation service autonomously fetching SEO metrics, running AI-driven analysis, and delivering formatted weekly reports — eliminating 10+ hours/week of manual reporting (90% effort reduction)",
    ],
    techStack: [
      "Next.js 15", "React 19", "TypeScript", "Node.js", "Express.js",
      "OpenAI API", "Ollama", "MongoDB", "MySQL", "Redis",
      "AWS", "Salesforce", "Slack SDK", "WhatsApp API",
    ],
    metrics: [
      { value: "500+", label: "Monthly AI Interactions" },
      { value: "60%", label: "API Cost Reduction" },
      { value: "40%", label: "Less Context Switching" },
      { value: "90%", label: "Reporting Automation" },
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Full Stack Developer",
    location: "Remote",
    period: "Jul 2024 – Apr 2025",
    type: "Freelance",
    description:
      "Delivered 12+ production web applications end-to-end for clients across fintech, real estate, and SaaS verticals — consistently achieving 95+ Lighthouse scores and sub-2-second load times.",
    achievements: [
      "Built full-stack SaaS platforms with complete authentication flows (NextAuth, JWT, OAuth 2.0), multi-tier RBAC systems, team management, and Stripe subscription billing — from MySQL schema design through production deployment on AWS and Vercel",
      "Developed AI-integrated client tools including a GPT-powered resume builder, automated content creation dashboard, and chatbot-driven lead capture widget — integrating OpenAI API with streaming responses, usage metering, and per-user rate limiting",
      "Architected RESTful API backends in Node.js/Express.js with MySQL query optimisation, indexing, aggregation and Mongoose ODM — including file upload handlers and third-party integrations (Stripe, SendGrid, Twilio)",
      "Built real-time features: live dashboards (Socket.io + Redis pub/sub), real-time notification systems, and collaborative editing prototypes — deploying distributed WebSocket services on AWS",
      "Delivered Salesforce integration projects — building Apex triggers, custom LWC components, and Node.js-to-Salesforce REST API bridges; configured Connected Apps, OAuth 2.0 Named Credentials, and Salesforce Flows",
    ],
    techStack: [
      "Next.js", "React", "TypeScript", "Node.js", "Express.js",
      "MySQL", "MongoDB", "Redis", "Socket.io", "Stripe",
      "AWS", "Vercel", "NextAuth", "Salesforce",
    ],
    metrics: [
      { value: "12+", label: "Production Apps" },
      { value: "95+", label: "Lighthouse Score" },
      { value: "25%", label: "Faster Deployment" },
      { value: "30%", label: "Performance Gains" },
    ],
  },
  {
    id: "frontend-carbon",
    company: "Carbon Investment Platform",
    role: "Frontend Engineer",
    location: "Remote",
    period: "May 2023 – Jun 2024",
    type: "Full-time",
    description:
      "Engineered investor-facing dashboards and carbon investment management tooling on Next.js, Turborepo Monorepo, and Material UI — serving 500+ active investors with real-time portfolio performance visualisations.",
    achievements: [
      "Implemented React Query (TanStack Query) for server-state management — eliminating redundant API calls, reducing API response times by 25%, and enabling optimistic UI updates for portfolio operations",
      "Built shared component library within the Monorepo — reusable data tables, Recharts chart components, filter systems, and form primitives — adopted across 3 product teams, reducing feature development time by 20%",
      "Implemented secure NextAuth authentication with RBAC, JWT session management, and Stripe subscription integration — supporting 500+ user accounts across Investor, Analyst, and Admin tiers",
      "Refactored legacy React codebase — splitting monolithic components into atomic units, eliminating prop-drilling via Context API, adopting TypeScript strict mode — improving rendering performance by 30% and reducing bug reports by 22%",
    ],
    techStack: [
      "Next.js", "TypeScript", "Material UI", "React Query",
      "Turborepo", "Recharts", "NextAuth", "Stripe", "MySQL",
    ],
    metrics: [
      { value: "500+", label: "Active Investors" },
      { value: "25%", label: "Faster API Response" },
      { value: "20%", label: "Dev Time Reduction" },
      { value: "30%", label: "Performance Gain" },
    ],
  },
  {
    id: "frontend-realestate",
    company: "Real Estate Investment Platform",
    role: "Frontend Engineer",
    location: "Ahmedabad, India",
    period: "Nov 2021 – Jan 2023",
    type: "Full-time",
    description:
      "Developed Mogul, a real estate investment platform with advanced property search filters, interactive maps (Mapbox GL JS), and real-time property valuation API integrations.",
    achievements: [
      "Built interactive data visualisations and investment analytics dashboards using Recharts and D3.js — enabling users to compare property performance metrics, track portfolio ROI, and identify market opportunities",
      "Implemented responsive, accessible component library following WCAG 2.1 standards — delivered 15+ reusable components adopted across multiple product teams, cutting UI development time by 20%",
      "Collaborated with backend engineers on REST API integration, error boundary design, and loading state management — reducing user-facing errors by 18% through robust client-side error handling and retry logic",
    ],
    techStack: [
      "React.js", "Material UI", "Mapbox GL JS", "D3.js",
      "Recharts", "REST APIs", "WCAG 2.1",
    ],
    metrics: [
      { value: "15+", label: "Reusable Components" },
      { value: "20%", label: "Dev Time Savings" },
      { value: "18%", label: "Error Reduction" },
    ],
  },
] as const;

// ─── Projects Section ──────────────────────────────────────
export const projectsData = [
  {
    id: "agentos",
    title: "AgentOS — AI Agent Builder Platform",
    subtitle: "NexAgeAI",
    description:
      "Designed and built a full-stack AI Agent Builder SaaS from the ground up — featuring a visual drag-and-drop DAG workflow canvas, agent marketplace, credit-based billing, and team management with RBAC — deployed on AWS (backend) and Vercel (frontend).",
    longDescription: [
      "Built the visual workflow canvas with custom node types (LLM nodes, API call nodes, conditional branching, human-in-the-loop approvals, memory layers), real-time edge connections, workflow state persistence, and execution trace visualisation.",
      "Integrated OpenAI GPT API (Chat Completions, Function Calling, Embeddings) for agent execution — implemented streaming via SSE, token usage tracking per workflow run, and a credit deduction system backed by MySQL transactions.",
      "Developed Node.js/Express.js backend API with JWT authentication, RBAC middleware, team invitations (SendGrid), and Stripe-powered subscription + usage-based billing with webhook lifecycle management.",
    ],
    techStack: [
      "Next.js 15", "React 19", "TypeScript", "React Flow",
      "Node.js", "Express.js", "MySQL", "MongoDB",
      "OpenAI API", "Stripe", "AWS", "Vercel",
    ],
    category: "AI Platform",
    gradient: "from-blue-500/20 to-purple-500/20",
    accentColor: "#3B82F6",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation Platform",
    subtitle: "Parasteel",
    description:
      "Built a production WhatsApp automation platform integrating WhatsApp Business Cloud API with OpenAI GPT — enabling AI-powered handling of customer inquiries, order status lookups, and quotation requests at scale.",
    longDescription: [
      "Engineered multi-turn conversation flows with session context management stored in MongoDB — maintaining conversation history across messages so the AI assistant delivers contextually accurate, personalised responses.",
      "Implemented real-time webhook handlers in Node.js/Express.js for WhatsApp message events with Redis-backed message queuing, delivery status tracking, and retry logic — processing 500+ customer interactions/month with 99% uptime on AWS EC2.",
      "Built admin dashboard for conversation monitoring, AI response review, and manual override — enabling the sales team to intervene in complex conversations while the AI autonomously handles routine queries, reducing manual effort by 70%.",
    ],
    techStack: [
      "Node.js", "Express.js", "WhatsApp Business API",
      "OpenAI GPT", "MongoDB", "Redis", "AWS EC2",
    ],
    category: "AI Automation",
    gradient: "from-green-500/20 to-emerald-500/20",
    accentColor: "#22C55E",
  },
  {
    id: "slack-salesforce",
    title: "Slack-Salesforce Integration",
    subtitle: "Sales & Service Intelligence",
    description:
      "Designed and built a production Slack-Salesforce integration enabling sales and service reps to query, create, and update CRM records directly from Slack using natural-language commands.",
    longDescription: [
      "Integrated OpenAI GPT API to parse free-text Slack queries into structured Salesforce API calls — allowing reps to type 'show me all open deals from Acme Corp this quarter' and receive formatted Salesforce data cards in Slack within seconds.",
      "Implemented Salesforce REST API OAuth 2.0 authentication with token refresh handling, Named Credentials management, and role-based CRM data access mirroring existing Salesforce permission sets inside Slack.",
      "Built real-time Salesforce event webhook delivery into Slack channels — notifying teams of deal stage changes, case escalations, and lead assignments with rich message blocks, reducing average response time by 40%.",
    ],
    techStack: [
      "Node.js", "Slack Bolt SDK", "Salesforce REST API",
      "Apex", "SOQL", "OpenAI GPT", "OAuth 2.0",
      "LWC", "MongoDB", "AWS",
    ],
    category: "Enterprise Integration",
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "#8B5CF6",
  },
  {
    id: "vericap",
    title: "Vericap — Carbon Investment Platform",
    subtitle: "Investment Management",
    description:
      "Contributed as Frontend Engineer on a carbon investment SaaS platform — building investor dashboards, portfolio management tools, and carbon credit sourcing interfaces serving 500+ active investors across global markets.",
    longDescription: [
      "Developed complex data table components with multi-column sorting, server-side pagination, advanced filter panels, and CSV export — handling datasets of 10,000+ investment records with smooth rendering via virtualisation.",
      "Implemented Monorepo shared package structure using Turborepo — separating UI components, API client utilities, TypeScript types, and config packages — enabling zero-duplication code sharing between investor portal and internal admin panel.",
    ],
    techStack: [
      "Next.js", "TypeScript", "Material UI", "React Query",
      "Turborepo", "NextAuth", "Stripe", "MySQL", "REST APIs",
    ],
    category: "FinTech SaaS",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "#06B6D4",
  },
  {
    id: "ai-content",
    title: "AI Content Generation Suite",
    subtitle: "LLM Pipeline Engineering",
    description:
      "Developed full-stack AI content generation suite integrating OpenAI Chat Completions API and Function Calling — implementing streaming responses via Server-Sent Events for real-time output display.",
    longDescription: [
      "Engineered local LLM pipelines using Ollama (Llama 3, Mistral) reducing external API costs by 60% while maintaining response quality for production use cases.",
      "Built GPT-powered resume builder, automated content creation dashboard, and chatbot-driven lead capture widget with streaming responses, usage metering, and per-user rate limiting.",
    ],
    techStack: [
      "Node.js", "OpenAI API", "Ollama", "Llama 3",
      "Mistral", "SSE", "React", "MongoDB",
    ],
    category: "AI Engineering",
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "#F59E0B",
  },
  {
    id: "mogul",
    title: "Mogul — Real Estate Platform",
    subtitle: "Investment Analytics",
    description:
      "Developed a real estate investment platform with advanced property search filters, interactive maps (Mapbox GL JS), and real-time property valuation API integrations.",
    longDescription: [
      "Built interactive data visualisations and investment analytics dashboards using Recharts and D3.js — enabling users to compare property performance metrics, track portfolio ROI, and identify market opportunities.",
      "Implemented responsive, accessible component library following WCAG 2.1 standards — delivered 15+ reusable components adopted across multiple product teams, cutting UI development time by 20%.",
    ],
    techStack: [
      "React.js", "Material UI", "Mapbox GL JS",
      "D3.js", "Recharts", "REST APIs",
    ],
    category: "PropTech",
    gradient: "from-rose-500/20 to-red-500/20",
    accentColor: "#EF4444",
  },
] as const;

// ─── Skills Section ────────────────────────────────────────
export type SkillCategory = {
  name: string;
  color: string;
  skills: string[];
};

export const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    color: "#3B82F6",
    skills: [
      "React.js", "Next.js 14/15", "TypeScript", "JavaScript (ES6+)",
      "Tailwind CSS", "Material UI", "Framer Motion", "Three.js",
      "Shadcn/ui", "React Hook Form", "Zod",
    ],
  },
  {
    name: "State & Data",
    color: "#8B5CF6",
    skills: [
      "Redux Toolkit", "React Query (TanStack)", "Zustand",
      "Context API", "SWR", "Server Components", "Server Actions",
    ],
  },
  {
    name: "Backend",
    color: "#06B6D4",
    skills: [
      "Node.js", "Express.js", "Go (Golang)", "REST API Design",
      "GraphQL", "WebSockets (Socket.io)", "JWT", "OAuth 2.0",
      "RBAC", "Microservices", "Middleware",
    ],
  },
  {
    name: "AI & Agents",
    color: "#22C55E",
    skills: [
      "OpenAI GPT API", "Function Calling", "Embeddings",
      "Ollama (Local LLMs)", "LangChain", "Prompt Engineering",
      "WhatsApp AI Automation", "Slack Bot Development",
      "AI Workflow Orchestration",
    ],
  },
  {
    name: "Database",
    color: "#F59E0B",
    skills: [
      "MySQL", "MongoDB/Mongoose", "PostgreSQL",
      "Redis (Caching, Pub/Sub)", "Elasticsearch",
      "Prisma ORM", "Firebase",
    ],
  },
  {
    name: "Cloud & DevOps",
    color: "#EF4444",
    skills: [
      "AWS (EC2, S3, Lambda, CloudWatch, RDS)",
      "Vercel", "Docker", "GitHub Actions",
      "CI/CD Pipelines", "Git", "Monorepo (Turborepo)",
    ],
  },
  {
    name: "Platform",
    color: "#EC4899",
    skills: [
      "Salesforce REST API", "SOQL", "Apex",
      "Lightning Web Components (LWC)", "Salesforce Flows",
      "Named Credentials", "Connected Apps",
      "Slack-Salesforce Integration",
    ],
  },
  {
    name: "Payments & APIs",
    color: "#14B8A6",
    skills: [
      "Stripe (Checkout, Webhooks, Subscriptions)",
      "PayPal SDK", "REST API Integration",
      "Third-party API Orchestration",
    ],
  },
];

// ─── AI Engineering Section ────────────────────────────────
export const aiCapabilities = [
  {
    title: "LLM Integration",
    description: "OpenAI GPT API (Chat Completions, Function Calling, Embeddings), Claude, and local models via Ollama (Llama 3, Mistral).",
    icon: "brain",
  },
  {
    title: "AI Agent Systems",
    description: "Multi-agent workflow orchestration with visual DAG builder, execution tracing, conditional branching, and human-in-the-loop approvals.",
    icon: "agent",
  },
  {
    title: "RAG & Embeddings",
    description: "Retrieval-Augmented Generation pipelines with vector search, document embeddings, and context-aware responses.",
    icon: "search",
  },
  {
    title: "Prompt Engineering",
    description: "Production prompt design for structured outputs, chain-of-thought reasoning, and reliable AI-powered automation.",
    icon: "code",
  },
  {
    title: "WhatsApp AI",
    description: "WhatsApp Business API automation with multi-turn conversations, session context, Redis queuing, and AI-powered responses.",
    icon: "message",
  },
  {
    title: "Slack AI Bots",
    description: "Intelligent Slack bots with NLP-to-API translation, CRM integration, automated reporting, and real-time notifications.",
    icon: "bot",
  },
  {
    title: "Streaming & SSE",
    description: "Server-Sent Events for real-time LLM output streaming, token tracking, and progressive response rendering.",
    icon: "stream",
  },
  {
    title: "Workflow Automation",
    description: "End-to-end AI workflow pipelines — from data ingestion to intelligent processing, human review, and automated delivery.",
    icon: "workflow",
  },
] as const;

// ─── Stats Section ─────────────────────────────────────────
export const statsData = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "+", label: "Production Projects" },
  { value: 500, suffix: "+", label: "Monthly AI Automations" },
  { value: 95, suffix: "+", label: "Lighthouse Score" },
  { value: 99, suffix: "%", label: "Production Uptime" },
  { value: 40, suffix: "%", label: "Avg Efficiency Gain" },
] as const;

// ─── Architecture Section ──────────────────────────────────
export const architectureNodes = [
  { id: "client", label: "Next.js Client", category: "frontend", x: 50, y: 20 },
  { id: "api", label: "API Gateway", category: "backend", x: 50, y: 40 },
  { id: "auth", label: "Auth (JWT/OAuth)", category: "backend", x: 20, y: 40 },
  { id: "services", label: "Microservices", category: "backend", x: 80, y: 40 },
  { id: "ai", label: "AI Services", category: "ai", x: 20, y: 60 },
  { id: "db", label: "Databases", category: "database", x: 50, y: 60 },
  { id: "cache", label: "Redis Cache", category: "database", x: 80, y: 60 },
  { id: "cloud", label: "AWS Cloud", category: "cloud", x: 50, y: 80 },
  { id: "webhooks", label: "Webhooks", category: "integration", x: 20, y: 80 },
  { id: "cicd", label: "CI/CD", category: "devops", x: 80, y: 80 },
] as const;
