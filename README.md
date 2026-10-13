# Ming Atlas

> Archived static edition. The current application is maintained on [main](https://github.com/EllieZhangy/ming-oracle/tree/main) and hosted on Vercel. This branch preserves the original browser-only experience as [v0.1.0](https://github.com/EllieZhangy/ming-oracle/releases/tag/v0.1.0).

## Open the website

- **Mobile:** [Discover Your Birth Chart](https://ming-oracle-eta.vercel.app/)
- **Desktop:** [Discover Your Birth Chart](https://ming-oracle-eta.vercel.app/)

Both links use the same responsive Vercel website; the layout adapts to your screen.

[Earlier rule-based version on GitHub Pages](https://elliezhangy.github.io/ming-oracle/).

**Discover the element within you.** A bilingual web experience inspired by Eastern astrology, with birth-element readings, symbolic reflections, and subtle ink-inspired interactions.

The current Vercel website uses [`main`](https://github.com/EllieZhangy/ming-oracle/tree/main). It combines a server-calculated preliminary BaZi chart with the visitor's own words and chosen area to create a personal interpretation through OpenAI. The existing three-page flow, six areas, bilingual controls and optional PDF export remain. A quiet indeterminate progress line and approximate 30-second wait message accompany generation; the line does not represent a measured completion percentage.

The server API key is configured in Vercel, never in browser code. Generating an interpretation sends chart facts and the visitor's words through the server to OpenAI; reports stay in the current page's memory. The reading is symbolic cultural exploration, not a guarantee of future events.

For local server setup, deployment, sources and calculation limits, see the [current implementation README](https://github.com/EllieZhangy/ming-oracle/blob/main/README.md) and [Vercel deployment guide](https://github.com/EllieZhangy/ming-oracle/blob/main/docs/DEPLOY.md).

## Archived static source on legacy-static

The `legacy-static` branch and GitHub Pages contain the earlier rule-based version. The sections below describe this archived source version. It can open `index.html` directly without an API key, package installation or build; opening that file does not provide the current personalized interpretation service.

## Three-page flow

1. **Birth & intention**: date, optional birth time / city, and a word or question. No direction selector.
2. **Your elemental nature**: preliminary pillars and Day Master archetype, then six buttons: Health, Love, Family, Career, Study, Wealth. Select one and continue.
3. **Your present season & three-month rhythm**: selected-area symbolic outlook, a suggested monthly window, three monthly cards, practical alignment and topic-specific cautions. No generic reflection questionnaire.

The top 01 / 02 / 03 buttons navigate directly to completed steps. Missing information opens the form or topic selection. Back navigation preserves birth inputs and selection. Language switching preserves the page and reading. You can choose another area without entering birth information again. Text export contains nature, selected-area report and methodology. The report ends with an optional **Save as PDF** button. The app never opens the print dialog or saves a file automatically when a reading is generated. Only clicking this button (or using the browser’s print command) opens the print dialog, where you can choose **Save as PDF**. A separate A4 print layout includes the full report and calculation notes. Mobile printing depends on the browser; the same URL adapts to either screen size.

## Visual identity

The paper, muted green and gold palette is preserved. The calculated Day Master selects a subtle pine, flame scroll, mountain, bronze mirror or water motif on result pages. These original SVG ornaments are lightweight, decorative and hidden in PDF printing.

## Element interactions

Hover or click the character seal or element name to reveal a small, original ink motif. Wood grows a pine; Fire breathes softly; Earth draws mountain lines; Metal gives a mirror glint; Water reveals ripples. Each effect runs once for three seconds, then returns to the text. Touch and keyboard activation are supported. Repeated inputs do not stack; navigation and element changes cancel old playback. Reduced-motion preferences keep the text static. PDF saving remains optional and user-triggered.

## Calculation and interpretation boundaries

- Bundled `lunar-javascript` 1.7.7 (MIT), https://github.com/6tail/lunar-javascript. License in `vendor/LICENSE.lunar-javascript`.
- Gregorian dates 1900–2100, civil clock input and sect 2 / midnight day boundary. Missing time uses noon provisionally and omits the hour pillar.
- Birth city is collected but not used. Overseas timezone, DST, local solar-term boundaries and apparent solar time are not corrected. The chart is preliminary, especially near boundaries.
- The Day Master stem determines the element, not dominant element, strength, favorable elements or a validated personality classification.
- Monthly lens: for each of the current and next two civil months, sample the 15th at noon, obtain its month-stem element and compare with the Day Master using generation/control relationships. This is a simplified original symbolic system. It does not calculate full BaZi, ten-god favorability, luck cycles, actual difficulty, a monthly turning point or event probabilities. Solar-term months do not coincide with civil month boundaries.
- Titles, moods and actions vary by topic and symbolic relationship, with separate original voices for yin and yang stems so consecutive same-element months no longer repeat. Health discusses everyday wellbeing, not diagnosis or treatment. Wealth discusses resource organization and spending habits, not financial predictions.
- A later support/peer/expression month is called a symbolic action window. The search covers the next 18 future months and displays the actual matching month/year, even if it lies beyond the three visible cards. Relationships are not inherently good/bad in full BaZi.
- The submitted phrase is shown as an intention, not semantically analyzed. No AI or classical-text retrieval is connected. All report copy is original.
- Inputs stay in browser memory; no data submission, analytics or persistence. Google Fonts makes an optional font request without form data.

## Verify

```sh
node tests/oracle.test.cjs
node tests/month_engine.test.cjs
node tests/motion.test.cjs
python3 tests/structure.test.py
```

Checks cover a published reference chart, midnight / unknown-time cases, date validation, generation/control relations, bilingual topic coverage, month rollover and static page structure. These checks also cover same-element duplicate text, longer-range windows and clickable navigation structure. Browser interaction and print-layout checks are separate.

## Next

Verify an international birth-time pipeline and independent boundary fixtures before presenting complete charts. Server-side interpretation and a licensed BaZi skill reference are maintained on `main`; full classical-text retrieval and complete luck-cycle analysis remain outside that release. Keep API keys out of browser code.
