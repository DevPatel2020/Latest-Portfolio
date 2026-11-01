export type DetailLink = { label: string; href: string };
export type Metric = { label: string; value: string };

export type ProjectCategory = "Flagship" | "Machine Learning" | "Core Python" | "Side & Open Source";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Context line shown under the card and in the detail panel (course, company, venue…). */
  kicker: string;
  year: string;
  status: string;
  /** Front-page card image only. Drop yours in /public/projects and change this path. */
  image: string;
  aspect: string;
  summary: string;
  /** Maximum five points. */
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  /** Repo URL. Leave empty to fall back to your GitHub profile. */
  github: string;
  links: DetailLink[];
};

export type ExperienceItem = {
  id: string;
  title: string;
  role: string;
  period: string;
  badge: string;
  group: "main" | "parttime";
  summary: string;
  bullets: string[];
  links: DetailLink[];
};
