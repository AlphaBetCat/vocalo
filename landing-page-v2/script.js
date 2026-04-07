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

// Animate number change
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
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current + '%';

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Intersection Observer for stat counters
const statNumbers = document.querySelectorAll('.problem-num[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      animateCounter(el, target, 1200);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

statNumbers.forEach(el => statsObserver.observe(el));

// ============================================
// Scroll Animations
// ============================================
const animatedElements = document.querySelectorAll('.feature, .how-step, .plan, .roi-card');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger by 50ms per element
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 50);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
  el.classList.add('animate-on-scroll');
  scrollObserver.observe(el);
});

// ============================================
// Lead Form Submission
// ============================================
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(leadForm);
    const data = Object.fromEntries(formData.entries());

    // TODO: Replace with n8n webhook URL once set up
    // const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK';
    // await fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type':'application/json'} });

    console.log('Lead captured:', data);
    leadForm.innerHTML = '<div style="text-align:center;padding:24px;"><h3 style="color:#0F172A;margin-bottom:12px;font-family:Poppins,sans-serif;">Got it — talk soon!</h3><p style="color:#475569;">We\'ll reach out within 1 hour to book your demo.</p></div>';

    // Meta Pixel conversion tracking (uncomment once pixel is live)
    // if (typeof fbq !== 'undefined') fbq('track', 'Lead');
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
