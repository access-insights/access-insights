# Phase 4 Visual And Interaction Structure

Last updated: 2026-06-13

## Direction

The implementation should preserve the existing Access Insights brand atmosphere: dark editorial base, gold and teal accents, refined typography, high contrast, strong whitespace, and a calm research-forward tone. The expanded site should feel richer and more navigable than the current single-page site, but still lightweight, accessible, and fast.

The site should use a consistent set of reusable static-page components rather than one-off layouts. It should remain plain HTML, CSS, and JavaScript unless a later implementation decision creates a strong reason to add a build framework.

## Information Architecture Model

Top-level pages:

- Home: `/`
- Platform: `/platform.html`
- Programs: `/programs.html`
- Research Services: `/research-services.html`
- Lab & Insights: `/lab-insights.html`
- About: `/about.html`
- Contact: `/contact.html`

Secondary pages:

- Participant Program: `/participant-program.html`
- Partner Network: `/partner-network.html`
- Current Projects: `/projects.html`
- Proto-Lab: `/proto-lab.html`
- Articles & Insights: `/insights.html`

Footer/support pages:

- Privacy: future `/privacy.html`
- Accessibility: future `/accessibility.html`

## Navigation Structure

Recommended first implementation:

- Use a top-level `Lab & Insights` landing page rather than a dropdown menu.
- Avoid nested navigation in the first build to reduce accessibility and mobile complexity.
- On `/lab-insights.html`, show clear cards linking to Current Projects, Proto-Lab, and Articles & Insights.

Top navigation links:

- Platform
- Programs
- Research Services
- Lab & Insights
- About
- Contact

Header behavior:

- Persistent site header.
- Logo links to `/`.
- Current page indicated with `aria-current="page"`.
- Mobile menu uses a real `button`, not a link.
- Mobile menu button exposes `aria-expanded`.
- Mobile menu opens on Enter and Space.
- Escape closes the mobile menu and returns focus to the menu button.
- When open, menu links are reachable in order and visible.
- Focus states must be visible against the dark background.

Skip link:

- Keep a visible-on-focus skip link to `#main-content`.
- Ensure `main` has `id="main-content"` and `tabindex="-1"` only if needed for reliable focus transfer.

## Page Template System

### Standard Page Shell

Every page should include:

- Shared `<head>` metadata structure.
- Shared header/navigation.
- `<main id="main-content">`.
- One clear `h1`.
- Shared footer.
- Shared JavaScript for navigation and progressive enhancement.

### Hero Template

Used on all pages.

Elements:

- Optional eyebrow.
- H1.
- Short supporting paragraph.
- Primary CTA.
- Optional secondary CTA.

Rules:

- H1 should be concise and page-specific.
- Hero text should not sit inside a card.
- Avoid oversized marketing hero treatment on internal pages.
- Home hero can be more prominent but should still hint at next content below the fold.

### Section Header Template

Elements:

- Eyebrow.
- H2.
- Supporting paragraph.

Use for major page sections only.

### Split Section Template

Use for strategic explanation sections.

Structure:

- Left: heading and narrative.
- Right: compact list, feature panel, or callout.

Rules:

- Avoid nested cards.
- On mobile, stack content naturally.

### Card Grid Template

Use for:

- Program cards.
- Platform layers.
- Research services.
- Project cards.
- Proto-Lab projects.
- Article cards.
- Team cards.

Rules:

- Cards should have stable spacing and predictable heading hierarchy.
- Entire card may be clickable only if the accessible name is clear and no nested interactive elements conflict.
- Prefer explicit text links/buttons inside cards for clarity.
- Use consistent card radius and border style from existing site.

### CTA Band Template

Use near page endings.

Elements:

- Short H2.
- Supporting sentence.
- One primary CTA.
- Optional secondary CTA.

Rules:

- Do not use direct funding asks.
- Use language like "Explore strategic collaboration," "Start a research conversation," or "Choose your program path."

### Trust / Governance Band

Use on Platform, Programs, Participant Program, Partner Network, and Contact.

Possible trust points:

- Consent-based participation.
- Privacy-aware workflows.
- Accessible research experiences.
- De-identified or aggregate insight.
- No participant data sales.
- Clear support paths.

## Page-Specific Structure

### Home

Recommended sections:

1. Hero.
2. Research innovation infrastructure intro.
3. Program entry cards: Participant Program and Partner Network.
4. Platform preview.
5. Research Services preview.
6. Lab & Insights preview: Current Projects, Proto-Lab, Articles & Insights.
7. Team credibility preview.
8. Closing CTA band.

Interaction notes:

- Primary homepage CTAs should be visible without relying on hover.
- Use card previews to create depth without overwhelming the homepage.

### Platform

Recommended sections:

1. Hero.
2. What research innovation infrastructure means.
3. Why human variability matters now.
4. Platform layer grid.
5. Trust model band.
6. Compounding value flow.
7. CTA band.

Interaction notes:

- Value flow can be a numbered list or simple vertical timeline.
- Avoid complex diagrams for first implementation unless accessible text equivalent is equally strong.

### Programs

Recommended sections:

1. Hero.
2. Why participate.
3. Two large program cards.
4. How participants and partners work together.
5. Program commitments.
6. CTA band.

Interaction notes:

- Program cards should clearly link to participant and partner pages.

### Participant Program

Recommended sections:

1. Hero.
2. Who this is for.
3. What participation can include.
4. What participants receive.
5. Trust and choice.
6. What happens after joining.
7. CTA band linking to `https://research.accessinsights.net`.

Interaction notes:

- External CTA should open normally in the same tab unless there is a strong reason for a new tab.
- Clearly indicate that participation is voluntary.

### Partner Network

Recommended sections:

1. Hero.
2. Who partners are.
3. Ways partners contribute.
4. Partner value.
5. Trust boundaries.
6. Partner growth model.
7. CTA band linking to `https://partner.accessinsights.net`.

Interaction notes:

- Trust boundary language should be visually prominent.

### Research Services

Recommended sections:

1. Hero.
2. Engagement overview.
3. Service card grid.
4. Example engagement shapes.
5. How infrastructure improves bespoke research.
6. CTA band to Contact.

Interaction notes:

- Keep service cards concise and scannable.
- Avoid presenting services as compliance checklists.

### Lab & Insights

Recommended sections:

1. Hero.
2. Three destination cards: Current Projects, Proto-Lab, Articles & Insights.
3. Short explanation of how projects, tools, and writing connect.
4. CTA band.

Interaction notes:

- This page acts as the accessible alternative to a complex dropdown.

### Current Projects

Recommended sections:

1. Hero.
2. Project grid.
3. Research themes or filters as static category labels.
4. CTA band.

Initial cards:

- Living Labs Independent Living Pilot.
- Virtual Goalball.
- APH / education exploration.
- Conference research model.
- Research platform.

Interaction notes:

- Use badges for status such as `Active`, `Exploratory`, `Platform`, or `Pilot`.
- Filters can be visual labels in first implementation; do not add filter JS unless needed.

### Proto-Lab

Recommended sections:

1. Hero.
2. What Proto-Lab is.
3. Project cards: UnisonOS, Virtual Lex, Future tools.
4. How ideas move from need to prototype.
5. Open source/community principles.
6. CTA band.

Interaction notes:

- Virtual Lex may need a richer feature panel later for images and technical detail.
- First implementation should keep it text-forward and extensible.

### Articles & Insights

Recommended sections:

1. Hero.
2. Featured essay placeholder or initial foundational essay card.
3. Topic cards.
4. Future publishing integration note.
5. CTA band.

Interaction notes:

- Avoid making the page feel empty. If there are no articles yet, present topic areas as upcoming editorial tracks.

### About

Recommended sections:

1. Hero.
2. Origin and mission.
3. Team grid.
4. Credentials band.
5. Why this team matters.
6. CTA band.

Interaction notes:

- Team cards should preserve LinkedIn links with clear accessible names.
- Quantitative credentials should be validated before final publication.

### Contact

Recommended sections:

1. Hero.
2. Inquiry routing explanation.
3. Contact form.
4. Program links.
5. Location/footer.

Interaction notes:

- Inquiry type should be a native `<select>` or accessible radio group.
- Form errors must be linked with `aria-describedby`.
- Invalid submission should focus the first invalid field.
- Success and error states should be announced with live regions.

## Visual System

Preserve:

- Dark base background.
- Gold accent for emphasis.
- Teal accent for secondary emphasis and directional elements.
- Cormorant Garamond for display headings.
- DM Sans for body/UI.
- Existing logo, favicon, and hero image where appropriate.

Refine:

- Reduce inline styles during implementation.
- Centralize components in CSS classes.
- Keep card radius restrained.
- Maintain high contrast for body text, links, focus states, and buttons.
- Use consistent spacing tokens across pages.

Avoid:

- Marketing-style stock sections.
- Decorative orbs or new gradient blobs beyond the existing visual language.
- Dense nested cards.
- Overly complex animation.
- Hover-only affordances.
- Single-hue monotony.

## Responsive Layout Rules

Breakpoints should support:

- Small mobile.
- Large mobile.
- Tablet.
- Desktop.
- Wide desktop.

Rules:

- Header must not overflow on mobile.
- Mobile menu should be usable with touch, keyboard, and screen reader.
- Card grids should collapse to one column on mobile.
- Two-column layouts should stack on mobile.
- Text should not overlap or require horizontal scrolling.
- CTAs should wrap cleanly.
- Touch targets should be at least 44 by 44 CSS pixels.

## Accessibility Requirements

Minimum:

- WCAG 2.2 AA.
- Semantic landmarks.
- One `h1` per page.
- Logical heading order.
- Skip link on every page.
- Keyboard reachable links, buttons, form controls, and menu controls.
- Visible focus indicators.
- Current page state with `aria-current="page"`.
- Mobile menu button with `aria-expanded`.
- No keyboard traps.
- Escape closes open menu.
- Form labels and error associations.
- Live regions for form submission status.
- Reduced motion support.
- Sufficient color contrast.

Testing expectations:

- Update Playwright smoke tests for multi-page navigation.
- Update axe accessibility tests to cover representative pages.
- Add checks for heading hierarchy, current nav state, skip link, mobile menu behavior, and contact form validation.

## Implementation Notes

- First implementation should build all pages.
- Prefer no dropdown in top navigation for the first build; use `Lab & Insights` as a landing page.
- Shared header/footer can be duplicated across static pages initially, but should use consistent markup.
- If duplication becomes painful, consider a simple build/include step later, not before the first multi-page implementation.
- Keep assets local unless a specific external publishing integration is needed.

