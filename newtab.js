const DIGITS = " 0123456789";
// Gün kartlarının döndüğü karakterler. Latin alfabeli diller ortak diziyi kullanır
// (Türkçe alfabe + Q, W, X + İspanyolca Á, É); Rusça Kiril, Çince yalnızca gün adlarındaki karakterler.
const LETTERS = {
  latin: " AÁBCÇDEÉFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ",
  ru: " АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  zh: " 一二三四五六日星期",
};
const letters = (lang) => LETTERS[lang] ?? LETTERS.latin;
// Arapça harfler birbirine bağlandığından gün adı harf kartlarına bölünmez;
// Solari panolarındaki kelime kartları gibi tek geniş kartta gösterilir.
const WORD_DAYS = new Set(["ar"]);
const DAY_WIDTH = Math.max(...Object.entries(I18N)
  .filter(([lang]) => !WORD_DAYS.has(lang))
  .flatMap(([, l]) => l.days.map((d) => d.length)));
// IDLE_MIN–IDLE_MAX saniye arası rastgele aralıklarla rastgele bir satır,
// her çeyrek saatte (:00 :15 :30 :45) tüm pano tam tur atar.
const IDLE_MIN = 10, IDLE_MAX = 60; // saniye
const REPLAY_EVERY = 15; // dakika

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const t = (key) => I18N[prefs.lang][key];

// Tek bir mekanik kart: hedef karaktere ulaşana kadar sırayla döner.
class Flap {
  constructor(chars) {
    this.chars = chars;
    this.current = " ";
    this.target = " ";
    this.running = false;
    this.fullTurn = false;

    this.el = document.createElement("div");
    this.el.className = "flap";
    this.el.innerHTML = ["top", "bottom", "flip-top", "flip-bottom"]
      .map((c) => `<div class="half ${c}"><span> </span></div>`)
      .join("");
    [this.top, this.bottom, this.flipTop, this.flipBottom] =
      [...this.el.children].map((h) => h.firstChild);
    this.anims = [];
  }

  set(target, delay = 0) {
    this.target = target;
    if (reduceMotion) {
      this.current = target;
      for (const s of [this.top, this.bottom, this.flipTop, this.flipBottom]) s.textContent = target;
      return;
    }
    this.start(delay);
  }

  // Değer aynı kalsa bile tüm karakterlerden geçerek bir tam tur atar.
  spin(delay = 0) {
    if (reduceMotion) return;
    this.fullTurn = true;
    this.start(delay);
  }

  start(delay) {
    if (!this.running) {
      this.running = true;
      setTimeout(() => this.run(), delay);
    }
  }

  async run() {
    while (this.current !== this.target || this.fullTurn) {
      this.fullTurn = false;
      const i = this.chars.indexOf(this.current);
      const next = this.chars.includes(this.target) && i !== -1
        ? this.chars[(i + 1) % this.chars.length]
        : this.target;
      // Ara karakterlerde kart başına süre; uzun karakter dizisi daha hızlı döner
      const step = this.chars.length > 12 ? 45 : 80;
      await this.flip(next, next === this.target ? 260 : step);
    }
    this.running = false;
  }

  async flip(next, duration) {
    this.anims.forEach((a) => a.cancel());

    // LED panolarda kart dönmez: karakterler yerinde hızla akar
    if (document.documentElement.dataset.theme === "led") {
      for (const s of [this.top, this.bottom, this.flipTop]) s.textContent = next;
      await new Promise((r) => setTimeout(r, duration * .5));
      this.current = next;
      return;
    }

    this.flipTop.textContent = this.current;
    this.bottom.textContent = this.current;
    this.top.textContent = next;
    this.flipBottom.textContent = next;
    this.el.classList.add("flipping");

    const half = duration / 2;
    const down = this.flipTop.parentNode.animate(
      [
        { transform: "rotateX(0deg)", filter: "brightness(1)" },
        { transform: "rotateX(-90deg)", filter: "brightness(.55)" },
      ],
      { duration: half, easing: "ease-in", fill: "forwards" }
    );
    this.anims = [down];
    await down.finished;

    const up = this.flipBottom.parentNode.animate(
      [
        { transform: "rotateX(90deg)", filter: "brightness(1.4)" },
        { transform: "rotateX(0deg)", filter: "brightness(1)" },
      ],
      { duration: half, easing: "cubic-bezier(.3,1.6,.6,1)", fill: "forwards" }
    );
    this.anims.push(up);
    await up.finished;

    this.bottom.textContent = next;
    this.current = next;
    // Durağan halde dönen yapraklar gizli: 90°'de yatık kalan yaprak perspektif yüzünden
    // karttan geniş çizilir ve kart aralarına taşan bir çizgi bırakır.
    this.el.classList.remove("flipping");
    this.anims.forEach((a) => a.cancel());
    this.anims = [];
  }
}

// Bir kapsayıcıya kartlar dizer. pattern: "D" rakam, "L" harf, diğerleri dar ayraç kartı.
// Döner: values = değer kartları (apply için), all = ayraçlar dahil soldan sağa tüm kartlar.
function build(container, pattern) {
  const values = [], all = [];
  for (const p of pattern) {
    let f;
    if (p === "D" || p === "L") {
      f = new Flap(p === "D" ? DIGITS : letters(prefs.lang));
      values.push(f);
    } else {
      // Ayraç da gerçek bir karttır: tam tur dönüşlerinde panoyla birlikte döner
      f = new Flap(" " + p);
      f.el.classList.add("narrow", p === ":" ? "colon-card" : "slash-card");
      f.set(p, all.length * 50);
    }
    container.appendChild(f.el);
    all.push(f);
  }
  return { values, all };
}

const timeEl = document.getElementById("time");
const timeRow = build(timeEl, "DD:DD:DD");
// Son iki nokta + iki kart saniyedir; ayar kapalıyken gizlenir
[...timeEl.children].slice(-3).forEach((n) => n.classList.add("sec"));
const dateRow = build(document.getElementById("date"), "DD/DD/DDDD");
const dayEl = document.getElementById("day");
const dayRow = build(dayEl, "L".repeat(DAY_WIDTH));
const dayWord = new Flap([" ", ...I18N.ar.days]);
dayWord.el.classList.add("word");
dayEl.append(dayWord.el);
dayRow.all.push(dayWord);
const timeFlaps = timeRow.values, dateFlaps = dateRow.values, dayFlaps = dayRow.values;
const allFlaps = [...timeRow.all, ...dateRow.all, ...dayRow.all];

// Gün satırı, seçili dilin en uzun gün adı kadar kart gösterir (sağda boş kart birikmesin)
function fitDayRow() {
  const word = WORD_DAYS.has(prefs.lang);
  const width = word ? 0 : Math.max(...t("days").map((d) => d.length));
  dayFlaps.forEach((f, i) => {
    f.el.hidden = i >= width;
    f.chars = letters(prefs.lang);
  });
  dayWord.el.hidden = !word;
}

// AM/PM göstergesi: saatin ilk kartının sol altında
const ampmEl = document.createElement("span");
ampmEl.className = "ampm";
timeFlaps[0].el.append(ampmEl);

function applySeconds() {
  timeEl.classList.toggle("with-sec", prefs.sec === "on");
}

const pad = (n) => String(n).padStart(2, "0");

function apply(flaps, text, stagger) {
  [...text].forEach((ch, i) => flaps[i].set(ch, stagger ? i * 50 : 0));
}

// Gizli kartlar (kapalı saniye, kullanılmayan gün kartları) dönüş dalgasında beklenmesin
const visible = (f) => f.el.offsetParent !== null;

// Açılıştaki gibi tüm panoyu soldan sağa, satır satır döndürür.
function replay() {
  allFlaps.filter(visible).forEach((f, i) => f.spin(i * 45));
  sweepMap();
}

// Saat, tarih ve gün satırlarından rastgele bir ya da birkaçını (en az biri) seçer;
// seçilenler yukarıdan aşağıya, her satır soldan sağa tek bir dalga halinde döner.
function idleSpin() {
  if (document.hidden) return;
  const rows = [timeRow.all, dateRow.all, dayRow.all];
  let picked = rows.filter(() => Math.random() < .5);
  if (!picked.length) picked = [rows[Math.floor(Math.random() * rows.length)]];
  picked.flat().filter(visible).forEach((f, i) => f.spin(i * 60));
  sweepMap();
}

// ---------- Saat dilimi haritası ----------
// Nominal 15°'lik UTC dilimleri. Örnek şehirler yaz saati uygulamayan yerlerden seçildi,
// böylece gösterilen saat yıl boyunca o şehir için doğru kalır.
const city = (o) => t("cities")[o + 12];

const SVG_NS = "http://www.w3.org/2000/svg";
const MAP_H = 136; // kara alanının yüksekliği (enlem derecesi); altında etiket şeridi var
const mapEl = document.getElementById("map");
const zoneLabel = document.getElementById("zone-label");
const mapLabel = document.getElementById("map-label");
const resetBtn = document.getElementById("reset");

const localOffset = () => -new Date().getTimezoneOffset() / 60;
let selected = null; // null = yerel saat, aksi halde UTC ofseti (saat)
let hovered = null;

function fmtOffset(o) {
  const sign = o < 0 ? "−" : "+";
  const a = Math.abs(o);
  const m = Math.round((a % 1) * 60);
  return `UTC${sign}${Math.floor(a)}${m ? ":" + pad(m) : ""}`;
}

function el(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

const landDots = []; // { x, y, lat, lon } — konum noktası aramak için

function buildMap() {
  const { step, rows, top } = WORLD;
  const dots = {};
  rows.forEach((hex, i) => {
    const y = step / 2 + i * step;
    [...hex].forEach((h, k) => {
      const nib = parseInt(h, 16);
      for (let b = 0; b < 4; b++) {
        if (!(nib & (8 >> b))) continue;
        const x = step / 2 + (k * 4 + b) * step;
        const o = Math.round((x - 180) / 15);
        dots[o] = (dots[o] || "") + `M${(x - .5).toFixed(2)} ${(y - .5).toFixed(2)}h1v1h-1z`;
        landDots.push({ x, y, lat: top - y, lon: x - 180 });
      }
    });
  });

  const bands = [];
  for (let o = -12; o <= 12; o++) {
    const x0 = Math.max(0, 180 + o * 15 - 7.5);
    const x1 = Math.min(360, 180 + o * 15 + 7.5);
    const g = el("g", { class: "band", tabindex: 0, role: "button" });
    g.dataset.o = o;
    g.append(
      el("rect", { class: "band-bg", x: x0, y: 0, width: x1 - x0, height: MAP_H }),
      el("path", { class: "dots", d: dots[o] || "" }),
      el("line", { class: "tick", x1: x0, y1: 0, x2: x0, y2: MAP_H }),
    );
    const txt = el("text", { x: (x0 + x1) / 2, y: MAP_H + 7.5, "text-anchor": "middle" });
    txt.textContent = o === 0 ? "0" : (o > 0 ? "+" : "−") + Math.abs(o);
    g.append(txt);
    mapEl.append(g);
    bands.push(g);

    g.addEventListener("click", () => choose(o));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(o); }
    });
    g.addEventListener("pointerenter", () => hover(o));
    g.addEventListener("pointerleave", () => hover(null));
    g.addEventListener("focus", () => hover(o));
    g.addEventListener("blur", () => hover(null));
  }
  return bands;
}

// "BİRİNCİL <i>İngilizce</i>" biçiminde etiket; İngilizce seçiliyse ikinci kısım yok.
function bilingual(key) {
  return prefs.lang === "en" ? t(key) : `${t(key)} <i>${I18N.en[key]}</i>`;
}

// Kullanıcının haritada bulunduğu bant. Saat farkına değil coğrafyaya bakar:
// örneğin Türkiye UTC+3 kullanır ama coğrafi olarak +2 bandındadır.
const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const tzBand = Object.keys(TZ_BANDS).find((b) => TZ_BANDS[b].split(" ").includes(tzName));

function homeBand() {
  if (prefs.loc === "on" && prefs.coords) return Math.max(-12, Math.min(12, Math.round(prefs.coords.lon / 15)));
  if (tzBand !== undefined) return Number(tzBand);
  return Math.round(localOffset());
}

const zoneText = (o) => o === homeBand()
  ? `${t("local")} <i>${fmtOffset(localOffset())}</i>`
  : `${fmtOffset(o)} <i>${city(o)}</i>`;

function hover(o) {
  hovered = o;
  mapLabel.innerHTML = o === null ? bilingual("zone") : zoneText(o);
}

function choose(o) {
  // Kendi bandına ya da seçili banda tıklamak yerel saate döner
  selected = o === homeBand() || o === selected ? null : o;
  refreshMap();
  render();
}

function refreshMap() {
  const home = homeBand();
  const shown = selected ?? home;
  for (const g of bands) {
    const o = Number(g.dataset.o);
    g.classList.toggle("selected", o === shown);
    g.classList.toggle("home", o === home);
    g.setAttribute("aria-pressed", o === shown);
    g.setAttribute("aria-label", zoneText(o).replace(/<\/?i>/g, ""));
  }
  zoneLabel.innerHTML = selected === null
    ? `${t("local")} <i>${fmtOffset(localOffset())}</i>`
    : `${fmtOffset(selected)} <i>${city(selected)}</i>`;
  resetBtn.classList.toggle("shown", selected !== null);
  resetBtn.tabIndex = selected === null ? -1 : 0;
  resetBtn.setAttribute("aria-hidden", selected === null);
}

const bands = buildMap();

// Pano dönerken haritada soldan sağa bir tarama dalgası geçer: her dilim sırayla bir an parlar.
const SWEEP_STEP = 40, SWEEP_HOLD = 220; // ms
function sweepMap() {
  if (reduceMotion || document.hidden) return;
  bands.forEach((g, i) => {
    setTimeout(() => {
      g.classList.add("pulse");
      setTimeout(() => g.classList.remove("pulse"), SWEEP_HOLD);
    }, i * SWEEP_STEP);
  });
}

// ---------- Konum noktası ----------
const hereEl = el("g", { class: "here" }); // bantların üstünde, tıklamayı engellemez
mapEl.append(hereEl);
const locStatus = document.getElementById("loc-status");

// En yakın kara noktası (boylam farkı enleme göre daraltılır, tarih çizgisinde sarar)
function nearestDot(lat, lon) {
  const k = Math.cos((lat * Math.PI) / 180);
  let best = null, bestD = Infinity;
  for (const d of landDots) {
    let dl = Math.abs(d.lon - lon);
    if (dl > 180) dl = 360 - dl;
    const dist = (dl * k) ** 2 + (d.lat - lat) ** 2;
    if (dist < bestD) { bestD = dist; best = d; }
  }
  return best;
}

function drawHere() {
  refreshMap(); // konum, vurgulanan "ev" bandını değiştirebilir
  hereEl.replaceChildren();
  if (prefs.loc !== "on" || !prefs.coords) return;
  const d = nearestDot(prefs.coords.lat, prefs.coords.lon);
  const title = el("title", {});
  title.textContent = t("here");
  hereEl.append(
    title,
    el("circle", { class: "here-ring", cx: d.x, cy: d.y, r: 1.6 }),
    el("rect", { class: "here-halo", x: d.x - 1.6, y: d.y - 1.6, width: 3.2, height: 3.2 }),
    el("rect", { class: "here-dot", x: d.x - .9, y: d.y - .9, width: 1.8, height: 1.8 }),
  );
}

function locate() {
  if (!navigator.geolocation) return locFailed();
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      if (prefs.loc !== "on") return;
      const round = (v) => Math.round(v * 10) / 10;
      prefs.coords = { lat: round(coords.latitude), lon: round(coords.longitude) };
      savePrefs();
      locStatus.hidden = true;
      drawHere();
    },
    locFailed,
    { maximumAge: 3600e3, timeout: 15000 },
  );
}

function locFailed() {
  // Önbellekte konum varsa onu göstermeye devam et. Hiç yoksa ayar açık kalır (sonraki sekmede
  // yeniden denenir), yalnızca uyarı gösterilir; harita saat dilimine göre çizilmeye devam eder.
  if (prefs.coords) return;
  locStatus.hidden = false;
}
resetBtn.addEventListener("click", () => choose(null));

// ---------- Dil ve tema ----------
function applyLanguage() {
  fitDayRow();
  document.documentElement.lang = prefs.lang;
  document.documentElement.dir = prefs.lang === "ar" ? "rtl" : "ltr";
  document.title = globalThis.FLAPTAB_WEB ? "Flaptab" : t("title");
  document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll("[data-label]").forEach((n) => { n.innerHTML = bilingual(n.dataset.label); });
  document.getElementById("gear").setAttribute("aria-label", t("settings"));
  document.getElementById("info-btn").setAttribute("aria-label", t("about"));
  document.getElementById("info-close").setAttribute("aria-label", t("close"));
  mapEl.setAttribute("aria-label", t("map"));
  hover(hovered);
  refreshMap();
}

function syncSettingsUI() {
  document.querySelectorAll(".seg").forEach((seg) => {
    for (const b of seg.children) b.setAttribute("aria-pressed", b.dataset.value === prefs[seg.dataset.pref]);
  });
}

// ---------- Ayarlar paneli ----------
const gear = document.getElementById("gear");
const panel = document.getElementById("settings");

function togglePanel(open = panel.hidden) {
  panel.hidden = !open;
  gear.setAttribute("aria-expanded", open);
}

gear.addEventListener("click", (e) => { e.stopPropagation(); togglePanel(); });
panel.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("click", () => togglePanel(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") togglePanel(false); });

// ---------- Hakkında penceresi ----------
const infoDlg = document.getElementById("info");
const version = globalThis.chrome?.runtime?.getManifest?.().version ?? globalThis.FLAPTAB_WEB?.version ?? "—";

function openInfo() {
  const info = INFO[prefs.lang];
  const copyright = COPYRIGHT_HOLDER ? `<br><br>© ${COPYRIGHT_YEAR} ${COPYRIGHT_HOLDER}. ${info.rights}` : "";
  document.getElementById("info-title").textContent = info.title;
  document.getElementById("info-body").innerHTML = info.sections
    .map(([h, p]) => `<h3>${h}</h3><p>${p.replace("{v}", version).replace("{c}", copyright)}</p>`)
    .join("");
  togglePanel(false);
  infoDlg.showModal();
  infoDlg.focus(); // kapat düğmesinde odak çerçevesi belirmesin
  infoDlg.querySelector(".info-body").scrollTop = 0;
}

document.getElementById("info-btn").addEventListener("click", openInfo);
document.getElementById("info-close").addEventListener("click", () => infoDlg.close());
// Pencerenin dışına (arka plana) tıklayınca kapanır
infoDlg.addEventListener("click", (e) => { if (e.target === infoDlg) infoDlg.close(); });

panel.querySelectorAll(".seg button").forEach((b) => {
  b.addEventListener("click", () => {
    const key = b.parentNode.dataset.pref;
    if (prefs[key] === b.dataset.value) return;
    prefs[key] = b.dataset.value;
    savePrefs();
    syncSettingsUI();
    if (key === "theme") {
      document.documentElement.dataset.theme = prefs.theme;
      replay();
    } else if (key === "hour") {
      render();
    } else if (key === "sec") {
      applySeconds();
    } else if (key === "loc") {
      locStatus.hidden = true;
      if (prefs.loc === "on") {
        drawHere();
        locate();
      } else {
        prefs.coords = null;
        savePrefs();
        drawHere();
      }
    } else {
      applyLanguage();
      render();
    }
  });
});

// ---------- Çizim ----------
function now() {
  if (selected === null) {
    const d = new Date();
    return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), D: d.getDate(), M: d.getMonth() + 1, Y: d.getFullYear(), w: d.getDay() };
  }
  const d = new Date(Date.now() + selected * 3600e3);
  return { h: d.getUTCHours(), m: d.getUTCMinutes(), s: d.getUTCSeconds(), D: d.getUTCDate(), M: d.getUTCMonth() + 1, Y: d.getUTCFullYear(), w: d.getUTCDay() };
}

let first = true;
let lastMinute = new Date().getMinutes();
function render() {
  const n = now();
  const h12 = prefs.hour === "12";
  const hour = h12 ? String(n.h % 12 || 12).padStart(2, " ") : pad(n.h);
  ampmEl.textContent = h12 ? (n.h < 12 ? "AM" : "PM") : "";
  apply(timeFlaps, hour + pad(n.m) + pad(n.s), first);
  apply(dateFlaps, pad(n.D) + pad(n.M) + n.Y, first);
  const dayName = t("days")[n.w];
  if (WORD_DAYS.has(prefs.lang)) dayWord.set(dayName, 0);
  else apply(dayFlaps, dayName.padEnd(DAY_WIDTH), first);
  first = false;

  const m = new Date().getMinutes();
  if (m !== lastMinute) {
    lastMinute = m;
    if (m % REPLAY_EVERY === 0) replay();
  }
}

applyLanguage();
syncSettingsUI();
drawHere();
if (prefs.loc === "on") locate();
applySeconds();
render();
sweepMap(); // açılıştaki ilk dönüşe haritadaki tarama dalgası eşlik eder
// Saniye sınırına hizala ki dakika değişimi tam zamanında dönsün
setTimeout(() => { render(); setInterval(render, 1000); }, 1000 - (Date.now() % 1000));
// Her dönüşten sonra bir sonraki için yeni rastgele bekleme süresi seçilir
(function scheduleIdle() {
  const wait = IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN);
  setTimeout(() => { idleSpin(); scheduleIdle(); }, wait * 1000);
})();
