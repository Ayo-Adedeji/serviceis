# Implementation Plan: ServiceIS Website Revamp

## Overview

Incrementally build the revamped ServiceIS single-page site in React + Vite + Tailwind CSS. Each task produces working, integrated code. No new runtime npm dependencies are introduced; `fast-check` is added as a dev dependency for property-based tests.

## Tasks

- [x] 1. Extend Tailwind config and global CSS
  - Add `navy: '#0A0F1E'` colour token to `tailwind.config.js` theme.extend.colors
  - Add `fadeSlideIn` / `fadeSlideOut` keyframes to theme.extend.keyframes
  - Add `scroll-behavior: smooth` to `html` in `src/index.css`
  - Add `.scroll-observe`, `.animate-in`, and `.animate-out` utility classes to `src/index.css`
  - _Requirements: 10.4, 10.5, 10.7, 12.1, 12.4_

- [x] 2. Create `useScrollAnimation` hook
  - [x] 2.1 Implement `src/hooks/useScrollAnimation.js`
    - Create and return a `ref` to attach to a container element
    - Instantiate one `IntersectionObserver` per hook call with `{ threshold: 0.15 }` default
    - On `isIntersecting: true` add `animate-in`, remove `animate-out` on each observed child; apply `transitionDelay` of `index * 100ms` per child
    - On `isIntersecting: false` add `animate-out`, remove `animate-in` on each observed child
    - Guard with `typeof IntersectionObserver !== 'undefined'` and fall back to leaving elements visible
    - Disconnect observer on cleanup
    - _Requirements: 10.1, 10.2, 10.3, 10.6, 10.7_

  - [ ]* 2.2 Write property test for `useScrollAnimation` — class toggling (Property 4)
    - **Property 4: Scroll animation hook toggles classes correctly on intersection change**
    - **Validates: Requirements 10.2, 10.3**
    - File: `src/__tests__/useScrollAnimation.test.js`
    - Use `fc.boolean()` as the `isIntersecting` value; mock `IntersectionObserver`; assert `animate-in` / `animate-out` exclusivity
    - Tag: `// Feature: serviceis-website-revamp, Property 4: hook class toggling`

  - [ ]* 2.3 Write property test for `useScrollAnimation` — stagger delay (Property 5)
    - **Property 5: Stagger delay is proportional to card index**
    - **Validates: Requirements 10.6**
    - File: `src/__tests__/useScrollAnimation.test.js`
    - Use `fc.integer({ min: 0, max: 10 })` as card index; assert `transitionDelay === i * 100 + 'ms'`
    - Tag: `// Feature: serviceis-website-revamp, Property 5: stagger delay proportional to index`

- [x] 3. Create `Navbar` component
  - [x] 3.1 Implement `src/components/Navbar.jsx`
    - Fixed `<nav>` at top, full width, `bg-[#0A0F1E]`, `shadow-md`, `z-50`
    - Logo block: "ServiceIS" bold white + tagline small grey
    - Desktop links: `<a href="#services">`, `<a href="#who-its-for">`, `<a href="#how-it-works">`, `<a href="#contact">` — hidden below `md`
    - Mobile: hamburger icon (`FaBars` / `FaTimes` from `react-icons/fa`), `menuOpen` boolean state
    - Dropdown renders when `menuOpen` is true; clicking a link sets `menuOpen` to false
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 3.2 Write unit tests for `Navbar`
    - Test logo text and tagline are present
    - Test desktop nav links have correct `href` values
    - Test hamburger click toggles mobile menu open
    - Test clicking a mobile link closes the menu
    - File: `src/__tests__/Navbar.test.jsx`

  - [ ]* 3.3 Write property test for `Navbar` — hamburger toggle (Property 6)
    - **Property 6: Navbar hamburger menu toggles open and closed**
    - **Validates: Requirements 2.6, 2.7**
    - File: `src/__tests__/Navbar.test.jsx`
    - Use `fc.array(fc.oneof(fc.constant('hamburger'), fc.constant('link')))` to simulate click sequences; assert final `menuOpen` state is consistent
    - Tag: `// Feature: serviceis-website-revamp, Property 6: navbar hamburger toggle`

- [x] 4. Revamp `HeroSection` component
  - [x] 4.1 Rewrite `src/components/HeroSection.jsx`
    - Full-viewport `<section>` (`min-h-screen`) with `<img>` background (`object-cover`) from Unsplash IT-support query and `bg-[#0A0F1E]/70` overlay
    - Desktop: `grid-cols-2`; mobile: single column
    - Left: badge pill, `<h1>`, two `<p>`, primary button "Book Initial Digital Review", secondary outline button "Explore Services"
    - Right: 2×2 grid of `bg-white/10 backdrop-blur` cards for For Homes, For Individuals, For Families, For Executives
    - Entry animation via `useEffect` on mount: left column `translateX(-40px)` → 0, right cards stagger from `translateX(40px)` → 0
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 4.2 Write unit tests for `HeroSection`
    - Test heading text is present
    - Test both buttons render with correct labels
    - Test all 4 audience card titles are present
    - File: `src/__tests__/HeroSection.test.jsx`

- [x] 5. Create `WhatWeDo` component
  - [x] 5.1 Implement `src/components/WhatWeDo.jsx`
    - `<section id="services">` with `bg-gray-50`
    - Section label "WHAT WE DO", heading, subtext
    - 6 service cards in `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`; each card has icon, title, description, hover lift + border highlight
    - Attach `useScrollAnimation` ref to the grid container for staggered child animation
    - Icons: `FaSearch`, `FaHome`, `FaMobileAlt`, `FaShieldAlt`, `FaHeadset`, `FaFileAlt` from `react-icons/fa`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 5.2 Write unit tests for `WhatWeDo`
    - Test section has `id="services"`
    - Test all 6 card titles are present in the DOM
    - File: `src/__tests__/WhatWeDo.test.jsx`

  - [ ]* 5.3 Write property test for `WhatWeDo` — card count (Property 1)
    - **Property 1: WhatWeDo always renders exactly 6 service cards**
    - **Validates: Requirements 4.3**
    - File: `src/__tests__/WhatWeDo.test.jsx`
    - Use `fc.assert(fc.property(fc.constant(null), () => render(<WhatWeDo/>).getAllByRole('article').length === 6))`
    - Tag: `// Feature: serviceis-website-revamp, Property 1: WhatWeDo renders exactly 6 service cards`

- [x] 6. Create `WhoItsFor` component
  - [x] 6.1 Implement `src/components/WhoItsFor.jsx`
    - `<section id="who-its-for">` with white background
    - Desktop: `grid-cols-2` (left heading block, right `grid-cols-2` audience card grid); mobile: single column
    - 6 audience cards with hover border + background shift
    - Attach `useScrollAnimation` ref to the card grid for staggered fade
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 6.2 Write unit tests for `WhoItsFor`
    - Test section has `id="who-its-for"`
    - Test all 6 audience card labels are present
    - File: `src/__tests__/WhoItsFor.test.jsx`

  - [ ]* 6.3 Write property test for `WhoItsFor` — card count (Property 2)
    - **Property 2: WhoItsFor always renders exactly 6 audience cards**
    - **Validates: Requirements 5.4**
    - File: `src/__tests__/WhoItsFor.test.jsx`
    - Use `fc.assert(fc.property(fc.constant(null), () => render(<WhoItsFor/>).getAllByRole('article').length === 6))`
    - Tag: `// Feature: serviceis-website-revamp, Property 2: WhoItsFor renders exactly 6 audience cards`

- [x] 7. Create `HowItWorks` component
  - [x] 7.1 Implement `src/components/HowItWorks.jsx`
    - `<section id="how-it-works">` with `bg-[#0A0F1E]` and white text
    - Section label "HOW IT WORKS", heading
    - 3 step cards (`grid-cols-3` desktop, stacked mobile): 01 Review, 02 Plan, 03 Support — each with large number, title, description
    - Attach `useScrollAnimation` ref to the card grid for staggered slide-up
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]* 7.2 Write unit tests for `HowItWorks`
    - Test section has `id="how-it-works"`
    - Test dark navy background class is present
    - Test step numbers "01", "02", "03" are rendered
    - File: `src/__tests__/HowItWorks.test.jsx`

  - [ ]* 7.3 Write property test for `HowItWorks` — card count (Property 3)
    - **Property 3: HowItWorks always renders exactly 3 step cards**
    - **Validates: Requirements 6.4**
    - File: `src/__tests__/HowItWorks.test.jsx`
    - Use `fc.assert(fc.property(fc.constant(null), () => render(<HowItWorks/>).getAllByRole('article').length === 3))`
    - Tag: `// Feature: serviceis-website-revamp, Property 3: HowItWorks renders exactly 3 step cards`

- [x] 8. Create `WhyServiceIS` component
  - [x] 8.1 Implement `src/components/WhyServiceIS.jsx`
    - `<section>` with light background
    - Centred rounded card (`max-w-3xl mx-auto rounded-2xl shadow-lg p-12`)
    - Section label "WHY SERVICEIS", heading, body paragraph
    - Attach `useScrollAnimation` ref to the card for fade-in + scale-up (`scale-95` → `scale-100`)
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 8.2 Write unit tests for `WhyServiceIS`
    - Test label "WHY SERVICEIS" is present
    - Test heading text is present
    - File: `src/__tests__/WhyServiceIS.test.jsx`

- [x] 9. Checkpoint — core sections complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Create `ContactSection` component
  - [x] 10.1 Implement `src/components/ContactSection.jsx`
    - `<section id="contact">` with `bg-[#0A0F1E]` and white text
    - Desktop: `grid-cols-2` (left info, right form); mobile: single column
    - Left: label "CONTACT", heading "Book your initial digital review", body, email `hello@serviceis.com`, phone `+234 XXX XXX XXXX`, availability "By appointment"
    - Right: `<form action="https://formsubmit.co/ictweare.support@ictweare.com" method="POST">` with Full Name, Email Address, Phone/WhatsApp, Message textarea, newsletter checkbox, "Enquire Now" submit button
    - Input styling: `bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white placeholder-white/50`
    - Attach `useScrollAnimation` ref for left-fade / right-slide entry animation
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_

  - [ ]* 10.2 Write unit tests for `ContactSection`
    - Test section has `id="contact"`
    - Test dark navy background class is present
    - Test form `action` and `method` attributes are correct
    - Test all form fields are present (name, email, phone, message, checkbox)
    - Test submit button label is "Enquire Now"
    - File: `src/__tests__/ContactSection.test.jsx`

- [x] 11. Wire everything together in `HomePage.jsx`
  - [x] 11.1 Update `src/pages/HomePage.jsx`
    - Import and render all components in this exact order: `Navbar`, `HeroSection`, `WhatWeDo`, `WhoItsFor`, `HowItWorks`, `WhyServiceIS`, `Values`, `Centres`, `ServiceProvider`, `ContactSection`, `Footer`
    - Remove the `Contacts` import (replaced by `ContactSection`)
    - Add `pt-16` (or equivalent) to the page wrapper to offset the fixed Navbar height
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 11.2 Write unit tests for `HomePage`
    - Test all section components render without crashing
    - Test page does not render the old `Contacts` component
    - File: `src/__tests__/HomePage.test.jsx`

- [x] 12. Final checkpoint — Ensure all tests pass
  - Install `fast-check` as a dev dependency: `npm install --save-dev fast-check`
  - Run `npx vitest --run` and confirm all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests require `fast-check` (dev dependency only — no runtime impact)
- The `Contacts.jsx` file is left on disk but removed from `HomePage.jsx` (Requirement 1.3)
- The fixed Navbar requires a top padding offset on the page so sections are not hidden behind it
