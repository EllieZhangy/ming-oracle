/* Trusted, local decorative artwork. Playback is controlled by .is-playing. */
globalThis.MingGlyphs = Object.freeze({
  wood: `<svg class="glyph-svg glyph-wood" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="glyph-stroke" pathLength="1" d="M48 83 C49 69 50 48 51 23" stroke="#263f36" stroke-width="2.1" stroke-linecap="round" style="--glyph-delay:.22s"/>
    <path class="glyph-stroke" pathLength="1" d="M50 38 C43 42 38 45 32 47 M51 37 C58 42 63 44 68 45" stroke="#263f36" stroke-width="1.5" stroke-linecap="round" style="--glyph-delay:.48s"/>
    <path class="glyph-stroke" pathLength="1" d="M49 52 C40 56 32 60 25 61 M50 53 C60 57 68 59 75 59" stroke="#263f36" stroke-width="1.55" stroke-linecap="round" style="--glyph-delay:.62s"/>
    <path class="glyph-stroke" pathLength="1" d="M49 66 C39 71 30 73 21 74 M49 67 C61 71 72 73 81 72" stroke="#263f36" stroke-width="1.6" stroke-linecap="round" style="--glyph-delay:.76s"/>
    <path class="glyph-ink" d="M51 20 Q46 28 39 32 Q46 32 51 29 Q56 34 63 33 Q56 27 51 20Z" fill="#68786e" style="--glyph-delay:.48s"/>
    <path class="glyph-ink" d="M42 37 Q36 41 29 47 Q37 48 46 43 L52 38 Q62 47 72 46 Q65 38 55 35Z" fill="#68786e" style="--glyph-delay:.65s"/>
    <path class="glyph-ink" d="M39 51 Q30 55 20 62 Q33 63 46 57 L51 52 Q64 62 80 60 Q69 52 57 48Z" fill="#68786e" style="--glyph-delay:.78s"/>
    <path class="glyph-ink" d="M35 66 Q26 69 16 76 Q30 77 46 72 L50 67 Q67 78 85 74 Q71 66 57 63Z" fill="#68786e" style="--glyph-delay:.92s"/>
    <path class="glyph-stroke glyph-ground" pathLength="1" d="M33 85 Q49 80 67 84" stroke="#8a7752" stroke-width="1" stroke-linecap="round" style="--glyph-delay:.95s"/>
  </svg>`,
  fire: `<svg class="glyph-svg glyph-fire" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="glyph-stroke" pathLength="1" d="M51 82 C30 83 21 68 29 52 C32 62 39 61 39 52 C38 40 49 33 49 19 C63 30 72 42 67 55 C74 50 76 43 76 43 C88 63 74 82 51 82Z" stroke="#263f36" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.24s;--glyph-duration:1s"/>
    <path class="glyph-stroke" pathLength="1" d="M51 79 C40 73 41 64 48 55 C50 51 53 46 52 40 C65 55 67 68 51 79Z" stroke="#8a7752" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.67s;--glyph-duration:.8s"/>
    <path class="glyph-ink glyph-flame-glow" d="M51 79 C40 73 41 64 48 55 C50 51 53 46 52 40 C65 55 67 68 51 79Z" fill="#8a7752" style="--glyph-delay:.91s"/>
    <path class="glyph-stroke glyph-ground" pathLength="1" d="M35 87 Q50 84 68 87" stroke="#68786e" stroke-width="1" stroke-linecap="round" style="--glyph-delay:.96s"/>
  </svg>`,
  earth: `<svg class="glyph-svg glyph-earth" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="glyph-stroke glyph-mountain" pathLength="1" d="M14 80 L35 43 L48 64 L57 53 L85 80" stroke="#263f36" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.23s;--glyph-duration:.9s"/>
    <path class="glyph-stroke glyph-mountain" pathLength="1" d="M40 52 L57 24 L83 68" stroke="#68786e" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.47s;--glyph-duration:.95s"/>
    <path class="glyph-stroke glyph-mountain" pathLength="1" d="M17 65 L24 54 L30 60 M62 35 L66 30 L89 65" stroke="#8a7752" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.73s"/>
    <path class="glyph-ink" d="M35 44 L22 78 L44 78 L49 65Z" fill="#68786e" style="--glyph-delay:.82s"/>
    <path class="glyph-stroke glyph-ground" pathLength="1" d="M11 84 Q49 82 89 84" stroke="#8a7752" stroke-width="1" stroke-linecap="round" style="--glyph-delay:.81s"/>
  </svg>`,
  metal: `<svg class="glyph-svg glyph-metal" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle class="glyph-stroke" pathLength="1" cx="50" cy="48" r="28" stroke="#263f36" stroke-width="1.7" transform="rotate(-90 50 48)" style="--glyph-delay:.22s;--glyph-duration:1s"/>
    <circle class="glyph-stroke" pathLength="1" cx="50" cy="48" r="23" stroke="#8a7752" stroke-width="1.25" transform="rotate(-90 50 48)" style="--glyph-delay:.42s;--glyph-duration:1s"/>
    <path class="glyph-stroke" pathLength="1" d="M44 76 L42 84 Q50 88 58 84 L56 76" stroke="#263f36" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" style="--glyph-delay:.65s"/>
    <circle class="glyph-ink" cx="50" cy="48" r="5" fill="#8a7752" style="--glyph-delay:.86s"/>
    <path class="glyph-stroke" pathLength="1" d="M46 48 L54 48 M50 44 L50 52" stroke="#263f36" stroke-width="1.1" stroke-linecap="round" style="--glyph-delay:.81s"/>
    <path class="glyph-glint" d="M35 35 L35 44 M30.5 39.5 L39.5 39.5" stroke="#8a7752" stroke-width="1.2" stroke-linecap="round"/>
    <path class="glyph-stroke glyph-ground" pathLength="1" d="M35 89 L65 89" stroke="#68786e" stroke-width="1" stroke-linecap="round" style="--glyph-delay:.94s"/>
  </svg>`,
  water: `<svg class="glyph-svg glyph-water" viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="glyph-stroke" pathLength="1" d="M56 20 C34 31 68 39 45 48 C23 57 68 62 48 72" stroke="#263f36" stroke-width="1.8" stroke-linecap="round" style="--glyph-delay:.23s;--glyph-duration:1.1s"/>
    <path class="glyph-stroke" pathLength="1" d="M63 27 C42 38 78 44 56 54 C35 62 75 68 56 76" stroke="#68786e" stroke-width="1.35" stroke-linecap="round" style="--glyph-delay:.47s;--glyph-duration:1.05s"/>
    <path class="glyph-stroke glyph-ripple" pathLength="1" d="M34 77 C24 79 28 86 50 86 C72 86 76 79 66 77" stroke="#8a7752" stroke-width="1.15" stroke-linecap="round" style="--glyph-delay:.79s;--glyph-duration:.8s"/>
    <path class="glyph-stroke glyph-ripple" pathLength="1" d="M25 81 C14 85 24 92 50 92 C76 92 86 85 75 81" stroke="#68786e" stroke-width="1" stroke-linecap="round" style="--glyph-delay:1.03s;--glyph-duration:.72s"/>
  </svg>`
});
if (typeof module !== 'undefined') module.exports = globalThis.MingGlyphs;
