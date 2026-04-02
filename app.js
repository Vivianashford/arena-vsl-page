function openModal() {
document.getElementById('modal').classList.add('active');
document.body.style.overflow = 'hidden';
}
function closeModal() {
document.getElementById('modal').classList.remove('active');
document.body.style.overflow = '';
}
function submitForm() {
var firstName = document.getElementById('firstName').value || '';
var lastName = '';
var phone = document.getElementById('phone').value || '';
var email = document.getElementById('email').value;
var revenue = '';
var goal = '';
if (!firstName) {
alert('Please enter your first name.');
return;
}
if (!email) {
alert('Please enter your email address.');
return;
}
if (!phone) {
alert('Please enter your phone number so we can send you the training link.');
return;
}
var btn = document.querySelector('.modal .cta-btn');
var arenaSignature = '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:520px;border-collapse:collapse;margin-top:30px;"><tr><td colspan="2" style="padding:0 0 18px 0;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top:2px solid #C9A84C;font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr><tr><td style="vertical-align:top;padding-right:18px;width:80px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:72px;height:72px;background-color:#C9A84C;border-radius:6px;text-align:center;vertical-align:middle;font-family:Georgia,serif;font-size:28px;font-weight:bold;color:#0A0A0A;">JH</td></tr></table></td><td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Georgia,serif;font-size:18px;font-weight:bold;color:#1A1A1A;line-height:22px;padding-bottom:2px;">Jean Hardy</td></tr></table><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#C9A84C;line-height:16px;padding-bottom:8px;letter-spacing:0.5px;">Co-Founder &amp; Operations Lead</td></tr></table><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Georgia,serif;font-size:13px;font-weight:bold;color:#1A1A1A;line-height:18px;padding-bottom:10px;">The Arena Partners</td></tr></table><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top:1px solid #E5E0D8;font-size:1px;line-height:1px;padding-bottom:10px;">&nbsp;</td></tr></table><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#6B655E;line-height:20px;"><span style="color:#9A9590;">E:</span>&nbsp;&nbsp;<a href="mailto:support@thearenapartners.com" style="color:#1A1A1A;text-decoration:none;">support@thearenapartners.com</a></td></tr><tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#6B655E;line-height:20px;"><span style="color:#9A9590;">P:</span>&nbsp;&nbsp;<a href="tel:7133447420" style="color:#1A1A1A;text-decoration:none;">713-344-7420</a></td></tr><tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#6B655E;line-height:20px;"><span style="color:#9A9590;">W:</span>&nbsp;&nbsp;<a href="https://thearenapartners.com" style="color:#1A1A1A;text-decoration:none;">thearenapartners.com</a></td></tr><tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#6B655E;line-height:20px;"><span style="color:#9A9590;">A:</span>&nbsp;&nbsp;<span style="color:#1A1A1A;">3555 Timmons Ln, Ste 1140, Houston, TX 77027</span></td></tr></table></td></tr><tr><td colspan="2" style="padding-top:16px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#C9A84C;border-radius:4px;"><a href="https://api.leadconnectorhq.com/widget/booking/52NbvBqsD5pdRT7Y3vxn" style="display:inline-block;padding:9px 22px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#0A0A0A;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;">Book a Diagnostic Call</a></td></tr></table></td></tr><tr><td colspan="2" style="padding-top:14px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Georgia,serif;font-size:11px;color:#9A9590;font-style:italic;line-height:16px;">The more valuable you are to your business, the less valuable your business is.</td></tr></table></td></tr><tr><td colspan="2" style="padding-top:14px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top:1px solid #E5E0D8;font-size:1px;line-height:1px;">&nbsp;</td></tr></table></td></tr><tr><td colspan="2" style="padding-top:10px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:11px;line-height:16px;padding-right:14px;"><a href="https://www.linkedin.com/in/jeanlouishardy/" style="color:#C9A84C;text-decoration:none;">LinkedIn</a></td><td style="font-family:Arial,sans-serif;font-size:11px;color:#E5E0D8;padding-right:14px;">|</td><td style="font-family:Arial,sans-serif;font-size:11px;line-height:16px;"><a href="https://www.instagram.com/jlouishardy/" style="color:#C9A84C;text-decoration:none;">Instagram</a></td></tr></table></td></tr></table>';
var origText = btn.innerHTML;
btn.innerHTML = 'Submitting...';
btn.disabled = true;
var revenueLabels = {
under5: 'Under $5M', '5to10': '$5M-$10M', '10to25': '$10M-$25M',
'25to50': '$25M-$50M', over50: '$50M+'
};
var goalLabels = {
exit: 'Exit / Sell', scale: 'Scale & Reduce Dependency',
succession: 'Succession / Transition', explore: 'Exploring Options'
};
var WORKER = 'https://arena-api.jean-475.workers.dev';
var ghlHeaders = {
'Authorization': 'Bearer proxy',
'Version': '2021-07-28',
'Content-Type': 'application/json'
};
fetch(WORKER + '/api/ghl/contacts/upsert', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
firstName: firstName,
lastName: lastName,
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
if (!contactId) return;
fetch(WORKER + '/api/ghl/opportunities/', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
pipelineId: 'PdlZRdFi8hty46vcVyx8',
locationId: 'LSvdgiiT7ManCRx9CCwE',
name: firstName + ' ' + lastName + ' - VSL Lead',
pipelineStageId: 'a72f7c97-f805-4f37-bf8c-8d65816a6870',
contactId: contactId,
status: 'open',
source: 'Arena VSL Page'
})
}).catch(function(err) { console.error('Opportunity error:', err); });
var leadEmailHtml = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f0e8;padding:40px;">' +
'<div style="text-align:center;margin-bottom:30px;">' +
'<h1 style="font-family:Georgia,serif;color:#c9a84c;font-size:28px;margin:0;">The Arena Partners</h1>' +
'</div>' +
'<p style="font-size:18px;line-height:1.6;">Hey ' + firstName + ',</p>' +
'<p style="font-size:16px;line-height:1.7;color:#9a9590;">Your access to the <strong style="color:#f5f0e8;">Transferable Exit System\u2122</strong> training is ready.</p>' +
'<p style="font-size:16px;line-height:1.7;color:#9a9590;">In this training, you\'ll learn how service-based business owners at $5M-$50M in revenue are removing owner dependency and building businesses that buyers pay full price for.</p>' +
'<div style="text-align:center;margin:35px 0;">' +
'<a href="https://thearenapartners.com/watch.html" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#c9a84c,#e3c96e);color:#0a0a0a;font-weight:700;text-decoration:none;border-radius:6px;font-size:16px;letter-spacing:1px;">WATCH THE TRAINING NOW</a>' +
'</div>' +
'<p style="font-size:16px;line-height:1.7;color:#9a9590;">If you have questions or want to discuss your situation directly, reply to this email.</p>' +
'</div>' + arenaSignature;
fetch(WORKER + '/api/ghl/conversations/messages', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
type: 'Email',
contactId: contactId,
subject: 'Your Free Training: The Transferable Exit System\u2122',
html: leadEmailHtml,
emailFrom: 'The Arena Partners <support@thearenapartners.com>'
})
}).catch(function(err) { console.error('Lead email error:', err); });
if (phone) {
setTimeout(function() {
fetch(WORKER + '/api/ghl/conversations/messages', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
type: 'SMS',
contactId: contactId,
message: 'Hey ' + firstName + ', it\'s Jean from The Arena Partners. Here\'s your training link so you don\'t lose it: https://thearenapartners.com/watch.html - Watch it when you\'re ready. I\'ll follow up with a few insights after. - Jean'
})
}).catch(function(err) { console.error('Lead SMS error:', err); });
}, 10000);
}
var leadNote = 'NEW VSL LEAD\nName: ' + firstName + ' ' + lastName + '\nPhone: ' + phone + '\nEmail: ' + email + '\nRevenue: ' + (revenueLabels[revenue] || 'N/A') + '\nGoal: ' + (goalLabels[goal] || 'N/A') + '\nSource: Arena VSL Page\nTime: ' + new Date().toLocaleString('en-US', {timeZone: 'America/Chicago'}) + '\n\nLINKEDIN OUTREACH:\nSearch: ' + firstName + ' ' + lastName + '\nMessage: Hi ' + firstName + ', I saw you checked out our training on exit strategy. Looking forward to connecting. - Jean';
fetch(WORKER + '/api/ghl/contacts/' + contactId + '/notes', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({ body: leadNote })
}).catch(function(err) { console.error('Note error:', err); });
var jeanNotifyHtml = '<div style="font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#0a0a0a;color:#f5f0e8;">' +
'<h2 style="color:#c9a84c;margin-top:0;">New VSL Lead</h2>' +
'<div style="background:#161616;border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:20px;margin:16px 0;">' +
'<p style="margin:6px 0;"><strong style="color:#c9a84c;">Name:</strong> ' + firstName + ' ' + lastName + '</p>' +
'<p style="margin:6px 0;"><strong style="color:#c9a84c;">Email:</strong> ' + email + '</p>' +
'<p style="margin:6px 0;"><strong style="color:#c9a84c;">Phone:</strong> ' + phone + '</p>' +
'<p style="margin:6px 0;"><strong style="color:#c9a84c;">Revenue:</strong> ' + (revenueLabels[revenue] || 'N/A') + '</p>' +
'<p style="margin:6px 0;"><strong style="color:#c9a84c;">Goal:</strong> ' + (goalLabels[goal] || 'N/A') + '</p>' +
'</div>' +
'<div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:16px;margin:16px 0;">' +
'<p style="color:#c9a84c;font-weight:700;margin-top:0;">LinkedIn Outreach (copy-paste):</p>' +
'<p style="color:#9a9590;">Search: <strong style="color:#f5f0e8;">' + firstName + ' ' + lastName + '</strong></p>' +
'<p style="color:#9a9590;margin:0;">Hi ' + firstName + ', I saw you checked out our training on exit strategy. Looking forward to connecting. - Jean</p>' +
'</div>' +
'<p style="color:#6b6560;font-size:11px;margin-top:20px;">Arena Follow-Up System</p></div>';
fetch(WORKER + '/api/ghl/contacts/upsert', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
firstName: 'Jean',
lastName: 'Hardy',
email: 'jean@eng2.ca',
locationId: 'LSvdgiiT7ManCRx9CCwE',
tags: ['internal-notify'],
source: 'System'
})
}).then(function(r) { return r.json(); })
.then(function(d) {
var jeanContactId = d.contact ? d.contact.id : d.contactId;
if (jeanContactId) {
fetch(WORKER + '/api/ghl/conversations/messages', {
method: 'POST',
headers: ghlHeaders,
body: JSON.stringify({
type: 'Email',
contactId: jeanContactId,
subject: 'New VSL Lead: ' + firstName + ' ' + lastName + ' (' + (revenueLabels[revenue] || 'N/A') + ')',
emailFrom: 'The Arena Partners <support@thearenapartners.com>',
html: jeanNotifyHtml
})
});
}
}).catch(function(err) { console.error('Jean notify error:', err); });
})
.catch(function(err) { console.error('GHL error:', err); });
setTimeout(function() {
var watchUrl = 'https://thearenapartners.com/watch.html?email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(firstName);
window.location.href = watchUrl;
}, 1500);
}
function submitBottomForm() {
  var fn = document.getElementById('btmFirstName').value || '';
  var em = document.getElementById('btmEmail').value || '';
  var ph = document.getElementById('btmPhone').value || '';
  if (!fn) { alert('Please enter your first name.'); return; }
  if (!em) { alert('Please enter your email address.'); return; }
  if (!ph) { alert('Please enter your phone number so we can send you the training link.'); return; }
  document.getElementById('firstName').value = fn;
  document.getElementById('email').value = em;
  document.getElementById('phone').value = ph;
  submitForm();
}
document.getElementById('modal').addEventListener('click', function(e) {
if (e.target === this) closeModal();
});
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape') closeModal();
});