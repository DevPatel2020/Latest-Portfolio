import type { DetailLink } from "./types";

export type EducationItem = {
  title: string;
  detail: string;
  meta: string;
  link?: DetailLink;
};

export const degree: EducationItem = {
  title: "B.Tech, Computer Science & Engineering",
  detail: "Charotar University of Science and Technology (CHARUSAT), Gujarat",
  meta: "Graduated May 2026 · CGPA 8.6 / 10",
};

export const recognition: EducationItem[] = [
  {
    title: "Google Advanced Data Analytics",
    detail: "Professional Certificate · Coursera",
    meta: "Certification",
    link: {
      label: "View credential",
      href: "https://www.coursera.org/account/accomplishments/professional-cert/CGKZA31RKG5C",
    },
  },
  {
    title: "Microsoft AI and ML Engineering",
    detail: "Professional Certificate · Coursera",
    meta: "Certification",
    link: {
      label: "View credential",
      href: "https://www.coursera.org/account/accomplishments/professional-cert/B24ZI94PEEMD",
    },
  },
  {
    title: "Odoo Hackathon 2025 — Top 50",
    detail: "GlobeTrotter, a full-stack travel planner (React, TypeScript, Node.js, MongoDB)",
    meta: "Achievement",
    link: { label: "GitHub", href: "https://github.com/PremT0301/Globe-Trotter-" },
  },
];
