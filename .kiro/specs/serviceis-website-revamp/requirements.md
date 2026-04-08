# Requirements Document

## Introduction

This document defines the requirements for a full revamp of the ServiceIS single-page website. The revamp transforms the existing React + Vite + Tailwind CSS application into a premium, high-trust digital presence for a private IT concierge service. The page structure is reorganised into nine sections plus a footer, with new components created and existing components preserved. The design direction is deep navy, clean white, and subtle accents with a luxury concierge feel, scroll-triggered animations, and full mobile-first responsiveness.

## Glossary

- **Website**: The ServiceIS single-page React application served from `src/pages/HomePage.jsx`
- **Navbar**: The sticky top navigation bar component (`src/components/Navbar.jsx`)
- **Hero**: Section 1 — the full-viewport opening section (`src/components/HeroSection.jsx`, revamped)
- **WhatWeDo**: Section 2 — the services grid section (`src/components/WhatWeDo.jsx`, new)
- **WhoItsFor**: Section 3 — the target audience section (`src/components/WhoItsFor.jsx`, new)
- **HowItWorks**: Section 4 — the numbered steps section (`src/components/HowItWorks.jsx`, new)
- **WhyServiceIS**: Section 5 — the value proposition section (`src/components/WhyServiceIS.jsx`, new)
- **Values**: Section 6 — the existing values section (`src/components/Values.jsx`, kept as-is)
- **Locations**: Section 7 — the existing service centres and map section (`src/components/Centres.jsx`, kept as-is)
- **Partners**: Section 8 — the existing authorized service provider section (`src/components/ServiceProvider.jsx`, kept as-is)
- **ContactSection**: Section 9 — the revamped contact and newsletter form section (`src/components/ContactSection.jsx`, new)
- **Footer**: The existing footer component (`src/components/Footer.jsx`, kept as-is)
- **Intersection_Observer**: The browser's `IntersectionObserver` API used for scroll-triggered animations
- **animate-in**: CSS class applied when an element enters the viewport
- **animate-out**: CSS class applied when an element exits the viewport
- **Unsplash**: The free image API at `https://source.unsplash.com` used to fetch the hero background image

---

## Requirements

### Requirement 1: Page Structure and Component Composition

**User Story:** As a site visitor, I want a coherent single-page layout with all sections in the correct order, so that I can navigate the full ServiceIS offering without confusion.

#### Acceptance Criteria

1. THE Website SHALL render sections in this exact top-to-bottom order: Navbar, Hero, WhatWeDo, WhoItsFor, HowItWorks, WhyServiceIS, Values, Locations, Partners, ContactSection, Footer.
2. THE Website SHALL preserve the existing Values, Locations, Partners, and Footer components without modifying their content or internal styling.
3. THE Website SHALL replace the existing `Contacts.jsx` component with the new `ContactSection.jsx` component.
4. THE Website SHALL not introduce duplicate Tailwind, PostCSS, or Vite configuration files.
5. IF a configuration conflict arises during implementation, THEN THE Website SHALL resolve it by extending the existing config rather than overwriting it.

---

### Requirement 2: Navbar

**User Story:** As a site visitor, I want a sticky, responsive navigation bar, so that I can jump to any section from anywhere on the page.

#### Acceptance Criteria

1. THE Navbar SHALL display the logo text "ServiceIS" and a tagline "Private IT department for modern homes and individuals" below it.
2. THE Navbar SHALL include navigation links: Services, Who It's For, How It Works, and Contact.
3. WHEN a navigation link is clicked, THE Navbar SHALL smooth-scroll the page to the corresponding section: `#services`, `#who-its-for`, `#how-it-works`, or `#contact`.
4. WHILE the user scrolls past the top of the page, THE Navbar SHALL remain fixed at the top and display a subtle box shadow.
5. WHEN the viewport width is below 768px, THE Navbar SHALL replace the navigation links with a hamburger menu icon.
6. WHEN the hamburger menu icon is clicked, THE Navbar SHALL toggle a mobile dropdown menu showing all navigation links.
7. WHEN a mobile navigation link is clicked, THE Navbar SHALL close the dropdown menu and smooth-scroll to the target section.

---

### Requirement 3: Hero Section

**User Story:** As a site visitor, I want an impactful hero section that communicates the ServiceIS value proposition immediately, so that I understand what the service offers and feel compelled to engage.

#### Acceptance Criteria

1. THE Hero SHALL display a full-width background image fetched from Unsplash using a query relevant to IT support or device repair (e.g. `phone repair technician`).
2. THE Hero SHALL apply a dark navy overlay at approximately 0.7 opacity over the background image so that all text remains readable.
3. THE Hero SHALL use a two-column layout on desktop: left column containing text content, right column containing a 2×2 card grid.
4. WHEN the viewport width is below 768px, THE Hero SHALL stack the text content and card grid into a single column.
5. THE Hero SHALL display on the left: a badge reading "Premium home and personal IT support", a heading "Your digital life, professionally managed.", two descriptive paragraphs as specified, a primary button "Book Initial Digital Review", and a secondary outline button "Explore Services".
6. THE Hero SHALL display on the right a 2×2 grid of semi-transparent cards with labels, titles, and body text for: "For Homes", "For Individuals", "For Families", and "For Executives" as specified.
7. WHEN the Hero section loads, THE Hero SHALL animate the left text content sliding in from the left and the right cards staggering in from the right.

---

### Requirement 4: What We Do Section

**User Story:** As a site visitor, I want to see a clear overview of all ServiceIS services, so that I can understand the full scope of support available.

#### Acceptance Criteria

1. THE WhatWeDo SHALL carry the HTML id `services`.
2. THE WhatWeDo SHALL display a section label "WHAT WE DO", a heading "Premium support across your entire digital environment", and a subtext paragraph as specified.
3. THE WhatWeDo SHALL render exactly 6 service cards in a 3-column grid on desktop, 2-column grid on tablet, and 1-column on mobile.
4. THE WhatWeDo SHALL include cards for: Initial Digital Review, Home IT Setup & Optimization, Personal Device & Account Management, Family Digital Safety Support, Ongoing IT Concierge, and Digital Audit Reports — each with the title and description as specified.
5. WHEN a service card is hovered, THE WhatWeDo SHALL lift the card and highlight its border.
6. WHEN the WhatWeDo section enters the viewport, THE WhatWeDo SHALL stagger-animate each card into view.
7. WHEN the WhatWeDo section exits the viewport, THE WhatWeDo SHALL stagger-animate each card out of view.

---

### Requirement 5: Who It's For Section

**User Story:** As a prospective client, I want to quickly identify whether ServiceIS is relevant to me, so that I can decide whether to enquire.

#### Acceptance Criteria

1. THE WhoItsFor SHALL carry the HTML id `who-its-for`.
2. THE WhoItsFor SHALL display a section label "WHO IT'S FOR" and a heading "Built for people who value trust, convenience, and digital peace of mind".
3. THE WhoItsFor SHALL use a two-column layout on desktop: left heading block and right 2-column card grid; on mobile it SHALL stack into a single column.
4. THE WhoItsFor SHALL render exactly 6 audience cards: Executives and founders, Families and households, Expats and returning residents, High-performing professionals, Individuals managing multiple devices and subscriptions, and Clients who prefer discreet, high-touch service.
5. WHEN an audience card is hovered, THE WhoItsFor SHALL apply a subtle border and background colour shift.
6. WHEN the WhoItsFor section enters the viewport, THE WhoItsFor SHALL stagger-fade each card into view.
7. WHEN the WhoItsFor section exits the viewport, THE WhoItsFor SHALL stagger-fade each card out of view.

---

### Requirement 6: How It Works Section

**User Story:** As a prospective client, I want to understand the ServiceIS onboarding process, so that I know what to expect when I engage.

#### Acceptance Criteria

1. THE HowItWorks SHALL carry the HTML id `how-it-works`.
2. THE HowItWorks SHALL use a dark navy background (`#0A0F1E`).
3. THE HowItWorks SHALL display a section label "HOW IT WORKS" and a heading "A premium process designed to feel clear and effortless".
4. THE HowItWorks SHALL render exactly 3 numbered step cards side by side on desktop and stacked on mobile: 01 Review, 02 Plan, 03 Support — each with the title and description as specified.
5. WHEN the HowItWorks section enters the viewport, THE HowItWorks SHALL slide each card upward with a staggered delay.
6. WHEN the HowItWorks section exits the viewport, THE HowItWorks SHALL reverse the slide animation with a staggered delay.

---

### Requirement 7: Why ServiceIS Section

**User Story:** As a prospective client, I want a concise statement of why ServiceIS is the right choice, so that I feel confident in the service's value.

#### Acceptance Criteria

1. THE WhyServiceIS SHALL display a section label "WHY SERVICEIS", a heading "Because your digital life deserves more than random fixes.", and a body paragraph as specified.
2. THE WhyServiceIS SHALL render its content inside a rounded card container centred on a light background.
3. WHEN the WhyServiceIS section enters the viewport, THE WhyServiceIS SHALL fade in and scale up the card container.
4. WHEN the WhyServiceIS section exits the viewport, THE WhyServiceIS SHALL reverse the fade and scale animation.

---

### Requirement 8: Preserved Sections — Values, Locations, Partners

**User Story:** As a site owner, I want the existing Values, Locations, and Partners sections preserved exactly, so that no existing content or branding is lost.

#### Acceptance Criteria

1. THE Values section SHALL retain all existing content, icons, layout, and Tailwind classes without modification.
2. THE Locations section SHALL retain all existing content, map integration, layout, and Tailwind classes without modification.
3. THE Partners section SHALL retain all existing content, logo image, layout, and Tailwind classes without modification.
4. WHEN each preserved section enters the viewport, THE Website SHALL apply a fade-in animation using the `animate-in` class.
5. WHEN each preserved section exits the viewport, THE Website SHALL apply a fade-out animation using the `animate-out` class.

---

### Requirement 9: Contact Section

**User Story:** As a prospective client, I want a beautifully styled contact and newsletter form, so that I can easily enquire about the service.

#### Acceptance Criteria

1. THE ContactSection SHALL carry the HTML id `contact`.
2. THE ContactSection SHALL use a dark navy background (`#0A0F1E`).
3. THE ContactSection SHALL use a two-column layout on desktop: left column with label, heading, body, and contact details; right column with the contact form. On mobile it SHALL stack into a single column.
4. THE ContactSection SHALL display on the left: label "CONTACT", heading "Book your initial digital review", a descriptive body paragraph, and contact details: Email `hello@serviceis.com`, Phone/WhatsApp `+234 XXX XXX XXXX`, and Availability "By appointment".
5. THE ContactSection SHALL render a form with fields: Full Name, Email Address, Phone/WhatsApp, Message (textarea), a newsletter opt-in checkbox labelled "Keep me updated with tips and service news", and a submit button labelled "Enquire Now".
6. THE ContactSection form SHALL submit via HTTP POST to `https://formsubmit.co/ictweare.support@ictweare.com`.
7. THE ContactSection form inputs SHALL display a glowing focus state and rounded corners on a dark card background with light-coloured input fields.
8. WHEN the ContactSection enters the viewport, THE ContactSection SHALL animate the left column fading in from the left and the form sliding in from the right.
9. WHEN the ContactSection exits the viewport, THE ContactSection SHALL reverse both animations.

---

### Requirement 10: Global Scroll Animations

**User Story:** As a site visitor, I want smooth, lightweight scroll animations throughout the page, so that the experience feels polished and premium without performance degradation.

#### Acceptance Criteria

1. THE Website SHALL use the Intersection_Observer API for all scroll-triggered animations — no heavy third-party animation libraries.
2. WHEN an observed element enters the viewport, THE Website SHALL apply the `animate-in` CSS class to that element.
3. WHEN an observed element exits the viewport, THE Website SHALL apply the `animate-out` CSS class to that element.
4. THE Website SHALL define `animate-in` as a transition to opacity 1 and translateY 0 from opacity 0 and translateY 20px.
5. THE Website SHALL define `animate-out` as a transition to opacity 0 and translateY 20px from opacity 1 and translateY 0.
6. THE Website SHALL apply staggered delays of 100ms per card for all card grid animations.
7. THE Website SHALL use a transition duration of 500ms with ease-in-out timing for all animations.

---

### Requirement 11: Responsiveness

**User Story:** As a site visitor on any device, I want the layout to adapt cleanly to my screen size, so that I can use the site comfortably on mobile, tablet, or desktop.

#### Acceptance Criteria

1. WHEN the viewport width is below 768px, THE Website SHALL render all multi-column grids as single-column stacked layouts.
2. WHEN the viewport width is between 768px and 1024px, THE Website SHALL render card grids as 2-column layouts and condense the navigation.
3. WHEN the viewport width is above 1024px, THE Website SHALL render the full desktop layout as described in each section requirement.
4. THE Website SHALL not produce horizontal scroll at any viewport width.
5. THE Website SHALL use a mobile-first CSS approach, building up from the smallest breakpoint.

---

### Requirement 12: Design System

**User Story:** As a site visitor, I want a consistent visual identity across all new sections, so that the site feels cohesive and premium.

#### Acceptance Criteria

1. THE Website SHALL use deep navy (`#0A0F1E`) as the primary dark background colour for dark sections (Hero overlay, HowItWorks, ContactSection).
2. THE Website SHALL use clean white and light grey tones for light-background sections (WhatWeDo, WhoItsFor, WhyServiceIS).
3. THE Website SHALL use the existing font family already configured in the project without introducing a new font dependency.
4. THE Website SHALL not introduce duplicate or conflicting Tailwind configuration entries.
