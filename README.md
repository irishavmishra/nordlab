# NordLab

B2B ordering portals and sales systems for product distributors.

Live: https://nordlab.agency/

## What It Does

NordLab is a marketing website for a development agency that builds custom dealer portals, automated quoting systems, and real-time inventory dashboards for B2B product distributors. The site replaces manual ordering processes with modern web applications.

## Key Technical Decisions

- Single file deployment: Used vite-plugin-singlefile to bundle everything into one HTML file for simple static hosting without server configuration
- Tailwind CSS v4: Adopted the new CSS-first configuration with @theme directive for cleaner theming and better performance
- Custom scroll reveal system: Built a lightweight Intersection Observer-based animation system instead of importing heavy animation libraries
- Cal.com integration: Embedded Cal.com scheduling widget rather than building a custom calendar solution to reduce maintenance overhead

## Hard Problems I Solved

1. Scroll-triggered animations without dependencies: Implemented a custom useScrollReveal hook using Intersection Observer API with configurable thresholds and root margins, achieving smooth reveal animations without adding 50KB+ animation libraries

2. Mobile navigation scroll lock: Created a body scroll lock mechanism that prevents background scrolling when the mobile menu is open, using CSS classes and useEffect cleanup for proper state management

3. Editorial dark theme design system: Built a comprehensive color system using CSS custom properties with copper accents on dark backgrounds, including noise texture overlays and gradient text effects for a premium visual feel

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS v4, CSS custom properties
- Animation: Custom Intersection Observer hooks, CSS keyframes
- Scheduling: Cal.com embed
- Build: vite-plugin-singlefile

## Running Locally

1. Clone the repo: git clone https://github.com/nordlab/nordlab.git
2. Install dependencies: npm install
3. Run dev server: npm run dev
4. Open http://localhost:5173
