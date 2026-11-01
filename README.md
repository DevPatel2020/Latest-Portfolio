# Dev Patel — Portfolio

Next.js 15 · React 19 · Tailwind 3 · Framer Motion · Lenis (smooth scroll)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Editing content

| What | Where |
| --- | --- |
| Projects (title, metrics, bullets, links, image path) | `src/data/projects.ts` |
| Experience & publication rows (add descriptions here) | `src/data/experience.ts` |
| Degree, certificates, hackathon | `src/data/education.ts` |
| Name, email, links, résumés, skills, hero stats | `src/data/site.ts` |
| Hero / About / footer copy | `src/components/Portfolio.tsx` |

Each project has a `github` field (empty falls back to your GitHub profile). The detail panel is text only — images are card-only.

## Adding your images

Images live in `public/project-images/` (originals archived in `assets-src/`).
Drop your own image (e.g. `public/project-images/georoadmetrics.webp`) and change that project's `image` path in `src/data/projects.ts`.
Change a project's `aspect` value to make its card taller or shorter in the masonry grid.

## Preloader

Edit the text in `Portfolio.tsx` (`<Preloader text="Cooking..." />`).

## Résumés

`public/resume/` holds both PDFs; replace them to update the download links.
