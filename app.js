const form = document.getElementById("poster-form");
const birthdayInput = document.getElementById("birthday");
const nameInput = document.getElementById("name");
const genreInput = document.getElementById("genre");
const saveButton = document.getElementById("save-button");
const saveStatus = document.getElementById("save-status");
const poster = document.getElementById("poster");

const movies = {
  fantasy: {
    titles: ["THE SUGAR SPELL", "KINGDOM OF FROSTING", "THE SPRINKLE PROPHECY"],
    subtitle: "A tiny wish. A giant sugar-powered destiny.",
    tagline: "Some birthdays are just too sweet to be real.",
    art: "🪄🍭✨",
    colors: ["#ff77b7", "#a855d9", "#44218b"]
  },
  romcom: {
    titles: ["LOVE AT FIRST BITE", "YOU HAD ME AT GUMMY", "A VERY SWEET MEETING"],
    subtitle: "Two hearts. One suspiciously large box of chocolates.",
    tagline: "This year, love is on the menu. Dessert first.",
    art: "💘🍓🍬",
    colors: ["#ff8ab8", "#f05c94", "#8d267c"]
  },
  adventure: {
    titles: ["GUMMY QUEST", "THE JELLYBEAN JUNGLE", "MISSION: MARSHMALLOW"],
    subtitle: "Brave the chewy. Conquer the crunchy.",
    tagline: "One star. Zero chill. Maximum chew.",
    art: "🧸🍬🌈",
    colors: ["#7de7cb", "#30a8bc", "#3b4eac"]
  },
  mystery: {
    titles: ["THE CASE OF THE MISSING CAKE", "MURDER ON THE CANDY TRAIN", "THE LICORICE SECRET"],
    subtitle: "Every clue is sticky. Every suspect is sweet.",
    tagline: "The truth is out there… probably in the piñata.",
    art: "🕵️🍒🔎",
    colors: ["#51417d", "#6f58bc", "#25254f"]
  },
  scifi: {
    titles: ["ATTACK OF THE SOUR WORMS", "SPACE JAM: CANDY EDITION", "PLANET LOLLIPOP"],
    subtitle: "In a galaxy far, far away… snacks.",
    tagline: "One small step for you. One giant leap for snack-kind.",
    art: "👽🚀🍭",
    colors: ["#4b72e8", "#8e50d5", "#281d69"]
  }
};

const birthdayTaglines = [
  "The universe saved you the last jellybean.",
  "Plot twist: you were the main character all along.",
  "A mysterious cake appears at midnight.",
  "Your destiny comes with extra sprinkles.",
  "The stars have excellent taste in birthdays.",
  "Warning: may cause spontaneous confetti.",
  "This year, the plot thickens… like caramel."
];

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function formatDateLocal(dateString) {
  // Parse date-only input in local time to avoid UTC timezone shifts.
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function makePoster() {
  const dateString = birthdayInput.value;
  if (!dateString) {
    birthdayInput.reportValidity();
    return false;
  }

  const birthday = formatDateLocal(dateString);
  const name = nameInput.value.trim() || "Birthday Star";
  const genreKey = genreInput.value;
  const movie = movies[genreKey];

  if (!movie) return false;

  const hash = hashText(`${dateString}|${name}|${genreKey}`);
  const title = movie.titles[hash % movie.titles.length];
  const [color1, color2, color3] = movie.colors;

  document.getElementById("poster-top").textContent = `${name.toUpperCase()} PRESENTS`;
  document.getElementById("movie-title").textContent = title;
  document.getElementById("movie-subtitle").textContent = movie.subtitle;
  document.getElementById("tagline").textContent = birthdayTaglines[hash % birthdayTaglines.length];
  document.getElementById("candy-art").textContent = movie.art;
  document.getElementById("date-number").textContent = birthday.getDate();
  document.getElementById("credits").textContent =
    `STARRING ${name.toUpperCase()} • PRODUCED BY THE UNIVERSE • EXTRA SPRINKLES BY FATE`;
  document.getElementById("release").textContent =
    `BORN ${birthday.toLocaleDateString(undefined, { month: "short", day: "numeric" }).toUpperCase()}`;

  poster.style.background = `linear-gradient(155deg, ${color1} 0%, ${color2} 52%, ${color3} 100%)`;
  saveStatus.textContent = "";
  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  makePoster();
});

nameInput.addEventListener("input", makePoster);
genreInput.addEventListener("change", makePoster);
birthdayInput.addEventListener("change", makePoster);

function escapeXml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function svgTextLines(text, x, startY, maxChars, lineHeight, className) {
  return wrapText(text, maxChars).map((line, index) =>
    `<text x="${x}" y="${startY + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`
  ).join("");
}

async function savePosterAsPng() {
  saveStatus.textContent = "Making your candy magic…";
  saveButton.disabled = true;

  try {
    // Build a self-contained SVG so the download works without a server or libraries.
    const title = document.getElementById("movie-title").textContent;
    const subtitle = document.getElementById("movie-subtitle").textContent;
    const tagline = document.getElementById("tagline").textContent;
    const top = document.getElementById("poster-top").textContent;
    const art = document.getElementById("candy-art").textContent;
    const day = document.getElementById("date-number").textContent;
    const credits = document.getElementById("credits").textContent;
    const release = document.getElementById("release").textContent;
    const background = poster.style.background;
    const colors = background.match(/#[0-9a-fA-F]{6}/g) || ["#ff75b7", "#b05be8", "#5630a8"];
    const titleLines = wrapText(title, 17);
    const titleMarkup = titleLines.map((line, i) =>
      `<text x="400" y="${230 + i * 66}" class="title">${escapeXml(line)}</text>`
    ).join("");
    const subtitleY = 230 + titleLines.length * 66 + 5;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${colors[0]}"/>
            <stop offset="52%" stop-color="${colors[1]}"/>
            <stop offset="100%" stop-color="${colors[2]}"/>
          </linearGradient>
          <style>
            text { font-family: 'Trebuchet MS', Arial, sans-serif; text-anchor: middle; }
            .top { fill: white; font-size: 22px; font-weight: 900; letter-spacing: 5px; }
            .title { fill: white; font-size: 56px; font-weight: 1000; letter-spacing: -1px; }
            .subtitle { fill: white; font-size: 25px; font-weight: 700; }
            .tagline { fill: white; font-size: 27px; font-weight: 900; }
            .credits { fill: white; font-size: 14px; font-weight: 700; letter-spacing: 1px; }
            .release { fill: white; font-size: 18px; font-weight: 900; }
            .stamp { fill: #6b3fc7; font-size: 16px; font-weight: 900; }
            .day { fill: #6b3fc7; font-size: 42px; font-weight: 1000; }
          </style>
        </defs>
        <rect width="800" height="1200" rx="28" fill="url(#bg)"/>
        <circle cx="80" cy="360" r="220" fill="none" stroke="#ffffff44" stroke-width="4"/>
        <circle cx="80" cy="360" r="250" fill="none" stroke="#ffffff20" stroke-width="18"/>
        <circle cx="760" cy="900" r="190" fill="none" stroke="#ffffff44" stroke-width="4"/>
        <text x="400" y="72" class="top">${escapeXml(top)}</text>
        ${titleMarkup}
        ${svgTextLines(subtitle, 400, subtitleY + 35, 38, 34, "subtitle")}
        <text x="400" y="660" font-size="132">${escapeXml(art)}</text>
        <circle cx="400" cy="790" r="61" fill="#ffe66d" stroke="#6b3fc7" stroke-width="5" stroke-dasharray="8 7"/>
        <text x="400" y="770" class="stamp">BORN ON</text>
        <text x="400" y="818" class="day">${escapeXml(day)}</text>
        ${svgTextLines(tagline, 400, 920, 36, 36, "tagline")}
        ${svgTextLines(credits, 400, 1060, 58, 24, "credits")}
        <text x="230" y="1145" class="release">${escapeXml(release)}</text>
        <rect x="570" y="1115" width="150" height="48" fill="none" stroke="white" stroke-width="3"/>
        <text x="645" y="1145" class="release">RATED YUM</text>
      </svg>`;

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    try {
      const image = new Image();
      image.src = svgUrl;
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1200;
      const context = canvas.getContext("2d");
      context.fillStyle = colors[2];
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngBlob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create PNG")), "image/png");
      });
      const downloadUrl = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "birthday-blockbuster.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      saveStatus.textContent = "Your poster is saved! Share the sweetness. 🍬";
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  } catch (error) {
    console.error(error);
    saveStatus.textContent = "Sorry, the image could not be saved in this browser. Try a recent version of Chrome, Firefox, or Safari.";
  } finally {
    saveButton.disabled = false;
  }
}

saveButton.addEventListener("click", savePosterAsPng);

// Use today's date for the initial preview; the user can change it to their birthday.
const today = new Date();
birthdayInput.value = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");
makePoster();
