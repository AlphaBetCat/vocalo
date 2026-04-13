// Vocalo v2 — Landing Page Scripts

// ============================================
// ROI Calculator
// ============================================
const callsSlider = document.getElementById('callsSlider');
const valueSlider = document.getElementById('valueSlider');
const callsValue = document.getElementById('callsValue');
const valueValue = document.getElementById('valueValue');
const lossAmount = document.getElementById('lossAmount');
const roiPercent = document.getElementById('roiPercent');

const VOCALO_COST = 497;
const WEEKS_PER_MONTH = 4.33;

function formatCurrency(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function animateValue(el, newText) {
  el.classList.add('flash');
  el.textContent = newText;
  setTimeout(() => el.classList.remove('flash'), 300);
}

function updateROI() {
  const missedCalls = parseInt(callsSlider.value, 10);
  const jobValue = parseInt(valueSlider.value, 10);
  const monthlyLoss = missedCalls * WEEKS_PER_MONTH * jobValue;
  const roi = Math.round(((monthlyLoss - VOCALO_COST) / VOCALO_COST) * 100);

  callsValue.textContent = missedCalls;
  valueValue.textContent = formatCurrency(jobValue);
  animateValue(lossAmount, formatCurrency(monthlyLoss));
  roiPercent.textContent = roi.toLocaleString('en-US') + '%';
}

if (callsSlider && valueSlider) {
  callsSlider.addEventListener('input', updateROI);
  valueSlider.addEventListener('input', updateROI);
  updateROI();
}

// ============================================
// Animated Stat Counters
// ============================================
function animateCounter(el, target, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + '%';

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ============================================
// Progress Bar Fill Animation
// ============================================
function animateProgressBar(bar, targetWidth, delay) {
  setTimeout(() => {
    bar.style.width = targetWidth + '%';
  }, delay);
}

// ============================================
// Problem Section Observer (counters + bars)
// ============================================
const problemCards = document.querySelectorAll('.problem-card');
const problemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.getAttribute('data-delay') || '0', 10);

      // Animate counter
      const numEl = card.querySelector('.problem-num[data-target]');
      if (numEl) {
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        setTimeout(() => animateCounter(numEl, target, 1200), delay);
      }

      // Animate progress bar
      const barFill = card.querySelector('.problem-bar-fill[data-width]');
      if (barFill) {
        const targetWidth = parseInt(barFill.getAttribute('data-width'), 10);
        animateProgressBar(barFill, targetWidth, delay + 200);
      }

      problemObserver.unobserve(card);
    }
  });
}, { threshold: 0.3 });

problemCards.forEach(card => problemObserver.observe(card));

// ============================================
// Scroll Animations
// ============================================
const animatedElements = document.querySelectorAll(
  '.feature, .how-step, .how-connector, .plan, .roi-card, .demo-call-card, .guarantee, .testimonial-placeholder, .trust-bar-inner'
);

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
  el.classList.add('animate-on-scroll');
  scrollObserver.observe(el);
});

// ============================================
// Nav scroll effect
// ============================================
const nav = document.querySelector('.nav');
if (nav) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// Lead Form Submission → Thank You Page
// ============================================
const leadForm = document.getElementById('leadForm');
const thankYou = document.getElementById('thankYou');

if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(leadForm);
    const data = Object.fromEntries(formData.entries());

    // Disable button while submitting
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // TODO: Replace with n8n webhook URL once set up
    // const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK';
    // try {
    //   await fetch(WEBHOOK_URL, {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // } catch (err) {
    //   console.error('Webhook error:', err);
    // }

    console.log('Lead captured:', data);

    // Hide form, show thank-you
    leadForm.style.display = 'none';
    if (thankYou) {
      thankYou.style.display = 'block';
      thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Meta Pixel conversion tracking (uncomment once pixel is live)
    // if (typeof fbq !== 'undefined') fbq('track', 'Lead');
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
