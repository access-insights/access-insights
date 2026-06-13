# Phase 2 Sitemap And Content Architecture

Last updated: 2026-06-13

## Direction

The expanded Access Insights site should become a lightweight multi-page static site that feels like one coherent Access Insights experience. It should preserve the current visual identity, editorial tone, accessibility quality, and team credibility while making the research platform, participant program, partner network, current projects, Proto-Lab, and Articles & Insights discoverable.

The site should not directly ask for funding. It should be attractive to funders through infrastructure credibility, visible strategy, trust, governance, current work, and ecosystem value. It should also make bespoke paid research easy to understand and initiate.

The broad positioning should be research innovation infrastructure, not disability-only infrastructure. Access Insights recognizes and values human variability, and ensures that research insights represent the full spectrum of human experience. Disability, accessibility, and aging remain central strengths, but the site should appeal to a broad array of customers and partners building technology, services, and experiences for human consumption, adoption, interaction, and engagement.

## Recommended Top Navigation

- Platform
- Programs
- Research Services
- Lab & Insights
- About
- Contact

Navigation notes:

- `Programs` should be a real page, not only a grouping. It should cover positioning, value, and why someone would want to participate before routing visitors to the Participant Program and Partner Network.
- `Lab & Insights` is the recommended summary container label for nested/discoverable content: Current Projects, Articles & Insights, and Proto-Lab. If implementation avoids dropdown navigation for simplicity, this can be a landing page with cards to the three destinations.
- `Contact` should support strategic collaboration and bespoke research inquiries without using donation or funding language.
- Every navigation pattern must be WCAG 2.2 AA compliant, screen reader accessible, keyboard navigable, and responsive across display sizes. Avoid hover-only menus. If nested navigation is used, it must support keyboard open/close, Escape behavior, focus management, visible focus, and clear ARIA state.

## Proposed Sitemap

### Home: `/`

Audience: all visitors.

Job: establish the big idea quickly: Access Insights builds research innovation infrastructure that helps technology, services, and experiences stay grounded in the full spectrum of human experience.

Primary CTA: Explore the platform.

Secondary CTAs: Join the participant program; Join the partner network; Start a research conversation.

Core sections:

- Hero: technology is moving fast, humans are still human.
- Infrastructure value proposition.
- Participant and partner program entry cards.
- Research platform preview.
- Bespoke research/services preview.
- Current projects preview.
- Proto-Lab preview.
- Articles & Insights preview.
- Team credibility preview.
- Strategic collaboration/contact band.

### Platform: `/platform.html`

Audience: funders, strategic partners, corporate research buyers, ecosystem allies.

Job: explain Access Insights as research innovation infrastructure that values human variability and turns lived experience into credible, ethical, actionable research.

Primary CTA: Explore strategic collaboration.

Secondary CTA: Start a research conversation.

Core sections:

- What research innovation infrastructure means.
- Why fast technology change increases the need for human-centered research.
- Platform layers: community, partner, operations, governance, pipeline, knowledge.
- Trust model: consent, privacy, accessibility, de-identified insight, no participant data sales.
- How value compounds over time.
- Link to research platform public app: `https://research.accessinsights.net`.

### Programs Overview: `/programs.html`

Audience: participants, partners, funders, collaborators.

Job: show that Access Insights operates structured programs, not one-off interactions.

Primary CTA: Choose a program path.

Core sections:

- Why participate: stronger research, better technology, visible community impact, and more representative insight.
- Human variability as the reason the programs exist.
- Participant Program overview.
- Partner Network overview.
- How participant and partner programs work together.
- Program trust commitments.
- Links to participant and partner pages.

### Participant Program: `/participant-program.html`

Audience: people with disabilities, aging adults, caregivers, support professionals, referral partners.

Job: invite people to join a respectful, accessible, consent-based research community.

Primary CTA: Join the participant program.

Secondary CTA: Learn how participation works.

Core sections:

- Who the program is for.
- What participation can include: readiness profile, surveys, interviews, usability studies, referrals, future advisory paths.
- What participants receive: relevant opportunities, reduced repeated intake, consent visibility, preferences, support, potential compensation.
- Privacy and choice commitments.
- What happens after joining.
- Public URL: `https://research.accessinsights.net`.

### Partner Network: `/partner-network.html`

Audience: community organizations, disability organizations, academic groups, funders, companies, independent professionals.

Job: invite organizations and professionals into a structured network that contributes referrals, sites, expertise, distribution, strategic collaboration, and project opportunities.

Primary CTA: Apply to the partner network.

Secondary CTA: Discuss strategic collaboration.

Core sections:

- Who partners are.
- Ways partners contribute.
- What partners receive: referral tools, community insight where appropriate, pipeline visibility, Access Stats roadmap, collaboration opportunities.
- Partner levels/contribution model.
- Trust boundaries around participant data.
- Public URL: `https://partner.accessinsights.net`.

### Research Services: `/research-services.html`

Audience: paying corporate, nonprofit, academic, and public-sector customers.

Job: clearly communicate that Access Insights is available for bespoke paid research while keeping the broader infrastructure model intact.

Primary CTA: Start a research conversation.

Core sections:

- Living Labs and in-setting pilots.
- Opportunity discovery.
- Lived experience advisory.
- Co-design and usability sprints.
- Research validation.
- Community and flash survey pilots.
- Prototyping and solution development.
- Conference research activations.
- Example engagement shapes.

### Current Projects: `/projects.html`

Audience: funders, partners, clients, participants, press, ecosystem allies.

Job: show momentum and proof through active or recent work.

Primary CTA: Explore collaboration.

Core sections:

- Project cards with status, theme, partners if approved, and public-safe summaries.
- Initial candidate projects: Living Labs Independent Living Pilot, Virtual Goalball, APH/education exploration, conference research model, research platform.
- Filter or category structure for future growth: Living Labs, research platform, accessibility R&D, conference research, community studies.

### Proto-Lab: `/proto-lab.html`

Audience: open source contributors, funders, civic tech allies, accessibility technologists, community partners.

Job: present Access Insights' internal experimental projects that may become open source community assets.

Primary CTA: Explore Proto-Lab projects.

Secondary CTA: Collaborate on a community tool.

Core sections:

- Proto-Lab positioning: applied experiments from Access Insights.
- Project cards: UnisonOS, Virtual Lex, future tools.
- How projects move from need signal to prototype to community asset.
- Open source/community contribution principles.
- Note future possibility of a separate nonprofit arm without presenting it as established.

Initial Virtual Lex framing:

- Virtual Lex is about establishing a sense of presence when someone cannot be physically present.
- The project began as a way for Lex Frieden to virtually attend a series of 35th anniversary celebrations with a realistic sense of being in the room.
- The concept combines high-precision binaural audio and cameras so Lex can hear the room as if present, see and interact with the audience, and engage directly with people asking questions.
- A physical torso with glasses-mounted camera and binaural microphones in the ears enables the remote presence experience.
- The torso can turn toward questioners for direct engagement.
- Audience members experience Lex as an avatar with animation and lip-sync matched to his actual speech.
- Supporting images and technical details can be added later.

### Articles & Insights: `/insights.html`

Audience: all strategic audiences.

Job: provide a home for research-related writing now and future Substack integration later.

Primary CTA: Read latest insights.

Core sections:

- Featured article/essay.
- Article cards with topic, date, summary, and source.
- Topic groups: disability innovation, research methods, accessibility markets, aging, AI and human adoption, Proto-Lab notes.
- Future integration: link to or ingest Substack RSS once created.

### About: `/about.html`

Audience: all visitors seeking credibility and leadership context.

Job: preserve and deepen team credibility.

Primary CTA: Meet the team.

Core sections:

- Access Insights origin and mission.
- Team bios.
- Credentials/statistics from current site, after validation.
- Why this team is unusually qualified.
- Advisory/collaboration context if approved.

### Contact: `/contact.html`

Audience: partners, clients, funders, press, participants needing human help.

Job: route inquiries clearly.

Primary CTA: Send an inquiry.

Core sections:

- Inquiry types: strategic collaboration, research services, partner network, participant support, media/speaking, Proto-Lab.
- Contact form.
- Portland, Oregon location.
- Links to participant and partner program entry points.

## Suggested Footer

- Platform
- Participant Program
- Partner Network
- Research Services
- Current Projects
- Proto-Lab
- Articles & Insights
- About
- Contact
- Privacy
- Accessibility

## Phase 3 Content Priorities

Draft page copy in this order:

1. Home.
2. Platform.
3. Participant Program.
4. Partner Network.
5. Research Services.
6. Current Projects.
7. Proto-Lab.
8. Articles & Insights.
9. About.
10. Contact.

## Open Decisions

- Confirm which current projects can be named publicly.
- Confirm whether `About` should remain top-level or move to footer.
- Confirm whether `Lab & Insights` is the preferred top-level label for the nested Current Projects, Articles & Insights, and Proto-Lab group.
- Confirm whether nested navigation should be a keyboard-accessible menu or a top-level landing page with no dropdown.
- First implementation should build all pages.

## Accessibility And Responsive Requirements

Implementation must preserve or improve the current site's accessibility baseline:

- WCAG 2.2 AA minimum for all pages and navigation.
- Semantic landmarks: skip link, header/nav, main, footer.
- One clear `h1` per page.
- Keyboard navigable top navigation, nested navigation if used, forms, cards, buttons, and links.
- No hover-only disclosure patterns.
- Visible focus indicators with sufficient contrast.
- Screen reader accessible names, states, and relationships for controls.
- Responsive layout across mobile, tablet, desktop, and large displays.
- Text must not overlap, clip, or require horizontal scrolling.
- Menus must support Escape close and predictable focus return.
- Respect reduced motion preferences.
- Preserve high contrast and readable typography.
