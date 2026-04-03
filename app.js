function openModal() {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

/* Arena VSL Page - Form Handler
 * ONLY does: Contact upsert + tag in GHL, then redirect to watch.html
 * ALL automation (emails, SMS, pipeline, notifications) lives in GHL workflows
 * Trigger: Tag "vsl-lead" added → GHL Workflow handles everything
 */

function submitForm() {
  var firstName = document.getElementById('firstName').value || '';
  var phone = document.getElementById('phone').value || '';
  var email = document.getElementById('email').value;

  if (!firstName) { alert('Please enter your first name.'); return; }
  if (!email) { alert('Please enter your email address.'); return; }
  if (!phone) { alert('Please enter your phone number so we can send you the training link.'); return; }

  var btn = document.querySelector('.modal .cta-btn');
  var origText = btn.innerHTML;
  btn.innerHTML = 'Submitting...';
  btn.disabled = true;

  var WORKER = 'https://arena-api.jean-475.workers.dev';
  var ghlHeaders = {
    'Authorization': 'Bearer proxy',
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  // 1. Upsert contact in GHL with vsl-lead tag
  // GHL workflow triggers on this tag and handles: email, SMS, pipeline, notification
  fetch(WORKER + '/api/ghl/contacts/upsert', {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      firstName: firstName,
      phone: phone,
      email: email,
      locationId: 'LSvdgiiT7ManCRx9CCwE',
      source: 'Arena VSL Page',
      tags: ['vsl-lead', window.ArenaUTM ? window.ArenaUTM.getSourceTag() : 'source-organic']
    })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    var contactId = data.contact ? data.contact.id : (data.contactId || null);

    // 2. Redirect to watch page with contact info
    setTimeout(function() {
      var watchUrl = 'https://thearenapartners.com/watch.html?email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(firstName);
      if (contactId) watchUrl += '&cid=' + encodeURIComponent(contactId);
      window.location.href = watchUrl;
    }, 500);
  })
  .catch(function(err) {
    console.error('GHL error:', err);
    // Still redirect even if GHL fails
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
