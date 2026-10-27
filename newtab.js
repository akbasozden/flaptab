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

// ---------- Kart sesi (yalnızca Pano teması) ----------
// Gerçek bir Solari panosunun kart vuruşları: sounds/flap.wav, Freesound #261244 (ngruber, CC0) kaydından
// ayıklanmış 10 ayrı vuruş, her biri 80 ms'lik bir yuvada. Her dönüşte rastgele biri hafif farklı hız ve
// şiddette çalınır. Tarayıcı, sayfaya bir kez tıklanana kadar sesi engelleyebilir.
const CLACK_GAP = 6; // ms; aynı anda dönen onlarca kart sesi bir tıkırtı yağmuruna dönüşsün, gürültüye değil
const CLIP_SLOT = .08, CLIP_LEN = .07; // saniye
let audio = null, clackBuf = null, lastClack = 0;

function audioCtx() {
  if (!audio) {
    audio = new AudioContext();
    fetch("sounds/flap.wav")
      .then((r) => r.arrayBuffer())
      .then((data) => audio.decodeAudioData(data))
      .then((buf) => { clackBuf = buf; })
      .catch(() => {}); // ses yüklenemezse kartlar sessiz döner
  }
  if (audio.state === "suspended") audio.resume();
  return audio;
}

function clack() {
  if (prefs.sound !== "on" || document.documentElement.dataset.theme !== "board" || document.hidden) return;
  const now = performance.now();
  if (now - lastClack < CLACK_GAP) return;
  lastClack = now;
  const ctx = audioCtx();
  if (ctx.state !== "running" || !clackBuf) return;
  const clips = Math.floor(clackBuf.duration / CLIP_SLOT + .01);
  const src = ctx.createBufferSource();
  src.buffer = clackBuf;
  src.playbackRate.value = .94 + Math.random() * .12;
  const gain = ctx.createGain();
  gain.gain.value = .25 + Math.random() * .2;
  src.connect(gain).connect(ctx.destination);
  src.start(0, Math.floor(Math.random() * clips) * CLIP_SLOT, CLIP_LEN);
}

// Tarayıcının ses kilidi ilk kullanıcı etkileşiminde açılır
addEventListener("pointerdown", () => { if (prefs.sound === "on") audioCtx(); }, { once: true });

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
    // Saniye kartları her saniye döndüğünden sessizdir; gizli kartlar da ses çıkarmaz
    if (!this.el.classList.contains("sec") && this.el.offsetParent !== null) clack();

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

// Ses ayarı yalnızca Pano temasında görünür
function applySoundSetting() {
  document.getElementById("sound-setting").hidden = prefs.theme !== "board";
}

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
const DOT = WORLD.step * .7; // kara noktasının kenarı; aralarda ızgaranın %30'u kadar boşluk kalır
const MARK = WORLD.step / 1.5; // konum işaretinin ölçeği (1,5°'lik ızgarada 1)
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

const landDots = []; // { x, y, row, col, lat, lon, tz }
const landGrid = new Map(); // satır * 1000 + sütun -> nokta; imlecin altındaki noktayı bulmak için

// Kara noktalarının IANA dilimi places.js'te iki karakterlik sıra numarasıyla saklanır
const B64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const dotZone = (i) => PLACES.zones[B64.indexOf(PLACES.dots[i * 2]) * 64 + B64.indexOf(PLACES.dots[i * 2 + 1])];

function buildMap() {
  const { step, rows, top } = WORLD;
  rows.forEach((hex, row) => {
    const y = step / 2 + row * step;
    [...hex].forEach((h, k) => {
      const nib = parseInt(h, 16);
      for (let b = 0; b < 4; b++) {
        if (!(nib & (8 >> b))) continue;
        const col = k * 4 + b, x = step / 2 + col * step;
        const d = { x, y, row, col, lat: top - y, lon: x - 180, tz: dotZone(landDots.length) };
        landDots.push(d);
        landGrid.set(row * 1000 + col, d);
      }
    });
  });

  // Bantlar: denizdeki nominal 15°'lik dilimler, alttaki etiketler ve klavyeyle seçim. Ayraç çizgileri yalnızca
  // denizden geçer; karada dilimler ülke sınırlarını izler (zonesEl).
  const bands = [];
  for (let o = -12; o <= 12; o++) {
    const x0 = Math.max(0, 180 + o * 15 - 7.5);
    const x1 = Math.min(360, 180 + o * 15 + 7.5);
    const g = el("g", { class: "band", tabindex: 0, role: "button" });
    g.dataset.o = o;
    g.append(
      el("rect", { class: "band-bg", x: x0, y: 0, width: x1 - x0, height: MAP_H }),
      el("path", { class: "tick", d: seaLine(x0) }),
    );
    const txt = el("text", { x: (x0 + x1) / 2, y: MAP_H + 7.5, "text-anchor": "middle" });
    txt.textContent = o === 0 ? "0" : (o > 0 ? "+" : "−") + Math.abs(o);
    g.append(txt);
    mapEl.append(g);
    bands.push(g);

    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(o); }
    });
    g.addEventListener("focus", () => hover(o));
    g.addEventListener("blur", () => hover(null));
  }
  return bands;
}

// x'teki dikey ayraç çizgisinin yalnızca denizden geçen parçaları (iki yanındaki nokta sütunu da boşsa)
function seaLine(x) {
  const { step, rows } = WORLD;
  const left = Math.floor(x / step - .5), right = left + 1;
  let d = "", from = null;
  for (let row = 0; row <= rows.length; row++) {
    const sea = row < rows.length && !landGrid.has(row * 1000 + left) && !landGrid.has(row * 1000 + right);
    if (sea && from === null) from = row;
    if (!sea && from !== null) { d += `M${x} ${from * step}V${row * step}`; from = null; }
  }
  return d;
}

// ---------- Saat dilimi bölgeleri ----------
// Kara noktaları şu anki UTC farklarına (yaz saati dahil) göre gruplanır; her grup bir dilimdir ve bir bütün
// olarak parlar. Yarım saatlik dilimler (Hindistan, İran…) karada ayrı gruplardır. Yaz saati geçişleri için
// gruplar çeyrek saatte bir yenilenir.
const zonesEl = el("g", { class: "zones" });
let zoneEls = new Map(); // fark -> <path>

function drawZones() {
  const offsets = new Map(), paths = new Map();
  for (const d of landDots) {
    if (!offsets.has(d.tz)) offsets.set(d.tz, tzOffset(d.tz));
    d.off = offsets.get(d.tz);
    paths.set(d.off, (paths.get(d.off) || "") + `M${(d.x - DOT / 2).toFixed(2)} ${(d.y - DOT / 2).toFixed(2)}h${DOT}v${DOT}h${-DOT}z`);
  }
  zoneEls = new Map([...paths].sort((a, b) => a[0] - b[0]).map(([off, d]) => [off, el("path", { class: "dots", d })]));
  zonesEl.replaceChildren(...zoneEls.values());
}

// İmlecin altındaki dilim: karadaysa noktanın gerçek farkı, denizdeyse o boylamın nominal bandı
function zoneAt(e) {
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(mapEl.getScreenCTM().inverse());
  if (p.x < 0 || p.x > 360 || p.y < 0 || p.y > MAP_H + 10) return null;
  const d = p.y < MAP_H && landGrid.get(Math.floor(p.y / WORLD.step) * 1000 + Math.floor(p.x / WORLD.step));
  return d ? d.off : Math.max(-12, Math.min(12, Math.round((p.x - 180) / 15)));
}

mapEl.addEventListener("click", (e) => { const o = zoneAt(e); if (o !== null) choose(o); });
mapEl.addEventListener("pointermove", (e) => { const o = zoneAt(e); if (o !== hovered) hover(o); });
mapEl.addEventListener("pointerleave", () => hover(null));

// "BİRİNCİL <i>İngilizce</i>" biçiminde etiket; İngilizce seçiliyse ikinci kısım yok.
function bilingual(key) {
  return prefs.lang === "en" ? t(key) : `${t(key)} <i>${I18N.en[key]}</i>`;
}

// Kullanıcının dilimi: yerel saatin şu anki farkı. Dilimler ülke sınırlarını izlediğinden Türkiye, coğrafi olarak
// +2 bandında olsa da +3 dilimiyle birlikte parlar.
const homeZone = () => localOffset();

// ---------- Başkentler ----------
// Bir dilimde şu an o saati kullanan en kalabalık başkentler (places.js, nüfusa göre sıralı).
// Farklar yaz saatiyle değiştiğinden gruplama 10 dakikada bir yenilenir.
const CAPITALS_MAX = 4;
const offsetFmts = new Map();
let capitalGroups = null, capitalsAt = 0;

// IANA diliminin şu anki UTC farkı (saat), yaz saati dahil: "GMT+5:30" -> 5.5
function tzOffset(tz) {
  if (!offsetFmts.has(tz)) offsetFmts.set(tz, new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" }));
  const name = offsetFmts.get(tz).formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value ?? "";
  const m = name.match(/([+-])(\d+)(?::(\d+))?/);
  return m ? (m[1] === "-" ? -1 : 1) * (+m[2] + (+m[3] || 0) / 60) : 0;
}

function capitals(o) {
  if (!capitalGroups || Date.now() - capitalsAt > 600e3) {
    capitalGroups = new Map();
    capitalsAt = Date.now();
    for (const [, , tz, , en, names] of PLACES.capitals) {
      const off = tzOffset(tz);
      if (!capitalGroups.has(off)) capitalGroups.set(off, []);
      capitalGroups.get(off).push({ en, names });
    }
  }
  return (capitalGroups.get(o) || []).slice(0, CAPITALS_MAX)
    .map((c) => (c.names[prefs.lang] ?? c.en).toLocaleUpperCase(prefs.lang));
}

// Dilim etiketi: fark ve o dilimdeki başkentler; başkent yoksa örnek şehir
const zoneText = (o) => o === homeZone()
  ? `${t("local")} <i>${[fmtOffset(localOffset()), ...capitals(localOffset())].join(" · ")}</i>`
  : `${fmtOffset(o)} <i>${capitals(o).join(" · ") || city(o) || ""}</i>`;

// Haritanın üstündeki etiket: üzerine gelinen dilim, yoksa seçili dilim, o da yoksa "SAAT DİLİMİ"
function hover(o) {
  hovered = o;
  const shown = o ?? selected;
  mapLabel.innerHTML = shown === null ? bilingual("zone") : zoneText(shown);
  for (const [off, p] of zoneEls) p.classList.toggle("hover", off === o);
}

function choose(o) {
  // Kendi bandına ya da seçili banda tıklamak yerel saate döner
  selected = o === homeZone() || o === selected ? null : o;
  refreshMap();
  render();
}

function refreshMap() {
  const home = homeZone();
  const shown = selected ?? home;
  for (const g of bands) {
    const o = Number(g.dataset.o);
    g.classList.toggle("selected", o === shown);
    g.classList.toggle("home", o === home);
    g.setAttribute("aria-pressed", o === shown);
    g.setAttribute("aria-label", zoneText(o).replace(/<\/?i>/g, ""));
  }
  for (const [off, p] of zoneEls) p.classList.toggle("selected", off === shown);
  zoneLabel.innerHTML = selected === null
    ? `${t("local")} <i>${fmtOffset(localOffset())}</i>`
    : `${fmtOffset(selected)} <i>${capitals(selected)[0] ?? city(selected) ?? ""}</i>`;
  resetBtn.classList.toggle("shown", selected !== null);
  resetBtn.tabIndex = selected === null ? -1 : 0;
  resetBtn.setAttribute("aria-hidden", selected === null);
  hover(hovered);
}

const bands = buildMap();
mapEl.append(zonesEl);
drawZones();

// Pano dönerken haritada soldan sağa bir tarama dalgası geçer: her dilim sırayla bir an parlar.
const SWEEP_STEP = 40, SWEEP_HOLD = 220; // ms
function sweepMap() {
  if (reduceMotion || document.hidden) return;
  [...zoneEls.values()].forEach((g, i) => {
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
    el("circle", { class: "here-ring", cx: d.x, cy: d.y, r: 1.6 * MARK }),
    el("rect", { class: "here-halo", x: d.x - 1.6 * MARK, y: d.y - 1.6 * MARK, width: 3.2 * MARK, height: 3.2 * MARK }),
    el("rect", { class: "here-dot", x: d.x - .9 * MARK, y: d.y - .9 * MARK, width: 1.8 * MARK, height: 1.8 * MARK }),
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
      applySoundSetting();
      replay();
    } else if (key === "sound") {
      // Açınca kısa bir dönüşle sesi dinlet (tıklama ses kilidini de açar)
      if (prefs.sound === "on") { audioCtx(); setTimeout(idleSpin, 150); }
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
    if (m % REPLAY_EVERY === 0) {
      // Yaz saati geçişleri çeyrek saatlerde olur; dilim bölgeleri de o anda yeniden hesaplanır
      drawZones();
      refreshMap();
      replay();
    }
  }
}

applyLanguage();
syncSettingsUI();
drawHere();
if (prefs.loc === "on") locate();
applySeconds();
applySoundSetting();
render();
sweepMap(); // açılıştaki ilk dönüşe haritadaki tarama dalgası eşlik eder
// Saniye sınırına hizala ki dakika değişimi tam zamanında dönsün
setTimeout(() => { render(); setInterval(render, 1000); }, 1000 - (Date.now() % 1000));
// Her dönüşten sonra bir sonraki için yeni rastgele bekleme süresi seçilir
(function scheduleIdle() {
  const wait = IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN);
  setTimeout(() => { idleSpin(); scheduleIdle(); }, wait * 1000);
})();
