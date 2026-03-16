# Empowering Youth Website – User Manual (Admin)

This guide is for Empowering Youth staff who update content and handle enquiries on the website.

## 1. Key Information

- **Website type:** Static HTML + Tailwind CDN + Alpine.js
- **Tech partner / developer:** (fill in your details)
- **Official contact email:** empoweringyouthkzn@gmail.com
- **Phone:** 071 349 7282
- **Registered NPO:** 242-292 (Non-Profit Organisations Act, 1997)

## 2. What You Can Update Easily

You can edit most content without coding knowledge by updating simple text files.

- **Events & News** – `data/events.json`, `data/news.json`
- **Programs** – `programs.html` (headings and paragraphs)
- **Partners** – `data/partners.json`
- **Gallery** – `data/gallery.json`
- **Testimonials** – `data/testimonials.json`
- **Bank details & Priority Service** – `index.html` and `get-involved.html`
- **Contact details** – `contact.html` and footer sections

> Tip: Always keep a backup copy of files before editing.

## 3. Updating Events & News

1. Open the project folder in VS Code or any text editor.
2. Open `data/events.json`.
3. Each event looks like this:

```json
{
  "title": "NSFAS Application Drive — Georgetown Library",
  "slug": "nsfas-application-drive-georgetown",
  "date": "2025-11-08T09:00:00+02:00",
  "location": "Georgetown Library",
  "category": "Education",
  "excerpt": "Short summary visible in the list.",
  "content": "Full description shown in the modal.",
  "image": "https://...jpg"
}
```

4. **To add an event**, copy one block, paste below, and change the values.
5. Categories available are: `Education`, `Health`, `Civic`, `Sports` (used for filtering).
6. Save the file and refresh `events.html` in your browser.

`data/news.json` works the same way but without `location` and `category`.

## 4. Updating Programs

Most programme text is in `programs.html`.

- Sections:
  - My Career, My Future
  - Sizophumelela Youth Empowerment Initiative
  - Capacity Building, Health & Human Rights Advocacy
  - Education Support Initiatives

You can safely edit only the **text inside `<p>` and `<li>` tags**.
Avoid changing class names like `class="font-heading ..."`.

## 5. Updating Partners

1. Open `data/partners.json`.
2. Each partner has `name` and `logo`:

```json
{"name": "LifeLine PMB", "logo": "https://..."}
```

3. Add or remove items as needed.
4. Logo can be an external URL or a local file placed in `assets/`.

## 6. Updating the Gallery

1. Open `data/gallery.json`.
2. Each image has:
   - `src` – image URL
   - `alt` – short description (for accessibility)
   - `caption` – text under the photo
   - `tag` – one of `Events`, `Outreach`, `Workshops`, `Sports`, `Career Expos`

3. Add new entries or remove old ones.

## 7. Handling Form Submissions

Forms are wired for **Netlify Forms** by default.

- Forms:
  - Volunteer (`name="volunteer"`)
  - Partner (`name="partner"`)
  - Event signup (`name="event-signup"`)
  - Contact (`name="contact"`)
  - Newsletter (`name="newsletter"` + `newsletter-modal`)

### On Netlify

1. After deployment, open your Netlify site dashboard.
2. Go to **Forms**.
3. You will see submissions grouped by form name.
4. Configure email notifications in **Forms → Notifications**.

If you host elsewhere, your developer may need to connect forms to a different service.

## 8. Bank Details and Priority Service

Banking details appear in:

- `index.html` – Priority Application Service block
- `get-involved.html` – Donations section

When bank details change:

1. Search for `Standard Bank` in the project.
2. Update account name, number, and type in both files.

## 9. Contact & Address

- Update contact info in `contact.html` and the footer blocks in all pages.
- Official details used now:
  - Email: `empoweringyouthkzn@gmail.com`
  - Address: `Starling Rd, Eastwood, Pietermaritzburg, 3201, South Africa`
  - Phone: `071 349 7282`

## 10. Changing Images and Logo

- Replace `EmpoweringYouthLogo.jpg` in the project root to update the logo.
- Ensure the new file keeps the **same name**.
- For hero and programme images, edit the image URLs in `index.html`, `programs.html`, and JSON files.

## 11. Accessibility Tips

- Always fill in `alt` text for new images.
- Keep headings in logical order (H1 → H2 → H3).
- Avoid using all-caps for long sentences (screen readers).

## 12. Getting Help

If something breaks:

1. Restore from the backup copy of the file.
2. Check that JSON uses **valid commas and quotes**.
3. Ask your developer or tech partner for support, sending the file that changed.
