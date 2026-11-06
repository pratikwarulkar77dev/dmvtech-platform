# Regression checklist — Module 10.1

Tick after applying the ZIP (`npm run dev`):

- [ ] Homepage loads; hero, services, industries, process, technology, FAQ, final CTA unchanged
- [ ] Navbar: logo + "DMV Tech Services", dropdowns, mobile menu, Get a Quote, theme toggle
- [ ] Light and dark themes on `/`, `/contact`, `/about`
- [ ] Homepage enquiry: three modes switch and keep typed data
- [ ] "Preview the WhatsApp message" expands and is readable
- [ ] WhatsApp button opens `https://wa.me/918378955975?text=...` and shows "not sent yet, press Send"
- [ ] Empty form: both buttons show validation errors, nothing opens or sends
- [ ] SMTP unset: email button disabled with the friendly message; WhatsApp works; no "developer note" anywhere
- [ ] SMTP set and server restarted: email button enabled; homepage send shows spinner then "Enquiry emailed"; mail arrives at `CONTACT_TO_EMAIL`
- [ ] Contact page `/contact?intent=quote&service=cctv-surveillance`: category pre-filled; email send works
- [ ] Wrong SMTP password: friendly failure message, no technical detail on screen
- [ ] Double-clicking the email button sends one email
- [ ] About page, founder photo, locations, Google Maps (click to load)
- [ ] Service pages: WhatsApp link per service; footer links; sitemap.xml and robots.txt
- [ ] `npm run build` and `npx tsc --noEmit` pass
