(function () {
  /* Safety net: until you set your real domain (see SEO-README.txt), point the canonical and og:url at the page's own address. */
  if (!/^https?:$/.test(location.protocol)) return;
  var here = location.origin + location.pathname;
  var c = document.querySelector('link[rel="canonical"]'), u = document.querySelector('meta[property="og:url"]');
  if (c && /your-site-url/i.test(c.getAttribute('href'))) c.setAttribute('href', here);
  if (u && /your-site-url/i.test(u.getAttribute('content'))) u.setAttribute('content', here);
})();
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var U = window.UNIVERSITIES, G = window.GALLERY, F = window.FIELDS, S = window.SITE;
  var LEVEL_NAME = { foundation: 'Foundation / Diploma', bachelor: "Bachelor's", master: "Master's / MBA", phd: 'PhD' };
  var money = function (n) { return 'RM ' + Math.round(n).toLocaleString('en-US'); };

  /* ---------- branding from data.js ---------- */
  $$('[data-brand]').forEach(function (e) { e.textContent = S.brand; });
  $$('[data-brand-sub]').forEach(function (e) { e.textContent = S.tagline || ''; });
  $$('[data-hotline]').forEach(function (e) { e.textContent = S.hotline; });
  $$('[data-email]').forEach(function (e) { e.textContent = S.email || 'Add your business email'; });
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- WhatsApp lead routing ----------
     Configure SITE.whatsappNumber in js/data.js using country code + digits only.
     Example format for Bangladesh: 8801XXXXXXXXX (replace with your real number). */
  function whatsappUrl(message) {
    var number = (S.whatsappNumber || '').replace(/\D/g, '');
    return number ? 'https://wa.me/' + number + '?text=' + encodeURIComponent(message) : '';
  }
  function toast(html) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = html; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(function () { t.hidden = true; }, 6000);
  }
  function openWhatsApp(message) {
    var url = whatsappUrl(message);
    if (!url) { toast('Add your agency WhatsApp number in js/data.js.'); return false; }
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) {} }
    else { toast('<a href="' + url + '" target="_blank" rel="noopener">Tap to open WhatsApp</a>'); }
    return true;
  }
  $$('[data-wa-cta]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!S.whatsappNumber) { e.preventDefault(); openWhatsApp('Hello! I am interested in studying in Malaysia. Please guide me.'); return; }
      a.href = whatsappUrl('Hello! I am interested in studying in Malaysia. Please guide me.');
      a.target = '_blank'; a.rel = 'noopener noreferrer';
    });
  });

  /* ---------- nav ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  var links = $$('.menu a:not(.menu__cta)');
  var sections = ['home', 'universities', 'cities', 'finder', 'fees', 'gallery', 'contact'].map(function (id) { return document.getElementById(id); });
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 30);
    $('#progress').style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    $('#waFloat').classList.toggle('hide', isVisible($('#contact')));
    var cur = 'home';
    sections.forEach(function (s) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur && !a.dataset.goto); });
  }
  function isVisible(el) { var r = el.getBoundingClientRect(); return r.top < innerHeight * 0.6 && r.bottom > 0; }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- reveal + counters ---------- */
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (e) { io.observe(e); });

  function countUp(el) {
    var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), d = 1600;
    (function step(t) {
      var p = Math.min((t - t0) / d, 1), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('en-US') + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  var cio = new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
  });
  $$('[data-count]').forEach(function (e) { cio.observe(e); });

  /* ---------- hero parallax ---------- */
  var arch = $('.arch');
  $('.hero').addEventListener('mousemove', function (e) {
    var x = (e.clientX / innerWidth - 0.5) * 14, y = (e.clientY / innerHeight - 0.5) * 14;
    arch.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  });

  /* ---------- universities ---------- */
  var uniWrap = $('#unis'), chipWrap = $('#uniChips');
  var chipDefs = [['all', 'All']].concat(Object.keys(LEVEL_NAME).map(function (k) { return [k, LEVEL_NAME[k]]; }));
  chipWrap.innerHTML = chipDefs.map(function (c, i) { return '<button class="chip' + (i === 0 ? ' on' : '') + '" data-f="' + c[0] + '">' + c[1] + '</button>'; }).join('');
  uniWrap.innerHTML = U.map(function (u) {
    return '<button class="uni reveal" data-id="' + u.id + '" data-levels="' + u.levels.join(' ') + '">' +
      '<span class="badge">' + u.badge + '</span>' +
      '<div class="uni__img"><img src="' + u.img + '"' + (u.imgPos ? ' style="object-position:' + u.imgPos + '"' : '') + ' alt="' + u.name + ' campus" width="600" height="375" loading="lazy" decoding="async"></div>' +
      '<div class="uni__body"><h3>' + u.name + '</h3><p class="uni__loc">📍 ' + u.location + ' · ' + u.tag + '</p>' +
      '<span class="uni__more">View details →</span></div></button>';
  }).join('');
  $$('.uni').forEach(function (c) {
    io.observe(c);
    c.addEventListener('click', function () { openModal(c.dataset.id); });
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = 'perspective(800px) rotateY(' + x * 6 + 'deg) rotateX(' + -y * 6 + 'deg) translateY(-6px)';
    });
    c.addEventListener('mouseleave', function () { c.style.transform = ''; });
  });
  chipWrap.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', chipWrap).forEach(function (x) { x.classList.toggle('on', x === b); });
    $$('.uni').forEach(function (c) { c.classList.toggle('hide', b.dataset.f !== 'all' && c.dataset.levels.split(' ').indexOf(b.dataset.f) < 0); });
  });

  /* modal */
  var modal = $('#modal'), lastFocus;
  function openModal(id) {
    var u = U.filter(function (x) { return x.id === id; })[0]; if (!u) return;
    lastFocus = document.activeElement;
    $('#mImg').src = u.img; $('#mImg').alt = u.name;
    $('#mBadge').textContent = u.badge; $('#mTitle').textContent = u.name;
    $('#mLoc').textContent = '📍 ' + u.location; $('#mText').textContent = u.blurb;
    $('#mList').innerHTML = u.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('');
    var sel = $('#leadUni'); if (sel) sel.value = u.name;
    var city = (window.CITIES || []).filter(function (c) { return c.id === u.city; })[0];
    var shots = [{ src: u.img, cap: u.name }].concat(u.photos || []).concat(city ? city.photos.map(function (p) { return { src: p.src, cap: 'Nearby in ' + city.name + ': ' + p.cap }; }) : []);
    function showShot(i) {
      $('#mImg').style.objectPosition = (i === 0 && u.imgPos) ? u.imgPos : '';
      $('#mImg').src = shots[i].src; $('#mImg').alt = shots[i].cap; $('#mCap').textContent = shots[i].cap;
      $$('.thumb', $('#mStrip')).forEach(function (t, k) { t.classList.toggle('on', k === i); });
    }
    $('#mStrip').innerHTML = shots.map(function (s, i) { return '<button type="button" class="thumb" data-i="' + i + '" aria-label="' + s.cap + '"><img src="' + s.src + '" alt=""></button>'; }).join('');
    $('#mStrip').onclick = function (e) { var t = e.target.closest('.thumb'); if (t) showShot(+t.dataset.i); };
    showShot(0);
    $('#mApply').onclick = function (e) { e.preventDefault(); closeModal(); openWhatsApp('Hello! I would like to know about admission to ' + u.name + ' in Malaysia. Please share the entry requirements, tuition fees and available intakes.'); };
    modal.hidden = false; document.body.style.overflow = 'hidden'; $('#mClose').focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('#mClose').addEventListener('click', closeModal);
  $('#mApply').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  /* ---------- journey ---------- */
  var steps = [
    { t: 'Free counselling', i: '💬', d: 'We look at your results, interests and budget, then shortlist the universities that suit you.', l: ['Profile review', 'Budget planning', 'University shortlist'] },
    { t: 'Admission', i: '📄', d: 'We help prepare your documents and submit applications so you receive your offer letter.', l: ['Document checklist', 'Application submission', 'Offer letter'] },
    { t: 'Visa guidance', i: '🛂', d: 'Step-by-step help with the student visa process and required paperwork.', l: ['Visa documents', 'Medical & insurance guidance', 'Status updates'] },
    { t: 'Pre-departure', i: '✈️', d: 'Accommodation ideas, travel tips and an orientation so you land with confidence.', l: ['Accommodation options', 'Travel checklist', 'Cultural orientation'] }
  ];
  var jT = $('#jTabs'), jP = $('#jPanel'), jB = $('#jBar'), jIdx = 0, jTimer;
  jT.innerHTML = steps.map(function (s, i) { return '<button class="jtab" role="tab" data-i="' + i + '"><span>' + (i + 1) + '</span>' + s.t + '</button>'; }).join('');
  function showStep(i) {
    jIdx = i; var s = steps[i];
    $$('.jtab', jT).forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
    jP.style.animation = 'none'; void jP.offsetWidth; jP.style.animation = '';
    jP.innerHTML = '<div class="ico">' + s.i + '</div><h3>' + s.t + '</h3><p>' + s.d + '</p><ul>' + s.l.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    jB.style.width = ((i + 1) / steps.length * 100) + '%'; $('#plane').style.left = ((i + 1) / steps.length * 100) + '%';
  }
  function autoplay() { clearInterval(jTimer); jTimer = setInterval(function () { showStep((jIdx + 1) % steps.length); }, 6000); }
  jT.addEventListener('click', function (e) { var b = e.target.closest('.jtab'); if (b) { showStep(+b.dataset.i); autoplay(); } });
  showStep(0); autoplay();

  /* ---------- finder ---------- */
  var fField = $('#fField');
  fField.innerHTML = Object.keys(F).map(function (k) { return '<option value="' + k + '">' + F[k] + '</option>'; }).join('');
  function runFinder() {
    var lv = $('#fLevel').value, fd = fField.value, bud = +$('#fBudget').value;
    $('#fBudgetOut').textContent = bud.toLocaleString('en-US');
    var m = U.filter(function (u) { return u.levels.indexOf(lv) > -1 && u.fields.indexOf(fd) > -1; });
    $('#fResults').innerHTML = m.length ? m.map(function (u) {
      return '<button type="button" class="res" data-id="' + u.id + '"><img src="' + u.img + '"' + (u.imgPos ? ' style="object-position:' + u.imgPos + '"' : '') + ' alt=""><span><b>' + u.name + '</b><small>' + u.location + '</small></span><span class="pill">' + u.badge + '</span></button>';
    }).join('') : '<p class="empty">No match for that combination yet. Talk to a counsellor and we will look at more options.</p>';
  }
  function finderMessage() {
    var lv = $('#fLevel').selectedOptions[0].textContent, fd = F[fField.value] || fField.value, bud = $('#fBudget').value;
    return 'Hello! I am a student from Bangladesh interested in studying in Malaysia. My preferred study level is ' + lv + ', subject area is ' + fd + ', and my annual tuition budget is around RM ' + Number(bud).toLocaleString('en-US') + '. Please help me find suitable universities.';
  }
  $('#finderWhatsApp').addEventListener('click', function (e) { e.preventDefault(); openWhatsApp(finderMessage()); });
  $('#finder-form').addEventListener('input', runFinder);
  $('#finder-form').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#fResults').addEventListener('click', function (e) { var b = e.target.closest('.res'); if (b) openModal(b.dataset.id); });
  runFinder();

  /* ---------- cost estimator ---------- */
  var cUni = $('#cUni');
  cUni.innerHTML = U.map(function (u) { return '<option value="' + u.id + '">' + u.name + '</option>'; }).join('');
  function runCost() {
    var u = U.filter(function (x) { return x.id === cUni.value; })[0], lv = $('#cLevel').value;
    var yrs = +$('#cYears').value, live = +$('#cLive').value;
    $('#cYearsOut').textContent = yrs; $('#cLiveOut').textContent = live;
    var f = u.fees[lv], avail = u.levels.indexOf(lv) > -1;
    if (!avail) { $('#oTuition').textContent = 'N/A'; $('#oLiving').textContent = '–'; $('#oTotal').textContent = 'Not offered'; $('#barT').style.width = '0'; $('#barL').style.width = '0'; return; }
    var tu = f[0], lv12 = live * 12, total = (tu + lv12) * yrs;
    $('#oTuition').textContent = money(tu); $('#oLiving').textContent = money(lv12); $('#oTotal').textContent = money(total);
    $('#barT').style.width = (tu / (tu + lv12) * 100) + '%'; $('#barL').style.width = (lv12 / (tu + lv12) * 100) + '%';
  }
  $('.fees__calc').addEventListener('input', runCost); runCost();
  $$('.flip').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('on'); }); });
  $$('[data-goto]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); document.getElementById(a.dataset.goto).scrollIntoView({ behavior: 'smooth' }); }); });

  /* ---------- gallery + lightbox ---------- */
  var gGrid = $('#gallery-grid'), gChips = $('#gChips');
  var cats = ['all'].concat(G.map(function (g) { return g.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  gChips.innerHTML = cats.map(function (c, i) { return '<button class="chip' + (i === 0 ? ' on' : '') + '" data-f="' + c + '">' + (c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)) + '</button>'; }).join('');
  gGrid.innerHTML = G.map(function (g, i) { return '<button class="gitem" data-i="' + i + '" data-cat="' + g.cat + '"><img src="' + g.src + '" alt="' + g.cap + '" width="' + (g.w || 800) + '" height="' + (g.h || 600) + '" loading="lazy" decoding="async"><span>' + g.cap + '</span></button>'; }).join('');
  gChips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', gChips).forEach(function (x) { x.classList.toggle('on', x === b); });
    $$('.gitem').forEach(function (it) { it.classList.toggle('hide', b.dataset.f !== 'all' && it.dataset.cat !== b.dataset.f); });
  });
  var lb = $('#lb'), li = 0, lbList = G;
  function showLb(i) { li = (i + lbList.length) % lbList.length; $('#lbImg').src = lbList[li].src; $('#lbImg').alt = lbList[li].cap; $('#lbCap').textContent = lbList[li].cap; }
  function openLb(list, i) { lbList = list; showLb(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  gGrid.addEventListener('click', function (e) { var b = e.target.closest('.gitem'); if (!b) return; openLb(G, +b.dataset.i); });
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  $('#lbX').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { showLb(li - 1); });
  $('#lbNext').addEventListener('click', function () { showLb(li + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!modal.hidden) closeModal(); if (!lb.hidden) closeLb(); }
    if (!lb.hidden && e.key === 'ArrowLeft') showLb(li - 1);
    if (!lb.hidden && e.key === 'ArrowRight') showLb(li + 1);
  });

  /* ---------- FAQ ---------- */
  var faqLd = document.createElement('script'); faqLd.type = 'application/ld+json';
  faqLd.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: window.FAQS.map(function (f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; }) });
  document.head.appendChild(faqLd);
  $('#faq').innerHTML = window.FAQS.map(function (f) { return '<details><summary>' + f.q + '</summary><p>' + f.a + '</p></details>'; }).join('');
  $$('#faq details').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) $$('#faq details').forEach(function (o) { if (o !== d) o.open = false; }); });
  });

  /* ---------- WhatsApp lead form ---------- */
  $('#leadUni').innerHTML = '<option>Not sure yet</option>' + U.map(function (u) { return '<option>' + u.name + '</option>'; }).join('');
  $('#leadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, msg = $('#formMsg'), ok = true;
    ['name', 'phone'].forEach(function (n) {
      var v = f.elements[n].value.trim(), digits = v.replace(/\D/g, ''), bad = !v || (n === 'phone' && digits.length < 10);
      f.elements[n].classList.toggle('bad', bad); if (bad) ok = false;
    });
    if (!f.elements.qualification.value) { ok = false; f.elements.qualification.classList.add('bad'); } else { f.elements.qualification.classList.remove('bad'); }
    if (!ok) { msg.className = 'form__msg err'; msg.textContent = 'Please enter your name, a valid phone / WhatsApp number and your latest qualification.'; return; }
    var values = { name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), qualification: f.elements.qualification.value, level: f.elements.level.value, university: f.elements.uni.value, subject: f.elements.subject.value };
    var message = 'Hello! I would like guidance about studying in Malaysia.\n\nName: ' + values.name + '\nMy phone: ' + values.phone + '\nLatest qualification: ' + values.qualification + '\nStudy level: ' + values.level + '\nPreferred subject: ' + values.subject + '\nPreferred university: ' + values.university + '\n\nPlease let me know the suitable admission options and next steps.';
    if (openWhatsApp(message)) { msg.className = 'form__msg ok'; msg.textContent = 'WhatsApp is opening. Please review and send your message to complete your enquiry.'; }
    else { msg.className = 'form__msg err'; msg.textContent = 'The form is ready, but the agency WhatsApp number has not been configured yet. Please contact the website owner.'; }
  });

  /* ---------- cities, map and cost chart ---------- */
  var C = window.CITIES, rm = function (n) { return 'RM ' + n.toLocaleString('en-US'); };
  var cityTabs = $('#cityTabs'), cityPanel = $('#cityPanel'), curCity = C[0].id;
  cityTabs.innerHTML = C.map(function (c, i) { return '<button class="chip' + (i === 0 ? ' on' : '') + '" role="tab" data-id="' + c.id + '">' + c.name + '</button>'; }).join('');
  function renderCity(id, scroll) {
    var c = C.filter(function (x) { return x.id === id; })[0]; if (!c) return; curCity = id;
    $$('.chip', cityTabs).forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); });
    $$('#myMap .pin').forEach(function (p) { p.classList.toggle('on', p.dataset.city === id); });
    var uni = c.unis.length ? c.unis.map(function (uid) { var u = U.filter(function (x) { return x.id === uid; })[0]; return '<button type="button" class="cuni" data-id="' + uid + '">' + u.short + '</button>'; }).join('') : '';
    cityPanel.innerHTML =
      '<div class="city__media"><button type="button" class="city__main" id="cityMain" aria-label="Open photo"><img src="' + c.photos[0].src + '" alt="' + c.photos[0].cap + '"><span>' + c.photos[0].cap + '</span></button>' +
      (c.photos.length > 1 ? '<div class="city__thumbs">' + c.photos.map(function (p, i) { return '<button type="button" class="thumb' + (i === 0 ? ' on' : '') + '" data-i="' + i + '" aria-label="' + p.cap + '"><img src="' + p.src + '" alt=""></button>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="city__info"><span class="badge">' + c.badge + '</span><h3>' + c.name + '</h3><p class="city__tag">' + c.tag + '</p><p>' + c.about + '</p>' +
      '<ul class="facts">' + c.facts.map(function (f) { return '<li><span>' + f[0] + '</span><div><b>' + f[1] + '</b><small>' + f[2] + '</small></div></li>'; }).join('') + '</ul>' +
      '<div class="city__unis">' + (uni ? '<small class="city__note">Featured campuses:</small>' + uni : '') + '<span class="city__note">' + c.note + '</span></div>' +
      '<button type="button" class="btn btn--copper" id="cityWa">Ask about studying near ' + c.name + '</button></div>';
    var main = $('#cityMain');
    main.onclick = function () { openLb(c.photos, +(main.dataset.i || 0)); };
    $$('.thumb', cityPanel).forEach(function (t) {
      t.addEventListener('click', function () {
        var i = +t.dataset.i; main.dataset.i = i; main.querySelector('img').src = c.photos[i].src; main.querySelector('img').alt = c.photos[i].cap; main.querySelector('span').textContent = c.photos[i].cap;
        $$('.thumb', cityPanel).forEach(function (x) { x.classList.toggle('on', x === t); });
      });
    });
    $$('.cuni', cityPanel).forEach(function (b) { b.addEventListener('click', function () { openModal(b.dataset.id); }); });
    $('#cityWa').onclick = function () { openWhatsApp('Hello! I am interested in studying in Malaysia and would like to know about living and studying in ' + c.name + '. Please guide me.'); };
    if (scroll) $('#cities').scrollIntoView({ behavior: 'smooth' });
  }
  cityTabs.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) renderCity(b.dataset.id); });

  /* simplified outline of Peninsular Malaysia (lon, lat) */
  var outline = [[100.12,6.45],[100.6,6.4],[101.1,6.25],[102.1,6.2],[102.25,6.2],[102.7,5.9],[103.13,5.33],[103.42,4.7],[103.45,4.25],[103.33,3.8],[103.5,3.4],[103.7,2.8],[103.84,2.43],[104.2,1.7],[104.25,1.4],[103.75,1.3],[103.4,1.5],[102.57,2.05],[102.25,2.2],[101.8,2.5],[101.35,3.0],[101.25,3.35],[100.9,3.9],[100.6,4.2],[100.4,5.3],[100.3,6.1]];
  var px = function (lon) { return (lon - 99.8) * 100; }, py = function (lat) { return (6.8 - lat) * 100; };
  var pins = { kl: [101.69, 3.14, 14, -2], putrajaya: [101.69, 2.93, 14, 18], penang: [100.33, 5.41, 14, 5] };
  $('#myMap').innerHTML =
    '<polygon class="land" points="' + outline.map(function (o) { return px(o[0]).toFixed(1) + ',' + py(o[1]).toFixed(1); }).join(' ') + '"/>' +
    '<text class="sea" x="6" y="300">Strait of</text><text class="sea" x="6" y="316">Malacca</text><text class="sea" x="392" y="330">South</text><text class="sea" x="392" y="346">China Sea</text>' +
    C.map(function (c) {
      var p = pins[c.id]; if (!p) return '';
      return '<g class="pin" data-city="' + c.id + '" tabindex="0" role="button" aria-label="' + c.name + '"><circle class="ring" cx="' + px(p[0]) + '" cy="' + py(p[1]) + '" r="9"/><circle class="dot" cx="' + px(p[0]) + '" cy="' + py(p[1]) + '" r="9"/><text x="' + (px(p[0]) + p[2]) + '" y="' + (py(p[1]) + p[3] + 4) + '">' + c.name + '</text></g>';
    }).join('');
  $$('#myMap .pin').forEach(function (g) {
    g.addEventListener('click', function () { renderCity(g.dataset.city, true); });
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); renderCity(g.dataset.city, true); } });
  });

  /* monthly spending breakdown */
  var costCats = window.COSTCATS, catTotal = costCats.reduce(function (a, c) { return a + c.rm; }, 0), tints = ['#2D4263', '#B87333', '#5b7399', '#d49a62', '#8a97ad'];
  $('#costStack').innerHTML = costCats.map(function (c, i) { return '<span style="width:' + (c.rm / catTotal * 100) + '%;background:' + tints[i % tints.length] + '" title="' + c.name + '"></span>'; }).join('');
  $('#costTotal').textContent = 'RM ' + catTotal.toLocaleString('en-US');
  $('#costCats').innerHTML = costCats.map(function (c, i) {
    return '<div class="cc"><b>' + c.icon + '</b><span>' + c.name + '</span><small>RM ' + c.rm.toLocaleString('en-US') + '</small><i style="width:' + (c.rm / catTotal * 100) + '%;background:' + tints[i % tints.length] + '"></i></div>';
  }).join('');
  renderCity(curCity);
})();
