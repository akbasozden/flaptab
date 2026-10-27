# Third-Party Notices

Flaptab includes the third-party components listed below. Each is used under
its own license, reproduced or referenced here as that license requires. These
components are not covered by Flaptab's proprietary license (`LICENSE`).

| Component | Used for | License | Files |
|---|---|---|---|
| Inter (fonts) | Board, LED and Classic themes (Latin, Cyrillic) | SIL Open Font License 1.1 | `fonts/inter-*.woff2` |
| JetBrains Mono (fonts) | Cockpit theme (Latin, Cyrillic) | SIL Open Font License 1.1 | `fonts/jetbrains-mono-*.woff2` |
| Noto Sans Arabic (font) | Arabic text | SIL Open Font License 1.1 | `fonts/noto-sans-arabic-*.woff2` |
| Noto Sans SC (font, subset) | Chinese text | SIL Open Font License 1.1 | `fonts/noto-sans-sc-subset-*.woff2` |
| Feather Icons | Settings (gear) icon | MIT | `newtab.html` |
| Natural Earth | Underlying map data | Public domain | `world.js` (derived) |
| Natural Earth, IANA Time Zone Database | Time zone of each map point; capital cities | Public domain | `places.js` (derived) |
| "Split Flap Display" by ngruber (Freesound #261244) | Flap sound (Board theme) | CC0 1.0 (public domain) | `sounds/flap.wav` (excerpts) |

---

## Inter

Copyright 2016 The Inter Project Authors (https://github.com/rsms/inter)

Licensed under the SIL Open Font License, Version 1.1. The full license text is
in [`fonts/Inter-OFL.txt`](fonts/Inter-OFL.txt).

The font files are bundled unmodified (subset WOFF2 builds distributed by
Fontsource). Within Flaptab they are referred to by the internal family name
"Flaptab Sans"; the font software itself is not renamed or altered. The fonts
are not sold on their own.

## JetBrains Mono

Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

Licensed under the SIL Open Font License, Version 1.1. The full license text is
in [`fonts/JetBrainsMono-OFL.txt`](fonts/JetBrainsMono-OFL.txt).

The font files are bundled unmodified (subset WOFF2 builds distributed by
Fontsource). Within Flaptab they are referred to by the internal family name
"Flaptab Mono". The fonts are not sold on their own.

## Noto Sans Arabic

Copyright 2022 The Noto Project Authors (https://github.com/notofonts/arabic)

Licensed under the SIL Open Font License, Version 1.1. The full license text is
in [`fonts/NotoSansArabic-OFL.txt`](fonts/NotoSansArabic-OFL.txt).

The Arabic-script subset distributed by Fontsource is bundled unmodified. Within
Flaptab it is referred to by the internal family name "Flaptab Arabic".

## Noto Sans SC

Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name
'Source'. Licensed under the SIL Open Font License, Version 1.1. The full
license text is in [`fonts/NotoSansSC-OFL.txt`](fonts/NotoSansSC-OFL.txt).

This is a Modified Version under the OFL: the font was subset to the characters
used by Flaptab's Chinese interface (`tools/subset-cjk.sh`). It does not use the
Reserved Font Name "Source". Within Flaptab it is referred to by the internal
family name "Flaptab CJK".

## Feather Icons

```
The MIT License (MIT)

Copyright (c) 2013-2023 Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Natural Earth

Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.
Natural Earth data is in the public domain.

## IANA Time Zone Database

The time zone identifiers in `tz-bands.js` were derived from `zone.tab` of the
IANA Time Zone Database (https://www.iana.org/time-zones), which is in the
public domain.

## Split Flap Display (sound)

"Split Flap Display" by ngruber, https://freesound.org/people/ngruber/sounds/261244/ ,
dedicated to the public domain under Creative Commons CC0 1.0
(https://creativecommons.org/publicdomain/zero/1.0/). `sounds/flap.wav` contains
ten short excerpts of single flap hits, high-pass filtered and normalized. No
attribution is required; it is credited here as a courtesy.
