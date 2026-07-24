export type ResumeStat = {
  value: string;
  label: string;
  detail: string;
};

export const resumeStats: ResumeStat[] = [
  {
    value: "21+",
    label: "Years Experience",
    detail: "building enterprise SaaS, AI-enabled platforms, and data products",
  },
  {
    value: "$7M+",
    label: "P&L Owned",
    detail: "full revenue, pricing, and contract accountability across two enterprise accounts",
  },
  {
    value: "$1.1M+",
    label: "ARR Influenced",
    detail: "cited as a competitive differentiator across ~65 enterprise retail and e-commerce opportunities",
  },
];

export const resumeIntro: string[] = [
  "My career has been built on bringing business clarity to technical ambiguity — with customer data as the common thread running through two decades of enterprise SaaS, AI-enabled platforms, and data products.",
  "For 21 years I've turned ambiguous opportunities into commercially successful products that drive revenue growth, operational efficiency, and organizational change. Most recently, I architected and institutionalized an AI-powered product operating model that reshaped requirements, customer research, documentation, planning, and engineering handoffs across the software development lifecycle.",
  "Along the way I've carried full P&L accountability for a $7M+ book of business, built and led technical teams, and stayed hands-on with the underlying data platforms and architecture — a blend of commercial ownership, people leadership, and technical fluency that's rare at the Principal level.",
];

export type ResumeRole = {
  period: string;
  company: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const resumeExperience: ResumeRole[] = [
  {
    period: "Aug 2022 – Present",
    company: "Acoustic, L.P.",
    title: "Principal Product Manager",
    summary:
      "Leading platform and product strategy across three product domains, combining hands-on AI-native product operations with 0→1 platform and data product delivery.",
    bullets: [
      "Independently conceived, built, and shipped Acoustic's first executive mobile app (0→1, solo build) — React Native/TypeScript, Okta auth, LaunchDarkly rollout, DataDog observability — grown from an unofficial innovation effort into an executive-sponsored strategic investment.",
      "Conceived and led 0→1 strategy for Product Catalog, a competitive differentiator within the Connect CDP cited across ~$1.1M closed-won ARR and ~$950K active pipeline over ~65 retail and e-commerce opportunities.",
      "Designed and institutionalized an AI-native product operating system of reusable Claude Code skills, MCP integrations, and agentic workflows — adopted across Product and folded into the standard PM workflow, cutting PRD authoring from weeks to days.",
      "Defined the product and migration strategy for replacing Astronomer-based orchestration with Snowflake-native scheduling and data workflows, reducing platform dependency and eliminating approximately $200K in annual vendor cost.",
      "Led the product strategy for a shared customer-intelligence data foundation spanning Snowflake analytics and MongoDB-backed real-time services, aligning ingestion, behavioral data, audience workflows, and product-facing use cases across multiple squads.",
      "Established Snowflake cost-governance requirements using workload tagging, cost attribution, and usage dashboards, giving product and engineering teams visibility into consumption and a basis for identifying optimization opportunities.",
      "Productized a manual, single-owner monthly billing process by reconciling internal usage telemetry with Twilio and Karix messaging data, codifying calculation and exception rules, and creating SharePoint-backed audit history for Finance — reducing key-person risk and improving billing traceability.",
    ],
  },
  {
    period: "2018 – 2022",
    company: "Merkle Inc.",
    title: "Senior Manager, Solution Management — Retail Vertical",
    summary:
      "Owned full P&L for a $7M+ book of business across two enterprise retail and automotive clients.",
    bullets: [
      "Full P&L accountability — revenue forecasting, pricing, contract renewals, resource planning, executive relationships — sustaining the highest-margin accounts in the vertical (65% and 72%).",
      "Led CCPA and GDPR compliance, re-engineering solution components and ways of working to bring both clients into regulatory compliance ahead of enforcement.",
    ],
  },
  {
    period: "2013 – 2018",
    company: "Merkle Inc.",
    title: "Director, Specialty Retail Platform — BSA Capability",
    summary: "Built and led the retail Business Systems Analyst capability from the ground up.",
    bullets: [
      "Hired, coached, and managed performance and career development for 9 direct reports, establishing operating models that improved consistency and scalability across the BSA organization.",
      "Created the BSA Implementation Toolkit and Client Solution Summary — a standardized methodology adopted vertical-wide that reduced implementation risk and became the authoritative reference for new client builds.",
    ],
  },
  {
    period: "2010 – 2013",
    company: "Merkle Inc.",
    title: "Director, Deployment / Database Production & Planning Manager",
    summary: "Led portfolio delivery and operational governance across concurrent CRM database deployments.",
    bullets: [
      "Stewarded platform stability and production governance for 30+ enterprise clients through resource planning and cross-functional coordination.",
    ],
  },
  {
    period: "2008 – 2010",
    company: "Acxiom Corporation",
    title: "Global Sales Engineer III",
    summary: "Consultative product and solution advisor to sales teams across Acxiom's marketing platforms.",
    bullets: [
      "Led demos, POCs, and technical presentations, and authored RFP content as SME on MarketEdge-X, Impact-X, and Dynamic Messenger.",
      "Built a solution-training program contributing to $2.4M in FY09 recognized revenue, earning Acxiom's \"Rock Star\" Award.",
    ],
  },
  {
    period: "2005 – 2008",
    company: "Acxiom Corporation",
    title: "Decision Support Analyst III — Delivery Center",
    summary: "Center of Excellence SME across campaign management and business intelligence.",
    bullets: [
      "Drove campaign development and analysis on Acxiom's Explorer tool and built Business Objects XIr2 BI environments for retail banks.",
      "Supported RFPs, POCs, and enterprise implementations.",
    ],
  },
];

export const resumeEducation: string[] = [
  "MBA, University of Arkansas at Little Rock (GPA 3.8/4.0)",
  "B.S. Computer Information Science, Williams Baptist College (Magna Cum Laude, GPA 3.8/4.0)",
];

export const resumeRecognition: string[] = [
  "Acxiom \"Rock Star\" Award (FY09)",
  "Merkle Digital Professional",
  "Governor's Cup & Phi Beta Lambda competition judge (10+ yrs)",
];
