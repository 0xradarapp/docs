# 0xRadar Documentation

Mintlify documentation site for [0xRadar](https://0xradar.app).

## Local preview

Requires Node.js 18+.

```bash
npm i -g mintlify
mintlify dev
```

The dev server starts at http://localhost:3000.

## Project structure

```
.
├── mint.json
├── openapi.json (optional)
├── getting-started/
│   ├── introduction.mdx
│   ├── quickstart.mdx
│   ├── authentication.mdx
│   └── rate-limits.mdx
├── api/
│   ├── health.mdx
│   ├── chains.mdx
│   ├── wallet-balances.mdx
│   ├── wallet-portfolio.mdx
│   └── sweep-quote.mdx
├── sdks/
│   ├── python.mdx
│   └── typescript.mdx
├── guides/
│   ├── monitoring-positions.mdx
│   └── sweep-recovery.mdx
└── pricing.mdx
```

## Deploy

### 1. Push to GitHub

Create a repository named `docs` under the `0xradarapp` org and push:

```bash
cd /Users/volkan/Desktop/aiprojects/0xradar/docs-site
git init
git add .
git commit -m "init: mintlify docs"
git remote add origin git@github.com:0xradarapp/docs.git
git push -u origin main
```

### 2. Connect to Mintlify

1. Go to [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. Sign in with GitHub
3. Click **Add Repository** and select `0xradarapp/docs`
4. Mintlify auto-deploys on every push to main

### 3. Custom domain

In the Mintlify dashboard:
1. Navigate to **Settings → Custom Domain**
2. Enter `docs.0xradar.app`
3. Mintlify will provide a target CNAME value

### 4. DNS (Cloudflare)

In Cloudflare dashboard for `0xradar.app`:
1. Add a CNAME record:
   - **Name:** `docs`
   - **Target:** value from Mintlify dashboard
   - **Proxy status:** DNS only (gray cloud, **not orange**)
   - **TTL:** Auto
2. Wait 1–5 minutes for propagation
3. Click **Verify** in the Mintlify dashboard

## Verification

```bash
dig docs.0xradar.app +short
# → should return mintlify subdomain

curl -I https://docs.0xradar.app
# → should return 200 OK with Mintlify headers
```

## Contributing

1. Create a branch: `git checkout -b feat/update-endpoint`
2. Edit MDX files
3. Preview locally: `mintlify dev`
4. Open a PR to `main`
5. Merge — Mintlify auto-deploys
