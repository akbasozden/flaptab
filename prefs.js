// Ayarlar. <head> içinde yüklenir ki tema sayfa çizilmeden uygulansın (yanıp sönme olmasın).
const PREFS_KEY = "flaptab.prefs";
const THEMES = ["board", "cockpit", "led", "classic"];
const LANGS = ["en", "tr", "ar", "zh", "fr", "ru", "es", "de"];

const prefs = (() => {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; } catch {}
  // Varsayılanlar: Pano teması, İngilizce, 24 saat, saniye kapalı, konum açık
  return {
    theme: THEMES.includes(saved.theme) ? saved.theme : "board",
    lang: LANGS.includes(saved.lang) ? saved.lang : "en",
    hour: saved.hour === "12" ? "12" : "24",
    sec: saved.sec === "on" ? "on" : "off",
    // Konum eklentide varsayılan olarak açık (izin kurulumda verilir); web sürümünde ilk ziyarette
    // izin penceresi çıkmasın diye kapalı. Kullanıcının seçimi her zaman korunur.
    loc: saved.loc ? (saved.loc === "off" ? "off" : "on") : (globalThis.FLAPTAB_WEB ? "off" : "on"),
    // Son bilinen konum, 0,1°'ye yuvarlanmış; harita noktası beklemeden çizilsin diye
    coords: saved.coords && Number.isFinite(saved.coords.lat) && Number.isFinite(saved.coords.lon)
      ? saved.coords : null,
  };
})();

function savePrefs() {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
}

document.documentElement.dataset.theme = prefs.theme;
document.documentElement.lang = prefs.lang;
document.documentElement.dir = prefs.lang === "ar" ? "rtl" : "ltr";
