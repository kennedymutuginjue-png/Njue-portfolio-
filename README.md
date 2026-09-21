# Njue Kennedy — Portfolio

A modern, responsive developer portfolio for Njue Kennedy, built with semantic HTML5, CSS3 and minimal vanilla JavaScript. It is fully static and ready for GitHub Pages.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and the `/ (root)` folder, then save.
5. GitHub Pages will publish the site at `https://<username>.github.io/<repository>/`.

All assets use relative paths, so the site works from a project URL as well as a custom domain. Project preview images can be added later at:

- `assets/images/invoiceflow.png`
- `assets/images/dineflow.png`
- `assets/images/estatehub.png`

When those files are absent, the built-in CSS previews remain visible and no broken image icon is shown.

## Contact form

The form uses a `mailto:` action because GitHub Pages does not provide a server-side backend. Submitting it opens the visitor's configured email client.
