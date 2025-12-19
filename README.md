# BedVista — why are you here?

A one-page, black-and-white landing built with Next.js 16, Tailwind v4, and shadcn-style UI primitives. Visitors can tell us why they landed on bedvista.com, and the note is emailed to us via Resend + React Email.

## Setup

1) Install dependencies

```bash
npm install
```

2) Copy environment values and add your own keys/addresses

```bash
cp .env.example .env.local
```

Required keys:

- `RESEND_API_KEY` – your Resend API key
- `RESEND_FROM` – verified sender (e.g. hello@bedvista.com)
- `RESEND_TO` – comma-separated recipients

3) Run the site locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page. The form posts to `/api/why`; you can also hit it directly:

```bash
curl -X POST http://localhost:3000/api/why \
  -H "Content-Type: application/json" \
  -d '{ "reason": "Found your domain and got curious", "contact": "me@example.com" }'
```
