# Wedding Invitation (static)

This is a minimal, accessible single-page static wedding invitation scaffold.

Features
- Hero/landing with names, date, tagline
- Our Story (timeline + photos)
- Wedding events list
- Embedded Google Map + directions button
- Gallery with lightbox
- Live JS countdown (days, hours, minutes, seconds)
- Wedding party cards
- RSVP (UI-only form) + contact details
- Add to Calendar (.ics generator)
- Responsive CSS, simple accessible markup

How to use
1. Replace placeholder text (names, dates, venues) in `index.html`.
2. Update the wedding date/time in `js/main.js` (two places: countdown and .ics start/end).
3. Add real images to `/assets/` and update `src` attributes (hero.jpg, photo1.jpg, ...).
4. Replace the Google Maps iframe src with the official embed for your venue, or use the provided directions link.

Deploy
- You can host this repository on GitHub Pages. Push the files to the `main` branch and enable GitHub Pages in the repository settings (choose root `/` as source).

Accessibility & notes
- Navigation supports keyboard and focus management for sections.
- The RSVP form is UI-only; for real RSVPs either wire to a backend, use a third-party form provider, or add an action to email submissions.
- The Add to Calendar creates a simple .ics file; for production you might want separate links for Google Calendar, Outlook, and Apple Calendar.

Customizations you might want next
- Replace placeholder images with high-quality compressed images.
- Add animations (e.g., fade-in on scroll) using IntersectionObserver.
- Add multilingual support or printable version.
- Hook RSVP to a serverless function, Google Forms, or email service.

Enjoy — if you'd like, I can:
- generate image placeholders for assets,
- add micro-interactions (fade-in timeline),
- or create a GitHub Pages action and CI to build/publish the site automatically.
