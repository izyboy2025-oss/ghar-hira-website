let programsExpanded = false;

// ── Theme (light/dark) toggle ──
// Light mode is the default. The inline bootstrap script in <head> already
// applied a saved 'dark' preference (if any) before the page painted; this
// function just handles the visitor flipping it from here on.
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark-mode');
  try {
    localStorage.setItem('ghi-theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // localStorage unavailable (e.g. private browsing) — toggle still
    // works for this visit, it just won't be remembered next time.
  }
}

// ── News "Read more" modal ──
const newsModalData = {
  bece: {
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Invigilatin_in_kwahu_Tafo%2C_Ghana.jpg?width=800",
    tag: "Academics", tagClass: "tag-academics",
    date: "June 3, 2025",
    title: "Ghar Hira Students Top Regional BECE Rankings for Third Consecutive Year",
    text: "We are proud to announce that our Junior High School graduates achieved top positions in the 2024 Basic Education Certificate Examinations across the Oti region, with 14 students scoring straight A's. This continues a three-year streak of regional top placements, a result the school attributes to smaller class sizes, dedicated subject tutors, and a structured mock-exam programme that runs throughout the final year. Congratulations to our graduating class and the teaching staff who supported them."
  },
  admissions: {
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Classroom_in_Ghana_Africa_%282%29.jpg?width=800",
    tag: "Admissions", tagClass: "tag-admissions",
    date: "May 20, 2025",
    title: "2025/2026 Admissions Now Open",
    text: "Applications for the 2025/2026 academic year are now open across Primary, JHS, and SHS levels. Prospective families can download the Admission Application Form and School Prospectus from the Downloads section below, and submit completed forms at the admissions office or by email. Places are limited, especially at SHS level, so early application is encouraged. Our admissions team is available on weekdays for enquiries and campus tours."
  },
  quran: {
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/Opened_Qur%27an.jpg?width=800",
    tag: "Competition", tagClass: "tag-competition",
    date: "April 14, 2025",
    title: "Inter-School Quran Recitation Competition",
    text: "Our students won 3 gold awards at the annual Oti Region Quran recitation championship, competing against reciters from over a dozen schools in the region. The competition assessed Tajweed accuracy, memorisation, and vocal presentation. This result reflects the strength of our Quranic Sciences programme and the dedication of our Hifz instructors, who prepare students for both academic and community recitation events throughout the year."
  },
  ictlab: {
    img: "https://commons.wikimedia.org/wiki/Special:FilePath/School_Computer_Lab.jpg?width=800",
    tag: "Facilities", tagClass: "tag-facilities",
    date: "March 28, 2025",
    title: "New ICT Lab Officially Opened",
    text: "A fully equipped 40-station computer lab is now available to all JHS and SHS students, supporting our ICT & Computer Science curriculum with modern hardware, reliable internet access, and dedicated coding and office-productivity software. The lab is scheduled into weekly timetabled lessons and is also available for supervised after-school use, giving students hands-on time to build the digital skills they'll need for WASSCE and beyond."
  }
};

function openNewsModal(key) {
  const data = newsModalData[key];
  const overlay = document.getElementById('newsModalOverlay');
  if (!data || !overlay) return;

  document.getElementById('newsModalImg').src = data.img;
  document.getElementById('newsModalImg').alt = data.title;
  const tagEl = document.getElementById('newsModalTag');
  tagEl.textContent = data.tag;
  tagEl.className = 'news-item-tag ' + data.tagClass;
  document.getElementById('newsModalDate').textContent = data.date;
  document.getElementById('newsModalTitle').textContent = data.title;
  document.getElementById('newsModalText').textContent = data.text;

  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeNewsModal() {
  const overlay = document.getElementById('newsModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function closeNewsModalOnOverlay(e) {
  // Only close when the click landed on the dimmed backdrop itself,
  // not on the card content inside it.
  if (e.target && e.target.id === 'newsModalOverlay') closeNewsModal();
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeNewsModal();
});

function filterCourses(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.course-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden-course');
    } else {
      card.classList.add('hidden-course');
    }
  });

  // Picking a specific category always shows every matching program in
  // full; the collapsed preview only applies to the "All Programs" view,
  // and only until the visitor has expanded it once.
  const grid = document.getElementById('courses-grid');
  const viewAllBtn = document.getElementById('programsViewAllBtn');
  if (grid) grid.classList.toggle('collapsed', cat === 'all' && !programsExpanded);
  if (viewAllBtn) viewAllBtn.style.display = (cat === 'all' && !programsExpanded) ? '' : 'none';
}

function toggleProgramsView(btn) {
  programsExpanded = true;
  const grid = document.getElementById('courses-grid');
  if (grid) grid.classList.remove('collapsed');
  btn.style.display = 'none';
}
  


// Hero section Animations
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    // Check if the page has been scrolled more than 50 pixels
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    // Two soft, low-pitched notes (a gentle "ding-dong") rather than a sharp beep
    const notes = [
      { freq: 392, start: 0 },      // G4
      { freq: 523.25, start: 0.12 } // C5
    ];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = note.freq;

      const t = now + note.start;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03); // soft volume, gentle attack
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5); // smooth fade out

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  } catch (e) {
    // Audio isn't critical to the form working, so fail silently
  }
}

function showToast(text, isError) {
  if (!isError) {
    playNotificationSound();
  }
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);background:' +
    (isError ? '#B3261E' : '#0D5C3B') +
    ';color:white;padding:12px 24px;border-radius:8px;font-family:Nunito,sans-serif;font-size:0.85rem;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3500);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        showToast('✓ Message sent! We will get back to you soon.', false);
        form.reset();
      })
      .catch(error => {
        showToast('Something went wrong. Please try again.', true);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
});


function setMenuState(open) {
  const menu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  if (!menu || !hamburger) return;
  menu.classList.toggle('active', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (!menu) return;
  setMenuState(!menu.classList.contains('active'));
}

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  if (!menu || !hamburger) return;

  // Close the mobile menu automatically once any link inside it is tapped
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // Close when tapping/clicking anywhere outside the open menu
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('active')) return;
    if (menu.contains(e.target) || hamburger.contains(e.target)) return;
    setMenuState(false);
  });

  // Close on Escape for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuState(false);
  });

  // If the viewport is resized/rotated past the hamburger breakpoint while
  // the menu is open, reset it so it doesn't reappear stuck-open on desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 860) setMenuState(false);
    }, 150);
  });
});


// Scroll-reveal animations for the whole page.
// JS adds the reveal-* class right before observing each element, so if this
// script fails to run at all, elements simply keep their normal visible
// state instead of being stuck hidden by a CSS rule that never gets undone.
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Fade-up elements, with a small staggered delay across each group
  const fadeUpGroups = [
    '#about .section-eyebrow, #about .section-title, #about .divider, #about .about-img-wrap, #about p, #about .about-pills',
    '.course-card',
    '.news-main, .news-item',
    '.doc-card',
    '.gallery-item',
  ];

  fadeUpGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('reveal-up');
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  });

  // Slide-in-from-side elements for the contact section
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');
  if (contactInfo) {
    contactInfo.classList.add('reveal-left');
    observer.observe(contactInfo);
  }
  if (contactForm) {
    contactForm.classList.add('reveal-right');
    observer.observe(contactForm);
  }
});


