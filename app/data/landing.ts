/**
 * Landing page content: the single place to edit copy.
 * Structure mirrors the page sections; components stay dumb and reusable.
 */

export interface NavItem {
    label: string;
    href: string;
}

export interface Service {
    title: string;
    description: string;
    icon: string;
    tags: string[];
}

export interface Experience {
    role: string;
    org: string;
    orgHref?: string;
    period: string;
    description: string;
    kind: string;
}

export interface Education {
    title: string;
    school: string;
    schoolHref: string;
    grade: string;
    thesis: string;
    abstract: string;
}

export interface Interest {
    name: string;
    image: string;
    note: string;
}

export const nav: NavItem[] = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Off screen", href: "#interests" },
    { label: "Contact", href: "#contact" },
];

export const hero = {
    availability: "Available for new projects",
    eyebrow: "Matteo Beltrame · CTO at Hybrida · Founder of Reviy",
    titleLines: ["Problems in.", "Products out."],
    lead: "I'm Matteo. I design, build and ship software: AI platforms, web apps, embedded systems, the whole stack. Bring me something that's stuck and I'll hand back something that works.",
    primaryCta: { label: "Get in touch", href: "mailto:bltmtt@gmail.com" },
    secondaryCta: { label: "See what I build", href: "#work" },
    roles: ["Diving", "Climbing", "Skiing", "Hiking", "Lifting"],
    images: ["/avatar/trat_dive.webp", "/avatar/trat_climb.webp", "/avatar/trat_ski.webp", "/avatar/trat_hike.webp", "/avatar/trat_train.webp"],
};

export const stats = [
    { value: "110/110", label: "Cum laude, twice" },
    { value: "6", label: "Products shipped" },
    { value: "CTO", label: "Hybrida" },
    { value: "∞", label: "Espresso since Tiramisù" },
];

export const about = {
    eyebrow: "Who's behind the screen",
    title: ["Call it a career,", "or call it curiosity."],
    paragraphs: [
        "I've written simulation code for aerospace and defence, run the technical side of a company as its CTO, and shipped products alone from the first commit to the first invoice. Some of them won. Some taught me more than they earned. All of them shipped.",
        "Today I lead the technology at Hybrida and build Reviy, the AI platform that gets brands recommended when people ask ChatGPT, Gemini or Perplexity who to hire. When I'm not shipping, I'm outside: in the water, on a wall, or on a mountain.",
    ],
    marqueeWords: ["Software", "AI", "Product", "Strategy", "Growth", "Design", "Infrastructure"],
};

export const services: Service[] = [
    {
        title: "Software Development",
        description: "Full-stack across web, mobile, desktop and embedded. One person who owns the whole pipeline, from data model to deploy button.",
        icon: "material-symbols:code-rounded",
        tags: ["web", "mobile", "embedded"],
    },
    {
        title: "MVP Development",
        description: "Validate the idea before you fund the roadmap. Fast, focused, and built so it can grow into the real thing.",
        icon: "material-symbols:bolt-rounded",
        tags: ["startups", "speed", "lean"],
    },
    {
        title: "AI & LLM Integration",
        description: "Ship AI that earns its place. Agents, copilots, automation and evaluation wired into products people already use.",
        icon: "material-symbols:auto-awesome-rounded",
        tags: ["llm", "agents", "automation"],
    },
    {
        title: "SEO, AEO & GEO",
        description: "Show up everywhere people look: Google, but also ChatGPT, Gemini and Perplexity. Structure, content and signals for answer engines and generative search.",
        icon: "material-symbols:travel-explore-rounded",
        tags: ["seo", "aeo", "geo"],
    },
    {
        title: "Technical & ICT Consultancy",
        description: "Align the tech with the business. Audits, architecture, roadmaps and the calls that stop you burning budget on the wrong thing.",
        icon: "material-symbols:business-center-rounded",
        tags: ["strategy", "architecture", "audit"],
    },
    {
        title: "Fractional CTO",
        description: "Senior technical leadership without the full-time invoice. Team, codebase, priorities: steady hands on the wheel.",
        icon: "material-symbols:rocket-launch-rounded",
        tags: ["leadership", "hiring", "roadmap"],
    },
    {
        title: "Coaching & Tutoring",
        description: "Level up a person or a team, one real project at a time. Mentoring that ends with working code, not slideware.",
        icon: "material-symbols:school-rounded",
        tags: ["mentoring", "teams", "growth"],
    },
    {
        title: "Optimization & Growth",
        description: "Make what you already have pull its weight. Find the bottlenecks, remove them, and let the numbers compound.",
        icon: "material-symbols:trending-up-rounded",
        tags: ["performance", "scale", "revenue"],
    },
];

export const experience: Experience[] = [
    {
        role: "Chief Technology Officer",
        org: "Hybrida",
        orgHref: "https://hybrida.io",
        period: "Present",
        description: "Leading the technology and product direction of the studio, from architecture to delivery.",
        kind: "Venture",
    },
    {
        role: "Founder & CTO",
        org: "Reviy",
        orgHref: "https://reviy.app?utm_source=personal_site",
        period: "Present",
        description: "Building the AI platform that makes brands the first recommendation on AI search. Product, engineering, everything.",
        kind: "Product",
    },
    {
        role: "Lead Developer & Chief Technical Manager",
        org: "Mentally.ai",
        period: "Past",
        description: "Ran the technical side of the company: turning business requirements into shipped projects.",
        kind: "Venture",
    },
    {
        role: "System Engineer",
        org: "Leonardo S.p.A.",
        period: "Past",
        description: "Built simulation systems for aerospace and defence.",
        kind: "Corporate",
    },
];

export const education: Education[] = [
    {
        title: "MSc Computer Science",
        school: "University of Trento",
        schoolHref: "https://www.unitn.it/",
        grade: "110/110 cum laude",
        thesis: "EQDR: Elite Quantum Diffusion Recombination Operator",
        abstract: "A novel quantum recombination operator for a genetic quantum optimisation algorithm, extending Grover's search to real-world, fitness-based problems.",
    },
    {
        title: "BSc Computer Engineering",
        school: "Sapienza University of Rome",
        schoolHref: "https://www.uniroma1.it/",
        grade: "110/110 cum laude",
        thesis: "EnNEAT: Enhanced Neuroevolution of Augmenting Topologies",
        abstract: "Fusing dynamic genetic algorithms with NEAT into an enhanced unsupervised learning algorithm.",
    },
];

export const interests: Interest[] = [
    { name: "Diving", image: "/avatar/trat_dive.webp", note: "Best thinking happens below the surface." },
    { name: "Climbing", image: "/avatar/trat_climb.webp", note: "Some problems you solve with your hands." },
    { name: "Skiing", image: "/avatar/trat_ski.webp", note: "Commit to the line." },
    { name: "Hiking", image: "/avatar/trat_hike.webp", note: "Long routes, small steps." },
    { name: "Training", image: "/avatar/trat_train.webp", note: "Show up, repeat, compound." },
];

export const contact = {
    eyebrow: "One call to action, and this is it",
    title: ["Let's", "talk."],
    lead: "No forms. No funnels. No gatekeeping. Tell me what you're building or what's broken, and I'll reply with a straight answer, usually within a day.",
    email: "bltmtt@gmail.com",
    primaryCta: { label: "Email me", href: "mailto:bltmtt@gmail.com?subject=Let's%20talk" },
    secondaryCta: { label: "Copy address", href: "" },
    location: "Based in Italy · Working worldwide",
};

export const mods = {
    label: "Off the clock · Minecraft",
    title: "Yeah, I also mod Minecraft.",
    description: "A handful of mods with a quiet six-figure download count each. Because sometimes you just want a chest that teleports.",
    href: "/minecraft-mods",
};
