# Empowering Youth — Develop · Support · Connect

A mobile-first static site using Tailwind CDN + Alpine.js with JSON content seeds and Netlify Forms.

## Quick start
- Open index.html in a browser (or deploy to Netlify/Vercel).
- Update logo by replacing `EmpoweringYouthLogo.jpg` in project root.
- Edit content in `/data/*.json`.

## Colors & Fonts
- Primary: #0B6E4F
- Accent: #FFC43D
- Secondary: #0C4A8A
- Text: #0F172A
- Fonts: Poppins (headings), Nunito (body).

## Forms (Netlify)
Each form has `data-netlify="true"`. In Netlify, enable Forms to receive submissions by email and store them.
- Volunteer: name `volunteer`
- Partner: name `partner`
- Event signup: name `event-signup`
- Contact: name `contact`
- Newsletter: name `newsletter`

## Updating bank details
Find in `index.html` and `get-involved.html` under Donation sections.

## Events & News
- Edit `/data/events.json` and `/data/news.json`.
- Homepage shows latest 3 news items.

## Deployment
- Drag-and-drop this folder into Netlify for instant deploy.
- Or use Vercel (project is static, no build step).

## Analytics
Add GA or Plausible script in `index.html` head.

## Accessibility
Alt text included. Keyboard-accessible forms and buttons. Use high-contrast colors.
