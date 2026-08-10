const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const obliqueFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.1, 0.22, 0.45); // Deep Navy #1A3873
  const secondaryColor = rgb(0.12, 0.42, 0.72); // Accent Blue
  const textColor = rgb(0.1, 0.1, 0.15); // Dark Gray/Black
  const mutedColor = rgb(0.35, 0.35, 0.4); // Muted Gray
  const lineDividerColor = rgb(0.2, 0.45, 0.75); // Divider line
  const bgLightGray = rgb(0.95, 0.95, 0.96);

  const pageWidth = 595.28; // A4 width
  const pageHeight = 841.89; // A4 height
  const marginX = 40;
  const contentWidth = pageWidth - marginX * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 40;

  function addNewPage() {
    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    y = pageHeight - 40;
  }

  function checkSpace(heightNeeded) {
    if (y - heightNeeded < 40) {
      addNewPage();
    }
  }

  // Draw Section Title
  function drawSectionTitle(title) {
    checkSpace(35);
    y -= 10;
    currentPage.drawText(title, {
      x: marginX,
      y: y,
      size: 11,
      font: boldFont,
      color: primaryColor,
    });
    y -= 4;
    currentPage.drawLine({
      start: { x: marginX, y: y },
      end: { x: pageWidth - marginX, y: y },
      thickness: 1,
      color: lineDividerColor,
    });
    y -= 14;
  }

  // Draw Wrapped Paragraph
  function drawParagraph(text, fontSize = 9, isBold = false, color = textColor, indent = 0) {
    const fontToUse = isBold ? boldFont : font;
    const words = text.split(" ");
    let line = "";
    const maxWidth = contentWidth - indent;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      const testWidth = fontToUse.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxWidth && line !== "") {
        checkSpace(fontSize + 3);
        currentPage.drawText(line, {
          x: marginX + indent,
          y: y,
          size: fontSize,
          font: fontToUse,
          color: color,
        });
        y -= fontSize + 3.5;
        line = words[i];
      } else {
        line = testLine;
      }
    }

    if (line !== "") {
      checkSpace(fontSize + 3);
      currentPage.drawText(line, {
        x: marginX + indent,
        y: y,
        size: fontSize,
        font: fontToUse,
        color: color,
      });
      y -= fontSize + 3.5;
    }
  }

  // Draw Bullet Point
  function drawBullet(text, fontSize = 8.5) {
    const bulletIndent = 12;
    const maxWidth = contentWidth - bulletIndent;
    const words = text.split(" ");
    let line = "";
    let isFirst = true;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxWidth && line !== "") {
        checkSpace(fontSize + 3.5);
        if (isFirst) {
          currentPage.drawText("•", {
            x: marginX,
            y: y,
            size: fontSize,
            font: boldFont,
            color: textColor,
          });
          currentPage.drawText(line, {
            x: marginX + bulletIndent,
            y: y,
            size: fontSize,
            font: font,
            color: textColor,
          });
          isFirst = false;
        } else {
          currentPage.drawText(line, {
            x: marginX + bulletIndent,
            y: y,
            size: fontSize,
            font: font,
            color: textColor,
          });
        }
        y -= fontSize + 3.5;
        line = words[i];
      } else {
        line = testLine;
      }
    }

    if (line !== "") {
      checkSpace(fontSize + 3.5);
      if (isFirst) {
        currentPage.drawText("•", {
          x: marginX,
          y: y,
          size: fontSize,
          font: boldFont,
          color: textColor,
        });
        currentPage.drawText(line, {
          x: marginX + bulletIndent,
          y: y,
          size: fontSize,
          font: font,
          color: textColor,
        });
      } else {
        currentPage.drawText(line, {
          x: marginX + bulletIndent,
          y: y,
          size: fontSize,
          font: font,
          color: textColor,
        });
      }
      y -= fontSize + 3.5;
    }
    y -= 2;
  }

  // ─── HEADER ────────────────────────────────────────────────
  const name = "AMIT JHA";
  const nameWidth = boldFont.widthOfTextAtSize(name, 22);
  currentPage.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: 22,
    font: boldFont,
    color: primaryColor,
  });
  y -= 18;

  const title = "Senior Frontend-Heavy Full Stack Engineer | React.js • Next.js • TypeScript • AWS • AI Application Developer";
  const titleWidth = boldFont.widthOfTextAtSize(title, 9);
  currentPage.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y: y,
    size: 9,
    font: boldFont,
    color: secondaryColor,
  });
  y -= 15;

  const contact = "Ahmedabad, India  •  amitjha167@gmail.com  •  +91 7046202124  •  amit-portfolio-six.vercel.app";
  const contactWidth = font.widthOfTextAtSize(contact, 8.5);
  currentPage.drawText(contact, {
    x: (pageWidth - contactWidth) / 2,
    y: y,
    size: 8.5,
    font: font,
    color: mutedColor,
  });
  y -= 15;

  // ─── PROFESSIONAL SUMMARY ─────────────────────────────────
  drawSectionTitle("PROFESSIONAL SUMMARY");
  drawParagraph(
    "Full Stack Engineer with 5+ years of experience designing, building, and operating production-grade web applications and distributed systems using React.js, Next.js, Node.js, TypeScript, and Go (basics). Proven track record delivering high performance frontends — animated landing pages, real-time dashboards, SaaS platforms — alongside scalable REST API microservices deployed on AWS (EC2, S3, CloudWatch, Lambda) and cloud infrastructure. Deep expertise in MySQL (schema design, query optimisation, performance tuning), MongoDB, Redis (distributed caching, pub/sub), and Elasticsearch (indexing, search optimisation). Strong foundation in Salesforce platform development — REST API integration, OAuth 2.0 / Named Credentials, Apex triggers, Lightning Web Components (LWC), and custom Salesforce-to-Slack automation for sales and service workflows. Proficient in modern React patterns (Server Components, Server Actions, React Query, Redux Toolkit), Next.js App Router architecture, and full authentication systems (NextAuth, JWT, OAuth 2.0, RBAC). Currently building and shipping AI-powered full-stack applications at GetOnCRM — integrating OpenAI GPT API, local LLMs (Ollama), WhatsApp Business API automation, and Salesforce CRM integrations into production Node.js services. Proficient with AI assisted development tools including Cursor, GitHub Copilot, Claude Code, and ChatGPT — leveraging them daily to accelerate delivery, improve code quality, and maintain high engineering standards. Contributed to 12+ client projects across fintech, real estate, and SaaS verticals — with measurable outcomes including 95+ Lighthouse scores, 30% performance gains, and 25% faster deployment cycles.",
    8.5
  );

  // ─── TECHNICAL SKILLS ──────────────────────────────────────
  drawSectionTitle("TECHNICAL SKILLS");

  const skillsData = [
    ["Frontend", "React.js, Next.js 14/15 (App Router, Pages Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Shadcn/ui, Material UI, Framer Motion, Three.js, React Hook Form, Zod"],
    ["State & Data", "Redux Toolkit, React Query (TanStack Query), Zustand, Context API, SWR, React Server Components, Server Actions"],
    ["Backend", "Node.js, Express.js, Go (Golang basics), REST API Design, WebSockets (Socket.io), GraphQL basics, NextAuth.js, JWT, OAuth 2.0, RBAC, Microservices, Middleware"],
    ["AI & Agents", "OpenAI GPT API (Chat Completions, Function Calling, Embeddings), Ollama (Local LLMs), LangChain, WhatsApp Business API Automation, Slack Bot Development, AI Workflow Orchestration, Prompt Engineering"],
    ["AI Dev Tools", "Cursor, GitHub Copilot, Claude Code, ChatGPT — daily use for code generation, testing, debugging, documentation, and AI-assisted engineering workflows"],
    ["Database", "MySQL (schema design, query optimisation, performance tuning), MongoDB/Mongoose, Elasticsearch (indexing, search, optimisation), PostgreSQL, Prisma ORM, Redis (caching, pub/sub), Firebase"],
    ["AWS & DevOps", "AWS (EC2, S3, Lambda, CloudWatch, RDS, Elastic Beanstalk), Vercel, Render, Docker (basics), GitHub Actions, CI/CD Pipelines, Git, Monorepo (Turborepo)"],
    ["Salesforce", "Salesforce REST API, SOQL, Apex (triggers, classes, batch jobs), Lightning Web Components (LWC), Salesforce Flows, Named Credentials, OAuth 2.0, Connected Apps, Slack-Salesforce Integration (Bolt SDK), Custom Objects & Fields, Reports & Dashboards"],
    ["Payments & APIs", "Stripe (Checkout, Webhooks, Subscriptions), PayPal SDK, REST API Integration, Third-party API Orchestration"],
    ["Testing & Perf", "Jest, React Testing Library, Lighthouse (95+ scores), Web Vitals (LCP, CLS, FID), Code Splitting, Lazy Loading, Image Optimisation"],
  ];

  const col1Width = 110;
  const col2Width = contentWidth - col1Width;

  for (const [category, details] of skillsData) {
    const words = details.split(" ");
    let line = "";
    const lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      if (font.widthOfTextAtSize(testLine, 8) > col2Width - 10) {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);

    const rowHeight = lines.length * 11 + 6;
    checkSpace(rowHeight);

    // Row border/bg box
    currentPage.drawRectangle({
      x: marginX,
      y: y - rowHeight + 4,
      width: col1Width,
      height: rowHeight,
      color: bgLightGray,
      borderColor: rgb(0.85, 0.85, 0.88),
      borderWidth: 0.5,
    });

    currentPage.drawRectangle({
      x: marginX + col1Width,
      y: y - rowHeight + 4,
      width: col2Width,
      height: rowHeight,
      borderColor: rgb(0.85, 0.85, 0.88),
      borderWidth: 0.5,
    });

    // Category
    currentPage.drawText(category, {
      x: marginX + 6,
      y: y - 10,
      size: 8,
      font: boldFont,
      color: primaryColor,
    });

    // Details lines
    let detailY = y - 10;
    for (const l of lines) {
      currentPage.drawText(l, {
        x: marginX + col1Width + 6,
        y: detailY,
        size: 8,
        font: font,
        color: textColor,
      });
      detailY -= 11;
    }

    y -= rowHeight;
  }
  y -= 10;

  // ─── PROFESSIONAL EXPERIENCE ──────────────────────────────
  drawSectionTitle("PROFESSIONAL EXPERIENCE");

  const jobs = [
    {
      title: "Software Engineer — Full Stack & AI Application Developer",
      company: "GetOnCRM Solutions",
      location: "Ahmedabad, India",
      period: "May 2025 – Present",
      bullets: [
        "Architect and deliver full-stack AI-powered web applications using Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Node.js/Express.js backends — building internal tooling, client dashboards, and automation platforms deployed on AWS (EC2, S3, CloudWatch) and Render.",
        "Built and deployed a production AI Agent platform with a visual drag-and-drop workflow builder (React Flow), real-time execution tracing, and OpenAI GPT API integration — enabling non-technical users to design multi-step AI workflows; deployed backend microservices on AWS with auto-scaling and zero-downtime deploys.",
        "Engineered WhatsApp Business API automation platform for Parasteel — integrating OpenAI GPT for AI-powered customer response handling, order status updates, and quotation automation; processing 500+ customer interactions/month with 99% uptime on Node.js/Express.js with MongoDB.",
        "Built Slack-Salesforce integration for sales and service representatives — using Slack Bolt SDK + Salesforce REST API + OpenAI GPT to parse natural-language Slack queries into structured CRM API calls, deliver real-time deal/case notifications in Slack, and reduce context-switching by 40%.",
        "Developed Salesforce platform customisations including Apex triggers, batch jobs, Lightning Web Components (LWC), and Salesforce Flows — automating lead routing, case escalation, and sales pipeline updates; integrated Salesforce Connected Apps with OAuth 2.0 Named Credentials for secure server-to-server API communication.",
        "Built custom SOQL-powered reporting dashboards and Salesforce REST API endpoints consumed by Node.js services — enabling real-time CRM data sync between Salesforce and external client platforms with sub-second response times.",
        "Developed full-stack AI content generation suite integrating OpenAI Chat Completions API and Function Calling — implementing streaming responses via Server-Sent Events (SSE) for real-time output display; engineered local LLM pipelines using Ollama (Llama 3, Mistral) reducing external API costs by 60%.",
        "Built intelligent Slack Bot automation service (Node.js + Slack API + OpenAI GPT) autonomously fetching SEO metrics, running AI-driven analysis, and delivering formatted weekly reports — eliminating 10+ hours/week of manual reporting (90% effort reduction).",
        "Designed scalable REST API backends in Node.js/Express.js with MySQL and MongoDB — including JWT auth middleware, RBAC, rate limiting, and webhook handlers — deployed on AWS with environment-specific configuration and GitHub Actions CI/CD pipelines.",
        "Established frontend architecture standards (component patterns, TypeScript strict-mode configs, custom hook guidelines) across a 3-person engineering team using AI-assisted tools (Cursor, GitHub Copilot) — reducing code review cycles by 35%.",
        "Leveraged AI-assisted development tools (Cursor, Claude Code, ChatGPT) daily for code generation, debugging, documentation, and test coverage — accelerating feature delivery while maintaining high engineering quality standards.",
      ],
    },
    {
      title: "Freelance Full Stack Developer",
      company: "Remote",
      location: "",
      period: "July 2024 – April 2025",
      bullets: [
        "Delivered 12+ production web applications end-to-end for clients across fintech, real estate, and SaaS verticals — using Next.js, React.js, TypeScript, Node.js/Express.js, MySQL, MongoDB, and Tailwind CSS — consistently achieving 95+ Lighthouse scores and sub-2-second load times.",
        "Built full-stack SaaS platforms with complete authentication flows (NextAuth, JWT, OAuth 2.0), multi-tier RBAC systems, team management, and Stripe subscription billing — from MySQL schema design through production deployment on AWS and Vercel.",
        "Developed AI-integrated client tools including a GPT-powered resume builder, automated content creation dashboard, and chatbot-driven lead capture widget — integrating OpenAI API with streaming responses, usage metering, and per-user rate limiting.",
        "Architected RESTful API backends in Node.js/Express.js with MySQL (query optimisation, indexing, aggregation) and Mongoose ODM — including file upload handlers (Multer + Cloudinary) and third-party integrations (Stripe, SendGrid, Twilio).",
        "Built real-time features: live dashboards (Socket.io + Redis pub/sub), real-time notification systems, and collaborative editing prototypes — deploying distributed WebSocket services on AWS with persistent connections and graceful reconnection handling.",
        "Implemented CI/CD pipelines using GitHub Actions for automated testing, lint checks, and zero-downtime deployments to AWS and Vercel — reducing manual deployment effort and enabling confident daily releases; used GitHub Copilot and ChatGPT to accelerate test authoring.",
        "Delivered Salesforce integration projects for clients — building Apex triggers, custom LWC components, and Node.js-to-Salesforce REST API bridges; configured Connected Apps, OAuth 2.0 Named Credentials, and Salesforce Flows to automate business processes end-to-end.",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Remote",
      location: "",
      period: "May 2023 – June 2024",
      bullets: [
        "Engineered investor-facing dashboards and carbon investment management tooling on Next.js, Turborepo Monorepo, and Material UI — serving 500+ active investors with real-time portfolio performance visualisations and market trend analytics.",
        "Implemented React Query (TanStack Query) for server-state management — eliminating redundant API calls, reducing API response times by 25%, and enabling optimistic UI updates for portfolio operations without full page refreshes.",
        "Built shared component library within the Monorepo — reusable data tables, Recharts chart components, filter systems, and form primitives — adopted across 3 product teams, reducing feature development time by 20%.",
        "Implemented secure NextAuth authentication with RBAC, JWT session management, and Stripe subscription integration — supporting 500+ user accounts across Investor, Analyst, and Admin tiers with fine-grained feature gating.",
        "Refactored legacy React codebase — splitting monolithic components into atomic units, eliminating prop-drilling via Context API, adopting TypeScript strict mode — improving rendering performance by 30% and reducing bug reports by 22%.",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Ahmedabad, India",
      location: "",
      period: "Nov 2021 – Jan 2023",
      bullets: [
        "Developed Mogul, a real estate investment platform (React.js, Material UI) with advanced property search filters, interactive maps (Mapbox GL JS), and real-time property valuation API integrations.",
        "Built interactive data visualisations and investment analytics dashboards using Recharts and D3.js — enabling users to compare property performance metrics, track portfolio ROI, and identify market opportunities.",
        "Implemented responsive, accessible component library following WCAG 2.1 standards — delivered 15+ reusable components (modals, data tables, form wizards) adopted across multiple product teams, cutting UI development time by 20%.",
        "Collaborated with backend engineers on REST API integration, error boundary design, and loading state management — reducing user-facing errors by 18% through robust client-side error handling and retry logic.",
      ],
    },
  ];

  for (const job of jobs) {
    checkSpace(24);
    // Role Title (left) & Date (right)
    currentPage.drawText(job.title, {
      x: marginX,
      y: y,
      size: 10,
      font: boldFont,
      color: textColor,
    });

    const dateWidth = obliqueFont.widthOfTextAtSize(job.period, 9);
    currentPage.drawText(job.period, {
      x: pageWidth - marginX - dateWidth,
      y: y,
      size: 9,
      font: obliqueFont,
      color: mutedColor,
    });
    y -= 12;

    if (job.company) {
      currentPage.drawText(job.company, {
        x: marginX,
        y: y,
        size: 9,
        font: obliqueFont,
        color: mutedColor,
      });
      y -= 14;
    }

    for (const b of job.bullets) {
      drawBullet(b);
    }
    y -= 6;
  }

  // ─── MAJOR PROJECTS ────────────────────────────────────────
  drawSectionTitle("MAJOR PROJECTS");

  const projects = [
    {
      name: "WhatsApp Automation Platform — Parasteel",
      stack: "Stack: Node.js, WhatsApp Business API, OpenAI GPT API, MongoDB, Express.js, AWS EC2, Redis",
      bullets: [
        "Built a production WhatsApp automation platform for Parasteel, integrating WhatsApp Business Cloud API with OpenAI GPT — enabling AI-powered handling of customer inquiries, order status lookups, and quotation requests at scale.",
        "Engineered multi-turn conversation flows with session context management stored in MongoDB — maintaining conversation history across messages so the AI assistant delivers contextually accurate, personalised responses.",
        "Implemented real-time webhook handlers in Node.js/Express.js for WhatsApp message events with Redis-backed message queuing, delivery status tracking, and retry logic — processing 500+ customer interactions/month with 99% uptime on AWS EC2.",
        "Built admin dashboard for conversation monitoring, AI response review, and manual override — enabling the sales team to intervene in complex conversations while the AI autonomously handles routine queries, reducing manual response effort by 70%.",
      ],
    },
    {
      name: "Slack-Salesforce Integration — Sales & Service Intelligence",
      stack: "Stack: Node.js, Slack Bolt SDK, Salesforce REST API, Apex, SOQL, LWC, OpenAI GPT API, OAuth 2.0, Named Credentials, MongoDB, AWS",
      bullets: [
        "Designed and built a production Slack-Salesforce integration enabling sales and service reps to query, create, and update CRM records (Leads, Opportunities, Cases, Contacts) directly from Slack using natural-language commands.",
        "Integrated OpenAI GPT API to parse free-text Slack queries into structured Salesforce API calls — allowing reps to type \"show me all open deals from Acme Corp this quarter\" and receive formatted Salesforce data cards in Slack within seconds.",
        "Implemented Salesforce REST API OAuth 2.0 authentication with token refresh handling, Named Credentials management, and role-based CRM data access mirroring existing Salesforce permission sets inside Slack.",
        "Built real-time Salesforce event webhook delivery into Slack channels — notifying teams of deal stage changes, case escalations, and lead assignments with rich message blocks, eliminating context-switching and reducing average response time by 40%.",
      ],
    },
    {
      name: "AgentOS — AI Agent Builder Platform (NexAgeAI)",
      stack: "Stack: Next.js 15, React 19, TypeScript, Tailwind CSS, React Flow, Node.js, MySQL, MongoDB, OpenAI API, Stripe, AWS, Vercel",
      bullets: [
        "Designed and built a full-stack AI Agent Builder SaaS from the ground up — featuring a visual drag-and-drop DAG workflow canvas (React Flow / @xyflow), agent marketplace, credit-based billing, and team management with RBAC — deployed on AWS (backend) and Vercel (frontend).",
        "Built the visual workflow canvas with custom node types (LLM nodes, API call nodes, conditional branching, human-in-the-loop approvals, memory layers), real-time edge connections, workflow state persistence, and execution trace visualisation.",
        "Integrated OpenAI GPT API (Chat Completions, Function Calling, Embeddings) for agent execution — implemented streaming via SSE, token usage tracking per workflow run, and a credit deduction system backed by MySQL transactions.",
        "Developed Node.js/Express.js backend API with JWT authentication, RBAC middleware (Owner/Admin/Member/Viewer), team invitations (SendGrid), and Stripe-powered subscription + usage-based billing with webhook lifecycle management.",
      ],
    },
    {
      name: "Vericap — Carbon Investment Management Platform",
      stack: "Stack: Next.js, Turborepo Monorepo, TypeScript, Material UI, React Query, NextAuth, Stripe, MySQL, REST APIs",
      bullets: [
        "Contributed as Frontend Engineer on a carbon investment SaaS platform — building investor dashboards, portfolio management tools, and carbon credit sourcing interfaces serving 500+ active investors across global markets.",
        "Developed complex data table components with multi-column sorting, server-side pagination, advanced filter panels, and CSV export — handling datasets of 10,000+ investment records with smooth rendering via virtualisation.",
        "Implemented Monorepo shared package structure using Turborepo — separating UI components, API client utilities, TypeScript types, and config packages — enabling zero-duplication code sharing between investor portal and internal admin panel.",
      ],
    },
  ];

  for (const proj of projects) {
    checkSpace(24);
    currentPage.drawText(proj.name, {
      x: marginX,
      y: y,
      size: 9.5,
      font: boldFont,
      color: textColor,
    });
    y -= 12;

    currentPage.drawText(proj.stack, {
      x: marginX,
      y: y,
      size: 8,
      font: obliqueFont,
      color: mutedColor,
    });
    y -= 12;

    for (const b of proj.bullets) {
      drawBullet(b);
    }
    y -= 6;
  }

  // ─── EDUCATION ──────────────────────────────────────────────
  drawSectionTitle("EDUCATION");

  checkSpace(24);
  currentPage.drawText("Bachelor of Engineering in Computer Engineering", {
    x: marginX,
    y: y,
    size: 10,
    font: boldFont,
    color: textColor,
  });

  const eduDateWidth = obliqueFont.widthOfTextAtSize("Aug 2016 – Nov 2020", 9);
  currentPage.drawText("Aug 2016 – Nov 2020", {
    x: pageWidth - marginX - eduDateWidth,
    y: y,
    size: 9,
    font: obliqueFont,
    color: mutedColor,
  });
  y -= 12;

  currentPage.drawText("Ahmedabad, India", {
    x: marginX,
    y: y,
    size: 9,
    font: obliqueFont,
    color: mutedColor,
  });

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, "../public/AmitJha.pdf");
  const targetPath2 = path.join(__dirname, "../public/Amit_Jha_Resume.pdf");
  const targetPath3 = path.join(__dirname, "../public/Amit_Jha_Resume_GoDaddy.pdf");

  fs.writeFileSync(targetPath, pdfBytes);
  fs.writeFileSync(targetPath2, pdfBytes);
  fs.writeFileSync(targetPath3, pdfBytes);
  console.log(`PDF successfully generated at: ${targetPath3}`);
}

generatePDF().catch(console.error);
