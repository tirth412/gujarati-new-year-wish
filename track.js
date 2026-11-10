import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

let db = null;
if (!firebaseConfig.apiKey.startsWith('PASTE')) {
  db = getFirestore(initializeApp(firebaseConfig));
}

// Called from script.js when someone taps WhatsApp / Copy link.
window.logShare = (d) => {
  if (!db) return;
  addDoc(collection(db, 'shares'), {
    method: d.method,
    to: (d.to || '').slice(0, 40),
    theme: d.theme || '',
    lang: d.lang || '',
    page: location.href.slice(0, 300),
    at: serverTimestamp(),
  }).catch(() => {});
};

// One record per page open. The owner's own browser (marked on admin sign-in) is skipped.
function store(k, v) {
  try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { /* storage blocked */ }
  return null;
}
function logVisit() {
  if (!db || store('wishOwner')) return;
  let id = store('wishVisitor');
  const returning = !!id;
  if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()); store('wishVisitor', id); }
  const q = new URLSearchParams(location.search);
  addDoc(collection(db, 'visits'), {
    visitor: id,
    src: q.has('lang') || q.has('for') || q.has('name') ? 'shared' : 'direct',
    lang: (q.get('lang') || '').slice(0, 5),
    theme: (q.get('for') || '').slice(0, 20),
    device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    returning,
    at: serverTimestamp(),
  }).catch(() => {});
}
logVisit();
