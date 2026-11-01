import type { ExperienceItem } from "./types";

/**
 * Order here is the order on the page. `group: "main"` rows sit under "Experience & Publication";
 * `group: "parttime"` rows sit under the part-time remote internships heading.
 * Empty `bullets` hides the highlights block in the detail panel.
 */
export const experience: ExperienceItem[] = [
  {
    id: "qualifacts",
    title: "Qualifacts",
    role: "Data Engineer I · InSync",
    period: "Aug 2026 – Present",
    badge: "Full Time · On-Site · Vadodara, Gujarat",
    group: "main",
    summary:
      "Data Engineer I on the database engineering team behind InSync — Qualifacts’ cloud EHR, practice-management and billing platform for US behavioral-health, substance-use and rehabilitative-therapy providers.",
    bullets: [
      "Own database-level data extraction, transformation and migration, keeping patient and practice data accurate, consistent and intact between source and target systems — where errors in healthcare data are costly.",
      "Support new-tenant development: database setup, data configuration and migration workflows that let InSync onboard provider organisations onto its scalable, multi-tenant architecture.",
      "Build and maintain automation scripts for repetitive database operations, cutting manual intervention and making backend workflows faster and more repeatable.",
      "Work as part of the backend database team behind a US healthcare product, where data integrity is a requirement, not a nice-to-have.",
    ],
    links: [],
  },
  {
    id: "niq",
    title: "NielsenIQ",
    role: "Data Science Intern",
    period: "Nov 2025 – May 2026",
    badge: "Major Internship · On-Site · Vadodara, Gujarat",
    group: "main",
    summary: "Final-semester internship in Vadodara, where I built the geospatial ML pipeline behind GeoRoadMetrics.",
    bullets: [
      "Engineered an end-to-end ML pipeline to predict urban road quality across 2.1 million geospatial segments, deploying an XGBoost classifier with 85.88% accuracy and an F1-score of 0.831.",
      "Built a scalable data-processing engine with Python, GeoPandas and OSMnx to automate road-network extraction and UTM-projected geometric buffering at 95% precision.",
      "Architected an interactive Streamlit dashboard with Folium for predictive analytics, statistical metrics and dynamic geospatial maps.",
    ],
    links: [],
  },
  {
    id: "ieee-icici",
    title: "IEEE ICICI 2025",
    role: "Published Research Paper",
    period: "2025",
    badge: "PUBLISHED",
    group: "main",
    summary:
      "“Enhancing Brain Tumor Detection Using YOLOv12” — peer-reviewed and published in the Proceedings of the 3rd International Conference on Inventive Computing and Informatics (IEEE).",
    bullets: [
      "Studied whether attention-centric YOLOv12 can resolve the precision-versus-speed trade-off in real-time brain-tumor detection on MRI.",
      "Reached 91.3% mAP@0.5 and an F1-score of 0.884 at roughly 2–3 ms per slice, ahead of YOLOv8, YOLOv9, Faster R-CNN and ResNet-18 baselines.",
      "Co-authored with peers and a faculty mentor, taking the work from experiments through peer review to publication.",
    ],
    links: [{ label: "Read on IEEE Xplore", href: "https://ieeexplore.ieee.org/abstract/document/11069471" }],
  },
  {
    id: "brainybeans",
    title: "BrainyBeans",
    role: "Data Science Intern",
    period: "May 2025 – Jun 2025",
    badge: "Summer Internship II · Ahmedabad, Gujarat",
    group: "main",
    summary: "Data science internship in Ahmedabad focused on regression models for smart-building infrastructure.",
    bullets: [
      "Built and optimised regression models for smart-building infrastructure with Scikit-learn, reaching an R² of 0.82.",
      "Authored preprocessing scripts for rigorous feature engineering and hyperparameter optimisation.",
    ],
    links: [],
  },
  {
    id: "zuplon",
    title: "Zuplon",
    role: "AI Engineer Intern",
    period: "May 2026 – Jul 2026",
    badge: "PART-TIME · REMOTE · 2 MONTHS",
    group: "parttime",
    summary: "Two-month remote internship building Python-based AI solutions for a SaaS product.",
    bullets: [
      "Developed and tested Python-based AI solutions, supporting application development and improving workflow efficiency.",
      "Built automation scripts, data-processing workflows and AI/ML integrations for SaaS product development.",
      "Collaborated with senior developers, documented technical workflows and contributed ideas to improve the development process.",
    ],
    links: [],
  },
  {
    id: "bluestock",
    title: "Bluestock",
    role: "SDE Intern",
    period: "2 months",
    badge: "PART-TIME · SUMMER INTERNSHIP II · REMOTE",
    group: "parttime",
    summary: "Remote SDE internship at Bluestock Fintech, where I shipped a production-level IPO web application.",
    bullets: [
      "Developed and deployed a production-level IPO web application using Django REST Framework and PostgreSQL.",
      "Built dynamic REST APIs and demo admin controls to drive the application.",
      "Practised clean architecture, scalability and teamwork while working remotely with a team that kept raising the bar.",
    ],
    links: [],
  },
  {
    id: "internpe",
    title: "InternPe",
    role: "Python Developer",
    period: "May 2024 – Jun 2024",
    badge: "PART-TIME · SUMMER INTERNSHIP I · REMOTE",
    group: "parttime",
    summary: "First internship — a hands-on introduction to Python through small projects.",
    bullets: [
      "Learned Python programming fundamentals through hands-on practice.",
      "Built simple games in Python, applying control flow, functions and game logic.",
    ],
    links: [],
  },
];
