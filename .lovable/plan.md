
# NexTerra Orbit Hackathon — Landing Page Plan

A single-page hackathon site with a distinctive "orbital terminal" aesthetic — neon mint on deep navy/forest, monospace headlines (JetBrains Mono) paired with clean Work Sans body. Energetic, tech-forward, slightly brutalist — not generic SaaS.

## Design Direction

- **Palette**: bg `#0d1b2a`, surface `#1b4332`, primary `#2dd4a8`, accent glow `#73ffb8`
- **Type**: JetBrains Mono for headings/labels (uppercase, tight tracking), Work Sans for body
- **Motifs**: orbital ring SVGs behind hero, monospace tags like `[ ROUND_01 ]`, dashed connector lines on timeline, subtle grid background
- **Motion**: hero headline letter-by-letter reveal, orbit ring rotation, timeline nodes pulse when active, scroll-triggered fade-ups (framer-motion)

## Page Structure (single route: `/`)

1. **Navbar** (sticky, blurred) — Logo "NexTerra Orbit", links: About · Timeline · Tracks · Results · FAQ · Sponsors, plus a primary **Register** CTA button.

2. **Hero** — Large monospace headline "NexTerra Orbit Hackathon", a placeholder tagline slot (clearly marked as `{/* TAGLINE: replace this */}` comment + visible muted line), dual CTAs (Register / View Timeline), animated orbit SVG with floating planet nodes, small stat strip (rounds · prize pool · duration).

3. **Timeline** — Vertical alternating timeline (desktop) / stacked (mobile) with 5 milestone nodes:
   - 27 Jul – 4 Aug → Round 1: Idea Submission
   - 8 Aug → Round 1 Results
   - 8 Aug – 18 Aug → Round 2
   - 20 Aug → Round 2 Results
   - 29 Aug → Final Round
   Each node: date chip, title, short description, status badge (Upcoming/Live/Done — static for now).

4. **Results section** — Header "Results & Announcements" with tabs/cards for Round 1 / Round 2 / Finals. Each card shows status ("Awaiting announcement" placeholder), with space for top teams (placeholder podium: 1st/2nd/3rd slots showing "TBA").

5. **Footer** — Brand mark, social links, copyright, small "Powered by NexTerra" line.

## Technical Notes

- Frontend-only, no backend. All content static in component files.
- Replace `src/routes/index.tsx` placeholder with new page composed of section components under `src/components/landing/`: `Navbar.tsx`, `Hero.tsx`, `Timeline.tsx`, `Results.tsx`, `Footer.tsx`.
- Fonts: load JetBrains Mono + Work Sans via `<link>` tags in `src/routes/__root.tsx` head (preconnect + Google Fonts stylesheet); register in `src/styles.css` `@theme` as `--font-mono` and `--font-sans`.
- Add semantic tokens to `src/styles.css` (`:root` + `.dark`) using oklch equivalents of the chosen palette; add `--gradient-orbit` and `--shadow-glow` for reuse. Default site to dark theme by adding `dark` class on `<html>` in root shell.
- Use shadcn `Button`, `Badge`, `Card`, `Tabs` with semantic tokens — no hardcoded colors.
- Install `framer-motion` for hero + scroll reveals.
- Update route `head()` with hackathon-specific title, description, og tags.

## Out of Scope (for this pass)

- Actual registration form / backend (button links to `#register` anchor or external URL placeholder).
- Real result data — slots marked TBA.
- Additional routes (About, FAQ, Sponsors pages) — nav links scroll to sections or are placeholders.
