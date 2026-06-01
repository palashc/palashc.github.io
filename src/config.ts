// Feature flags. Flip BLOG_ENABLED to true to publish the blog (nav tab,
// home "Latest posts" section, and all /blog routes) once real content is ready.
export const BLOG_ENABLED = false;

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
  "sample-series": {
    title: "Sample Series",
    description:
      "A placeholder series. Replace this with a real series once the concrete content is ready.",
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
    tech: ["Apache HBase", "Apache Phoenix", "Distributed Systems", "Java"],
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
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "Indian Institute of Technology, Kanpur",
    year: "2017",
  },
];
