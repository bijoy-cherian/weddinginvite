// Main JS: countdown, lightbox, mobile nav, add-to-calendar
document.addEventListener('DOMContentLoaded', () => {
  /* ======== Mobile nav toggle ======== */
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (navList) navList.style.display = expanded ? 'none' : 'flex';
  });

  /* ======== Smooth scroll focus handling (for keyboard users) ======== */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // set focus for accessibility
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        window.setTimeout(()=>target.removeAttribute('tabindex'),1000);
      }
    });
  });

  /* ======== Countdown ======== */
  // Update this date/time to the wedding date/time in local timezone
  const weddingDate = new Date('2026-06-12T10:00:00'); // YYYY-MM-DDTHH:mm:ss
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, weddingDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2,'0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2,'0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ======== Lightbox ======== */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.gallery-item').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-full');
      if (!src || !lightbox || !lbImg) return;
      lbImg.src = src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  function closeLb(){
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    if (lbImg) lbImg.src = '';
  }
  lbClose && lbClose.addEventListener('click', closeLb);
  lightbox && lightbox.addEventListener('click', (e)=>{
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeLb(); });

  /* ======== Add to Calendar (generates .ics) ======== */
  const addCalendar = document.getElementById('add-calendar');
  if (addCalendar) {
    addCalendar.addEventListener('click', (e)=>{
      e.preventDefault();
      // Update event details here to match the wedding
      const title = 'Alexandra & Mateo — Wedding';
      const description = 'Join us for the wedding ceremony at St. Lucia Gardens';
      const location = 'St. Lucia Gardens, 123 Garden Lane';
      // Using the same wedding date as countdown (adjust duration as needed)
      const start = new Date('2026-06-12T10:00:00');
      const end = new Date('2026-06-12T12:00:00');
      function formatICSDate(d){ return d.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'; }
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//WeddingInvite//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@weddinginvite`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wedding-invite.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
});
