document.addEventListener('DOMContentLoaded', () => {
  
  // Immediately animate stats counters on load
  animateHeroStats();

  /* ============================================================
     1. DYNAMIC VISUAL THEME CONTROLLER
  ============================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const toggleIcon = themeToggle.querySelector('.toggle-icon');
  
  // Check default visual preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      toggleIcon.textContent = '☀️'; // Sun icon to trigger light mode
    } else {
      toggleIcon.textContent = '🌙'; // Moon icon to trigger dark mode
    }
  }

  /* ============================================================
     2. INTERACTIVE GEAR POPUP INFORMATION TIPS
  ============================================================ */
  const gearCells = document.querySelectorAll('.gear-cell');
  const gearTooltip = document.getElementById('gearTooltip');
  
  gearCells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      const tipText = cell.dataset.info;
      gearTooltip.textContent = tipText;
      gearTooltip.style.color = 'var(--gold-light)';
      gearTooltip.style.borderColor = 'var(--gold)';
    });
    
    cell.addEventListener('mouseleave', () => {
      gearTooltip.textContent = 'Hover over elements for rendering details';
      gearTooltip.style.color = 'var(--text-secondary)';
      gearTooltip.style.borderColor = 'var(--border)';
    });
  });

  /* ============================================================
     3. SCROLL INTERSECTION REVEALS & COUNT-UP SYSTEMS
  ============================================================ */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in');
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealObserver.observe(r));

  // Skill Fill Bars loading trigger
  const skillRows = document.querySelectorAll('.skill-row');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const row = entry.target;
        const fill = row.querySelector('.skill-fill');
        const pctEl = row.querySelector('.skill-pct');
        const finalPct = parseInt(row.dataset.pct);
        
        if (fill) fill.style.width = `${finalPct}%`;
        
        let count = 0;
        const counterInterval = setInterval(() => {
          count += 2;
          if (count >= finalPct) {
            pctEl.textContent = `${finalPct}%`;
            clearInterval(counterInterval);
          } else {
            pctEl.textContent = `${count}%`;
          }
        }, 15);
        
        skillObserver.unobserve(row);
      }
    });
  }, { threshold: 0.2 });
  skillRows.forEach(row => skillObserver.observe(row));

  // Hero Stats Counter Animate Engine
  function animateHeroStats() {
    const statsNum = document.querySelectorAll('.stat-num');
    statsNum.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      let speed = 40;
      if (target > 500) speed = 2; // Speed up high count views
      
      let currentCount = 0;
      const countUp = setInterval(() => {
        if (target === 3) {
          currentCount += 1;
        } else if (target === 200) {
          currentCount += 5;
        } else {
          currentCount += 25;
        }
        
        if (currentCount >= target) {
          if (target === 1000) {
            stat.textContent = "1B+";
          } else {
            stat.textContent = `${target}+`;
          }
          clearInterval(countUp);
        } else {
          if (target === 1000) {
            stat.textContent = `${(currentCount / 1000).toFixed(1)}B+`;
          } else {
            stat.textContent = `${currentCount}+`;
          }
        }
      }, speed);
    });
  }

  /* ============================================================
     4. EMAIL / CONTACT ENQUIRY FORM PORTAL VALIDATIONS
  ============================================================ */
  const contactForm = document.getElementById('portfolioForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      formSubmitBtn.disabled = true;
      const btnSpan = formSubmitBtn.querySelector('span');
      const originalText = btnSpan.textContent;
      btnSpan.textContent = "TRANSMITTING MESSAGE...";
      formStatus.className = "form-status";
      formStatus.textContent = "";
      
      setTimeout(() => {
        formSubmitBtn.disabled = false;
        btnSpan.textContent = originalText;
        
        formStatus.classList.add('success');
        formStatus.textContent = "✓ Transmission Successful. Sujal will respond shortly.";
        contactForm.reset();
        
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.textContent = "";
            formStatus.style.opacity = '1';
            formStatus.className = "form-status";
          }, 400);
        }, 5000);
        
      }, 1400);
    });
  }
  
  /* ============================================================
     5. MOBILE OVERLAY PANEL TRIGGER HANDLERS
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileMenuLinks = document.querySelectorAll('.mm-lnk');
  
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
  });
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  }
  
  mobileClose.addEventListener('click', closeMobileMenu);
  mobileMenuLinks.forEach(lnk => lnk.addEventListener('click', closeMobileMenu));
  
});
