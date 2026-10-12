// Telif hakkı sahibi (ad soyad veya şirket unvanı). Yayından önce doldurulmalı, bkz. COMPLIANCE.md.
// Boş kaldıkça "Hakkında" penceresinde telif satırı gösterilmez.
const COPYRIGHT_HOLDER = "Özden Akbaş";
const COPYRIGHT_YEAR = 2026;

// "Hakkında" penceresinin içeriği. {v} sürüm numarasıyla, {c} telif satırıyla değiştirilir.
const INFO = {
  tr: {
    title: "HAKKINDA",
    rights: "Tüm hakları saklıdır.",
    sections: [
      ["Flaptab", "Yeni sekme sayfasını, havalimanlarının mekanik varış panolarından esinlenen bir saate dönüştürür. Sürüm {v}.{c}"],
      ["Saat dilimleri", "Harita dünyayı 15°'lik eşit dilimlere böler; her dilim UTC'ye göre bir saatlik farkı temsil eder. Gerçek saat dilimleri ise ülke sınırlarını ve siyasi kararları izler, bu yüzden bir ülkenin resmi saati coğrafi olarak içinde bulunduğu dilimden farklı olabilir. Örneğin Türkiye UTC+3 kullanır ama coğrafi olarak +2 dilimindedir.<br><br>Haritada vurgulanan dilim bulunduğunuz yeri, saatin üstündeki etiket ise resmi yerel saatinizi gösterir. Bir dilime tıkladığınızda o dilimin UTC saati gösterilir; örnek şehirler yaz saati uygulamayan yerlerden seçilmiştir. Yarım saatlik dilimler (ör. Hindistan, UTC+5:30) haritada ayrıca gösterilmez."],
      ["Gizlilik", "Flaptab kişisel veri toplamaz ve hiçbir sunucuya veri göndermez. Ayarlarınız yalnızca bu tarayıcıda saklanır. Konum özelliği varsayılan olarak açıktır ve ayarlardan kapatılabilir. Konumunuz yaklaşık 10 km hassasiyete yuvarlanarak yalnızca bu cihazda saklanır ve özelliği kapattığınızda silinir."],
      ["Lisanslar ve kaynaklar", "Dünya haritası: Natural Earth (kamu malı), world-atlas paketi üzerinden (ISC lisansı). Saat dilimi konumları: IANA Time Zone Database (kamu malı). Yazı tipleri: Inter, JetBrains Mono, Noto Sans Arabic ve Noto Sans SC (SIL Open Font License 1.1). Simgeler: Feather Icons (MIT lisansı). Lisans metinlerinin tamamı eklentideki THIRD_PARTY_NOTICES.md dosyasındadır."],
      ["Sorumluluk reddi", "Gösterilen bilgiler yalnızca genel bilgilendirme amaçlıdır; seyrüsefer, uçuş planlaması veya herhangi bir operasyonel kullanım için uygun değildir. Saat, cihazınızın sistem saatine dayanır."],
    ],
  },
  en: {
    title: "ABOUT",
    rights: "All rights reserved.",
    sections: [
      ["Flaptab", "Turns your new tab page into a clock inspired by the mechanical arrival boards of airports. Version {v}.{c}"],
      ["Time zones", "The map divides the world into equal 15° bands; each band represents a one-hour offset from UTC. Real time zones follow national borders and political decisions, so a country's official time can differ from the band it geographically sits in. Turkey, for example, uses UTC+3 but lies in the +2 band.<br><br>The highlighted band shows where you are, while the label above the clock shows your official local time. Clicking a band shows that band's UTC time; the example cities were chosen from places without daylight saving time. Half-hour zones (e.g. India, UTC+5:30) are not shown separately."],
      ["Privacy", "Flaptab collects no personal data and sends nothing to any server. Your settings are stored only in this browser. The location feature is on by default and can be turned off in Settings. Your position is rounded to about 10 km, kept only on this device, and deleted when you turn the feature off."],
      ["Licenses and credits", "World map: Natural Earth (public domain), via the world-atlas package (ISC license). Time zone locations: IANA Time Zone Database (public domain). Fonts: Inter, JetBrains Mono, Noto Sans Arabic and Noto Sans SC (SIL Open Font License 1.1). Icons: Feather Icons (MIT license). Full license texts are in THIRD_PARTY_NOTICES.md inside the extension."],
      ["Disclaimer", "Information shown is for general reference only and is not suitable for navigation, flight planning, or any operational use. The time is based on your device's system clock."],
    ],
  },
  fr: {
    title: "À PROPOS",
    rights: "Tous droits réservés.",
    sections: [
      ["Flaptab", "Transforme la page Nouvel onglet en une horloge inspirée des tableaux d'arrivée mécaniques des aéroports. Version {v}.{c}"],
      ["Fuseaux horaires", "La carte divise le monde en bandes égales de 15° ; chaque bande représente un décalage d'une heure par rapport à l'UTC. Les vrais fuseaux horaires suivent les frontières et les décisions politiques : l'heure officielle d'un pays peut donc différer de la bande où il se trouve géographiquement. La Turquie, par exemple, utilise UTC+3 mais se situe dans la bande +2.<br><br>La bande mise en évidence indique où vous êtes, tandis que l'étiquette au-dessus de l'horloge indique votre heure locale officielle. Cliquer sur une bande affiche son heure UTC ; les villes d'exemple ont été choisies parmi des lieux sans heure d'été. Les fuseaux à la demi-heure (ex. Inde, UTC+5:30) ne sont pas représentés séparément."],
      ["Confidentialité", "Flaptab ne collecte aucune donnée personnelle et n'envoie rien à aucun serveur. Vos réglages sont enregistrés uniquement dans ce navigateur. La fonction de position est activée par défaut et peut être désactivée dans les réglages. Votre position est arrondie à environ 10 km, conservée uniquement sur cet appareil et supprimée lorsque vous désactivez la fonction."],
      ["Licences et crédits", "Carte du monde : Natural Earth (domaine public), via le paquet world-atlas (licence ISC). Positions des fuseaux horaires : IANA Time Zone Database (domaine public). Polices : Inter, JetBrains Mono, Noto Sans Arabic et Noto Sans SC (SIL Open Font License 1.1). Icônes : Feather Icons (licence MIT). Le texte complet des licences figure dans le fichier THIRD_PARTY_NOTICES.md de l’extension."],
      ["Avertissement", "Les informations affichées sont fournies à titre indicatif uniquement et ne conviennent pas à la navigation, à la planification de vol ni à aucun usage opérationnel. L'heure provient de l'horloge système de votre appareil."],
    ],
  },
  de: {
    title: "ÜBER",
    rights: "Alle Rechte vorbehalten.",
    sections: [
      ["Flaptab", "Verwandelt die Seite „Neuer Tab“ in eine Uhr im Stil der mechanischen Ankunftstafeln von Flughäfen. Version {v}.{c}"],
      ["Zeitzonen", "Die Karte teilt die Welt in gleich breite 15°-Streifen; jeder Streifen steht für eine Stunde Abstand zu UTC. Echte Zeitzonen folgen Landesgrenzen und politischen Entscheidungen, daher kann die offizielle Zeit eines Landes vom Streifen abweichen, in dem es geografisch liegt. Die Türkei etwa nutzt UTC+3, liegt aber im Streifen +2.<br><br>Der hervorgehobene Streifen zeigt, wo Sie sich befinden; die Beschriftung über der Uhr zeigt Ihre offizielle Ortszeit. Ein Klick auf einen Streifen zeigt dessen UTC-Zeit; die Beispielstädte wurden aus Orten ohne Sommerzeit gewählt. Zeitzonen mit halben Stunden (z. B. Indien, UTC+5:30) werden nicht gesondert dargestellt."],
      ["Datenschutz", "Flaptab erhebt keine personenbezogenen Daten und sendet nichts an Server. Ihre Einstellungen werden nur in diesem Browser gespeichert. Die Standortfunktion ist standardmäßig aktiviert und kann in den Einstellungen ausgeschaltet werden. Ihr Standort wird auf etwa 10 km gerundet, nur auf diesem Gerät gespeichert und beim Deaktivieren gelöscht."],
      ["Lizenzen und Quellen", "Weltkarte: Natural Earth (gemeinfrei), über das Paket world-atlas (ISC-Lizenz). Zeitzonen-Standorte: IANA Time Zone Database (gemeinfrei). Schriften: Inter, JetBrains Mono, Noto Sans Arabic und Noto Sans SC (SIL Open Font License 1.1). Symbole: Feather Icons (MIT-Lizenz). Die vollständigen Lizenztexte stehen in der Datei THIRD_PARTY_NOTICES.md der Erweiterung."],
      ["Haftungsausschluss", "Die angezeigten Informationen dienen nur der allgemeinen Orientierung und sind nicht für Navigation, Flugplanung oder sonstige betriebliche Zwecke geeignet. Die Uhrzeit basiert auf der Systemuhr Ihres Geräts."],
    ],
  },
  ar: {
    title: "حول",
    rights: "جميع الحقوق محفوظة.",
    sections: [
      ["Flaptab", "يحوّل صفحة علامة التبويب الجديدة إلى ساعة مستوحاة من لوحات الوصول الميكانيكية في المطارات. الإصدار {v}.{c}"],
      ["المناطق الزمنية", "تقسّم الخريطة العالم إلى شرائح متساوية عرض كل منها 15°، وتمثّل كل شريحة فرقًا قدره ساعة واحدة عن التوقيت العالمي المنسّق (UTC). أما المناطق الزمنية الفعلية فتتبع الحدود الوطنية والقرارات السياسية، لذا قد يختلف التوقيت الرسمي لبلد ما عن الشريحة التي يقع فيها جغرافيًا. فتركيا مثلًا تستخدم UTC+3 لكنها تقع في الشريحة +2.<br><br>تُظهر الشريحة المميّزة على الخريطة مكان وجودك، بينما يُظهر العنوان فوق الساعة توقيتك المحلي الرسمي. عند النقر على شريحة يُعرض توقيتها بالنسبة إلى UTC؛ وقد اختيرت المدن الأمثلة من أماكن لا تطبّق التوقيت الصيفي. لا تُعرض المناطق ذات نصف الساعة (مثل الهند، UTC+5:30) بشكل منفصل."],
      ["الخصوصية", "لا يجمع Flaptab أي بيانات شخصية ولا يرسل أي شيء إلى أي خادم. تُحفظ إعداداتك في هذا المتصفح فقط. ميزة الموقع مفعّلة افتراضيًا ويمكن إيقافها من الإعدادات. يُقرَّب موقعك إلى نحو 10 كم، ويُحفظ على هذا الجهاز فقط، ويُحذف عند إيقاف الميزة."],
      ["التراخيص والمصادر", "خريطة العالم: <bdi>Natural Earth</bdi> (ملكية عامة)، عبر حزمة <bdi>world-atlas</bdi> (ترخيص <bdi>ISC</bdi>). مواقع المناطق الزمنية: <bdi>IANA Time Zone Database</bdi> (ملكية عامة). الخطوط: <bdi>Inter</bdi> و<bdi>JetBrains Mono</bdi> و<bdi>Noto Sans Arabic</bdi> و<bdi>Noto Sans SC</bdi> (<bdi>SIL Open Font License 1.1</bdi>). الأيقونات: <bdi>Feather Icons</bdi> (ترخيص <bdi>MIT</bdi>). النصوص الكاملة للتراخيص موجودة في ملف <bdi>THIRD_PARTY_NOTICES.md</bdi> داخل الإضافة."],
      ["إخلاء المسؤولية", "المعلومات المعروضة لأغراض مرجعية عامة فقط، وليست مناسبة للملاحة أو تخطيط الرحلات الجوية أو أي استخدام تشغيلي. يعتمد الوقت على ساعة النظام في جهازك."],
    ],
  },
  zh: {
    title: "关于",
    rights: "保留所有权利。",
    sections: [
      ["Flaptab", "将新标签页变成一座灵感来自机场机械翻牌到达显示屏的时钟。版本 {v}。{c}"],
      ["时区", "地图将世界划分为宽度相等的 15° 时区带，每条带代表与 UTC 相差一小时。实际时区遵循国界和政治决定，因此一个国家的官方时间可能与其地理上所在的时区带不同。例如，土耳其使用 UTC+3，但地理上位于 +2 时区带。<br><br>地图上高亮的时区带表示您所在的位置，时钟上方的标签显示您的官方本地时间。点击某个时区带会显示该带的 UTC 时间；示例城市均选自不实行夏令时的地区。半小时时区（如印度，UTC+5:30）不单独显示。"],
      ["隐私", "Flaptab 不收集任何个人数据，也不向任何服务器发送数据。您的设置仅保存在此浏览器中。位置功能默认开启，可在设置中关闭。您的位置会被取整到约 10 公里的精度，仅保存在此设备上，并在关闭该功能时删除。"],
      ["许可与来源", "世界地图：Natural Earth（公有领域），经由 world-atlas 软件包（ISC 许可）。时区位置：IANA 时区数据库（公有领域）。字体：Inter、JetBrains Mono、Noto Sans Arabic 和 Noto Sans SC（SIL Open Font License 1.1）。图标：Feather Icons（MIT 许可）。完整许可文本见扩展中的 THIRD_PARTY_NOTICES.md 文件。"],
      ["免责声明", "所示信息仅供一般参考，不适用于导航、飞行计划或任何操作用途。时间以您设备的系统时钟为准。"],
    ],
  },
  ru: {
    title: "О ПРОГРАММЕ",
    rights: "Все права защищены.",
    sections: [
      ["Flaptab", "Превращает страницу новой вкладки в часы в стиле механических табло прилёта в аэропортах. Версия {v}.{c}"],
      ["Часовые пояса", "Карта делит мир на равные полосы шириной 15°; каждая полоса соответствует смещению на один час относительно UTC. Реальные часовые пояса следуют государственным границам и политическим решениям, поэтому официальное время страны может отличаться от полосы, в которой она находится географически. Например, Турция живёт по UTC+3, но лежит в полосе +2.<br><br>Выделенная полоса показывает, где вы находитесь, а надпись над часами — ваше официальное местное время. Нажатие на полосу показывает её время по UTC; города-примеры выбраны среди мест без перехода на летнее время. Пояса со сдвигом на полчаса (например, Индия, UTC+5:30) отдельно не показаны."],
      ["Конфиденциальность", "Flaptab не собирает персональные данные и ничего не отправляет на серверы. Ваши настройки хранятся только в этом браузере. Функция местоположения включена по умолчанию и отключается в настройках. Ваше местоположение округляется примерно до 10 км, хранится только на этом устройстве и удаляется при отключении функции."],
      ["Лицензии и источники", "Карта мира: Natural Earth (общественное достояние), через пакет world-atlas (лицензия ISC). Расположение часовых поясов: IANA Time Zone Database (общественное достояние). Шрифты: Inter, JetBrains Mono, Noto Sans Arabic и Noto Sans SC (SIL Open Font License 1.1). Значки: Feather Icons (лицензия MIT). Полные тексты лицензий — в файле THIRD_PARTY_NOTICES.md внутри расширения."],
      ["Отказ от ответственности", "Отображаемая информация носит справочный характер и не предназначена для навигации, планирования полётов или любого оперативного использования. Время берётся из системных часов вашего устройства."],
    ],
  },
  es: {
    title: "ACERCA DE",
    rights: "Todos los derechos reservados.",
    sections: [
      ["Flaptab", "Convierte la página Nueva pestaña en un reloj inspirado en los paneles mecánicos de llegadas de los aeropuertos. Versión {v}.{c}"],
      ["Zonas horarias", "El mapa divide el mundo en franjas iguales de 15°; cada franja representa una hora de diferencia con respecto a UTC. Las zonas horarias reales siguen fronteras nacionales y decisiones políticas, por lo que la hora oficial de un país puede diferir de la franja en la que se encuentra geográficamente. Turquía, por ejemplo, usa UTC+3 pero está en la franja +2.<br><br>La franja resaltada indica dónde se encuentra usted, y la etiqueta sobre el reloj muestra su hora local oficial. Al hacer clic en una franja se muestra su hora UTC; las ciudades de ejemplo se eligieron entre lugares sin horario de verano. Las zonas de media hora (p. ej., India, UTC+5:30) no se muestran por separado."],
      ["Privacidad", "Flaptab no recopila datos personales ni envía nada a ningún servidor. Sus ajustes se guardan solo en este navegador. La función de ubicación está activada de forma predeterminada y puede desactivarse en los ajustes. Su ubicación se redondea a unos 10 km, se guarda solo en este dispositivo y se elimina al desactivar la función."],
      ["Licencias y créditos", "Mapa del mundo: Natural Earth (dominio público), a través del paquete world-atlas (licencia ISC). Ubicaciones de zonas horarias: IANA Time Zone Database (dominio público). Fuentes: Inter, JetBrains Mono, Noto Sans Arabic y Noto Sans SC (SIL Open Font License 1.1). Iconos: Feather Icons (licencia MIT). Los textos completos de las licencias están en el archivo THIRD_PARTY_NOTICES.md de la extensión."],
      ["Aviso legal", "La información mostrada es solo de referencia general y no es apta para la navegación, la planificación de vuelos ni ningún uso operativo. La hora se basa en el reloj del sistema de su dispositivo."],
    ],
  },
};
