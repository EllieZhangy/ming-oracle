# Ming Oracle · 命

Bilingual Chinese-symbolism reflection app. Open `index.html` directly; no API key or build required. Optional server: `python3 -m http.server 8080`.

## Report

1. Preliminary birth chart and Day Master element archetype (Wood, Fire, Earth, Metal, Water).
2. Topic reflection and a three-month intention / action sequence.
3. Element-inspired alignment practice, boundaries and reflection prompts.

English / Chinese switching, mobile layout and full text export are included. Inputs are processed only in browser memory. Google Fonts makes an optional external request; no form data is sent.

## Calculation and interpretation boundaries

- Bundled `lunar-javascript` 1.7.7 (MIT) computes pillars deterministically; upstream: https://github.com/6tail/lunar-javascript. License in `vendor/LICENSE.lunar-javascript`.
- Gregorian dates 1900–2100; entered civil clock time; sect 2 / midnight day boundary. Missing time uses noon provisionally for date calculations and omits the hour pillar.
- Birth city is currently collected but **not used**. Overseas timezone, DST, local solar-term boundaries and apparent solar time are **not corrected**. Charts are preliminary, especially near boundaries.
- The Day Master stem determines the element; this is not an assessment of dominant element, chart strength, favorable elements, personality validity or full BaZi interpretation.
- Topic text is chosen by selected topic, not inferred from the user's free text.
- Monthly text is an explicitly labeled creative sequence starting with the browser's current month. It is not monthly fortune, a luck-cycle computation or a prediction.
- Personality and practice text are original symbolic templates. There is no AI or ancient-text retrieval yet.

## Verify

`node tests/oracle.test.cjs`

## Next

Add a verified international birth-time pipeline and independent boundary fixtures before presenting complete charts. Add licensed classical sources with attribution; then server-side AI interpretation with strict separation between computed chart facts and creative text. No API keys should enter frontend source.
