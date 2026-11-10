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
