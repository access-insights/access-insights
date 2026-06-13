# Codex Website Brief: Access Insights Expanded Site

Last updated: 2026-06-13

## Project Goal

Create a new multi-page Access Insights website experience that inherits the current site's brand and accessibility quality while broadening the messaging to reflect the current Access Insights strategy, research platform, participant programs, and partner programs.

The new direction should synthesize:

- Production site on `main`: mission-centered language that resonates with disability, accessibility, inclusive UX, and aligned community audiences.
- Staging site on `staging`: sharper corporate-client language for paying product, research, and innovation teams.
- Current strategy docs: Access Insights as inclusive innovation infrastructure and a research platform worthy of philanthropic and foundation investment.
- Research Platform repo: the implementation and design model for participant registration, partner onboarding, research operations, privacy, governance, community engagement, partner value, and future intelligence layers.

## Branch And Deployment Context

- GitHub repo: `https://github.com/access-insights/access-insights`
- Local repo: `/home/darryl-adams/access-insights-website`
- Production branch: `main`
- Staging branch: `staging`
- Working branch: `feature/research-platform-website`
- Deployment platform: Netlify
- Stack: static HTML/CSS/JS
- Tests: Playwright accessibility and smoke tests
- Related implementation repo: `/home/darryl-adams/research-platform`
- Related GitHub repo: `git@github.com:access-insights/research-platform.git`

## Audience Priority

Primary:

- Philanthropic foundations
- Mission-aligned funders
- Accessibility and disability innovation funders
- Organizations interested in inclusive research infrastructure

Secondary:

- Corporate innovation, product, UX, AI, accessibility, and inclusive design teams
- Potential research sponsors and partners
- Disability organizations, community leaders, and participant networks

Important balance:

- The corporate-client model remains relevant, but it should not dominate the site's center of gravity.
- The site should make Access Insights feel credible, rigorous, scalable, and deeply connected to the communities it serves.
- The site should not explicitly ask visitors to fund Access Insights. It should implicitly appeal to funders through credible infrastructure messaging, measurable ecosystem value, project momentum, governance maturity, and mission alignment.
- Access Insights prefers to manage a pool of aligned capital and choose research priorities internally, while also appearing clearly available for bespoke paid research from corporate, nonprofit, academic, and public-sector customers.
- The broad positioning should be research innovation infrastructure, not disability-only infrastructure. Access Insights recognizes and values human variability and works to ensure research insights represent the full spectrum of human experience.

## Strategic Messaging Direction

The expanded site should communicate that Access Insights:

- Builds real-world research infrastructure with people with disabilities and older adults.
- Connects product teams, funders, and communities through structured participant and partner programs.
- Turns accessibility from a late-stage compliance exercise into a source of innovation, adoption, and market expansion.
- Creates durable value for participants, partners, funders, and companies.
- Offers a platform model that can scale across research programs, Living Labs, sponsored projects, and mission-aligned initiatives.
- Is building research innovation infrastructure: trusted systems, communities, data practices, partner networks, research workflows, and an intelligence layer for repeatable human-centered innovation.
- Is on the side of humans in a market where technology is changing faster than people, bodies, support needs, trust, cognition, and real-world contexts change.

## Required Site Surfaces

The new sitemap and structure should include durable space for:

- Infrastructure/value proposition: prominent explanation of Access Insights as research innovation infrastructure grounded in human variability.
- Research platform: what the platform supports, including participant readiness, partner onboarding, consent, privacy, research operations, surveys, reporting, and future intelligence.
- Participant program: a clear path for people with disabilities, aging adults, caregivers, support professionals, and others with relevant lived experience to join the research community.
- Partner network: a clear path for organizations, independent professionals, funders, community groups, academic groups, and companies to join or apply.
- Current projects: a showcase for active or recent Access Insights work, pilots, Living Labs, research initiatives, and proof points.
- Articles/insights: a place to highlight research-related writing. Explore whether an Access Insights Substack exists and whether to embed, syndicate, or link to it. No reliable Substack URL has been confirmed yet.
- Proto-Lab: a section for Access Insights-originated internal projects that can be given back to the community as open source solutions. Initial candidates include UnisonOS and likely Virtual Lex. This may later become a separate nonprofit arm, so the structure should be able to grow without confusing the core Access Insights business.
- Team and credibility: preserve the credibility of the current team presentation while aligning it to the broader infrastructure story.

## Primary Visitor Paths

The site should make these paths prominent from the homepage and navigation:

- Understand the infrastructure model and explore strategic collaboration.
- Join the research participant program.
- Join the partner network.
- Explore current projects.
- Explore Proto-Lab.
- Read articles or research notes.
- Contact Access Insights.

The participant and partner CTAs should not be buried behind generic contact language. They should feel like first-class program entry points connected to `research.accessinsights.net` when the platform routes are ready for public traffic.

## Research Platform Context

The related research-platform repo describes the platform as operating infrastructure for ethical, accessible, scalable research across Living Labs, partner communities, event activations, direct participant recruitment, long-term participant engagement, and future AI-assisted research operations.

Important implementation-backed concepts from `/home/darryl-adams/research-platform`:

- Participant registration and participant self-service.
- Research readiness profiles that reduce repeated intake.
- Communication preferences and consent history.
- Participant dashboard concepts including program progression, contributions, referrals, surveys, compensation readiness, support, and privacy request paths.
- Partner registration and partner dashboard concepts.
- Partner roles, levels, referrals, pipeline opportunities, Access Stats, and aggregate community insight access.
- Internal operations for partner review, participant review, research workflows, consent, privacy, projects, and reporting.
- Privacy, security, retention, deletion, row-level security, auditability, and environment separation.
- Future knowledge/intelligence layer built from consent-governed research activity, Access Stats, surveys, project outputs, and pipeline signals.

Initial research-platform docs inspected:

- `/home/darryl-adams/research-platform/README.md`
- `/home/darryl-adams/research-platform/docs/design/01-product-vision-and-mvp-scope.md`
- `/home/darryl-adams/research-platform/docs/strategy/disability-innovation-infrastructure.md`
- `/home/darryl-adams/research-platform/docs/strategy/participant-community-value-strategy.md`
- `/home/darryl-adams/research-platform/docs/strategy/partner-network-value-strategy.md`
- `/home/darryl-adams/research-platform/docs/strategy/platform-demo-narrative.md`

## Initial Six-Phase Plan

### Phase 1: Strategy And Source Inventory

- Compare `main` and `staging` messaging.
- Inventory relevant OneDrive strategy docs.
- Inventory relevant research-platform repo docs.
- Identify current public URLs and readiness for participant and partner program CTAs.
- Verify whether Access Insights has an active Substack or other article publishing channel.
- Extract audience, positioning, offering, and proof-point themes.
- Identify missing claims, evidence gaps, and content risks.
- Preserve the constraint that funder appeal should be implicit rather than a direct funding ask.

### Phase 2: Sitemap And Content Architecture

- Propose a multi-page sitemap.
- Include required surfaces for infrastructure, platform, participant program, partner network, current projects, articles/insights, Proto-Lab, team/credibility, and contact.
- Define each page's primary audience, job, narrative arc, and calls to action.
- Identify reusable content sections and page templates.

### Phase 3: Page-Level Messaging

- Draft page outlines.
- Preserve current brand voice where it works.
- Expand funder, platform, participant, and partner messaging.
- Draft page outlines for current projects, articles/insights, and Proto-Lab.
- Keep corporate sponsor language clear but secondary.

### Phase 4: Visual And Interaction Structure

- Translate the sitemap into page structures and responsive layouts.
- Reuse the current brand system and visual atmosphere.
- Add navigational depth without making the site feel heavy.

### Phase 5: Implementation

- Build the multi-page static site.
- Preserve accessibility standards.
- Update CSS/JS only as needed.
- Add or update tests for new pages and navigation.

### Phase 6: Review, Local Preview, And Deployment Prep

- Run local preview.
- Run accessibility and smoke tests.
- Review content for funder fit, mission alignment, and clarity.
- Prepare Netlify/staging deployment and PR notes.

## Open Questions

- Which foundations or funder archetypes should the first version speak to most directly?
- Should infrastructure/funder appeal live in a platform page, impact page, or partner/collaboration page?
- What conversion path should mission-aligned funders take without creating an explicit "fund us" ask: strategic collaboration inquiry, meeting request, downloadable brief, or direct email?
- Which participant program details are ready for public messaging?
- Which research-platform claims need more evidence before publishing?
- What is the correct public URL for participant program registration?
- What is the correct public URL for partner network application?
- Does Access Insights have an active Substack or should the site start with a local articles page and add syndication later?
- Which current projects are approved for public showcase?
- How should Proto-Lab be framed now so it can later evolve into a separate nonprofit arm without over-promising?
