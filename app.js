const form = document.getElementById('poster-form');
const birthdayInput = document.getElementById('birthday');
const nameInput = document.getElementById('name');
const genreInput = document.getElementById('genre');
const saveButton = document.getElementById('save-button');
const saveStatus = document.getElementById('save-status');
const poster = document.getElementById('poster');

// One retro-inspired theme per calendar month. These are fan-made designs, not official posters.
const monthlyThemes = [
  {month:'JANUARY',movie:'MEAN GIRLS',overline:'ON WEDNESDAYS, WE CELEBRATE',subtitle:'The birthday yearbook edition',art:'💖 💿 💋',badge:'BORN TO\nBE ICONIC',tagline:"That's so fetch. Especially today.",colors:['#ff75c8','#ffb2e7','#20c8ff']},
  {month:'FEBRUARY',movie:'CLUELESS',overline:"AS IF… IT'S NOT YOUR BIRTHDAY",subtitle:'Totally buggin’ over this birthday',art:'💅 📱 💗',badge:'TOTALLY\nADORBS',tagline:"You're the most important thing in the room.",colors:['#ffb7cf','#ff7fc5','#86e8ff']},
  {month:'MARCH',movie:'10 THINGS',overline:'10 THINGS WE LOVE ABOUT YOU',subtitle:'A very ’90s birthday situation',art:'🎸 💌 ⭐',badge:'TEEN\nANGST',tagline:'I hate the way you are not celebrating enough.',colors:['#ff83bb','#ad9aff','#43d7ff']},
  {month:'APRIL',movie:'LEGALLY BLONDE',overline:'WHAT, LIKE IT’S HARD?',subtitle:'Legally iconic since day one',art:'👛 💖 🐾',badge:'BEND &\nSNAP',tagline:'You got into the birthday club. What, like it’s hard?',colors:['#ff48b8','#ff9ee2','#ffda64']},
  {month:'MAY',movie:'FREAKY FRIDAY',overline:'SAME BIRTHDAY, DIFFERENT ENERGY',subtitle:'A little chaos. A lot of cake.',art:'🎸 ⚡ 🎂',badge:'TOTAL\nSWITCH-UP',tagline:'Wake up. It’s your birthday. Rock accordingly.',colors:['#27d8ff','#a2eaff','#ff70c7']},
  {month:'JUNE',movie:'AQUAMARINE',overline:'SUMMER IS A STATE OF MIND',subtitle:'Sun-kissed, sea-sprayed, birthday-made',art:'🧜‍♀️ 🐚 💎',badge:'MERMAID\nENERGY',tagline:'Making waves since your very first scene.',colors:['#35dcf5','#83f3e0','#ff8bd7']},
  {month:'JULY',movie:'THE PRINCESS DIARIES',overline:'SHUT UP! YOU’RE THE ROYALTY',subtitle:'From ordinary to birthday royalty',art:'👑 💿 ✨',badge:'ROYAL\nSTATUS',tagline:'A princess on your birthday? Groundbreaking.',colors:['#79cfff','#ff9bdf','#fff16b']},
  {month:'AUGUST',movie:'SHE’S THE MAN',overline:'PLAY LIKE A LEGEND',subtitle:'Big goals. Bigger birthday energy.',art:'⚽ 🕶️ 💙',badge:'MAIN\nCHARACTER',tagline:'You’re the MVP of this whole movie.',colors:['#25cfff','#5d86ff','#ff76ca']},
  {month:'SEPTEMBER',movie:'BRING IT ON',overline:'READY, SET, BIRTHDAY',subtitle:'Spirit fingers strongly encouraged',art:'📣 💖 ⭐',badge:'SPIRIT\nLEVEL: 100',tagline:'Brrr… it’s cold in here. Must be your birthday atmosphere.',colors:['#ff66bd','#ffcf5b','#72dfff']},
  {month:'OCTOBER',movie:'THE CRAFT',overline:'A LITTLE BIRTHDAY MAGIC',subtitle:'Witchy wishes and iconic vibes',art:'🔮 🦋 🌙',badge:'MAGIC\nINSIDE',tagline:'Careful what you wish for… unless it’s cake.',colors:['#a67aff','#4830a8','#ff5abf']},
  {month:'NOVEMBER',movie:'SCOOBY-DOO',overline:'LIKE, WHOSE BIRTHDAY IS IT?',subtitle:'Mystery, snacks, and one iconic star',art:'🐾 🍕 📟',badge:'MYSTERY\nSOLVED',tagline:'We would’ve gotten away with it if not for this birthday cake.',colors:['#42d9ff','#8e8cff','#ffcf55']},
  {month:'DECEMBER',movie:'A CINDERELLA STORY',overline:'DREAMS COME TRUE AT MIDNIGHT',subtitle:'A fairytale with a flip-phone twist',art:'👠 📱 ✨',badge:'MIDNIGHT\nMAGIC',tagline:'Never let the fear of striking out keep you from the dance.',colors:['#70dcff','#c4a4ff','#ff8bd8']}
];

const genreDetails = {
  romcom:{art:'💕 💌 💿',tagline:'Cue the meet-cute. You’re the plot twist.',colors:['#ff76c8','#ffb5e8','#8a8aff']},
  comedy:{art:'💋 📟 ✨',tagline:'Zero drama. Okay, maybe a little drama.',colors:['#ff54ba','#ffb5dd','#20c8ff']},
  adventure:{art:'🛼 🎧 ⭐',tagline:'Besties, big plans, legendary birthday.',colors:['#20c8ff','#a1eaff','#ff65c8']},
  mystery:{art:'🔎 📼 🌙',tagline:'The biggest mystery? How you got this iconic.',colors:['#997aff','#5a4bda','#ff61c8']},
  fantasy:{art:'🦋 ✨ 💿',tagline:'A little magic looks good on you.',colors:['#8c8aff','#ff87d8','#27d7ff']}
};

function formatDateLocal(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function makePoster() {
  if (!birthdayInput.value) return false;
  const date = formatDateLocal(birthdayInput.value);
  const name = nameInput.value.trim() || 'Birthday Star';
  const theme = monthlyThemes[date.getMonth()];
  const genre = genreDetails[genreInput.value] || genreDetails.romcom;
  const [c1,c2,c3] = genre.colors;

  document.getElementById('theme-month').textContent = `${theme.month} • MONTHLY FEATURE`;
  document.getElementById('poster-top').textContent = `${name.toUpperCase()} PRESENTS`;
  document.getElementById('poster-overline').textContent = theme.overline;
  document.getElementById('movie-title').textContent = theme.movie;
  document.getElementById('movie-subtitle').textContent = theme.subtitle;
  document.getElementById('hero-art').textContent = theme.art;
  document.getElementById('poster-badge').textContent = theme.badge.replace('\\n','\n');
  document.getElementById('tagline').textContent = theme.tagline;
  document.getElementById('credits').textContent = `STARRING ${name.toUpperCase()} • GLITTER • MIXTAPES • MAIN CHARACTER ENERGY`;
  document.getElementById('release').textContent = `${theme.month} EDITION • ${date.toLocaleDateString(undefined,{month:'short',day:'numeric'}).toUpperCase()}`;
  poster.style.background = `linear-gradient(150deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
  saveStatus.textContent = '';
  return true;
}

form.addEventListener('submit', event => { event.preventDefault(); makePoster(); });
nameInput.addEventListener('input', makePoster);
genreInput.addEventListener('change', makePoster);
birthdayInput.addEventListener('change', makePoster);

function xml(value) {
  return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
}
function wrap(text, max) {
  const words = text.split(/\s+/); const lines = []; let line = '';
  for (const word of words) { const next = line ? `${line} ${word}` : word; if (next.length > max && line) { lines.push(line); line = word; } else line = next; }
  if (line) lines.push(line); return lines;
}
function svgLines(text,x,y,max,lineHeight,className) {
  return wrap(text,max).map((line,i)=>`<text x="${x}" y="${y+i*lineHeight}" class="${className}">${xml(line)}</text>`).join('');
}

async function savePoster() {
  saveButton.disabled = true; saveStatus.textContent = 'Rewinding the tape and printing your poster…';
  try {
    const get = id => document.getElementById(id).textContent;
    const title = get('movie-title'), subtitle = get('movie-subtitle'), tagline = get('tagline');
    const top = get('poster-top'), overline = get('poster-overline'), art = get('hero-art');
    const badge = get('poster-badge'), credits = get('credits'), release = get('release');
    const colors = poster.style.background.match(/#[0-9a-fA-F]{6}/g) || ['#ff54ba','#ffb5dd','#20c8ff'];
    const titleLines = wrap(title,18).map((line,i)=>`<text x="400" y="${255+i*68}" class="title">${xml(line)}</text>`).join('');
    const titleBottom = 255 + wrap(title,18).length * 68;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${colors[0]}"/><stop offset="55%" stop-color="${colors[1]}"/><stop offset="100%" stop-color="${colors[2]}"/></linearGradient><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/></pattern><style>text{font-family:Trebuchet MS,Arial,sans-serif;text-anchor:middle}.top{fill:#1e1450;font-size:20px;font-weight:900;letter-spacing:4px}.overline{fill:#1e1450;font-size:18px;font-weight:900;letter-spacing:2px}.title{fill:#faff55;font-size:58px;font-weight:1000;stroke:#1e1450;stroke-width:1px}.subtitle{fill:#1e1450;font-size:25px;font-weight:800}.tagline{fill:#1e1450;font-size:26px;font-weight:900}.credits{fill:#1e1450;font-size:14px;font-weight:800;letter-spacing:1px}.release{fill:#1e1450;font-size:16px;font-weight:900}.badge{fill:#1e1450;font-size:18px;font-weight:1000}</style></defs>
      <rect width="800" height="1200" fill="url(#bg)"/><rect width="800" height="1200" fill="url(#grid)"/><rect x="15" y="15" width="770" height="1170" fill="none" stroke="#1e1450" stroke-width="6"/>
      <text x="400" y="62" class="top">${xml(top)}</text><text x="400" y="105" class="overline">${xml(overline)}</text>${titleLines}
      ${svgLines(subtitle,400,titleBottom+28,38,34,'subtitle')}<text x="400" y="680" font-size="112">${xml(art)}</text>
      <circle cx="400" cy="800" r="64" fill="#faff55" stroke="#1e1450" stroke-width="4"/>${svgLines(badge,400,795,14,23,'badge')}
      ${svgLines(tagline,400,930,38,36,'tagline')}${svgLines(credits,400,1065,56,24,'credits')}<text x="400" y="1150" class="release">${xml(release)} • RATED Y2K</text></svg>`;
    const svgUrl = URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    try {
      const image = new Image(); image.src = svgUrl;
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;});
      const canvas = document.createElement('canvas'); canvas.width=800; canvas.height=1200;
      const ctx = canvas.getContext('2d'); ctx.drawImage(image,0,0);
      const png = await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG export failed')),'image/png'));
      const url = URL.createObjectURL(png); const link = document.createElement('a'); link.href=url; link.download='birthday-rewind-poster.png'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
      saveStatus.textContent = 'Poster saved! Now go make a mixtape. 💿';
    } finally { URL.revokeObjectURL(svgUrl); }
  } catch (error) { console.error(error); saveStatus.textContent = 'Could not export this time. Try a recent version of Chrome, Firefox, or Safari.'; }
  finally { saveButton.disabled = false; }
}
saveButton.addEventListener('click', savePoster);

const today = new Date();
birthdayInput.value = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
makePoster();
