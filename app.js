/* Arena VSL Page - Modal + GHL Form Submission
 * Submits directly to GHL form endpoint (no Worker, no local machine dependency)
 * ALL automation triggered by GHL form submission → workflows handle everything
 */

var GHL_FORM_ID = 'Jb97mbFUHDXBI26CeLIx';
var GHL_LOCATION_ID = 'LSvdgiiT7ManCRx9CCwE';

function openModal() {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

function submitForm() {
  var firstName = document.getElementById('firstName').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();

  if (!firstName) { alert('Please enter your first name.'); return; }
  if (!email) { alert('Please enter your email address.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  var btn = document.querySelector('.modal .cta-btn');
  var origHTML = btn.innerHTML;
  btn.innerHTML = 'Submitting...';
  btn.disabled = true;

  // Submit directly to GHL form endpoint
  var formData = {
    formId: GHL_FORM_ID,
    location_id: GHL_LOCATION_ID,
    first_name: firstName,
    email: email,
    phone: phone,
    source: 'Arena VSL Page',
    pageUrl: window.location.href,
    pageName: document.title
  };

  fetch('https://backend.leadconnectorhq.com/forms/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    // Redirect to watch page
    window.location.href = 'https://thearenapartners.com/watch.html?email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(firstName);
  })
  .catch(function(err) {
    console.error('GHL form submit error:', err);
    // Still redirect even if submission fails
    window.location.href = 'https://thearenapartners.com/watch.html?email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(firstName);
  });
}

// Close modal on backdrop click
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
