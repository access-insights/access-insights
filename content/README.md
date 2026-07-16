# Editing the website: the content workflow

Every word on the site lives in one Word document: **`content/website-content.docx`**.
Nobody edits HTML. The team discusses and edits in Word, then publishes in one step.

## The workflow

1. **Put the document somewhere shared** (OneDrive or SharePoint) so everyone edits
   the same copy with Word's live co-authoring, comments, and tracked changes.
   That is where you avoid stepping on each other's toes — Word shows who is
   editing what, in real time.
2. **Discuss in the document.** Use the Notes column, comments, and tracked
   changes freely; none of it touches the website. Only the **Content** column
   is published, word for word. Never change the **Field** column.
3. **When the team agrees**, accept all tracked changes and save the document
   back into this repo as `content/website-content.docx`.
4. **Publish.** From the repo root:

   ```
   python3 content/publish.py --check    # optional dry run: validates + lists what changed
   python3 content/publish.py            # regenerates index.html from the document
   git add -A && git commit -m "Publish content" && git push origin staging
   ```

   No installs needed — the script uses only what ships with macOS.
   You can also just hand the document to Claude and say "publish this."

## What publishing does

- Reads all 106 content fields from the document's tables
- Fills `content/site-template.html` (the design: layout, images, styling, code)
- Writes a fresh `index.html` stamped with a content version, so you can
  always tell which revision of the document is live

The script refuses to publish if a field row was deleted, a key was edited,
or a Content cell was left empty, and tells you exactly which field to fix.

## Changing design vs. changing words

Words, headlines, bios, stats, CTA labels → edit the Word document, publish.
Layout, colors, images, new sections → edit `content/site-template.html`
(that's the design file; the `{{field.key}}` markers are where content lands),
then run publish to regenerate `index.html`.
