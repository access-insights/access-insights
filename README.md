# Access Insights

Static website for Access Insights, an accessibility research and design organization working with disabled people, older adults, product teams, and research partners.

## Production architecture

The production homepage is generated from a Word content document and an HTML design template:

```text
content/website-content.docx  # Source of truth for site copy
content/site-template.html    # Layout, styles, graphics, and behavior
content/publish.py            # Validates content and generates the homepage
index.html                    # Generated production homepage
images/logo.svg               # Browser icon
images/team/*.png             # Team portraits referenced by the homepage
tests/                        # Playwright production accessibility checks
```

The homepage is plain HTML, CSS, and JavaScript. Its styles and scripts are inline, its background artwork is embedded, and its only other runtime dependency is the externally hosted Montserrat font.

Historical prototypes and the older site implementation remain in the repository for reference, but are not included in the production build.

## Editing and publishing content

Edit copy in `content/website-content.docx`; do not edit generated copy directly in `index.html`. See `content/README.md` for the complete editorial workflow.

From the repository root:

```bash
python3 content/publish.py --check
python3 content/publish.py
```

Edit `content/site-template.html` for layout, styling, behavior, images, or structural changes, then run the publisher to regenerate `index.html`.

## Local development

Install dependencies and serve the repository:

```bash
npm install
npm run run
```

Open `http://localhost:8080`.

Useful validation commands:

```bash
npm test
npm run test:a11y
npm run test:smoke
npm run build
```

## Production build

`npm run build` creates `dist/` containing only the files required by the production homepage:

```text
dist/
├── index.html
└── images/
    ├── logo.svg
    └── team/*.png
```

The homepage's calls to action point to external Access Insights sites or email links, so no additional local HTML pages are currently required.

For Netlify, use:

- Build command: `npm run build`
- Publish directory: `dist`

Deployments from `main` should publish the production site.

## Accessibility

The production tests cover axe scanning, heading hierarchy, navigation anchors, skip-link behavior, mobile keyboard navigation, and local image loading. The page also includes visible focus styles, responsive reflow, reduced-motion support, high-contrast accommodations, semantic landmarks, and accessible descriptions for decorative storytelling graphics.

Automated checks support accessibility review but do not replace manual keyboard, screen-reader, zoom, contrast, and usability testing.

### Live screen-reader contract pack

The repository adopts the central `@access-insights/screen-reader-harness` at reviewed revision `80df5f6fe1585d946844988b1e47120459de8179`. Product-owned contracts live under `tests/screen-reader`; generic patterns, reader adapters, evidence handling, and finding fingerprints remain in the central harness.

The supported live-reader matrix is Windows-only:

- NVDA
- Narrator

The current `critical` suite is local, public-route, and read-only. It does not type, submit, authenticate, or change website state. Node.js 22 or newer is required for harness commands.

Validate the product contracts:

```bash
npm run screen-reader:validate
npm run test:screen-reader:contracts
```

Prepare a future run without starting a reader:

```bash
npm run screen-reader:prepare:nvda
npm run screen-reader:prepare:narrator
```

Prepared runs and evidence are written to ignored `screen-reader-results/`. Live execution must use the central `live-screen-reader-testing` workflow on an unlocked Windows test desktop with exactly one reader running. Do not treat axe or browser accessibility-tree output as live-reader evidence.

## Contact

Email `hello@accessinsights.net`, or use the partner and research-community links on the homepage.
