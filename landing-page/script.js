// Vocalo — Landing Page Scripts

// ROI Calculator
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

function updateROI() {
  const missedCalls = parseInt(callsSlider.value, 10);
  const jobValue = parseInt(valueSlider.value, 10);

  // Monthly lost revenue = missed calls per week × weeks per month × average job value
  const monthlyLoss = missedCalls * WEEKS_PER_MONTH * jobValue;
  const roi = Math.round(((monthlyLoss - VOCALO_COST) / VOCALO_COST) * 100);

  callsValue.textContent = missedCalls;
  valueValue.textContent = formatCurrency(jobValue);
  lossAmount.textContent = formatCurrency(monthlyLoss);
  roiPercent.textContent = roi.toLocaleString('en-US') + '%';
}

if (callsSlider && valueSlider) {
  callsSlider.addEventListener('input', updateROI);
  valueSlider.addEventListener('input', updateROI);
  updateROI();
}

// Lead form submission (placeholder — will point to n8n webhook)
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(leadForm);
    const data = Object.fromEntries(formData.entries());

    // TODO: Replace with n8n webhook URL once set up
    // const WEBHOOK_URL = 'https://YOUR_N8N_WEBHOOK';
    // await fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type':'application/json'} });

    // Placeholder behavior
    console.log('Lead captured:', data);
    leadForm.innerHTML = '<div style="text-align:center;padding:24px;"><h3 style="color:#0F172A;margin-bottom:12px;">Got it — talk soon!</h3><p style="color:#475569;">We\'ll reach out within 1 hour to book your demo.</p></div>';

    // Meta Pixel conversion tracking (uncomment once pixel is live)
    // if (typeof fbq !== 'undefined') fbq('track', 'Lead');
  });
}

// Smooth scroll for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
