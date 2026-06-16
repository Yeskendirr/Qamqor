require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const { db, initDb } = require('./database');

initDb();

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function daysAgo(n) { return daysFromNow(-n); }

// Конкретные фото с Unsplash по теме
const PHOTOS = {
  schoolSupplies:  'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
  summerCamp:      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
  medical:         'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  education:       'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  healthcare:      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
  campNature:      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&q=80',
  winterHelp:      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
  charityMarket:   'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  volunteers:      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
  marathon:        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  schoolEvent:     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  seminar:         'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  children:        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  community:       'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
  helpHands:       'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
  kidsSport:       'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80',
};

db.exec(`
  DELETE FROM faq;
  DELETE FROM news;
  DELETE FROM projects;
  DELETE FROM events;
  DELETE FROM about;
  DELETE FROM gallery;
`);

db.prepare(`
  INSERT INTO about (title, description, mission, vision, founded_year, team_count)
  VALUES (?, ?, ?, ?, ?, ?)
`).run(
  'QamQor Қайырымдылық Қоры',
  'QamQor — Казахстандегі балалар мен отбасыларға көмек көрсететін қайырымдылық қоры. Біз білім, денсаулық және әлеуметтік қолдау бағдарламаларын іске асырамыз.',
  'Қажетті адамдарға уақтылы және тиімді көмек көрсету арқылы қоғамда оң өзгеріс тудыру.',
  'Барлық адам лайықты өмір сүруге, білім алуға және денсаулықты сақтауға мүмкіндігі бар қоғам.',
  2018, 47
);

const faqStmt = db.prepare('INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)');
[
  ['Қорға қалай көмек бере аламын?', 'Сіз волонтер ретінде тіркеліп немесе байланыс формасы арқылы бізге хабарласа аласыз.', 1],
  ['Қор қандай бағыттарда жұмыс істейді?', 'Біз білім беру, денсаулық сақтау, әлеуметтік қолдау және балалар бағдарламалары бойынша жұмыс жасаймыз.', 2],
  ['Жобаларға қалай қатыса аламын?', 'Байланыс формасы арқылы немесе тікелей бізге хабарласыңыз, біз сізге барлық ақпаратты береміз.', 3],
  ['Қор есептілігі қайда жарияланады?', 'Жылдық есептер "Жаңалықтар" бөлімінде жарияланады.', 4],
  ['Волонтерлер қабылданады ма?', 'Иә, біз үнемі жаңа волонтерлерді қуанышпен қабылдаймыз. Байланыс формасы арқылы жазыңыз.', 5],
].forEach(f => faqStmt.run(...f));

const newsStmt = db.prepare('INSERT INTO news (title, content, excerpt, image_url, published_at) VALUES (?, ?, ?, ?, ?)');
[
  [
    'QamQor 500 балаға мектеп жабдықтарын берді',
    'QamQor қоры Алматы, Астана және Шымкент қалаларындағы 500 мұқтаж балаға мектеп жабдықтарын тарту жасады. Акция аясында балаларға дәптерлер, қаламдар, рюкзактар және басқа да қажетті оқу құралдары берілді. Іс-шара аясында ата-аналарға да консультация берілді.',
    '500 балаға мектеп жабдықтары тарту етілді',
    PHOTOS.schoolSupplies,
    daysAgo(30),
  ],
  [
    'Жаз лагері — нәтижелер',
    'Жаздық лагерімізге 120 бала қатысты. Балалар спорт, өнер, экология және командалық жұмыс дағдыларын үйренді. Лагерь Алматы маңындағы тауларда 14 күн бойы жұмыс жасады.',
    'Жаздық лагерь сәтті аяқталды',
    PHOTOS.summerCamp,
    daysAgo(60),
  ],
  [
    'Медициналық тексеру акциясы',
    'Ауылдық аймақтарда тұратын 200-ден астам тұрғынға тегін медициналық тексеру жүргізілді. Терапевт, педиатр, окулист мамандары қатысты. Тексеру нәтижесінде 40-тан астам адамға дәрі-дәрмек тегін берілді.',
    '200+ адам тегін медициналық тексеруден өтті',
    PHOTOS.medical,
    daysAgo(90),
  ],
].forEach(n => newsStmt.run(...n));

const projectStmt = db.prepare('INSERT INTO projects (title, description, status, image_url, start_date, end_date, beneficiaries) VALUES (?, ?, ?, ?, ?, ?, ?)');
[
  ['Білім — болашақ', 'Мұқтаж отбасылардың балаларына мектеп жабдықтары, форма және оқулықтар беру бағдарламасы. Жыл сайын 500-ден астам бала қамтылады.', 'active', PHOTOS.education, daysAgo(365 * 3), null, 1500],
  ['Саулық — байлық', 'Ауылдық аймақтарда тегін медициналық тексеру, дәрі-дәрмек беру және медициналық консультация ұйымдастыру жобасы.', 'active', PHOTOS.healthcare, daysAgo(365 * 4), null, 3200],
  ['Жаз лагері', 'Мұқтаж отбасылардың балаларына арналған жыл сайынғы тегін жаздық лагерь бағдарламасы.', 'active', PHOTOS.campNature, daysAgo(365 * 5), null, 720],
  ['Жылы үй', 'Қысқы маусымда мұқтаж отбасыларға тамақ жиынтығы, жылы киім және тұрмыстық зат беру жобасы.', 'completed', PHOTOS.winterHelp, daysAgo(365), daysAgo(120), 450],
].forEach(p => projectStmt.run(...p));

const eventStmt = db.prepare('INSERT INTO events (title, description, event_date, location, image_url) VALUES (?, ?, ?, ?, ?)');
[
  ['Қайырымдылық базары', 'Жыл сайынғы қайырымдылық базары. Қолдан жасалған бұйымдар, тағам, ойындар. Жиналған қаражат балалар бағдарламасына бағытталады.', daysFromNow(7), 'Алматы, Атакент көрме орталығы', PHOTOS.charityMarket],
  ['Волонтерлер кездесуі', 'QamQor волонтерлерінің кездесуі. Жыл нәтижелерін қорыту, марапаттау, жаңа жобаларды талқылау.', daysFromNow(14), 'Алматы, Достық Орталығы', PHOTOS.volunteers],
  ['Марафон "Жүгір — жәрдем ет"', '5 км және 10 км марафон. Қатысушылардың жарналары балаларға арналған бағдарламаны қаржыландырады.', daysFromNow(21), 'Алматы, Орталық саябақ', PHOTOS.marathon],
  ['Өткен акция: мектеп жабдықтары', 'Мұқтаж балаларға мектеп жабдықтарын тарту ету акциясы сәтті өтті.', daysAgo(14), 'Алматы, №23 мектеп', PHOTOS.schoolEvent],
  ['Өткен семинар: волонтерлерге арналған', 'Жаңа волонтерлер үшін бағдарлама мен нұсқаулық семинары өтті.', daysAgo(30), 'Алматы, QamQor кеңсесі', PHOTOS.seminar],
].forEach(e => eventStmt.run(...e));

const galleryStmt = db.prepare('INSERT INTO gallery (title, image_url, category) VALUES (?, ?, ?)');
[
  ['Мектеп жабдықтары акциясы', PHOTOS.schoolSupplies, 'events'],
  ['Балалармен жұмыс', PHOTOS.children, 'events'],
  ['Жаз лагері', PHOTOS.summerCamp, 'events'],
  ['Волонтерлер командасы', PHOTOS.volunteers, 'events'],
  ['Медициналық акция', PHOTOS.medical, 'events'],
  ['Қоғамдық іс-шара', PHOTOS.community, 'events'],
  ['Балалар спорты', PHOTOS.kidsSport, 'projects'],
  ['Қол ұшын беру', PHOTOS.helpHands, 'projects'],
].forEach(g => galleryStmt.run(...g));

console.log('Сид сәтті орындалды.');
