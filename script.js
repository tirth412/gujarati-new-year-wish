(function () {
  const $ = (id) => document.getElementById(id);
  const intro = $('intro'), wish = $('wish'), music = $('music');
  const canvas = $('fx'), ctx = canvas.getContext('2d');

  // ---------- Wishes (one is picked at random each time) ----------
  const WISHES_HI = {
    general: [
      'नया साल आपके जीवन में सुख, समृद्धि और शांति लाए।\nमाँ लक्ष्मी की कृपा सदा आप और आपके परिवार पर बनी रहे।\nहर दिन दीपक की तरह रोशन और खुशियों से भरा हो।',
      'नया सवेरा, नई आशा, नई उमंग,\nआपके जीवन में खिलें खुशियों के हज़ार रंग।\nनूतन वर्षाभिनंदन!',
      'बीते साल की कड़वी यादें भूल जाइए,\nनए साल की मीठी उम्मीदें अपनाइए।\nआपको और आपके परिवार को नूतन वर्ष मुबारक!',
      'दीपक की लौ की तरह आपका जीवन जगमगाता रहे,\nऔर हर अँधेरा आपसे दूर रहे।\nनूतन वर्षाभिनंदन!',
    ],
    family: [
      'आपका परिवार सदा हँसता-मुस्कुराता रहे।\nघर में प्रेम, एकता और आशीर्वाद की रोशनी बनी रहे।\nनूतन वर्ष मंगलमय हो!',
      'माता-पिता का आशीर्वाद और अपनों का साथ,\nहर दिन को बना दे खुशियों की सौगात।\nनया साल आपके घर-आँगन में उजाला भरे।',
      'रिश्तों में मिठास, घर में शांति,\nऔर दिल में अपनापन बना रहे।\nनया वर्ष आपके पूरे परिवार को शुभ हो।',
      'आपके घर में सदा दीप जलते रहें,\nहर सदस्य के चेहरे पर मुस्कान खिलती रहे।\nनूतन वर्षाभिनंदन!',
    ],
    wealth: [
      'माँ लक्ष्मी की कृपा से आपका घर धन-धान्य से भरा रहे।\nव्यापार में दिन दूनी रात चौगुनी तरक्की हो।\nनया साल शुभ और लाभकारी हो!',
      'लक्ष्मी जी आपके द्वार पर स्थायी रूप से विराजें।\nसमृद्धि, सफलता और सम्मान आपके साथ रहें।\nनूतन वर्ष की हार्दिक शुभकामनाएँ!',
      'इस नए साल आपकी मेहनत सोना बन जाए,\nऔर हर शुभ आरंभ में लाभ-ही-लाभ हो।\nशुभ-लाभ!',
      'चोपड़ा पूजन की तरह आपका हर हिसाब शुभ रहे,\nखुशियाँ जमा हों और चिंताएँ घटती रहें।\nनया साल मंगलमय हो!',
    ],
    health: [
      'आप सदा स्वस्थ, सुखी और ऊर्जावान रहें।\nहर सुबह नई शक्ति और हर शाम शांति लेकर आए।\nनया साल आरोग्य से भरा हो।',
      'तन स्वस्थ, मन प्रसन्न और आत्मा शांत रहे।\nभगवान आपको लंबी उम्र और अच्छा स्वास्थ्य दें।\nनूतन वर्षाभिनंदन!',
      'इस वर्ष हर चिंता दीये की लौ में जल जाए,\nऔर आपके जीवन में सिर्फ़ सुकून और सेहत रहे।',
    ],
    success: [
      'इस नए साल आपके सारे सपने सच हों।\nहर कोशिश में सफलता और हर कदम पर जीत मिले।\nशुभ आरंभ!',
      'नई उम्मीदें, नया उत्साह, नई मंज़िलें,\nआपका हर लक्ष्य इस साल पूरा हो।\nनया साल आपके नाम!',
      'जो चाहें वो पाएँ, जहाँ जाएँ वहाँ चमकें।\nमाँ सरस्वती और लक्ष्मी का आशीर्वाद सदा आपके साथ रहे।\nनूतन वर्ष मंगलमय हो!',
      'मेहनत आपकी, आशीर्वाद हमारा,\nसफलता आपके कदम चूमे।\nसाल मुबारक!',
    ],
    friends: [
      'आपकी दोस्ती मेरे जीवन का सबसे सुंदर तोहफ़ा है।\nनया साल हमारी यादों में और रंग भर दे।\nनूतन वर्षाभिनंदन, दोस्त!',
      'हँसी, मस्ती और ढेर सारी मिठाई के साथ,\nनया साल आपके लिए यादगार बने।\nसाल मुबारक!',
      'दोस्त, यह साल आपके लिए खुशियाँ, सफलता\nऔर ढेर सारे अच्छे पल लेकर आए।\nहमेशा यूँ ही मुस्कुराते रहिए!',
    ],
  };
  const WISHES_GU = {
    general: [
      'નવું વર્ષ તમારા જીવનમાં સુખ, સમૃદ્ધિ અને શાંતિ લાવે.\nમાતા લક્ષ્મીની કૃપા તમારા અને તમારા પરિવાર પર સદા રહે.\nદરેક દિવસ દીવાની જેમ ઝળહળતો અને ખુશીઓથી ભરેલો હોય.',
      'નવી સવાર, નવી આશા, નવી ઉમંગ,\nતમારા જીવનમાં ખીલે ખુશીઓના હજાર રંગ.\nનૂતન વર્ષાભિનંદન!',
      'બેસતા વર્ષની હાર્દિક શુભકામનાઓ!\nબીતેલા વર્ષની કડવી યાદો ભૂલી જાઓ,\nઅને નવા વર્ષની મીઠી આશાઓ અપનાવો.',
      'દીવાની જ્યોતની જેમ તમારું જીવન ઝગમગતું રહે,\nઅને દરેક અંધકાર તમારાથી દૂર રહે.\nસાલ મુબારક!',
      'નવા વર્ષે તમારા દરેક સપના સાકાર થાય,\nઘરમાં આનંદ અને હૃદયમાં શાંતિ રહે.\nજય શ્રી કૃષ્ણ, સાલ મુબારક!',
    ],
    family: [
      'તમારો પરિવાર સદા હસતો-રમતો રહે.\nઘરમાં પ્રેમ, એકતા અને આશીર્વાદનો પ્રકાશ રહે.\nનવું વર્ષ મંગલમય હો!',
      'માતા-પિતાના આશીર્વાદ અને સ્વજનોનો સાથ,\nદરેક દિવસને બનાવે ખુશીઓની સોગાત.\nનવું વર્ષ તમારા ઘરઆંગણે અજવાળું ભરે.',
      'સંબંધોમાં મીઠાશ, ઘરમાં શાંતિ,\nઅને દિલમાં અપનાપણું સદા રહે.\nનવું વર્ષ આખા પરિવારને શુભ હો.',
    ],
    wealth: [
      'મા લક્ષ્મીની કૃપાથી તમારું ઘર ધન-ધાન્યથી ભરેલું રહે.\nવ્યવસાયમાં દિન બમણી અને રાત ચોગણી પ્રગતિ થાય.\nનવું વર્ષ શુભ અને લાભદાયી હો!',
      'લક્ષ્મીજી તમારા આંગણે સદા બિરાજે.\nસમૃદ્ધિ, સફળતા અને સન્માન તમારી સાથે રહે.\nશુભ-લાભ!',
      'ચોપડા પૂજનની જેમ તમારો દરેક હિસાબ શુભ રહે,\nખુશીઓ જમા થાય અને ચિંતાઓ ઘટતી રહે.\nનવું વર્ષ મંગલમય હો!',
    ],
    health: [
      'તમે સદા સ્વસ્થ, સુખી અને ઉર્જાવાન રહો.\nદરેક સવાર નવી શક્તિ અને દરેક સાંજ શાંતિ લાવે.\nનવું વર્ષ આરોગ્યથી ભરેલું હો.',
      'તન સ્વસ્થ, મન પ્રસન્ન અને આત્મા શાંત રહે.\nભગવાન તમને લાંબી ઉંમર અને સારું સ્વાસ્થ્ય આપે.\nનૂતન વર્ષાભિનંદન!',
      'આ વર્ષે દરેક ચિંતા દીવાની જ્યોતમાં બળી જાય,\nઅને તમારા જીવનમાં માત્ર શાંતિ અને તંદુરસ્તી રહે.',
    ],
    success: [
      'આ નવા વર્ષે તમારા બધા સપના સાચા થાય.\nદરેક પ્રયત્નમાં સફળતા અને દરેક પગલે જીત મળે.\nશુભ શરૂઆત!',
      'નવી આશાઓ, નવો ઉત્સાહ, નવી મંઝિલો,\nતમારું દરેક લક્ષ્ય આ વર્ષે પૂરું થાય.\nનવું વર્ષ તમારા નામે!',
      'મહેનત તમારી, આશીર્વાદ અમારા,\nસફળતા તમારા કદમ ચૂમે.\nસાલ મુબારક!',
    ],
    friends: [
      'તમારી મિત્રતા મારા જીવનની સૌથી સુંદર ભેટ છે.\nનવું વર્ષ આપણી યાદોમાં વધુ રંગ ભરે.\nનૂતન વર્ષાભિનંદન, મિત્ર!',
      'હાસ્ય, મસ્તી અને ઢગલો મીઠાઈ સાથે,\nનવું વર્ષ તમારા માટે યાદગાર બને.\nસાલ મુબારક!',
      'દોસ્ત, આ વર્ષ તમારા માટે ખુશીઓ, સફળતા\nઅને ઘણા સારા પળો લઈને આવે.\nહંમેશા આમ જ હસતા રહો!',
    ],
  };
  const WISHES_EN = {
    general: [
      'May the new year bring you happiness, prosperity and peace.\nMay Maa Lakshmi\'s blessings always be with you and your family.\nMay every day shine like a diya and be full of joy.',
      'A new dawn, new hope, new joy,\nmay your life bloom with a thousand colours.\nHappy New Year!',
      'Leave the bitter memories of the past year behind,\nand embrace the sweet hopes of the new one.\nWarm New Year wishes to you and your family!',
      'May your life glow like the flame of a diya,\nand may every darkness stay far away from you.\nSaal Mubarak!',
      'May all your dreams come true this new year,\nwith joy in your home and peace in your heart.\nJai Shri Krishna, Saal Mubarak!',
    ],
    family: [
      'May your family always be smiling and happy.\nMay love, unity and blessings light up your home.\nHappy New Year!',
      'With the blessings of parents and the company of loved ones,\nmay every day be a gift of happiness.\nMay the new year fill your home with light.',
      'Sweetness in relationships, peace at home,\nand warmth in every heart.\nMay the new year be auspicious for your whole family.',
    ],
    wealth: [
      'By Maa Lakshmi\'s grace, may your home overflow with prosperity.\nMay your business grow by leaps and bounds.\nA happy and profitable new year!',
      'May Lakshmi ji reside at your door forever.\nMay prosperity, success and respect stay with you.\nShubh Labh!',
      'May every account of yours be auspicious like Chopda Pujan,\nwith joys growing and worries shrinking.\nHappy New Year!',
    ],
    health: [
      'May you always stay healthy, happy and full of energy.\nMay every morning bring new strength and every evening peace.\nA new year full of good health.',
      'A healthy body, a happy mind and a calm soul.\nMay God bless you with a long life and good health.\nHappy New Year!',
      'May every worry burn away in the flame of the diya this year,\nleaving only peace and good health in your life.',
    ],
    success: [
      'May all your dreams come true this new year.\nMay every effort meet success and every step bring victory.\nShubh Aarambh!',
      'New hopes, new enthusiasm, new destinations,\nmay every goal of yours be achieved this year.\nThis new year is yours!',
      'The hard work is yours, the blessings are ours.\nMay success touch your feet.\nSaal Mubarak!',
    ],
    friends: [
      'Your friendship is the most beautiful gift in my life.\nMay the new year add even more colour to our memories.\nHappy New Year, my friend!',
      'With laughter, fun and lots of mithai,\nmay the new year be unforgettable for you.\nSaal Mubarak!',
      'Friend, may this year bring you joy, success\nand plenty of good moments.\nKeep smiling, always!',
    ],
  };
  const WISHES_BY = { hi: WISHES_HI, gu: WISHES_GU, en: WISHES_EN };
  let WISHES = WISHES_HI, ALL = [];

  // ---------- Interface text ----------
  const STR = {
    hi: {
      introTitle: 'दीपक जलाएँ', introSub: 'हर दीपक को छूकर जलाइए 🪔', skip: 'सीधे शुभकामना खोलें →',
      diyaDone: 'शुभ आरंभ! 🎆',
      morning: '🌅 शुभ प्रभात', noon: '☀️ शुभ दोपहर', eve: '🌇 शुभ संध्या', night: '🌙 नमस्ते',
      title: 'नूतन वर्षाभिनंदन', sub: 'નૂતન વર્ષાભિનંદન', samvat: 'कार्तिक शुक्ल प्रतिपदा • विक्रम संवत २०८३',
      saal: 'साल मुबारक! 🎆', hint: '✨ स्क्रीन पर कहीं भी छुएँ — फूल और आतिशबाज़ी खिल उठेंगे',
      newBtn: '✨ नई शुभकामना', replayBtn: '🔁 फिर से देखें', saveBtn: '📥 इमेज सेव करें',
      mute: '🔊 संगीत', muteOff: '🔇 संगीत',
      shareTitle: 'अपनों को शुभकामना भेजें', nameLabel: 'उनका नाम लिखें', namePh: 'जैसे: राहुल',
      themeLabel: 'शुभकामना किसके लिए?', langLabel: 'भाषा',
      th_general: 'सबके लिए (सामान्य)', th_family: 'परिवार', th_wealth: 'धन-समृद्धि / व्यापार',
      th_health: 'स्वास्थ्य', th_success: 'सफलता', th_friends: 'दोस्त',
      wa: 'WhatsApp पर भेजें', copy: 'लिंक कॉपी करें',
      footer: 'नववर्ष की हार्दिक शुभकामनाएँ',
      nameFmt: (n) => n + ' जी 🙏',
      saving: 'इमेज बन रही है…', saved: 'इमेज डाउनलोड हो गई ✅', saveFail: 'इमेज नहीं बन सकी, फिर कोशिश करें',
      copied: 'लिंक कॉपी हो गया ✅',
      shareMsg: 'नूतन वर्षाभिनंदन! 🪔 आपके लिए नववर्ष की एक खास शुभकामना:',
    },
    gu: {
      introTitle: 'દીવા પ્રગટાવો', introSub: 'દરેક દીવાને સ્પર્શ કરીને પ્રગટાવો 🪔', skip: 'સીધી શુભકામના ખોલો →',
      diyaDone: 'શુભ શરૂઆત! 🎆',
      morning: '🌅 સુપ્રભાત', noon: '☀️ શુભ બપોર', eve: '🌇 શુભ સંધ્યા', night: '🌙 નમસ્તે',
      title: 'નૂતન વર્ષાભિનંદન', sub: 'જય શ્રી કૃષ્ણ 🙏', samvat: 'કારતક સુદ એકમ • વિક્રમ સંવત ૨૦૮૩',
      saal: 'સાલ મુબારક! 🎆', hint: '✨ સ્ક્રીન પર ક્યાંય પણ અડો — ફૂલો અને આતશબાજી ખીલી ઉઠશે',
      newBtn: '✨ નવી શુભકામના', replayBtn: '🔁 ફરી જુઓ', saveBtn: '📥 ઇમેજ સેવ કરો',
      mute: '🔊 સંગીત', muteOff: '🔇 સંગીત',
      shareTitle: 'સ્વજનોને શુભકામના મોકલો', nameLabel: 'તેમનું નામ લખો', namePh: 'જેમ કે: રાહુલ',
      themeLabel: 'શુભકામના કોના માટે?', langLabel: 'ભાષા',
      th_general: 'સૌ માટે (સામાન્ય)', th_family: 'પરિવાર', th_wealth: 'ધન-સમૃદ્ધિ / વ્યવસાય',
      th_health: 'સ્વાસ્થ્ય', th_success: 'સફળતા', th_friends: 'મિત્રો',
      wa: 'WhatsApp પર મોકલો', copy: 'લિંક કૉપી કરો',
      footer: 'નવા વર્ષની હાર્દિક શુભકામનાઓ',
      nameFmt: (n) => n + ' જી 🙏',
      saving: 'ઇમેજ બની રહી છે…', saved: 'ઇમેજ ડાઉનલોડ થઈ ✅', saveFail: 'ઇમેજ બની શકી નહીં, ફરી પ્રયત્ન કરો',
      copied: 'લિંક કૉપી થઈ ગઈ ✅',
      shareMsg: 'નૂતન વર્ષાભિનંદન! 🪔 તમારા માટે નવા વર્ષની એક ખાસ શુભકામના:',
    },
    en: {
      introTitle: 'Light the diyas', introSub: 'Tap each diya to light it 🪔', skip: 'Open the wish directly →',
      diyaDone: 'Shubh Aarambh! 🎆',
      morning: '🌅 Good morning', noon: '☀️ Good afternoon', eve: '🌇 Good evening', night: '🌙 Namaste',
      title: 'Happy New Year', sub: 'નૂતન વર્ષાભિનંદન', samvat: 'Kartik Shukla Pratipada • Vikram Samvat 2083',
      saal: 'Saal Mubarak! 🎆', hint: '✨ Tap anywhere — flowers and fireworks will bloom',
      newBtn: '✨ New wish', replayBtn: '🔁 Watch again', saveBtn: '📥 Save as image',
      mute: '🔊 Music', muteOff: '🔇 Music',
      shareTitle: 'Send this wish to your loved ones', nameLabel: 'Their name', namePh: 'e.g. Rahul',
      themeLabel: 'Wish for', langLabel: 'Language',
      th_general: 'Everyone (general)', th_family: 'Family', th_wealth: 'Wealth / Business',
      th_health: 'Health', th_success: 'Success', th_friends: 'Friends',
      wa: 'Send on WhatsApp', copy: 'Copy link',
      footer: 'Warm wishes for the new year',
      nameFmt: (n) => 'Dear ' + n + ' 🙏',
      saving: 'Creating image…', saved: 'Image downloaded ✅', saveFail: 'Could not create the image, please try again',
      copied: 'Link copied ✅',
      shareMsg: 'Happy New Year! 🪔 A special wish for you:',
    },
  };
  let lang = 'hi';
  const t = (k) => STR[lang][k];

  // ---------- Colour palettes (a new one with each wish) ----------
  const PALETTES = [
    { name: 'maroon',  bg1: '#7a1428', bg2: '#4a0d1a', bg3: '#2a0610', c1: 'rgba(122,20,40,.75)', c2: 'rgba(74,13,26,.85)',  ink: '#4a0d1a' },
    { name: 'saffron', bg1: '#b34700', bg2: '#7a2a00', bg3: '#3d1400', c1: 'rgba(179,71,0,.7)',   c2: 'rgba(122,42,0,.85)',  ink: '#5a1f00' },
    { name: 'royal',   bg1: '#26307a', bg2: '#141a4d', bg3: '#0a0d2b', c1: 'rgba(38,48,122,.7)',  c2: 'rgba(20,26,77,.85)',  ink: '#141a4d' },
    { name: 'emerald', bg1: '#0f6b4f', bg2: '#09432f', bg3: '#04221a', c1: 'rgba(15,107,79,.7)',  c2: 'rgba(9,67,47,.85)',   ink: '#09432f' },
  ];
  let pal = PALETTES[0];
  function applyPalette(p) {
    pal = p;
    const s = document.documentElement.style;
    s.setProperty('--bg1', p.bg1); s.setProperty('--bg2', p.bg2); s.setProperty('--bg3', p.bg3);
    s.setProperty('--card1', p.c1); s.setProperty('--card2', p.c2); s.setProperty('--ink', p.ink);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', p.bg2);
  }

  // ---------- URL params: ?name=...&for=family ----------
  const params = new URLSearchParams(location.search);
  const name = (params.get('name') || '').trim().slice(0, 40);
  let theme = params.get('for') || '';
  if (!WISHES_HI[theme]) theme = '';
  if (name) $('nameInput').value = name;
  $('themeSelect').value = theme;

  // language: ?lang= in the link, else the phone/browser language, else Hindi
  function detectLang() {
    const q = (params.get('lang') || '').toLowerCase();
    if (STR[q]) return q;
    const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    if (nav.startsWith('gu')) return 'gu';
    if (nav.startsWith('en')) return 'en';
    return 'hi';
  }

  function greetingKey() {
    const h = new Date().getHours();
    return h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 16 ? 'noon' : h >= 16 && h < 21 ? 'eve' : 'night';
  }

  // apply a language to all the text on the page (rerender = also pick a fresh wish)
  function setLang(l, rerender) {
    lang = l;
    document.documentElement.lang = l;
    WISHES = WISHES_BY[l];
    ALL = [].concat(...Object.values(WISHES));
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $('muteBtn').textContent = muted ? t('muteOff') : t('mute');
    $('greeting').textContent = t(greetingKey());
    $('toName').textContent = name ? t('nameFmt')(name) : '';
    $('langSelect').value = l;
    document.querySelectorAll('.lang-switch button').forEach((b) => b.classList.toggle('on', b.dataset.lang === l));
    document.title = t('title') + ' 🪔';
    if (opened) $('diyaCount').textContent = t('diyaDone');
    if (rerender && wish.classList.contains('active')) { pickWish(); playWish(); }
    else if (rerender) current = '';
  }

  // ---------- Rangoli (self-drawing SVG) ----------
  function buildRangoli() {
    let i = 0, out = '';
    const el = (tag, attrs, cls) => {
      out += `<${tag} class="draw ${cls || ''}" pathLength="1" style="--i:${i++}" ${attrs}/>`;
    };
    el('circle', 'cx="0" cy="0" r="14"');
    el('circle', 'cx="0" cy="0" r="34"');
    for (let k = 0; k < 12; k++) el('ellipse', `cx="0" cy="-52" rx="9" ry="18" transform="rotate(${k * 30})"`);
    el('circle', 'cx="0" cy="0" r="74"');
    for (let k = 0; k < 16; k++) {
      const a = (k * 22.5 * Math.PI) / 180;
      el('circle', `cx="${(Math.sin(a) * 82).toFixed(1)}" cy="${(-Math.cos(a) * 82).toFixed(1)}" r="4"`, 'dot');
    }
    for (let k = 0; k < 8; k++) el('path', `d="M0 -92 L7 -82 L0 -72 L-7 -82 Z" transform="rotate(${k * 45 + 22.5})"`);
    el('circle', 'cx="0" cy="0" r="94"');
    $('rangoli').innerHTML = `<svg viewBox="-100 -100 200 200">${out}</svg>`;
  }

  // ---------- Canvas: petals, fireworks, blooms ----------
  let W, H, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const PETAL_COLORS = ['#ffb300', '#ff8f00', '#ffca28', '#ff6f00'];
  function newPetal(randomY) {
    return {
      x: Math.random() * W, y: randomY ? Math.random() * H : -20,
      r: 4 + Math.random() * 6, vy: 0.5 + Math.random() * 1.1,
      sway: Math.random() * Math.PI * 2, rot: Math.random() * Math.PI,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
    };
  }
  const petals = Array.from({ length: window.innerWidth < 600 ? 22 : 40 }, () => newPetal(true));

  const rockets = [], sparks = [], blooms = [];
  let fireworks = false, lastLaunch = 0;
  const SPARK_COLORS = ['#ffd54f', '#ff8a65', '#ff4081', '#fff176', '#ffab40', '#f48fb1'];
  const FLOWER_COLORS = ['#ffb300', '#ff7043', '#ec407a', '#ffd54f', '#ff9800'];

  function launch() {
    rockets.push({ x: W * (0.15 + Math.random() * 0.7), y: H, ty: H * (0.12 + Math.random() * 0.35), vy: -(7 + Math.random() * 3) });
  }
  function burst(x, y) {
    const color = SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0];
    for (let i = 0; i < 48; i++) {
      const a = (Math.PI * 2 * i) / 48, s = 1.5 + Math.random() * 3;
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
    }
  }
  function bloom(x, y) {
    for (let i = 0; i < 5; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.6 + Math.random() * 2.2;
      blooms.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1,
        size: 7 + Math.random() * 7, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.12,
        life: 1, color: FLOWER_COLORS[(Math.random() * FLOWER_COLORS.length) | 0],
      });
    }
  }
  function drawFlower(b) {
    ctx.save();
    ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.globalAlpha = Math.min(1, b.life * 1.4);
    ctx.fillStyle = b.color;
    for (let k = 0; k < 5; k++) {
      ctx.rotate((Math.PI * 2) / 5);
      ctx.beginPath(); ctx.ellipse(0, -b.size * 0.55, b.size * 0.32, b.size * 0.55, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#fff3c4';
    ctx.beginPath(); ctx.arc(0, 0, b.size * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.y += p.vy; p.sway += 0.03; p.rot += 0.02; p.x += Math.sin(p.sway) * 0.6;
      if (p.y > H + 20) Object.assign(p, newPetal(false));
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.globalAlpha = 0.75;
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    if (fireworks && t - lastLaunch > 1000) { launch(); lastLaunch = t; }
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy; r.vy *= 0.985;
      ctx.fillStyle = '#fff'; ctx.fillRect(r.x, r.y, 2, 6);
      if (r.y <= r.ty) { burst(r.x, r.y); rockets.splice(i, 1); }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.03; s.vx *= 0.985; s.life -= 0.012;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life; ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    for (let i = blooms.length - 1; i >= 0; i--) {
      const b = blooms[i];
      b.x += b.vx; b.y += b.vy; b.vy += 0.035; b.vx *= 0.985; b.rot += b.vr; b.life -= 0.01;
      if (b.life <= 0) { blooms.splice(i, 1); continue; }
      drawFlower(b);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ---------- Wish logic ----------
  let current = '', lastIdx = -1, palIdx = -1, typeTimer;

  function pickWish() {
    const pool = theme ? WISHES[theme] : ALL;
    let i;
    do { i = (Math.random() * pool.length) | 0; } while (pool.length > 1 && pool[i] === current);
    current = pool[i];
    // next colour palette (never the same twice in a row)
    do { palIdx = (Math.random() * PALETTES.length) | 0; } while (PALETTES[palIdx] === pal);
    applyPalette(PALETTES[palIdx]);
  }

  function playWish() {
    clearInterval(typeTimer);
    const msg = $('message'), saal = $('saal');
    msg.textContent = ''; saal.classList.remove('show');
    buildRangoli();
    const chars = Array.from(current);
    let i = 0;
    typeTimer = setInterval(() => {
      msg.textContent += chars[i++];
      if (i >= chars.length) { clearInterval(typeTimer); saal.classList.add('show'); }
    }, 50);
    fireworks = true;
    for (let k = 0; k < 3; k++) setTimeout(launch, k * 350);
  }

  function showWish() {
    intro.classList.remove('active');
    wish.classList.add('active');
    window.scrollTo(0, 0);
    pickWish();
    playWish();
  }

  // ---------- Intro: light the diyas ----------
  const DIYAS = 5;
  let lit = 0, opened = false;
  const row = $('diyaRow');
  for (let i = 0; i < DIYAS; i++) {
    const b = document.createElement('button');
    b.className = 'diya';
    b.setAttribute('aria-label', 'दीपक ' + (i + 1));
    b.innerHTML = '<span class="flame"></span><span class="bowl"></span>';
    b.addEventListener('click', () => {
      if (b.classList.contains('lit')) return;
      b.classList.add('lit');
      lit++;
      $('diyaCount').textContent = lit + ' / ' + DIYAS;
      const r = b.getBoundingClientRect();
      bloom(r.left + r.width / 2, r.top + r.height / 3);
      if (lit === 1) startMusic();
      if (lit === DIYAS && !opened) {
        opened = true;
        $('diyaCount').textContent = t('diyaDone');
        for (let k = 0; k < 4; k++) setTimeout(launch, k * 200);
        setTimeout(showWish, 1500);
      }
    });
    row.appendChild(b);
  }
  $('skipBtn').addEventListener('click', () => {
    if (opened) return;
    opened = true; startMusic(); showWish();
  });

  // ---------- Music ----------
  let muted = false;
  function startMusic() {
    music.volume = 0.6;
    music.play().catch(() => { /* blocked or missing: site works silently */ });
  }
  $('muteBtn').addEventListener('click', () => {
    muted = !muted;
    music.muted = muted;
    if (!muted && music.paused) startMusic();
    $('muteBtn').textContent = muted ? t('muteOff') : t('mute');
  });

  // ---------- Buttons ----------
  $('newBtn').addEventListener('click', () => { pickWish(); playWish(); });
  $('replayBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playWish();
  });

  // tap anywhere on the wish screen: flowers + fireworks
  document.addEventListener('pointerdown', (e) => {
    if (!wish.classList.contains('active')) return;
    if (e.target.closest('button, input, select, a')) return;
    bloom(e.clientX, e.clientY);
    burst(e.clientX, e.clientY);
  });

  // ---------- Save as image ----------
  function wrapText(g, text, maxW) {
    const lines = [];
    for (const para of text.split('\n')) {
      let line = '';
      for (const word of para.split(' ')) {
        const test = line ? line + ' ' + word : word;
        if (g.measureText(test).width > maxW && line) { lines.push(line); line = word; }
        else line = test;
      }
      lines.push(line);
    }
    return lines;
  }

  async function buildImage() {
    try {
      await Promise.all([
        document.fonts.load('64px "Tiro Devanagari Hindi"'),
        document.fonts.load('600 40px Hind'),
        document.fonts.load('40px "Noto Sans Gujarati"'),
      ]);
    } catch (e) { /* fall back to system fonts */ }

    const w = 1080, h = 1350;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    const FONT = '"Hind","Noto Sans Gujarati",sans-serif';
    const SERIF = '"Tiro Devanagari Hindi","Noto Sans Gujarati",serif';

    const bg = g.createRadialGradient(w / 2, 0, 50, w / 2, 300, 1400);
    bg.addColorStop(0, pal.bg1); bg.addColorStop(0.6, pal.bg2); bg.addColorStop(1, pal.bg3);
    g.fillStyle = bg; g.fillRect(0, 0, w, h);

    // scattered marigold petals
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 55; i++) {
      g.save(); g.translate(rnd() * w, rnd() * h); g.rotate(rnd() * 3);
      g.globalAlpha = 0.14 + rnd() * 0.18; g.fillStyle = PETAL_COLORS[(rnd() * 4) | 0];
      g.beginPath(); g.ellipse(0, 0, 10 + rnd() * 12, 6 + rnd() * 6, 0, 0, Math.PI * 2); g.fill(); g.restore();
    }
    g.globalAlpha = 1;

    // frame
    g.strokeStyle = '#ffc94d'; g.lineWidth = 6;
    const rr = (x, y, ww, hh, r) => { g.beginPath(); g.roundRect ? g.roundRect(x, y, ww, hh, r) : g.rect(x, y, ww, hh); g.stroke(); };
    rr(50, 50, w - 100, h - 100, 50);
    g.lineWidth = 2; g.globalAlpha = 0.6; rr(76, 76, w - 152, h - 152, 36); g.globalAlpha = 1;

    g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    const fit = (text, font, size, maxW) => {
      do { g.font = font.replace('{s}', size); size -= 2; } while (g.measureText(text).width > maxW && size > 20);
    };

    let y = 190;
    g.fillStyle = '#ffc94d'; g.font = `88px ${SERIF}`; g.fillText('ॐ', w / 2, y);

    if (name) {
      y += 90; g.fillStyle = '#fff4d6'; g.font = `600 46px ${FONT}`;
      g.fillText(t('nameFmt')(name), w / 2, y);
    }

    y += 130;
    const tg = g.createLinearGradient(0, y - 90, 0, y + 20);
    tg.addColorStop(0, '#fff1b8'); tg.addColorStop(1, '#ff9f1c');
    g.fillStyle = tg; fit(t('title'), `{s}px ${SERIF}`, 112, 860);
    g.fillText(t('title'), w / 2, y);

    y += 72; g.fillStyle = '#ffc94d'; g.font = `46px ${FONT}`; g.fillText(t('sub'), w / 2, y);
    y += 56; g.fillStyle = 'rgba(255,244,214,.75)'; g.font = `30px ${FONT}`;
    g.fillText(t('samvat'), w / 2, y);

    y += 56;
    const lg = g.createLinearGradient(140, 0, w - 140, 0);
    lg.addColorStop(0, 'rgba(255,201,77,0)'); lg.addColorStop(0.5, '#ffc94d'); lg.addColorStop(1, 'rgba(255,201,77,0)');
    g.fillStyle = lg; g.fillRect(140, y, w - 280, 3);
    g.font = `44px ${FONT}`; g.fillStyle = '#fff4d6'; g.fillText('🪔', w / 2, y + 16);

    y += 110;
    g.fillStyle = '#fff4d6'; g.font = `600 42px ${FONT}`;
    const lines = wrapText(g, current, 820);
    for (const ln of lines) { g.fillText(ln, w / 2, y); y += 70; }

    y += 40;
    g.fillStyle = '#ffc94d'; g.font = `68px ${SERIF}`; g.fillText(t('saal'), w / 2, y);

    g.fillStyle = 'rgba(255,244,214,.6)'; g.font = `28px ${FONT}`;
    g.fillText('Made with ❤️', w / 2, h - 105);

    return new Promise((res) => c.toBlob(res, 'image/png'));
  }

  $('saveBtn').addEventListener('click', async () => {
    const note = $('saveNote');
    note.textContent = t('saving');
    try {
      const blob = await buildImage();
      const file = new File([blob], 'nutan-varshabhinandan.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'नूतन वर्षाभिनंदन 🪔' });
        note.textContent = '';
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = file.name;
        document.body.appendChild(a); a.click(); a.remove();
        note.textContent = t('saved');
      }
    } catch (e) {
      note.textContent = e && e.name === 'AbortError' ? '' : t('saveFail');
    }
  });

  // ---------- Sharing ----------
  function shareUrl() {
    const n = $('nameInput').value.trim(), f = $('themeSelect').value, l = $('langSelect').value;
    const q = new URLSearchParams();
    if (n) q.set('name', n);
    if (f) q.set('for', f);
    q.set('lang', l);
    const s = q.toString();
    return location.origin + location.pathname + (s ? '?' + s : '');
  }
  function shareText() {
    const n = $('nameInput').value.trim();
    const l = $('langSelect').value;
    return (n ? n + ', ' : '') + STR[l].shareMsg + '\n' + shareUrl();
  }
  function track(method) {
    if (window.logShare) window.logShare({
      method, to: $('nameInput').value.trim(), theme: $('themeSelect').value, lang: $('langSelect').value,
    });
  }
  $('waBtn').addEventListener('click', () => {
    track('whatsapp');
    window.open('https://wa.me/?text=' + encodeURIComponent(shareText()), '_blank', 'noopener');
  });
  $('copyBtn').addEventListener('click', async () => {
    const note = $('copyNote');
    track('copy');
    try { await navigator.clipboard.writeText(shareUrl()); note.textContent = t('copied'); }
    catch (e) { note.textContent = shareUrl(); }
  });

  // ---------- Language switching ----------
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.addEventListener('click', () => setLang(b.dataset.lang, true));
  });
  $('langSelect').addEventListener('change', () => { /* only affects the shared link */ });

  setLang(detectLang(), false);
})();
