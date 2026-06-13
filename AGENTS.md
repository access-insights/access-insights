# Access Insights Website Agent Context

This repository is the public Access Insights website. Treat it as a strategic website and brand system, not just a static page.

## Current Website Sources

- Production branch: `main`
- Staging branch: `staging`
- Current expansion branch: `feature/research-platform-website`
- Deployment: Netlify
- Current stack: plain HTML, CSS, and JavaScript with Playwright accessibility tests

When planning or implementing major website changes, compare both `main` and `staging`:

- `main` preserves messaging that resonates with disability, accessibility, inclusive UX, and mission-aligned fellow travelers.
- `staging` shifts the messaging toward potential paying corporate clients.
- The next website direction must synthesize both, while prioritizing philanthropic capital, mission-aligned foundations, and partners who support Access Insights' research platform, participant programs, and partner programs.

## Strategic Source Material

Use local strategy and positioning documents from:

- `/home/darryl-adams/research-platform`
- `/home/darryl-adams/OneDrive/OpenClaw/research_platform`
- `/home/darryl-adams/OneDrive/OpenClaw/Projects/Access_Insights`
- `/home/darryl-adams/OneDrive/OpenClaw/business-strategy`
- `/home/darryl-adams/personal-context-portfolio`

Do not copy private OneDrive documents into this repository unless Darryl explicitly asks. Summarize and cite local paths in working notes instead.

Treat `/home/darryl-adams/research-platform` as a read-only source unless the user explicitly asks for platform code changes. It is the local checkout for `git@github.com:access-insights/research-platform.git` and may contain unrelated in-progress work.

## Product Direction

The expanded site should evolve from a single-page brand site into a multi-page Access Insights experience that explains:

- The mission and vision behind Access Insights
- The research platform
- Participant programs
- Partner programs
- Current projects and proof points
- Research articles or essays, including possible future Substack integration
- Proto-Lab, a space for Access Insights-originated open source projects and community tools
- Living Labs and real-world inclusive research
- Why philanthropic funders and foundations should see Access Insights as credible research innovation infrastructure
- How corporate partners can engage without making corporate-client conversion the only center of gravity

Human variability is core to the brand. Disability, accessibility, and aging remain central strengths, but the site should position Access Insights as research innovation infrastructure for organizations building technology, services, and experiences for real human use. Accessibility must be treated as product quality, market expansion, research validity, and inclusive innovation infrastructure, not as compliance-only language.

The site must include prominent paths for visitors to:

- Join the research participant program.
- Join or apply to the partner network.
- Explore the research platform and infrastructure value proposition.
- Understand current projects.
- Discover Proto-Lab open source/community projects, starting with UnisonOS and likely Virtual Lex.

## Implementation Expectations

- Preserve and evolve the existing brand language, visual styling, and accessibility quality.
- Keep the site lightweight unless a clear need emerges for a framework.
- Maintain semantic HTML, keyboard access, visible focus states, reduced-motion support, and high-contrast behavior.
- Run or update Playwright accessibility tests when implementation changes the site structure.
- Prefer durable content architecture over one-off page copy.
