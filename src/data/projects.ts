// Course projects, restored from the original site. The per-project page URLs
// (/project/<slug>/) and image paths (/project/<slug>/featured.*) are kept
// identical to the old site so existing search-engine indexing is preserved.

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  date: string; // ISO date; also drives sort order
  level: "Undergraduate" | "Graduate";
  school: string;
  description: string; // short summary for cards + meta description
  tags: string[];
  image?: string; // site-absolute path, served from public/ (optional)
  links: ProjectLink[];
  body: string[]; // paragraphs
  // Optional override for the "{level} course project, {school}" line, e.g. for
  // hackathons or competitions that were not course work.
  venue?: string;
  // Optional award/recognition, rendered as a highlighted, linked badge.
  award?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "cloud",
    title: "Comparing Cloud Models",
    date: "2019-12-10",
    level: "Graduate",
    school: "UC San Diego",
    description:
      "A comparative study of virtual machines, containers, and serverless across CPU- and IO-bound workloads.",
    tags: ["Cloud", "Systems"],
    image: "/project/cloud/featured.png",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=15vKo73XY4CEEmMUY8AwPELd8Mhxkh2E9",
      },
    ],
    body: [
      "We ran an in-depth analysis of virtual machines, containers, and serverless using two applications, one CPU-bound and one IO-bound. A few conclusions stood out. Serverless is the most convenient for deploying and maintaining an application, closely followed by containers; deployment is much slower for virtual machines. For different workloads, containers give better performance and scalability than virtual machines and serverless.",
      "From a cost standpoint, serverless and containers are cheaper than virtual machines for smaller workloads, but containers are the best option for larger ones. Containers and virtual machines also suit always-on services, where they avoid the overhead of loading state on each serverless invocation. The study helped clarify the tradeoffs of deploying applications in the cloud and how to choose between the models.",
    ],
  },
  {
    slug: "scheduler",
    title: "Distributed Fault Tolerant Scheduler in Go",
    date: "2020-06-15",
    level: "Graduate",
    school: "UC San Diego",
    description:
      "A fault-tolerant, low-latency cluster scheduler based on Sparrow, written in Go.",
    tags: ["Distributed Systems", "Scheduling"],
    links: [
      { label: "Code", href: "https://github.com/palashc/Phoenix" },
      {
        label: "PDF",
        href: "https://drive.google.com/file/d/1UXMEoclUsfg2yFfSKkWCNXFdOBB2sokb/view",
      },
    ],
    body: [
      "This scheduler is a fault-tolerant, distributed, low-latency task scheduler based on Berkeley's Sparrow, implemented in Go. Like Sparrow, it places tasks across a cluster using decentralized, randomized sampling, which keeps scheduling latency very low. It is built from the same set of components: schedulers, node monitors, executors, and frontends.",
      "Where Sparrow assumes workers never fail, this project adds fault tolerance. It uses ZooKeeper for group membership of the worker nodes, detects worker failures, and recovers and reschedules the incomplete jobs that were running on a failed worker, so a failure does not silently lose work.",
    ],
  },
  {
    slug: "raft",
    title: "SurfStore",
    date: "2019-12-29",
    level: "Graduate",
    school: "UC San Diego",
    description:
      "A fault-tolerant cloud file store built on the RAFT consensus protocol.",
    tags: ["Distributed Systems", "Consensus"],
    image: "/project/raft/featured.png",
    links: [{ label: "Code", href: "https://github.com/palashc/surfstore" }],
    body: [
      "Getting people to agree on something is hard. Getting machines connected over an asynchronous network to agree is harder. RAFT is an easy-to-understand consensus protocol that uses leader election and log replication to reach agreement.",
      "In this project I built SurfStore, a collaborative, fault-tolerant cloud file store. File contents are split into chunks held by a BlockStore, while a replicated MetadataStore maps filenames to blocks. The MetadataStore uses RAFT leader election and log replication to keep a consistent state across servers and survive failures, with versioning and first-write-wins semantics to resolve conflicting updates.",
    ],
  },
  {
    slug: "lvp",
    title: "Load Value Prediction",
    date: "2017-05-12",
    level: "Undergraduate",
    school: "IIT Kanpur",
    description:
      "Predicting values loaded by machine instructions to expose more instruction-level parallelism.",
    tags: ["Computer Architecture", "Systems"],
    image: "/project/lvp/featured.png",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=1-FYNd5kLepy0Y7HFcafHNDcnEugw6R8U",
      },
    ],
    body: [
      "Data dependencies can severely hinder Instruction Level Parallelism (ILP). They reduce ILP when long-latency instructions flow through the pipeline and there are not enough independent instructions to keep the processor busy; dependent instructions stall behind them, creating critical paths through the program.",
      "Load Value Prediction (LVP) breaks the data dependency on load instructions by predicting the value the instruction will fetch. It exploits value locality, the likelihood of a previously-seen value recurring in a storage location. In this project we explore value locality, exploit it to perform load value prediction, and analyze performance on the SPEC2006 benchmarks.",
    ],
  },
  {
    slug: "poisson",
    title: "Poisson Matrix Factorization",
    date: "2017-04-10",
    level: "Undergraduate",
    school: "IIT Kanpur",
    description:
      "Probabilistic models for Bayesian recommender systems.",
    tags: ["Bayesian ML", "Recommender Systems"],
    image: "/project/poisson/featured.png",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=1aGCl84QsoHGmNDyFqewWcqqlYl9Zx1LY",
      },
    ],
    body: [
      "Recommendation systems are a vital component of the modern web. They help readers navigate otherwise unwieldy archives of information and help websites direct users to items, movies, articles, songs, and products that they will like. Collaborative filtering is one technique for building them, inferring user preferences and item attributes from data.",
      "In this project I studied various models for Bayesian recommender systems, including Poisson Matrix Factorization and its extensions, Hierarchical Poisson Matrix Factorization and Bayesian Non-parametric Poisson Matrix Factorization. I analyzed the effect of latent dimensions on the models, and learned how auxiliary variables in variational inference make the models locally conjugate to facilitate inference. I evaluated their performance on the MovieLens 1M dataset.",
    ],
  },
  {
    slug: "malware",
    title: "Malware Detection Using Machine Learning",
    date: "2017-02-20",
    level: "Undergraduate",
    school: "IIT Kanpur",
    venue: "Cybersecurity hackathon · SG-CRC 2017, NUS Singapore",
    award: {
      label: "3rd prize · SG-CRC 2017",
      href: "https://www.comp.nus.edu.sg/~tsunami/sg-crc17/program.html",
    },
    description: "Predicting whether an executable is malware or benign.",
    tags: ["Machine Learning", "Security"],
    image: "/project/malware/featured.jpg",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=1A8lBEdu75QVg84TMwkuxp70PKu7MlOUr",
      },
      { label: "Code", href: "https://github.com/palashc/DLS-Singapore" },
    ],
    body: [
      "Malware remains a large problem, as attackers use it to disrupt systems with costly after-effects. Detection is mainly carried out using heuristic and signature-based methods, which fail to keep up with the continuous evolution of malware families.",
      "This project explores detecting malware by extracting features from binaries and using them to train a deep neural network. We experimented with AutoEncoders, LSTMs, and CNNs, and also with raw byte sequences as features. The results show that the network can learn and extract meaningful information even from the raw bytes.",
      "Built at the SGCSC Cybersecurity hackathon during SG-CRC 2017 at the National University of Singapore, where it won 3rd prize.",
    ],
  },
  {
    slug: "dense",
    title: "Dense Image Captioning",
    date: "2016-12-11",
    level: "Undergraduate",
    school: "IIT Kanpur",
    description:
      "Teaching a computer vision system to localize and describe salient regions in images in natural language.",
    tags: ["Deep Learning", "Computer Vision"],
    image: "/project/dense/featured.png",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=1vwUJx41TDZQJmcp0bBdlWgGMCKPHJy24",
      },
      {
        label: "Slides",
        href: "https://drive.google.com/open?id=12rKhMdrLOJKHDKhW4r57HqHveb5JHoSA",
      },
    ],
    body: [
      'Dense captioning is a task that requires a computer vision system to both localize and describe salient regions in images in natural language. It generalizes object detection (when each description is a single word) and image captioning (when one predicted region covers the whole image). "DenseCap: Fully Convolutional Localization Networks for Dense Captioning" by Johnson et al. proposed a Fully Convolutional Localization Network (FCLN) that processes an image in a single efficient forward pass, needs no external region proposals, and trains end to end in one round of optimization. The architecture combines a convolutional network, a novel dense localization layer, and a recurrent neural network language model that generates the label sequences.',
      'In this project we did two things. First, we reproduced the authors\' results to get familiar with the codebase. Second, we replaced the test-time Non-Maximal Suppression step with a Tyrolean Network, as described in "A convnet for non-maximum suppression" by Hosang et al. This gave a slight increase in the Mean Average Precision of DenseCap compared to our run of the original code.',
    ],
  },
  {
    slug: "nlp",
    title: "Automatic Abstract Generation",
    date: "2016-12-10",
    level: "Undergraduate",
    school: "IIT Kanpur",
    description: "Text summarization for long documents like research papers.",
    tags: ["NLP", "Deep Learning"],
    image: "/project/nlp/featured.jpg",
    links: [
      {
        label: "PDF",
        href: "https://drive.google.com/open?id=1u5Ij8_uaoPntL53i5Oe9VunV8DnTnXJP",
      },
    ],
    body: [
      "As information overload grows and the amount of data increases, interest in automatic summarization is rising too. Summarization can be done either by extracting elements from the input (extractive) or by understanding the content and using language generation (abstractive). Both methods struggle on long documents like research papers.",
      "In this project we proposed an approach that combines the two: salient sentences are first extracted from the long document and then fed to a sequence-to-sequence RNN. We experimented with several ways to extract salient elements, including LDA, LSA, and TextRank, and fed the best extraction to the RNN to generate an enhanced summary. We evaluated the results using the ROUGE metric on a dataset of research papers from NIPS 2015.",
    ],
  },
];
