/**
 * ClearComms Aviation English (CCAE) - Interactive Client Logic & ATC Polish
 * Author: Munir Mohamad & Google Antigravity
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initPortalTabs();
  initRequestForm();
  initRoleHints();
  initScrollReveal();
});

/**
 * Sticky Header Scroll State
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navLinks.style.display === 'flex';
    if (isExpanded) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '4.5rem';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(5, 10, 24, 0.96)';
      navLinks.style.padding = '2rem 1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-medium)';
      navLinks.style.backdropFilter = 'blur(20px)';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });
}

/**
 * Request Portal Tab Switcher (Form vs Cal.com Embed)
 */
function initPortalTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === targetTabId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/**
 * Contextual Role Hints in Request Form
 */
function initRoleHints() {
  const ratingSelect = document.getElementById('current_rating');
  const hintBox = document.getElementById('role-hint-box');

  if (!ratingSelect || !hintBox) return;

  const roleHints = {
    'Approach Radar (APP)': '💡 Focus: High-tempo vectoring, terminal sequencing, and non-routine weather diversions.',
    'Aerodrome Control (Tower)': '💡 Focus: Runway safety phraseology, immediate readback verification, and visual circuit traffic.',
    'Flight Information Service (FIS)': '💡 Focus: Clear advisory broadcasts, SIGMET interpretation, and plain English clarity.',
    'Area Control (ACC)': '💡 Focus: En-route waypoint coordination, Oceanic clearances, and CPDLC voice transitions.',
    'ATC Trainee / Cadet': '💡 Focus: Building core radiotelephony confidence and eliminating hesitation before validation checks.',
    'Commercial / Airline Pilot': '💡 Focus: ICAO Level 4 to Level 5/6 vocabulary expansion, emergency reporting, and standard readback drills.',
    'Student Pilot': '💡 Focus: Foundation VFR radio calls, circuit entry, and cross-country navigational communications.',
    'Cabin Crew / Operations': '💡 Focus: Pilot-to-crew emergency briefings, situational plain English, and passenger announcements.'
  };

  ratingSelect.addEventListener('change', () => {
    const selected = ratingSelect.value;
    if (roleHints[selected]) {
      hintBox.textContent = roleHints[selected];
      hintBox.style.display = 'block';
    } else {
      hintBox.style.display = 'none';
    }
  });
}

/**
 * Scroll Reveal Animation Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Request Form Submission & Client-Side Validation
 */
function initRequestForm() {
  const form = document.getElementById('coaching-request-form');
  const submitBtn = document.getElementById('submit-request-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('full_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile_number').value.trim();
    const rating = document.getElementById('current_rating').value;
    const pdpaConsent = document.getElementById('pdpa_consent').checked;

    if (!fullName || !email || !mobile || !rating) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (!pdpaConsent) {
      showToast('You must check the PDPA consent statement to submit.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Transmitting Request...
    `;

    try {
      // In Phase 3, this executes direct Supabase client insertion via anon key
      await new Promise(resolve => setTimeout(resolve, 800));

      showToast(`Roger that, ${fullName}! Your coaching request has been received. Munir will contact you via WhatsApp shortly.`, 'success');
      form.reset();
      const hintBox = document.getElementById('role-hint-box');
      if (hintBox) hintBox.style.display = 'none';
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Transmission error. Please try again or use the Live Calendar tab.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/**
 * Toast Notification System
 * @param {string} message 
 * @param {'success' | 'error' | 'info'} type 
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF3366" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
