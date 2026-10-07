# Oracle Frontend (Vercel)

Static HTML/CSS/JS for **Sanjaya's Oracle — The Second Trial**.

The browser only talks to **this** domain. Vercel's `vercel.json` proxies
`/api/*` server-side to the Render backend, so there is no CORS setup and the
answers/flag never appear in the page source.

## Configure the backend URL

Open `vercel.json` and replace the destination host with your Render URL:

```json
{
  "source": "/api/:path*",
  "destination": "https://YOUR-SERVICE.onrender.com/api/:path*"
}
```

## Deploy on Vercel

1. Import this folder as a project (Framework preset: **Other**, no build step).
2. Deploy. Pages: `/`, `/level2`, `/level3`, `/level4`, `/level5`.
3. `vercel.json` also maps the legacy `.php` URLs to the `.html` pages.

## Local test

Serve this folder and point the proxy at a local backend, e.g.:

```bash
python3 -m http.server 8000
```

(The `/api/*` proxy only works on Vercel; locally you'd hit the backend
directly. This is expected.)
