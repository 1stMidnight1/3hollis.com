# 3HOLLIS — reboot

This repository has been reset for a fresh start.

## Current status
- Single-page launch layout with hero strip images and header art.
- Custom domain `3hollis.com` served via GitHub Pages (see setup below).

## Local development
1. Open `index.html` directly in your browser, or
2. Serve the directory with any static HTTP server, for example:

```zsh
cd /path/to/3hollis.com
python3 -m http.server 8080
```

Navigate to <http://localhost:8080> to view the page.

## Deployment

GitHub Pages serves the content directly from the `main` branch root.

- Custom domain: `3hollis.com`
- DNS: point the domain's A and AAAA records to the GitHub Pages IPs per the [official docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
- Repository file `CNAME` keeps the custom domain registered with GitHub; do not remove it unless you plan to disable the domain.

## Next steps
- Flesh out the visual direction for the reboot.
- Add assets, styles, and additional pages once the new concept is ready.
