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

## Contact

Email `hello@accessinsights.net`, or use the partner and research-community links on the homepage.
