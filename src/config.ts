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

// Google Analytics (GA4) measurement ID. The tag is injected into every page
// via BaseLayout, but only in production builds, so local `astro dev` traffic is
// not counted. Set to an empty string to disable analytics entirely.
export const GA_MEASUREMENT_ID = "G-6W6JLN1TGW";

// Blog series. The key is the folder name under src/content/blog/<slug>/.
// Posts placed directly in src/content/blog/ (not in a series folder) are
// treated as standalone posts.
export type SeriesMeta = {
  title: string;
  description: string;
  // Where to send the reader after the last post in this series. Rendered as a
  // bottom-of-post "Up next" arrow on the final post.
  next?: { title: string; href: string };
};

export const SERIES: Record<string, SeriesMeta> = {
  "phoenix-fundamentals": {
    title: "Phoenix Fundamentals",
    description:
      "How Apache Phoenix turns HBase into a SQL database: the storage layer it sits on, where Phoenix fits in the cluster, and how a query actually runs.",
    next: { title: "Phoenix Features", href: "/blog/series/phoenix-features/" },
  },
  "phoenix-features": {
    title: "Phoenix Features",
    description:
      "Some of the database features Phoenix layers on top of HBase: views and multi-tenancy, secondary indexes, TTL, and change data capture.",
    next: {
      title: "Phoenix and DynamoDB Parity",
      href: "/blog/series/phoenix-dynamodb-parity/",
    },
  },
  "phoenix-dynamodb-parity": {
    title: "Phoenix and DynamoDB Parity",
    description:
      "The features that move Phoenix toward DynamoDB-style workloads: BSON documents, eventually consistent indexes, and a richer change stream.",
    next: {
      title: "phoenix-adapters: DynamoDB on Phoenix",
      href: "/blog/phoenix-adapters-service/",
    },
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
