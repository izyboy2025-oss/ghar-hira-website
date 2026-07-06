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
}

function fakeDownload(e, filename) {
  e.preventDefault();
  const msg = document.createElement('div');
  msg.textContent = '✓ ' + filename + ' — replace this link with your actual file URL';
  msg.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#0D5C3B;color:white;padding:12px 24px;border-radius:8px;font-family:Nunito,sans-serif;font-size:0.85rem;font-weight:600;z-index:9999;';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3500);
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

function handleSubmit() {
    // Extract the values from the html fields
    const firstName = document.querySelector('input[placeholder="Amina"]').value;
    const lastName = document.querySelector('input[placeholder="Mensah"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const subject = document.querySelector('select').value;
    const message = document.querySelector('textarea').value;

    //This is the recepient email
    const recipient = "admissions@gharhiraschool.edu.gh";

    const body = `Name: ${firstName} ${lastName}%0D%0A` +
                 `Phone: ${phone}%0D%0A` +
                 `Email: ${email}%0D%0A%0D%0A` +
                 `Message:%0D%0A${message}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}


function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;background:var(--green-dark);padding:20px 5%;gap:16px;z-index:99;';
  }
}


//Animations for the About section
document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-show");
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
  });

  const aboutElements = document.querySelectorAll(
    "#about .section-eyebrow, #about .section-title, #about .divider, #about .about-img-wrap, #about p, #about .about-pills"
  );

  aboutElements.forEach((el, index) => {
    el.classList.add("scroll-hidden");
    
    el.style.transitionDelay = `${index * 0.15}s`;
    
    observer.observe(el);
  });
});


// Animatons for the Programs section
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.course-card').forEach((card) => {
    observer.observe(card);
  });
});


//Animations for the News section
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    '.course-card, .news-main, .news-item'
  );
  
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});


//Animations for the Download section
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    '.course-card, .news-main, .news-item, .doc-card'
  );
  
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});



//Animations for the Gallery section
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    '.course-card, .news-main, .news-item, .doc-card, .gallery-item'
  );
  
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});



//Animations for the Contact section
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    '.course-card, .news-main, .news-item, .doc-card, .gallery-item, .contact-info, .contact-form'
  );
  
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});


