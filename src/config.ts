// Feature flags. Flip BLOG_ENABLED to true to publish the blog (nav tab,
// home "Latest posts" section, and all /blog routes) once real content is ready.
export const BLOG_ENABLED = true;

// The blog (and draft posts) are always shown in `astro dev` so you can preview
// work-in-progress locally, but a production `astro build` respects BLOG_ENABLED
// and the per-post `draft` / future-date rules.
export const BLOG_VISIBLE = BLOG_ENABLED || import.meta.env.DEV;

export const SITE = {
  title: "Palash Chauhan",
  description:
    "Senior Software Engineer at Salesforce on the Phoenix Database team. Writing about distributed systems, databases, and large-scale infrastructure.",
  author: "Palash Chauhan",
  url: "https://palashc.github.io",
  role: "Senior Software Engineer",
  org: "Salesforce",
};

// Blog series. The key is the folder name under src/content/blog/<slug>/.
// Posts placed directly in src/content/blog/ (not in a series folder) are
// treated as standalone posts.
export type SeriesMeta = { title: string; description: string };

export const SERIES: Record<string, SeriesMeta> = {
  "phoenix-fundamentals": {
    title: "Phoenix Fundamentals",
    description:
      "How Apache Phoenix turns HBase into a SQL database: the storage layer it sits on, where Phoenix fits in the cluster, and how a query actually runs.",
  },
  "phoenix-features": {
    title: "Phoenix Features",
    description:
      "The database features Phoenix layers on top of HBase: secondary indexes, atomic updates, TTL, and change data capture.",
  },
  "phoenix-dynamodb-parity": {
    title: "Phoenix and DynamoDB Parity",
    description:
      "The features that bring the Phoenix DynamoDB adapter to life and let Phoenix serve DynamoDB-style workloads.",
  },
};

export const SOCIALS = {
  email: "palashc983@gmail.com",
  github: "https://github.com/palashc",
  linkedin: "https://www.linkedin.com/in/pc0/",
  cv: "/files/cv.pdf",
};

export type ExperienceItem = {
  role: string;
  company: string;
  companyUrl?: string;
  team?: string;
  period: string;
  location?: string;
  tech: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Salesforce",
    companyUrl: "https://www.salesforce.com",
    team: "Phoenix Database",
    period: "Jun 2021 – Present",
    location: "Seattle, WA (San Francisco, 2021–2023)",
    tech: ["Apache Phoenix", "Apache HBase", "Distributed Systems", "Java"],
  },
  {
    role: "Member of Technical Staff",
    company: "Adobe",
    companyUrl: "https://www.adobe.com",
    team: "Media Optimizer",
    period: "Jul 2017 – Aug 2019",
    location: "Bengaluru, India",
    tech: ["Kafka", "PostgreSQL", "Hadoop", "Presto", "Python"],
  },
  {
    role: "Research Intern",
    company: "Adobe",
    companyUrl:
      "https://research.adobe.com/about-adobe-research/bigdata-experience-lab/",
    team: "Big Data Experience Lab",
    period: "May 2016 – Jul 2016",
    location: "Bengaluru, India",
    tech: ["Topic Models", "Recommender Systems"],
  },
  {
    role: "Software Development Intern",
    company: "Monet Networks",
    companyUrl: "http://monetnetworks.com/",
    period: "May 2015 – Jul 2015",
    location: "Gurgaon, India",
    tech: ["PHP", "MySQL", "JavaScript"],
  },
];

export const EDUCATION = [
  {
    degree: "MS in Computer Science",
    institution: "University of California, San Diego",
    year: "2021",
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "Indian Institute of Technology, Kanpur",
    year: "2017",
  },
];
