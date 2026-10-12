# Ming Atlas

## Open the website

- **Mobile：** [Discover Your Chinese Birth Chart](https://elliezhangy.github.io/ming-oracle/)
- **Desktop：** [Discover Your Chinese Birth Chart](https://elliezhangy.github.io/ming-oracle/)

Both links use the same responsive website; the layout adapts to your screen.

**The Element Within You.** Explore your nature through the five elements—an ancient lens on a modern life. A bilingual, browser-only Chinese five-element reflection app, with responsive phone and desktop layouts. Open `index.html` directly. No API key, package installation or build is required.

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

Verify an international birth-time pipeline and independent boundary fixtures before presenting complete charts. Add licensed classical sources and server-side AI interpretation with a strict distinction between computed facts and creative language. Keep API keys out of browser code.
