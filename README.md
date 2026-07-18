# Mira Waitlist

Marketing landing page + 3-step waitlist form for Mira, an AI voice
receptionist for Airbnb hosts, boutique hotels, and vacation rental
operators.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + hand-rolled shadcn/ui-style primitives (`src/components/ui`)
- Framer Motion for step transitions and the success-screen checkmark
- [Web3Forms](https://web3forms.com) for the actual submission — no
  backend to deploy. The browser posts the form data straight to
  Web3Forms, which emails the answers to `miraoncall@gmail.com`.

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Web3Forms access key
npm run dev
```

Visit http://localhost:3000. Without `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
set, the final submit will no-op with a console warning and show a
"Something went wrong" message — everything else in the flow still
works for UI development.

## Environment variables

See `.env.example`.

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Access key from your Web3Forms dashboard |
| `DEMO_VIDEO_URL` | Success-screen video source (defaults to `/demo-video-placeholder.mp4`) |

## Do you need a backend?

No. Web3Forms is a hosted form-submission service — the browser POSTs
directly to `https://api.web3forms.com/submit` with your access key,
and Web3Forms emails the result to `miraoncall@gmail.com`. There's no
database and nothing else to deploy beyond the Next.js app itself
(e.g. to Vercel).

## How the submission works

The wizard doesn't submit anything until the visitor reaches a true
end point — either:

- **Skip** on the interstitial right after Step 1 (submits just the
  Step 1 fields), or
- **Finish** at the end of Step 3 (submits everything from all three
  steps).

Every "Next" button in between only advances the wizard locally — no
network request happens until one of those two end points. See
`src/lib/web3forms.ts` for the single `submitWaitlistAnswers()` call
and `src/components/waitlist/waitlist-wizard.tsx` for where it's
wired in.

## Architecture notes

- `src/lib/web3forms.ts` is the only file that knows about Web3Forms —
  swap providers there without touching the step components.
- `src/components/waitlist/waitlist-wizard.tsx` — orchestrates the
  step1 → interstitial → step2 → step3 → success flow, lifts state so
  back-navigation doesn't lose entered data, and fires the one
  Web3Forms submission at the end.
- Required questions show a red `*` after the label
  (`src/components/waitlist/field.tsx`); everything else is optional.

## Placeholder assets

- `public/demo-video-poster.svg` — success-screen video poster.
- `DEMO_VIDEO_URL` defaults to `/demo-video-placeholder.mp4`, which
  doesn't exist yet. The video component detects the load failure and
  falls back to a "Demo video coming soon" state — drop the real file
  in `public/` (or point `DEMO_VIDEO_URL` elsewhere) when it's ready,
  no code changes needed.

## Deployment

`vercel.json` pins the framework/build commands so Vercel builds this
correctly regardless of dashboard defaults. To connect the repo:

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In the [Vercel dashboard](https://vercel.com/new), "Import Project"
   and select the repo — Vercel reads `vercel.json` automatically.
   (Or from the CLI: `npx vercel link` from this directory.)
3. In the project's Settings → Environment Variables, add
   `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (and optionally `DEMO_VIDEO_URL`).
4. Deploy.
