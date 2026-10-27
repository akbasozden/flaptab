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
      ["Saat dilimleri", "Harita, saat dilimlerini ülke sınırlarına göre gösterir: bir dilimin üzerine geldiğinizde ya da tıkladığınızda, şu anda aynı saati kullanan bütün kara parçaları birlikte parlar (yaz saati dahil). Örneğin Türkiye coğrafi olarak +2 bandında olsa da UTC+3 kullandığı için +3 dilimiyle birlikte görünür. Denizlerde dilimler 15°'lik eşit bantlardır.<br><br>Haritada vurgulanan dilim yerel saatinizi, saatin üstündeki etiket ise resmi yerel saatinizi gösterir. Bir dilime tıkladığınızda panoda o dilimin saati gösterilir; haritanın üstündeki etiket o dilimdeki önemli başkentleri listeler. Harita 1,5°'lik bir ızgaradır, bu yüzden sınıra yakın noktalar komşu dilime düşebilir."],
      ["Gizlilik", "Flaptab kişisel veri toplamaz ve hiçbir sunucuya veri göndermez. Ayarlarınız yalnızca bu tarayıcıda saklanır. Konum özelliği varsayılan olarak açıktır ve ayarlardan kapatılabilir. Konumunuz yaklaşık 10 km hassasiyete yuvarlanarak yalnızca bu cihazda saklanır ve özelliği kapattığınızda silinir."],
      ["Lisanslar ve kaynaklar", "Dünya haritası: Natural Earth (kamu malı). Saat dilimi konumları: IANA Time Zone Database (kamu malı). Yazı tipleri: Inter, JetBrains Mono, Noto Sans Arabic ve Noto Sans SC (SIL Open Font License 1.1). Simgeler: Feather Icons (MIT lisansı). Lisans metinlerinin tamamı eklentideki THIRD_PARTY_NOTICES.md dosyasındadır."],
      ["Sorumluluk reddi", "Gösterilen bilgiler yalnızca genel bilgilendirme amaçlıdır; seyrüsefer, uçuş planlaması veya herhangi bir operasyonel kullanım için uygun değildir. Saat, cihazınızın sistem saatine dayanır."],
    ],
  },
  en: {
    title: "ABOUT",
    rights: "All rights reserved.",
    sections: [
      ["Flaptab", "Turns your new tab page into a clock inspired by the mechanical arrival boards of airports. Version {v}.{c}"],
      ["Time zones", "The map shows time zones along national borders: when you hover over or click a zone, all land currently on the same time lights up together (daylight saving time included). Turkey, for example, lies in the +2 band geographically but uses UTC+3, so it lights up with the +3 zone. At sea, zones are equal 15° bands.<br><br>The highlighted zone is your local time, and the label above the clock shows your official local time. Clicking a zone shows its time on the board; the label above the map lists the main capitals in that zone. The map is a 1.5° grid, so points near a border may fall into the neighbouring zone."],
      ["Privacy", "Flaptab collects no personal data and sends nothing to any server. Your settings are stored only in this browser. The location feature is on by default and can be turned off in Settings. Your position is rounded to about 10 km, kept only on this device, and deleted when you turn the feature off."],
      ["Licenses and credits", "World map: Natural Earth (public domain). Time zone locations: IANA Time Zone Database (public domain). Fonts: Inter, JetBrains Mono, Noto Sans Arabic and Noto Sans SC (SIL Open Font License 1.1). Icons: Feather Icons (MIT license). Full license texts are in THIRD_PARTY_NOTICES.md inside the extension."],
      ["Disclaimer", "Information shown is for general reference only and is not suitable for navigation, flight planning, or any operational use. The time is based on your device's system clock."],
    ],
  },
  fr: {
    title: "À PROPOS",
    rights: "Tous droits réservés.",
    sections: [
      ["Flaptab", "Transforme la page Nouvel onglet en une horloge inspirée des tableaux d'arrivée mécaniques des aéroports. Version {v}.{c}"],
      ["Fuseaux horaires", "La carte suit les frontières nationales : lorsque vous survolez ou cliquez sur un fuseau, toutes les terres qui ont actuellement la même heure s'allument ensemble (heure d'été comprise). La Turquie, par exemple, se trouve géographiquement dans la bande +2 mais utilise UTC+3 ; elle s'allume donc avec le fuseau +3. En mer, les fuseaux sont des bandes égales de 15°.<br><br>Le fuseau mis en évidence correspond à votre heure locale, et l'étiquette au-dessus de l'horloge indique votre heure locale officielle. Un clic sur un fuseau affiche son heure sur le tableau ; l'étiquette au-dessus de la carte indique les principales capitales de ce fuseau. La carte est une grille de 1,5° : un point proche d'une frontière peut tomber dans le fuseau voisin."],
      ["Confidentialité", "Flaptab ne collecte aucune donnée personnelle et n'envoie rien à aucun serveur. Vos réglages sont enregistrés uniquement dans ce navigateur. La fonction de position est activée par défaut et peut être désactivée dans les réglages. Votre position est arrondie à environ 10 km, conservée uniquement sur cet appareil et supprimée lorsque vous désactivez la fonction."],
      ["Licences et crédits", "Carte du monde : Natural Earth (domaine public). Positions des fuseaux horaires : IANA Time Zone Database (domaine public). Polices : Inter, JetBrains Mono, Noto Sans Arabic et Noto Sans SC (SIL Open Font License 1.1). Icônes : Feather Icons (licence MIT). Le texte complet des licences figure dans le fichier THIRD_PARTY_NOTICES.md de l’extension."],
      ["Avertissement", "Les informations affichées sont fournies à titre indicatif uniquement et ne conviennent pas à la navigation, à la planification de vol ni à aucun usage opérationnel. L'heure provient de l'horloge système de votre appareil."],
    ],
  },
  de: {
    title: "ÜBER",
    rights: "Alle Rechte vorbehalten.",
    sections: [
      ["Flaptab", "Verwandelt die Seite „Neuer Tab“ in eine Uhr im Stil der mechanischen Ankunftstafeln von Flughäfen. Version {v}.{c}"],
      ["Zeitzonen", "Die Karte zeigt Zeitzonen entlang der Landesgrenzen: Fahren Sie über eine Zone oder klicken Sie darauf, leuchtet alles Land auf, das gerade dieselbe Uhrzeit hat (Sommerzeit inbegriffen). Die Türkei etwa liegt geografisch im Streifen +2, nutzt aber UTC+3 und leuchtet daher mit der Zone +3. Auf dem Meer sind die Zonen gleich breite 15°-Streifen.<br><br>Die hervorgehobene Zone ist Ihre Ortszeit, die Beschriftung über der Uhr zeigt Ihre offizielle Ortszeit. Ein Klick auf eine Zone zeigt deren Uhrzeit auf der Tafel; die Beschriftung über der Karte nennt die wichtigsten Hauptstädte dieser Zone. Die Karte ist ein 1,5°-Raster, daher können Punkte nahe einer Grenze in die Nachbarzone fallen."],
      ["Datenschutz", "Flaptab erhebt keine personenbezogenen Daten und sendet nichts an Server. Ihre Einstellungen werden nur in diesem Browser gespeichert. Die Standortfunktion ist standardmäßig aktiviert und kann in den Einstellungen ausgeschaltet werden. Ihr Standort wird auf etwa 10 km gerundet, nur auf diesem Gerät gespeichert und beim Deaktivieren gelöscht."],
      ["Lizenzen und Quellen", "Weltkarte: Natural Earth (gemeinfrei). Zeitzonen-Standorte: IANA Time Zone Database (gemeinfrei). Schriften: Inter, JetBrains Mono, Noto Sans Arabic und Noto Sans SC (SIL Open Font License 1.1). Symbole: Feather Icons (MIT-Lizenz). Die vollständigen Lizenztexte stehen in der Datei THIRD_PARTY_NOTICES.md der Erweiterung."],
      ["Haftungsausschluss", "Die angezeigten Informationen dienen nur der allgemeinen Orientierung und sind nicht für Navigation, Flugplanung oder sonstige betriebliche Zwecke geeignet. Die Uhrzeit basiert auf der Systemuhr Ihres Geräts."],
    ],
  },
  ar: {
    title: "حول",
    rights: "جميع الحقوق محفوظة.",
    sections: [
      ["Flaptab", "يحوّل صفحة علامة التبويب الجديدة إلى ساعة مستوحاة من لوحات الوصول الميكانيكية في المطارات. الإصدار {v}.{c}"],
      ["المناطق الزمنية", "تعرض الخريطة المناطق الزمنية وفق الحدود الوطنية: عند تمرير المؤشر فوق منطقة أو النقر عليها تضيء معًا كل اليابسة التي تتبع التوقيت نفسه حاليًا (بما في ذلك التوقيت الصيفي). فتركيا مثلًا تقع جغرافيًا في الشريحة <bdi>+2</bdi> لكنها تستخدم <bdi>UTC+3</bdi>، لذا تضيء مع المنطقة <bdi>+3</bdi>. أما في البحار فالمناطق شرائح متساوية عرض كل منها 15°.<br><br>المنطقة المميّزة هي توقيتك المحلي، ويعرض الشريط فوق الساعة توقيتك المحلي الرسمي. النقر على منطقة يعرض وقتها على اللوحة، ويسرد الشريط فوق الخريطة أهم العواصم في تلك المنطقة. الخريطة شبكة بدقة 1.5°، لذا قد تقع النقاط القريبة من الحدود في المنطقة المجاورة."],
      ["الخصوصية", "لا يجمع Flaptab أي بيانات شخصية ولا يرسل أي شيء إلى أي خادم. تُحفظ إعداداتك في هذا المتصفح فقط. ميزة الموقع مفعّلة افتراضيًا ويمكن إيقافها من الإعدادات. يُقرَّب موقعك إلى نحو 10 كم، ويُحفظ على هذا الجهاز فقط، ويُحذف عند إيقاف الميزة."],
      ["التراخيص والمصادر", "خريطة العالم: <bdi>Natural Earth</bdi> (ملكية عامة). مواقع المناطق الزمنية: <bdi>IANA Time Zone Database</bdi> (ملكية عامة). الخطوط: <bdi>Inter</bdi> و<bdi>JetBrains Mono</bdi> و<bdi>Noto Sans Arabic</bdi> و<bdi>Noto Sans SC</bdi> (<bdi>SIL Open Font License 1.1</bdi>). الأيقونات: <bdi>Feather Icons</bdi> (ترخيص <bdi>MIT</bdi>). النصوص الكاملة للتراخيص موجودة في ملف <bdi>THIRD_PARTY_NOTICES.md</bdi> داخل الإضافة."],
      ["إخلاء المسؤولية", "المعلومات المعروضة لأغراض مرجعية عامة فقط، وليست مناسبة للملاحة أو تخطيط الرحلات الجوية أو أي استخدام تشغيلي. يعتمد الوقت على ساعة النظام في جهازك."],
    ],
  },
  zh: {
    title: "关于",
    rights: "保留所有权利。",
    sections: [
      ["Flaptab", "将新标签页变成一座灵感来自机场机械翻牌到达显示屏的时钟。版本 {v}。{c}"],
      ["时区", "地图按国界显示时区：将指针悬停在某个时区上或点击它时，当前使用相同时间的所有陆地会一起高亮（含夏令时）。例如，土耳其地理上位于 +2 时区带，但使用 UTC+3，因此会与 +3 时区一起高亮。在海洋上，时区是宽度相等的 15° 时区带。<br><br>高亮的时区表示您的本地时间，时钟上方的标签显示您的官方本地时间。点击某个时区，看板将显示该时区的时间；地图上方的标签列出该时区的主要首都。地图为 1.5° 网格，因此靠近边界的点可能落入相邻时区。"],
      ["隐私", "Flaptab 不收集任何个人数据，也不向任何服务器发送数据。您的设置仅保存在此浏览器中。位置功能默认开启，可在设置中关闭。您的位置会被取整到约 10 公里的精度，仅保存在此设备上，并在关闭该功能时删除。"],
      ["许可与来源", "世界地图：Natural Earth（公有领域）。时区位置：IANA 时区数据库（公有领域）。字体：Inter、JetBrains Mono、Noto Sans Arabic 和 Noto Sans SC（SIL Open Font License 1.1）。图标：Feather Icons（MIT 许可）。完整许可文本见扩展中的 THIRD_PARTY_NOTICES.md 文件。"],
      ["免责声明", "所示信息仅供一般参考，不适用于导航、飞行计划或任何操作用途。时间以您设备的系统时钟为准。"],
    ],
  },
  ru: {
    title: "О ПРОГРАММЕ",
    rights: "Все права защищены.",
    sections: [
      ["Flaptab", "Превращает страницу новой вкладки в часы в стиле механических табло прилёта в аэропортах. Версия {v}.{c}"],
      ["Часовые пояса", "Карта показывает часовые пояса по государственным границам: при наведении на пояс или нажатии на него вместе подсвечивается вся суша, где сейчас то же время (с учётом летнего времени). Например, Турция географически находится в полосе +2, но использует UTC+3, поэтому подсвечивается вместе с поясом +3. На море пояса — это равные полосы шириной 15°.<br><br>Выделенный пояс — ваше местное время, а надпись над часами показывает ваше официальное местное время. Нажатие на пояс показывает его время на табло; надпись над картой перечисляет главные столицы этого пояса. Карта представляет собой сетку с шагом 1,5°, поэтому точки у границы могут попасть в соседний пояс."],
      ["Конфиденциальность", "Flaptab не собирает персональные данные и ничего не отправляет на серверы. Ваши настройки хранятся только в этом браузере. Функция местоположения включена по умолчанию и отключается в настройках. Ваше местоположение округляется примерно до 10 км, хранится только на этом устройстве и удаляется при отключении функции."],
      ["Лицензии и источники", "Карта мира: Natural Earth (общественное достояние). Расположение часовых поясов: IANA Time Zone Database (общественное достояние). Шрифты: Inter, JetBrains Mono, Noto Sans Arabic и Noto Sans SC (SIL Open Font License 1.1). Значки: Feather Icons (лицензия MIT). Полные тексты лицензий — в файле THIRD_PARTY_NOTICES.md внутри расширения."],
      ["Отказ от ответственности", "Отображаемая информация носит справочный характер и не предназначена для навигации, планирования полётов или любого оперативного использования. Время берётся из системных часов вашего устройства."],
    ],
  },
  es: {
    title: "ACERCA DE",
    rights: "Todos los derechos reservados.",
    sections: [
      ["Flaptab", "Convierte la página Nueva pestaña en un reloj inspirado en los paneles mecánicos de llegadas de los aeropuertos. Versión {v}.{c}"],
      ["Zonas horarias", "El mapa muestra las zonas horarias siguiendo las fronteras: al pasar el puntero por una zona o hacer clic en ella, se ilumina a la vez toda la tierra que tiene ahora la misma hora (horario de verano incluido). Turquía, por ejemplo, está geográficamente en la franja +2 pero usa UTC+3, por lo que se ilumina con la zona +3. En el mar, las zonas son franjas iguales de 15°.<br><br>La zona resaltada es su hora local, y la etiqueta sobre el reloj muestra su hora local oficial. Al hacer clic en una zona se muestra su hora en el panel; la etiqueta sobre el mapa muestra las principales capitales de esa zona. El mapa es una cuadrícula de 1,5°, por lo que los puntos cercanos a una frontera pueden caer en la zona vecina."],
      ["Privacidad", "Flaptab no recopila datos personales ni envía nada a ningún servidor. Sus ajustes se guardan solo en este navegador. La función de ubicación está activada de forma predeterminada y puede desactivarse en los ajustes. Su ubicación se redondea a unos 10 km, se guarda solo en este dispositivo y se elimina al desactivar la función."],
      ["Licencias y créditos", "Mapa del mundo: Natural Earth (dominio público). Ubicaciones de zonas horarias: IANA Time Zone Database (dominio público). Fuentes: Inter, JetBrains Mono, Noto Sans Arabic y Noto Sans SC (SIL Open Font License 1.1). Iconos: Feather Icons (licencia MIT). Los textos completos de las licencias están en el archivo THIRD_PARTY_NOTICES.md de la extensión."],
      ["Aviso legal", "La información mostrada es solo de referencia general y no es apta para la navegación, la planificación de vuelos ni ningún uso operativo. La hora se basa en el reloj del sistema de su dispositivo."],
    ],
  },
};
