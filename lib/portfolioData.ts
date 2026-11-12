export interface VentureItem {
  id: string;
  title: string;
  url?: string;
  category: 'commercial' | 'civic-ai';
  tagline: string;
  description: string;
  role: string;
  badge: string;
  fundingOrAward?: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai' | 'fullstack' | 'realtime';
  proof: string;
  description: string;
  outcome: string;
  role: string;
  tags: string[];
  demoUrl?: string;
  architecture: string[];
  keyResults: string[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  category: 'gov_global' | 'awards' | 'industry' | 'research' | 'credits';
  issueDate: string;
  badgeText: string;
  description: string;
  skills: string[];
  grantAmount?: string;
  credentialType?: 'grant' | 'award' | 'badge' | 'paper' | 'certificate';
}

export interface SkillGroup {
  id: string;
  title: string;
  items: { name: string; highlight?: string }[];
}

export const PORTFOLIO_PROFILE = {
  name: 'Ronak Talaviya',
  handle: 'Ronak501',
  headline: 'Full-Stack Developer, AI Agent Architect & Founder @ Ornitech.in',
  location: 'Surat, Gujarat, India',
  education: {
    institution: 'Sarvajanik College of Engineering & Technology (SCET), Surat',
    degree: 'B.Tech in Computer Engineering',
    year: '4th Year (Final Year)',
  },
  email: 'ronaktalaviya51@gmail.com',
  resumeUrl: '/Ronak.pdf',
  links: {
    website: 'https://ronak501.github.io',
    github: 'https://github.com/Ronak501',
    linkedin: 'https://www.linkedin.com/in/ronak-talaviya-b65483281/',
    x: 'https://x.com/ronak_51',
    instagram: 'https://www.instagram.com/_ronak_51/',
    ornitech: 'https://ornitech.in',
  },
  summary:
    'Founder of Ornitech.in building production full-stack systems, autonomous AI agent pipelines, and computer vision models. Secured ₹4.37L+ in government & technology grants, ₹1.5L in Sarvam AI credits, and $32.5K+ in cloud infrastructure credits (IACON, Google Cloud, MongoDB Atlas). Finalist/winner across NASA Space Apps, ISRO Bharatiya Antariksh Hackathon, and Rotary Surat Innovation Challenge.',
  stats: [
    { label: 'Cloud Infrastructure Credits', value: '$32.5K+', detail: 'IACON ($30K), Google Cloud ($2K), MongoDB ($500)' },
    { label: 'Grants & AI Credits', value: '₹5.87L+', detail: '₹2.87L SSIP Govt Grants + ₹1.5L Techsodh Grant + ₹1.5L Sarvam AI' },
    { label: 'Rotary Surat Innovation Challenge', value: '2nd Prize', detail: 'BolnaSeekho.in Speech AI Platform' },
    { label: 'Verified Credentials', value: '25+', detail: 'Google Cloud, Microsoft, ISRO, NASA, Tata, Flipkart, Adobe' },
  ],
};

export const VENTURES: VentureItem[] = [
  {
    id: 'ornitech',
    title: 'Ornitech.in',
    url: 'https://ornitech.in',
    category: 'commercial',
    tagline: 'Technology Innovation & Bespoke Software Engineering',
    description:
      'Primary venture as Founder. Architects scalable full-stack web applications, custom enterprise platforms, intelligent automations, and modern cloud infrastructures.',
    role: 'Founder & Lead System Architect',
    badge: 'Founder / Active',
    tags: ['Founder', 'Next.js', 'FastAPI', 'AI Architecture', 'Cloud Ops'],
  },
  {
    id: 'techsodh',
    title: 'Techsodh.in',
    url: 'https://techsodh.in',
    category: 'commercial',
    tagline: 'Tech Discovery, Research & Software Ecosystem Insights',
    description:
      'Curated platform dedicated to in-depth research, tech discovery, and engineering benchmarks across modern developer stacks, AI frameworks, and emerging tools.',
    role: 'Creator & Tech Lead',
    badge: 'Building · ₹1.5L Funded',
    fundingOrAward: '₹1,50,000 Technology Initiative Grant',
    tags: ['₹1.5L Grant', 'Tech Research', 'Discovery', 'Software Reviews', 'Ecosystem'],
  },
  {
    id: 'myentrypass',
    title: 'MyEntryPass.in',
    url: 'https://myentrypass.in',
    category: 'commercial',
    tagline: 'Next-Gen Digital Ticketing & Live QR Access Management',
    description:
      'Seamless event ticketing and access control infrastructure with dynamic fraud-proof QR credentials, instant gate scanning, and live organizer analytics.',
    role: 'Product Architect & Full-Stack Lead',
    badge: 'Building',
    tags: ['Digital Ticketing', 'QR Verification', 'Real-time Gates', 'FinTech'],
  },
  {
    id: 'shapentic',
    title: 'Shapentic.com',
    url: 'https://shapentic.com',
    category: 'commercial',
    tagline: 'Creative Product Studio & Digital Design Experiences',
    description:
      'Modern digital studio crafting high-converting brand platforms, bespoke user interfaces, and interactive web products designed to scale from zero to one.',
    role: 'Co-Creator & Frontend Architect',
    badge: 'Building',
    tags: ['Product Studio', 'UI/UX Design', 'Next.js', 'Creative Web'],
  },
  {
    id: 'bolnaseekho',
    title: 'BolnaSeekho.in',
    url: 'https://bolnaseekho.in',
    category: 'commercial',
    tagline: 'Interactive Speech, Communication & Language Learning Platform',
    description:
      'AI-powered verbal communication and public speaking training ecosystem building conversational confidence, pronunciation accuracy, and expressive fluency.',
    role: 'Creator & Lead Architect',
    badge: 'Building · ₹1.5L Sarvam AI',
    fundingOrAward: '2nd Prize Rotary Surat Innovation Challenge · ₹1.5 Lakh Sarvam AI Credits',
    tags: ['Rotary Surat 2nd Prize', '₹1.5L Sarvam AI Credits', 'Speech AI', 'Language Learning', 'EdTech'],
  },
  {
    id: 'swachh-sense-venture',
    title: 'Swachh Sense',
    category: 'civic-ai',
    tagline: 'AI Cleanliness Monitoring & IoT Waste Detection',
    description:
      'Computer vision system monitoring waste accumulation in public spaces and triggering municipal sanitation dispatches.',
    role: 'Edge AI detection & sensor telemetry',
    badge: '₹1,37,000 Govt Grant',
    fundingOrAward: '₹1,37,000 SSIP Govt Grant Approved',
    tags: ['SSIP ₹1.37L', 'Computer Vision', 'IoT Sensors', 'Smart City'],
  },
  {
    id: 'vision-sentinel-venture',
    title: 'Vision Sentinel',
    category: 'civic-ai',
    tagline: 'AI-Powered Anomaly & Threat Surveillance',
    description:
      'Intelligent video analytics platform utilizing Google Vision for real-time facility security and crowd anomaly detection.',
    role: 'Google Vision API & dispatcher pipeline',
    badge: '₹90,000 Govt Grant',
    fundingOrAward: '₹90,000 SSIP Govt Grant Approved',
    tags: ['SSIP ₹90K', 'Google Vision AI', 'Real-time', 'Security'],
  },
  {
    id: 'transit-guard-venture',
    title: 'Transit Guard',
    category: 'civic-ai',
    tagline: 'YOLOv8 Edge Passenger Counting & Transport Analytics',
    description:
      'Computer vision system using YOLOv8 for passenger flow tracking, overcrowding detection, and transit capacity metrics.',
    role: 'YOLOv8 edge object tracking',
    badge: '₹60,000 Govt Grant',
    fundingOrAward: '₹60,000 Govt Grant Approved · 96% counting precision',
    tags: ['₹60K Govt Grant', 'YOLOv8', 'Edge AI', 'Public Transit'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'swachh-sense',
    title: 'Swachh Sense',
    category: 'ai',
    proof: '₹1,37,000 SSIP Govt Prototype Grant',
    description:
      'AI-driven municipal cleanliness monitoring and IoT waste detection platform. Analyzes CCTV and edge camera feeds to detect urban waste overflow and automatically dispatches sanitation teams with GPS coordinates.',
    outcome:
      'Awarded ₹1,37,000 SSIP Gujarat prototype grant; automated civic waste detection and dispatch routing.',
    role: 'Lead AI & IoT Systems Architect',
    tags: ['SSIP ₹1.37L Grant', 'Computer Vision', 'IoT Sensors', 'FastAPI', 'Smart City'],
    architecture: [
      'Edge computer vision pipeline detecting waste accumulation severity and bin fill levels from camera streams',
      'IoT ultrasonic and weight telemetry fused with FastAPI ingestion microservices',
      'Automated municipal alert engine dispatching geotagged tickets to nearest sanitation crews',
    ],
    keyResults: [
      'Approved for ₹1,37,000 SSIP Gujarat Government Prototype Grant',
      'Real-time waste classification and severity scoring across multi-camera streams',
      'Automated ticket routing reduces manual inspection overhead for civic authorities',
    ],
  },
  {
    id: 'vision-sentinel',
    title: 'Vision Sentinel',
    category: 'ai',
    proof: '₹90,000 SSIP Govt Prototype Grant',
    description:
      'Intelligent video surveillance and anomaly detection platform utilizing computer vision to identify unauthorized perimeter breaches, crowd anomalies, and safety hazards in real time.',
    outcome:
      'Awarded ₹90,000 SSIP Gujarat prototype grant for automated real-time threat and anomaly surveillance.',
    role: 'Computer Vision & Backend Lead',
    tags: ['SSIP ₹90K Grant', 'Google Vision AI', 'Real-Time Alerts', 'Python', 'Security'],
    architecture: [
      'Low-latency frame sampling and object/anomaly classification using Google Vision and custom CV detectors',
      'Event-driven alert dispatcher pushing instant incident snapshots and bounding-box metadata to operators',
      'Configurable zone rules and audit trail logging for industrial and campus security compliance',
    ],
    keyResults: [
      'Approved for ₹90,000 SSIP Gujarat Government Prototype Grant',
      'Sub-second anomaly flagging with automated visual evidence capture',
      'Reduces operator monitoring fatigue across multi-stream surveillance setups',
    ],
  },
  {
    id: 'transit-guard',
    title: 'Transit Guard',
    category: 'realtime',
    proof: '₹60,000 Govt Grant · 96% Counting Precision',
    description:
      'YOLOv8 edge computer vision system for public transport passenger flow tracking, boarding/alighting counts, overcrowding detection, and live fleet capacity telemetry.',
    outcome:
      'Awarded ₹60,000 prototype grant; achieved 96% passenger counting precision in edge transit evaluations.',
    role: 'Edge AI & Vision Pipeline Architect',
    tags: ['₹60K Govt Grant', 'YOLOv8', 'Edge AI', 'WebSockets', 'Public Transit'],
    architecture: [
      'YOLOv8 object detection paired with centroid/ByteTrack multi-object tracking across doorway regions-of-interest',
      'Directional line-crossing vector logic distinguishing boarding vs. alighting passengers under occlusion',
      'Real-time WebSocket telemetry streaming live occupancy percentages to central transit dashboards',
    ],
    keyResults: [
      'Awarded ₹60,000 Government Prototype Grant',
      '96% counting precision validated across crowded doorway entry/exit scenarios',
      'Live overcrowding alerts support dynamic fleet dispatch decisions',
    ],
  },
  {
    id: 'nasa-space-apps',
    title: 'Planetary & Earth Telemetry Explorer',
    category: 'ai',
    proof: 'NASA Space Apps Global Hackathon Winner & Finalist',
    description:
      'Interactive Earth observation and planetary data intelligence platform built for the NASA Space Apps Challenge, fusing open satellite datasets with AI anomaly modeling and visual telemetry.',
    outcome:
      'Recognized at NASA Space Apps Challenge (2024 & 2025) for rapid geospatial prototyping and scientific visualization.',
    role: 'Team Lead & Full-Stack AI Engineer',
    tags: ['NASA Space Apps', 'Satellite Data', 'Geospatial AI', 'Next.js', 'Python'],
    architecture: [
      'Automated data ingestion normalizing NASA open APIs and geospatial raster/vector layers',
      'AI-assisted pattern recognition highlighting environmental anomalies and temporal changes',
      'Interactive web visualization dashboard with timeline scrubbing and coordinate telemetry inspection',
    ],
    keyResults: [
      'NASA Space Apps Challenge Winner & Finalist across 2024 and 2025 cohorts',
      'Transforms complex satellite datasets into an intuitive, low-latency browser interface',
    ],
  },
  {
    id: 'isro-antariksh',
    title: 'ISRO Geospatial Payload Analytics',
    category: 'realtime',
    proof: 'ISRO Bharatiya Antariksh Hackathon Finalist',
    description:
      'Geospatial intelligence and automated remote-sensing image analysis pipeline engineered for the ISRO Bharatiya Antariksh Hackathon, processing high-resolution satellite imagery and payload telemetry.',
    outcome:
      'Selected as National Finalist in the ISRO Bharatiya Antariksh Hackathon (September 2025).',
    role: 'Geospatial AI & Backend Architect',
    tags: ['ISRO Finalist', 'Remote Sensing', 'Computer Vision', 'FastAPI', 'Telemetry'],
    architecture: [
      'Tile-based satellite image preprocessing and multi-scale computer vision segmentation',
      'FastAPI asynchronous processing queue for high-throughput payload telemetry decoding',
      'Structured geospatial metadata output compatible with standard GIS workflows',
    ],
    keyResults: [
      'National Finalist in ISRO Bharatiya Antariksh Hackathon 2025',
      'High-throughput tile segmentation pipeline designed for rapid terrain analysis',
    ],
  },
  {
    id: 'profile-and-task-suite',
    title: 'Profile Analyzer & Real-Time Task Suite',
    category: 'fullstack',
    proof: 'Open-Source Full-Stack & Real-Time Systems',
    description:
      'Production-ready open-source full-stack systems: an AI-assisted Social Media Profile Analyzer built with FastAPI + React, and a collaborative real-time Task Management platform powered by WebSockets and Docker.',
    outcome:
      'Shipped containerized full-stack architectures demonstrating clean REST/WebSocket APIs and responsive UI state sync.',
    role: 'Full-Stack Creator & Maintainer',
    tags: ['React', 'Next.js', 'FastAPI', 'WebSockets', 'Docker', 'TypeScript'],
    demoUrl: 'https://github.com/Ronak501/profile-analyzer',
    architecture: [
      'FastAPI REST & asynchronous analytics engine paired with a responsive React/TypeScript frontend',
      'Bi-directional WebSocket state synchronization for instant multi-user task board updates',
      'Multi-container Docker Compose orchestration for reproducible one-command deployment',
    ],
    keyResults: [
      'Publicly available open-source repositories on GitHub (@Ronak501)',
      'Demonstrates end-to-end TypeScript + Python full-stack engineering with Docker',
    ],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'rotary-surat',
    title: '2nd Prize Winner — Innovation Challenge',
    issuer: 'Rotary Club of Surat',
    category: 'awards',
    issueDate: 'October 2026',
    badgeText: '2nd Prize Winner',
    grantAmount: '₹1.5L AI Credits',
    credentialType: 'award',
    description:
      'Awarded 2nd Prize for the innovation and pitch of BolnaSeekho.in, an interactive verbal communication and speech learning platform. Won ₹1,50,000 (₹1.5 Lakh) model credits from Sarvam AI.',
    skills: ['Speech AI', 'Pitch Presentation', 'Language EdTech', 'Product Architecture'],
  },
  {
    id: 'ssip-swachhsense',
    title: '₹1,37,000 Govt Prototype Grant — Swachh Sense',
    issuer: 'SSIP Gujarat (Student Startup & Innovation Policy)',
    category: 'gov_global',
    issueDate: 'August 2025',
    badgeText: '₹1,37,000 Govt Funded',
    grantAmount: '₹1,37,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,37,000 government prototype grant under SSIP Gujarat for Swachh Sense: an AI-driven smart city cleanliness monitoring and IoT-integrated automated municipal waste dispatch system.',
    skills: ['SSIP ₹1,37,000 Grant', 'Computer Vision', 'IoT Edge', 'Smart Cities', 'Municipal AI'],
  },
  {
    id: 'ssip-visionsentinel',
    title: '₹90,000 Govt Prototype Grant — Vision Sentinel',
    issuer: 'SSIP Gujarat (Student Startup & Innovation Policy)',
    category: 'gov_global',
    issueDate: 'August 2025',
    badgeText: '₹90,000 Govt Funded',
    grantAmount: '₹90,000',
    credentialType: 'grant',
    description:
      'Awarded ₹90,000 government prototype grant under SSIP Gujarat for Vision Sentinel: an intelligent surveillance and real-time computer vision security anomaly detection platform.',
    skills: ['SSIP ₹90,000 Grant', 'Computer Vision', 'Google Vision AI', 'Real-time Telemetry'],
  },
  {
    id: 'ssip-trabitguard',
    title: '₹60,000 Govt Prototype Grant — Transit Guard',
    issuer: 'SSIP Gujarat & Govt Innovation Council',
    category: 'gov_global',
    issueDate: '2025',
    badgeText: '₹60,000 Govt Funded',
    grantAmount: '₹60,000',
    credentialType: 'grant',
    description:
      'Awarded ₹60,000 prototype funding for Transit Guard: a YOLOv8-powered edge computer vision system for public transit passenger flow tracking and overcrowding analytics.',
    skills: ['₹60,000 Govt Grant', 'YOLOv8', 'Edge AI', 'Public Transit', 'Transport Analytics'],
  },
  {
    id: 'nasa-space-apps',
    title: 'Global Hackathon Winner & Finalist',
    issuer: 'NASA Space Apps Challenge',
    category: 'gov_global',
    issueDate: '2024 & 2025',
    badgeText: 'NASA Global Hackathon',
    credentialType: 'award',
    description:
      'Competed in NASA Space Apps Challenge solving planetary and Earth observation challenges using open satellite datasets, AI models, and real-time telemetry processing.',
    skills: ['Satellite Telemetry', 'AI Modeling', 'Planetary Data', 'Rapid Prototyping'],
  },
  {
    id: 'isro-hackathon',
    title: 'Bharatiya Antariksh Hackathon Finalist',
    issuer: 'ISRO (Indian Space Research Organisation)',
    category: 'gov_global',
    issueDate: 'September 2025',
    badgeText: 'ISRO Space Hackathon',
    credentialType: 'award',
    description:
      'Participated in ISRO national space hackathon designing automated geospatial intelligence algorithms and payload telemetry processors.',
    skills: ['Geospatial AI', 'Payload Telemetry', 'Computer Vision', 'Remote Sensing'],
  },
  {
    id: 'google-vertex-ai',
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    category: 'industry',
    issueDate: 'December 2025',
    badgeText: 'Google Cloud Skill Badge',
    credentialType: 'badge',
    description:
      'Demonstrated expertise in multimodal prompt engineering, few-shot tuning, parameter optimization, and grounding on Google Cloud Vertex AI.',
    skills: ['Vertex AI', 'Prompt Engineering', 'Gemini Models', 'Generative AI'],
  },
  {
    id: 'google-firebase',
    title: 'Develop Serverless Apps with Firebase',
    issuer: 'Google Cloud',
    category: 'industry',
    issueDate: 'December 2025',
    badgeText: 'Google Cloud Skill Badge',
    credentialType: 'badge',
    description:
      'Architecting resilient serverless workflows using Cloud Functions, Firestore real-time synchronization, and automated Firebase Security Rules.',
    skills: ['Firebase', 'Cloud Functions', 'Firestore', 'Serverless Architecture'],
  },
  {
    id: 'microsoft-github-copilot',
    title: 'Developer Use Cases for AI with GitHub Copilot',
    issuer: 'Microsoft & GitHub',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Microsoft AI Specialization',
    credentialType: 'badge',
    description:
      'Certified in AI-assisted developer workflows: prompt synthesis, automated unit test generation, code scanning, and responsible AI guardrails.',
    skills: ['GitHub Copilot', 'Prompt Synthesis', 'AI Test Generation', 'Code Security'],
  },
  {
    id: 'genai-exchange',
    title: 'Gen-AI Exchange National Hackathon',
    issuer: 'Google Cloud & Hack2Skill',
    category: 'awards',
    issueDate: '2025',
    badgeText: 'Gen-AI Hackathon',
    credentialType: 'award',
    description:
      'Engineered and demonstrated production GenAI agent systems leveraging Foundation Models, vector embeddings, and autonomous retrieval loops.',
    skills: ['Generative AI', 'Agent Workflows', 'Multimodal LLMs', 'Hack2Skill'],
  },
  {
    id: 'agentic-ai-cert',
    title: 'Agentic AI Architecture & Implementation Specialist',
    issuer: 'Hack2Skill & Industry Mentors',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Agentic AI Certified',
    credentialType: 'certificate',
    description:
      'Specialized certification in autonomous multi-agent systems, function calling orchestration, and self-healing error recovery loops.',
    skills: ['Agentic AI', 'Multi-Agent Systems', 'Tool Calling', 'LLM Guardrails'],
  },
  {
    id: 'iit-mandi',
    title: 'National Hackathon & Tech Competition',
    issuer: 'IIT Mandi',
    category: 'awards',
    issueDate: 'May 2026',
    badgeText: 'IIT Mandi Credential',
    credentialType: 'award',
    description:
      'Competed in national level engineering and coding challenges at IIT Mandi, building scalable full-stack algorithmic systems under strict deadlines.',
    skills: ['Algorithms', 'Full Stack', 'Competitive Engineering', 'System Design'],
  },
  {
    id: 'hack-baroda',
    title: 'Vadodara National Hackathon (HackBaroda)',
    issuer: 'Baroda Hackathon Tech Council',
    category: 'awards',
    issueDate: '2025',
    badgeText: 'HackBaroda Finalist',
    credentialType: 'award',
    description:
      'Competed at HackBaroda national hackathon, developing civic tech and real-time algorithmic solutions under a high-intensity 36-hour sprint.',
    skills: ['Civic AI', 'Rapid Prototyping', 'Real-time Web', 'Team Leadership'],
  },
  {
    id: 'ppsu-hackathon',
    title: 'PPSU National Innovation Hackathon',
    issuer: 'P. P. Savani University (PPSU)',
    category: 'awards',
    issueDate: '2025',
    badgeText: 'Innovation Finalist',
    credentialType: 'award',
    description:
      'Developed end-to-end intelligent engineering prototypes and demonstrated technical architecture at PPSU national hackathon.',
    skills: ['System Design', 'Full Stack Development', 'AI Prototyping', 'PPSU Tech'],
  },
  {
    id: 'gsolution-cert',
    title: 'Enterprise Tech & Engineering Solutions Certification',
    issuer: 'G-Solutions',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Verified Industry Credential',
    credentialType: 'certificate',
    description:
      'Industry credential validating scalable application architectures, secure database integration, and production deployment standards.',
    skills: ['Enterprise Engineering', 'System Architecture', 'Backend APIs', 'Quality Assurance'],
  },
  {
    id: 'oep-research-agent',
    title: 'Open Ended Project (OEP) — Autonomous Research Agent',
    issuer: 'SCET Computer Engineering Academic Council',
    category: 'research',
    issueDate: '2025 - 2026',
    badgeText: 'Academic Research Honors',
    credentialType: 'paper',
    description:
      'Awarded top academic honours for engineering an autonomous multi-source scientific research agent featuring citation verification and RAG architecture.',
    skills: ['Research Agents', 'Academic Project', 'RAG & NLP', 'Vector Search'],
  },
  {
    id: 'tmc-task-management',
    title: 'Enterprise Task Management System — Professional Internship',
    issuer: 'TMC Consultancy & SCET Project',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Enterprise Deployment',
    credentialType: 'certificate',
    description:
      'Engineered and deployed a full-scale corporate task management and operational workflow system, automating internal milestones and team tracking.',
    skills: ['Task Management', 'Internal Tooling', 'Enterprise Web', 'Operational Automation'],
  },
  {
    id: 'whatsapp-automation-generator',
    title: 'Automated Certificate Generator & WhatsApp Bulk Automation',
    issuer: 'Commercial Client & Event Solutions',
    category: 'industry',
    issueDate: '2025',
    badgeText: 'Client Production System',
    credentialType: 'certificate',
    description:
      'Engineered high-throughput automated certificate generation pipeline integrated with bulk WhatsApp messaging API for event credentials dispatch.',
    skills: ['Bulk Automation', 'Certificate Generation', 'WhatsApp API', 'High Throughput'],
  },
  {
    id: 'iiit-devheat',
    title: 'Dev Heat National Hackathon Nomination',
    issuer: 'IIIT (Indian Institute of Information Technology)',
    category: 'awards',
    issueDate: '2025',
    badgeText: 'IIIT Finalist',
    credentialType: 'award',
    description:
      'Nominated finalist in Dev Heat hackathon organized by IIIT for developing high-impact civic software solutions.',
    skills: ['Civic Tech', 'Real-time Web', 'Microservices', 'FastAPI'],
  },
  {
    id: 'tata-certification',
    title: 'Data & Technology Systems Certification',
    issuer: 'Tata Group',
    category: 'industry',
    issueDate: 'May 2025',
    badgeText: 'Enterprise Certification',
    credentialType: 'certificate',
    description:
      'Industry-recognized program evaluating architectural patterns, enterprise data flows, and secure business application development.',
    skills: ['Enterprise Systems', 'Data Pipelines', 'Architecture', 'Best Practices'],
  },
  {
    id: 'flipkart-grid',
    title: 'Engineering & Innovation Challenge',
    issuer: 'Flipkart',
    category: 'industry',
    issueDate: 'May 2025',
    badgeText: 'E-Commerce Tech',
    credentialType: 'certificate',
    description:
      'Engineered high-throughput consumer web architecture and supply chain intelligence prototypes for Flipkart technical benchmarks.',
    skills: ['Scalable Systems', 'E-Commerce Stacks', 'High Throughput', 'Next.js'],
  },
  {
    id: 'adobe-creative',
    title: 'Digital Systems & Design Certification',
    issuer: 'Adobe',
    category: 'industry',
    issueDate: 'December 2025',
    badgeText: 'Creative & UI Tech',
    credentialType: 'certificate',
    description:
      'Specialized certification in digital design systems, vector asset workflows, and user-centric interactive product prototypes.',
    skills: ['Design Systems', 'UI/UX', 'Vector Workflows', 'Creative Tech'],
  },
  {
    id: 'mcp-server-paper',
    title: 'Model Context Protocol (MCP) Server Architecture',
    issuer: 'Independent Research & SCET',
    category: 'research',
    issueDate: '2026',
    badgeText: 'Research Paper',
    credentialType: 'paper',
    description:
      'Authored in-depth technical paper detailing multi-tool agent orchestration, JSON-RPC streaming, and low-latency sandboxed context delivery.',
    skills: ['MCP Servers', 'Agent Tool Calling', 'Protocol Architecture', 'LLM Context'],
  },
  {
    id: 'research-agent-paper',
    title: 'Autonomous Multi-Source Literature Synthesizer',
    issuer: 'Independent Research & SCET',
    category: 'research',
    issueDate: '2026',
    badgeText: 'Research Paper',
    credentialType: 'paper',
    description:
      'Published architectural blueprint for multi-hop scientific literature retrieval agents with automated citation verification and hallucination guards.',
    skills: ['Autonomous Agents', 'Vector Embeddings', 'Semantic Synthesis', 'NLP'],
  },
  {
    id: 'IACON-cloud-credits',
    title: '$30,000 Cloud Infrastructure Grant — IACON',
    issuer: 'IACON Global Portfolio',
    category: 'credits',
    issueDate: '2025',
    badgeText: '$30,000 Portfolio Grant',
    grantAmount: '$30,000 USD',
    credentialType: 'grant',
    description:
      'Awarded $30,000 in IACON portfolio cloud infrastructure credits to support scalable cloud computing, distributed database hosting, and high-throughput application deployment.',
    skills: ['IACON Grant', '$30,000 Grant', 'Cloud Infrastructure', 'Hosting & Compute', 'Enterprise Infrastructure'],
  },
  {
    id: 'google-cloud-credits',
    title: '$2,000 Google Cloud Platform AI & Compute Grant',
    issuer: 'Google Cloud Platform',
    category: 'credits',
    issueDate: '2025',
    badgeText: '$2,000 Google Cloud Grant',
    grantAmount: '$2,000 USD',
    credentialType: 'grant',
    description:
      'Received $2,000 in Google Cloud credits to power machine learning model inference, high-performance computing, and scalable full-stack application development.',
    skills: ['Google Cloud', '$2,000 Grant', 'Vertex AI', 'Compute Engine', 'Cloud Run'],
  },
  {
    id: 'mongodb-credits',
    title: '$500 MongoDB Atlas Database Grant',
    issuer: 'MongoDB Atlas',
    category: 'credits',
    issueDate: '2025',
    badgeText: '$500 MongoDB Grant',
    grantAmount: '$500 USD',
    credentialType: 'grant',
    description:
      'Awarded $500 MongoDB Atlas credits for production-ready document database clusters, aggregation pipelines, and high-availability database architectures.',
    skills: ['MongoDB Atlas', '$500 Grant', 'NoSQL Architecture', 'Database Clusters'],
  },
  {
    id: 'sarvam-ai-grant',
    title: '₹1.5 Lakh Sarvam AI Speech & GenAI Model Credits — BolnaSeekho',
    issuer: 'Sarvam AI (Indic GenAI Foundation Models)',
    category: 'credits',
    issueDate: '2025',
    badgeText: '₹1.5 Lakh AI Credits',
    grantAmount: '₹1,50,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,50,000 (₹1.5 Lakh) in Sarvam AI platform credits and speech model APIs to power BolnaSeekho.in with real-time voice intelligence, Indic language modeling, and conversational speech rehabilitation.',
    skills: ['Sarvam AI', '₹1.5 Lakh Credits', 'Speech-to-Text', 'Indic GenAI', 'BolnaSeekho.in'],
  },
  {
    id: 'techsodh-grant',
    title: '₹1,50,000 Technology Initiative Grant — TechSodh',
    issuer: 'Technology & Startup Initiative',
    category: 'credits',
    issueDate: '2025',
    badgeText: '₹1,50,000 Venture Grant',
    grantAmount: '₹1,50,000',
    credentialType: 'grant',
    description:
      'Awarded ₹1,50,000 development funding for TechSodh.in to support technology infrastructure, automated curation algorithms, and product growth.',
    skills: ['TechSodh.in', '₹1,50,000 Grant', 'Platform Architecture', 'Product Scaling'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'code',
    title: 'Code & Full-Stack',
    items: [
      { name: 'Next.js' },
      { name: 'React Native' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Tailwind CSS' },
      { name: 'Python' },
      { name: 'React.js' },
      { name: 'HTML5 & CSS3' },
      { name: 'FastAPI' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'WebSockets & Real-Time' },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX & Product Craft',
    items: [
      { name: 'Figma' },
      { name: 'Framer Motion' },
      { name: 'Design Systems' },
      { name: 'Responsive Architecture' },
      { name: 'Web Audio & Canvas' },
      { name: 'Accessibility (WCAG)' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Computer Vision',
    items: [
      { name: 'YOLOv8' },
      { name: 'OpenAI / Gemini' },
      { name: 'Sarvam AI', highlight: '₹1.5 Lakh Credits' },
      { name: 'Google Vision' },
      { name: 'n8n Automation' },
      { name: 'NLP & Agents' },
    ],
  },
  {
    id: 'databases_cloud',
    title: 'Databases & Cloud DevOps',
    items: [
      { name: 'IACON', highlight: '$30,000 Credits' },
      { name: 'Google Cloud', highlight: '$2,000 Credits' },
      { name: 'MongoDB', highlight: '$500 Credits' },
      { name: 'Firebase & Firestore' },
      { name: 'Docker' },
      { name: 'Linux / Bash' },
      { name: 'Vercel' },
      { name: 'WebSockets' },
    ],
  },
];

export type DatasetId =
  | 'profile'
  | 'ventures'
  | 'projects'
  | 'grants'
  | 'credentials'
  | 'skills'
  | 'full';

export interface ExtractedDataset {
  datasetId: DatasetId;
  title: string;
  summary: string;
  columns: string[];
  rows: Record<string, string>[];
  json: string;
  csv: string;
  markdown: string;
}

function escapeCsvCell(value: string): string {
  const safe = value.replace(/\r?\n/g, ' ').trim();
  if (/[",]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

function toCsv(columns: string[], rows: Record<string, string>[]): string {
  const header = columns.map(escapeCsvCell).join(',');
  const lines = rows.map((row) => columns.map((col) => escapeCsvCell(row[col] ?? '')).join(','));
  return [header, ...lines].join('\n');
}

function toMarkdownTable(title: string, summary: string, columns: string[], rows: Record<string, string>[]): string {
  const header = `| ${columns.join(' | ')} |`;
  const divider = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${columns.map((c) => (row[c] ?? '').replace(/\|/g, '\\|')).join(' | ')} |`);
  return `# ${title}\n\n${summary}\n\n${header}\n${divider}\n${body.join('\n')}`;
}

export function extractPortfolioDataset(datasetId: DatasetId, filterQuery?: string): ExtractedDataset {
  const q = (filterQuery || '').trim().toLowerCase();
  const matchesFilter = (haystack: string) => !q || haystack.toLowerCase().includes(q);

  if (datasetId === 'ventures') {
    const items = VENTURES.filter((v) =>
      matchesFilter(`${v.title} ${v.tagline} ${v.description} ${v.category} ${v.tags.join(' ')}`)
    );
    const list = items.length > 0 ? items : VENTURES;
    const columns = ['Title', 'Category', 'Role', 'Badge', 'Funding / Award', 'URL', 'Summary'];
    const rows = list.map((v) => ({
      Title: v.title,
      Category: v.category === 'commercial' ? 'Startup Venture' : 'Civic AI System',
      Role: v.role,
      Badge: v.badge,
      'Funding / Award': v.fundingOrAward || '—',
      URL: v.url || '—',
      Summary: v.tagline,
    }));
    const title = 'Ronak Talaviya — Ventures & Startups';
    const summary = `${list.length} active commercial ventures and grant-funded civic AI systems.`;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(list, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  if (datasetId === 'projects') {
    const items = PROJECTS.filter((p) =>
      matchesFilter(`${p.title} ${p.category} ${p.description} ${p.proof} ${p.tags.join(' ')}`)
    );
    const list = items.length > 0 ? items : PROJECTS;
    const columns = ['Title', 'Category', 'Role', 'Proof / Recognition', 'Outcome', 'Stack Tags'];
    const rows = list.map((p) => ({
      Title: p.title,
      Category: p.category.toUpperCase(),
      Role: p.role,
      'Proof / Recognition': p.proof,
      Outcome: p.outcome,
      'Stack Tags': p.tags.join(', '),
    }));
    const title = 'Ronak Talaviya — Featured Projects & Case Studies';
    const summary = `${list.length} shipped AI, real-time, and full-stack engineering case studies.`;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(list, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  if (datasetId === 'grants') {
    const grantItems = CREDENTIALS.filter(
      (c) =>
        (c.credentialType === 'grant' || Boolean(c.grantAmount)) &&
        matchesFilter(`${c.title} ${c.issuer} ${c.grantAmount || ''} ${c.description}`)
    );
    const list = grantItems.length > 0 ? grantItems : CREDENTIALS.filter((c) => c.credentialType === 'grant' || Boolean(c.grantAmount));
    const columns = ['Title', 'Issuer', 'Amount', 'Year', 'Type'];
    const rows = list.map((c) => ({
      Title: c.title,
      Issuer: c.issuer,
      Amount: c.grantAmount || c.badgeText,
      Year: c.issueDate,
      Type: c.credentialType || 'grant',
    }));
    const title = 'Ronak Talaviya — Grants, Awards & Cloud Credits';
    const summary = `${list.length} verified funding awards totaling ₹5.87L+ INR grants/AI credits and $32.5K USD cloud credits.`;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(list, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  if (datasetId === 'credentials') {
    const items = CREDENTIALS.filter((c) =>
      matchesFilter(`${c.title} ${c.issuer} ${c.category} ${c.description} ${c.skills.join(' ')}`)
    );
    const list = items.length > 0 ? items : CREDENTIALS;
    const columns = ['Title', 'Issuer', 'Category', 'Date', 'Badge', 'Skills'];
    const rows = list.map((c) => ({
      Title: c.title,
      Issuer: c.issuer,
      Category: c.category,
      Date: c.issueDate,
      Badge: c.badgeText,
      Skills: c.skills.join(', '),
    }));
    const title = 'Ronak Talaviya — Certifications, Awards & Research Papers';
    const summary = `${list.length} verified credentials spanning government grants, NASA/ISRO hackathons, Google Cloud/Microsoft badges, and research papers.`;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(list, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  if (datasetId === 'skills') {
    const flat = SKILL_GROUPS.flatMap((g) =>
      g.items.map((item) => ({
        Category: g.title,
        Skill: item.name,
        Highlight: item.highlight || 'Production Stack',
      }))
    ).filter((r) => matchesFilter(`${r.Category} ${r.Skill} ${r.Highlight}`));
    const rows = flat.length > 0 ? flat : SKILL_GROUPS.flatMap((g) => g.items.map((i) => ({ Category: g.title, Skill: i.name, Highlight: i.highlight || 'Production Stack' })));
    const columns = ['Category', 'Skill', 'Highlight'];
    const title = 'Ronak Talaviya — Technical Stack & Skills';
    const summary = `${rows.length} technical skills across Full-Stack, UI/UX, AI/Computer Vision, and Cloud DevOps.`;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(SKILL_GROUPS, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  if (datasetId === 'profile') {
    const columns = ['Field', 'Value'];
    const rows = [
      { Field: 'Name', Value: PORTFOLIO_PROFILE.name },
      { Field: 'Headline', Value: PORTFOLIO_PROFILE.headline },
      { Field: 'Education', Value: `${PORTFOLIO_PROFILE.education.degree}, ${PORTFOLIO_PROFILE.education.institution} (${PORTFOLIO_PROFILE.education.year})` },
      { Field: 'Location', Value: PORTFOLIO_PROFILE.location },
      { Field: 'Email', Value: PORTFOLIO_PROFILE.email },
      { Field: 'GitHub', Value: PORTFOLIO_PROFILE.links.github },
      { Field: 'LinkedIn', Value: PORTFOLIO_PROFILE.links.linkedin },
      { Field: 'X (Twitter)', Value: PORTFOLIO_PROFILE.links.x },
      { Field: 'Ornitech', Value: PORTFOLIO_PROFILE.links.ornitech },
      { Field: 'Resume PDF', Value: PORTFOLIO_PROFILE.resumeUrl },
    ];
    const title = 'Ronak Talaviya — Profile & Contact Dossier';
    const summary = PORTFOLIO_PROFILE.summary;
    return {
      datasetId,
      title,
      summary,
      columns,
      rows,
      json: JSON.stringify(PORTFOLIO_PROFILE, null, 2),
      csv: toCsv(columns, rows),
      markdown: toMarkdownTable(title, summary, columns, rows),
    };
  }

  // 'full' complete recruiter & structured dossier
  const fullPayload = {
    profile: PORTFOLIO_PROFILE,
    ventures: VENTURES,
    projects: PROJECTS,
    credentials: CREDENTIALS,
    skills: SKILL_GROUPS,
  };
  const columns = ['Section', 'Count', 'Key Highlights'];
  const rows = [
    {
      Section: 'Profile & Education',
      Count: '1',
      'Key Highlights': `${PORTFOLIO_PROFILE.name} · ${PORTFOLIO_PROFILE.education.institution} · ${PORTFOLIO_PROFILE.email}`,
    },
    {
      Section: 'Ventures & Civic AI',
      Count: String(VENTURES.length),
      'Key Highlights': 'Ornitech.in, Techsodh.in, MyEntryPass.in, Shapentic.com, BolnaSeekho.in, Swachh Sense, Vision Sentinel, Transit Guard',
    },
    {
      Section: 'Featured Projects',
      Count: String(PROJECTS.length),
      'Key Highlights': 'Swachh Sense, Vision Sentinel, Transit Guard, NASA Telemetry Explorer, ISRO Payload Analytics, Profile Analyzer',
    },
    {
      Section: 'Grants & Credentials',
      Count: String(CREDENTIALS.length),
      'Key Highlights': '₹4.37L Grants + ₹1.5L Sarvam AI + $32.5K Cloud Credits + NASA/ISRO/Google/Microsoft',
    },
    {
      Section: 'Technical Skills',
      Count: String(SKILL_GROUPS.reduce((acc, g) => acc + g.items.length, 0)),
      'Key Highlights': 'Next.js, TypeScript, Python, FastAPI, YOLOv8, Gemini/OpenAI, Sarvam AI, GCP, Docker',
    },
  ];
  const title = 'Ronak Talaviya — Complete Portfolio Dataset';
  const summary = `Unified export combining profile, ${VENTURES.length} ventures, ${PROJECTS.length} case studies, ${CREDENTIALS.length} credentials, and ${SKILL_GROUPS.reduce((a, g) => a + g.items.length, 0)} technical skills.`;
  return {
    datasetId: 'full',
    title,
    summary,
    columns,
    rows,
    json: JSON.stringify(fullPayload, null, 2),
    csv: toCsv(columns, rows),
    markdown: [
      `# ${title}`,
      '',
      PORTFOLIO_PROFILE.summary,
      '',
      `## Ventures (${VENTURES.length})`,
      ...VENTURES.map((v) => `- **${v.title}** (${v.role}) — ${v.tagline}${v.fundingOrAward ? ` · _${v.fundingOrAward}_` : ''}`),
      '',
      `## Featured Projects (${PROJECTS.length})`,
      ...PROJECTS.map((p) => `- **${p.title}** — ${p.proof}: ${p.outcome}`),
      '',
      `## Grants & Top Credentials`,
      ...CREDENTIALS.slice(0, 10).map((c) => `- **${c.title}** (${c.issuer}, ${c.issueDate})`),
      '',
      `## Contact`,
      `- Email: ${PORTFOLIO_PROFILE.email}`,
      `- GitHub: ${PORTFOLIO_PROFILE.links.github}`,
      `- LinkedIn: ${PORTFOLIO_PROFILE.links.linkedin}`,
    ].join('\n'),
  };
}

