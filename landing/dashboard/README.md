# 0xRadar — User Dashboard

> Self-service dashboard for 0xRadar API users. Manage API keys, view usage stats, control subscription, and test the API.

## File Structure

```
landing/dashboard/
├── login.html            # Email + API key login page
├── dashboard.html        # Main dashboard (stats, keys, usage, sub)
├── settings.html         # Account settings, notifications, delete
├── assets/
│   ├── dashboard.css     # Shared design system CSS
│   ├── auth.js           # Authentication (login/logout/session)
│   ├── api.js            # API client (all backend endpoints)
│   ├── i18n.js           # Internationalization (EN + TR)
│   └── chart-loader.js   # Chart.js helper utilities
└── README.md             # This file
```

## Quick Start (Local Testing)

### No build step required — vanilla HTML/CSS/JS

1. **Start a local server** (required for some browser features):
   ```bash
   # Python
   cd landing/dashboard
   python3 -m http.server 8080

   # Or Node.js
   npx serve .
   ```

2. **Open in browser:**
   ```
   http://localhost:8080/login.html
   ```

3. **Enable demo/mock mode:**
   - Add `?mock` to URL: `http://localhost:8080/login.html?mock`
   - Or run in browser console: `localStorage.setItem('0xr_mock_mode', 'true')`
   - This bypasses backend and uses mock data so you can see the UI without a live API

## What Is Mocked vs Real

### Mocked (no backend required):
- User info and session (demo user: `dev@0xradar.app`)
- API key list (2 mock keys)
- Usage statistics (7 days of random data)
- Rate limit status
- Subscription info (Pro monthly, renews in 30 days)
- Payment history (3 mock orders)
- New key generation (generates fake key, shows once)
- Key reveal (returns fake plaintext key)
- Key revocation (removes from local list)

### Requires real backend:
- Login authentication (magic link / email+key)
- Actual API key CRUD operations
- Real usage stats from database
- Real subscription status from payment provider
- Real order history from payment provider
- Real email change (verification flow)
- Account deletion (GDPR)

## Mock Mode

To test the dashboard without any backend connection:

1. Open `login.html?mock` (or any page with `?mock` param)
2. Login with any email + any API key (16+ chars)
3. The dashboard will populate with realistic mock data

To enable mock mode programmatically:
```javascript
localStorage.setItem('0xr_mock_mode', 'true');
```

To disable:
```javascript
localStorage.removeItem('0xr_mock_mode');
```

## API Endpoints Expected (Backend)

The dashboard expects these backend endpoints (not all implemented yet — see backend review):

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/auth/login` | POST | Email + API key login |
| `/v1/auth/verify` | POST | Magic link token verify |
| `/v1/auth/logout` | POST | Session logout |
| `/v1/me` | GET | Current user info |
| `/v1/me` | PUT | Update user info |
| `/v1/me/api-keys` | GET | List user's keys (hashed) |
| `/v1/me/api-keys` | POST | Generate new key |
| `/v1/me/api-keys/{id}` | DELETE | Revoke key |
| `/v1/me/api-keys/reveal/{id}` | POST | Reveal key (once, 5-min window) |
| `/v1/me/usage?days=7` | GET | Usage stats |
| `/v1/me/rate-limit` | GET | Current rate limit status |
| `/v1/me/subscription` | GET | Subscription details |
| `/v1/me/orders` | GET | Payment history |
| `/v1/me/checkout` | POST | Create checkout session |
| `/v1/me/account` | DELETE | Delete account (GDPR) |

## Design System

**Colors:**
- Background primary: `#0A0E27`
- Card background: `#12153A`
- Accent (cyan): `#00D1FF`
- Text primary: `#FFFFFF`
- Text secondary: `#8B93B0`
- Border: `rgba(255,255,255,0.07)`

**Typography:**
- Font: Inter (Google Fonts), fallback system-ui
- Mono: JetBrains Mono (for code/API keys)

**Layout:**
- Sidebar: 240px fixed
- Header: 64px sticky
- Card border-radius: 14px
- Button border-radius: 10px

## Theme

Dark mode is default. Light mode toggle available in header.

Toggle persists in `localStorage` under `0xr_theme`.

## Internationalization (i18n)

All UI strings are in `assets/i18n.js` under `LOCALES.en` and `LOCALES.tr`.

To add a new locale:
1. Add entry to `LOCALES` object in `i18n.js`
2. Set locale: `I18n.setLocale('de')`

Current locales: `en`, `tr`

## Security Notes (MVP)

- API key stored in `localStorage` (base64 encoded, not encrypted) — acceptable for MVP
- Session TTL: 7 days (stored in `localStorage`)
- Real production should use httpOnly cookies + same-site strict
- Reveal API key requires recent auth (not fully enforced in MVP)
- XSS prevention: all user-generated content uses `textContent` not `innerHTML`
- CSRF: not implemented (backend needs to handle)

## Navigation

| Page | URL | Purpose |
|---|---|---|
| Login | `/login.html` | Email + API key auth |
| Dashboard | `/dashboard.html` | Main: stats, keys, usage, sub, playground |
| Settings | `/settings.html` | Email, notifications, delete account |

## Third-Party Dependencies

| Library | CDN | Purpose |
|---|---|---|
| Chart.js | jsdelivr (cdn.jsdelivr.net) | Usage line chart |
| Inter font | Google Fonts | UI typography |
| JetBrains Mono | Google Fonts | Code/mono typography |

No other external dependencies.

## Testing Checklist

- [ ] Login page loads with mock mode
- [ ] Login with any email+key → redirect to dashboard
- [ ] Dashboard shows 4 stat cards
- [ ] API keys table renders with 2 mock keys
- [ ] "Generate New Key" opens modal, shows key once
- [ ] Rate limit progress bars render
- [ ] Usage chart renders with 7 data points
- [ ] Subscription section shows plan + renewal buttons
- [ ] Playground: enter address → click Test → JSON response
- [ ] Code snippet tabs switch (cURL, Python, JS)
- [ ] Theme toggle works (dark/light)
- [ ] Language switch works (EN/TR)
- [ ] Logout → redirect to login
- [ ] Settings page loads
- [ ] Notifications toggle saves to localStorage
- [ ] Delete account confirmation works
- [ ] Mobile responsive (sidebar drawer)

## Known Limitations (MVP)

1. **Auth**: Magic link not implemented — MVP uses email + API key combo
2. **Real payments**: NOWPayments integration not connected — checkout URLs are mock
3. **Notifications**: Stored in localStorage only — not synced to backend
4. **Session**: No httpOnly cookie — localStorage token (XSS risk)
5. **Reveal auth**: 5-minute window not enforced — any authenticated user can reveal
6. **Rate limit**: Client-side only — backend should enforce too
7. **Email change**: No real verification flow — just UI placeholder