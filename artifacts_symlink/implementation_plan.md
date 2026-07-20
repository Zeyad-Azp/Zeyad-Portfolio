# Implementation Plan: Interactive Cyber-Minimalism Portfolio (Backend Developer Focus)

Build a highly interactive, non-traditional personal portfolio for **Zeyad Azab**, Software Engineer / Backend Developer, using Next.js 14, Tailwind CSS, Framer Motion, Lenis scroll, and React Three Fiber (R3F) / Three.js.

---

## Design System & Theme

- **Color Palette**:
  - Background: Native dark `#050505` with subtle radial grid overlay.
  - Accents: Electric Blue (`#00f0ff` / `rgb(0, 240, 255)`) and Neon Purple (`#9d4edd` / `rgb(157, 78, 221)`).
  - Cards / Interactive Panels: Ultra-translucent glassmorphism (`backdrop-blur-md`, `bg-white/[0.02]`, `border-white/[0.05]`).
- **Typography**:
  - Headings: **Space Grotesk** (curated Google font, clean geometric sans-serif).
  - Subheadings, Tech Tags, and Terminal/API Interfaces: **JetBrains Mono** (monospaced programmer aesthetic).
- **Custom Cursor**: A magnetic, fluid trailing cursor that changes state when hovering over interactive elements.

---

## Proposed Tech Stack & Dependencies

To ensure maximum compatibility and stability (especially with React Three Fiber types and Lenis integration), we will bootstrap the project with **Next.js 14** (utilizing React 18):
- `next@14` (App Router, TypeScript)
- `framer-motion` (v11 or compatible)
- `three` & `@types/three` (3D engine)
- `@react-three/fiber` & `@react-three/drei` (3D react wrappers)
- `@lenis/react` (Smooth scrolling wrapper)
- `lucide-react` (Modern icons)

---

## Proposed Component Architecture

### 1. Framework Setup
- Move `ZeyadCV.pdf` temporarily, run `create-next-app@14`, and move the CV back.
- Install animations and 3D libraries.
- Configure tailwind with custom colors, fonts (`Space Grotesk`, `JetBrains Mono`), and animations.

### 2. Layout & Global Providers (`src/app/layout.tsx`)
- Set up custom fonts.
- Add `<LenisProvider>` wrapping the page content to apply smooth scrolling.
- Include a `<CustomCursor />` component.
- Set up metadata (SEO optimized).

### 3. Core Components

#### 🌌 `src/components/ThreeBackground.tsx` (Interactive 3D Backend Request flow)
- Uses React Three Fiber to build an interactive backend system topology graph.
- Visually simulates client requests hitting an **API Gateway node**, which routes packets to **server microservice nodes**, which in turn trigger request animations down to a **database cluster**.
- Particles flow along lines connecting these nodes. Mouse movement creates distortion/magnetic drag on nodes and pulls requests toward the cursor.

#### 🚀 `src/components/Hero.tsx` (Backend Engineering Introduction)
- **Split-Text Reveal**: Framer Motion animation splitting the name "Zeyad Azab" into characters, revealing them with a spring animation and stagger-reveal.
- **Terminal Typing Subtitle**: A simulated code-editor line typing out `Architecting scalable backend systems & APIs.` with a blinking terminal cursor.

#### 💻 `src/components/About.tsx` (VS Code Terminal Bio)
- Avoids standard paragraphs.
- Design: An interactive mock VS Code editor or terminal window (complete with file tabs like `Bio.cs`, `Education.json`).
- Animation: Selecting different files triggers custom typing reveals or syntax-highlighted renderings of his bio, Cairo University AI degree, and training programs (ITI, DEPI).

#### 🔮 `src/components/Skills.tsx` (Swagger/API Playground Interface)
- Custom interactive **API Playground** (inspired by Swagger / Postman UI) showing his developer mindset.
- Renders an address bar containing `GET /api/v1/engineer/skills`.
- Users click a glowing "Send" button.
- The UI triggers a loading state and then prints a beautifully formatted, syntax-highlighted JSON payload detailing his expertise: `.NET Ecosystem (C#, ASP.NET Core API, EF Core)`, `Databases (SQL Server, Modeling)`, and productivity tools (`Prompt Engineering`).

#### 📂 `src/components/Projects.tsx` (Horizontal Scroll & 3D Tilt with X-Ray Arch Reveal)
- **Horizontal Scroll**: Uses Framer Motion's `useScroll` and `useTransform` to translate vertical page scroll into horizontal movement, pinning the view.
- **3D Tilt effect**: Project cards tilt dynamically relative to mouse position on the card.
- **X-Ray / Flip Mechanic**: Clicking an "Architecture" toggle or hovering over an active region flips/reveals the internal system architecture diagram (N-Tier, Onion Architecture, JWT Authentication flow, database modeling) for **Forsa**, **Car Rent**, **Duvar**, and **Car Insurance Company**.
- **Magnetic Buttons**: Buttons ("View Source", "Live Demo") pull towards the mouse cursor.

#### ✉️ `src/components/Contact.tsx` (Spotlight Contact Form)
- Glassmorphism form.
- **Spotlight Effect**: A radial gradient overlay on the form background following the cursor coordinates.

---

## Verification Plan

### Automated Checks
- Run `npm run build` to verify there are no compilation or TypeScript errors.
- Ensure the project builds successfully and runs locally.

### Manual Verification
- Test scroll responsiveness and Lenis-Framer Motion alignment.
- Verify 3D background performance (framerate check) and ensure it degrades gracefully or is hidden on mobile screens.
- Test form validation and spotlight tracking.
