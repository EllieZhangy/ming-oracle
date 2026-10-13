# The Eastern Chart · Ming Oracle

**The Element Within You.** An AI-powered Eastern astrology experience that
weaves a calculated BaZi birth chart with what is on your mind. Bring a word,
feeling or current situation; receive a personal reading through the five
elements, with a quiet ink-and-paper aesthetic.

AI fortune telling here is cultural exploration and self-reflection. The
reading offers symbolic directions and practices, not guaranteed future events.

## Website

- **Existing public version · Mobile / 手机:** [The Eastern Chart](https://elliezhangy.github.io/ming-oracle/)
- **Existing public version · Desktop / 电脑:** [The Eastern Chart](https://elliezhangy.github.io/ming-oracle/)

Both links use the same responsive frontend on `main`; it remains the existing
rule-based public version. The implemented AI version is on `feat/ai-readings`
pending a configured backend and a real API smoke test. GitHub Pages cannot run
the AI endpoint. The Pages link is not a live AI connection.
[Deploy the full app on Vercel](docs/DEPLOY.md) to serve the website and API
together. Merge the AI branch only after both live reading stages are verified.

## The reading

1. **Birth & intention:** enter a birth date, optional time and city, and what
   is on your mind.
2. **Your elemental nature:** see the preliminary pillars and Day Master, with
   an AI interpretation of the chart and your words. Choose Health, Love,
   Family, Career, Study or Wealth.
3. **Your present season & three-month rhythm:** receive a focused reading of
   that area, a dated symbolic opening, three distinct monthly directions,
   an alignment practice and a boundary to keep.

The report structure is preserved; the interpretation now comes from AI
instead of assembled stock paragraphs. English and Chinese are supported.
The 01 / 02 / 03 controls navigate between steps, and completed readings stay
available in the current page's memory. Loading and connection errors are
shown explicitly. A failed AI request is not silently replaced with templates.

The report ends with optional **Save as PDF** and text-download controls.
PDF saving opens the browser's print dialog only when requested; select
**Save as PDF** there. The dedicated print layout includes the full completed
report and method notes. Mobile print support depends on the browser.

## How AI and BaZi work together

The server calculates pillars, hidden stems, ten-god relationships and monthly
anchors using bundled `lunar-javascript` 1.7.7. It supplies those facts, the
visitor's situation and a curated BaZi skill reference to OpenAI. AI interprets
the supplied facts; it does not invent or overwrite the birth chart.

The implementation uses the Responses API with a strict JSON schema, followed
by application validation of sections, dates and distinct monthly copy.
[OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses)
provides schema-constrained responses. The configured default,
[`gpt-4.1-mini`](https://developers.openai.com/api/docs/models/gpt-4.1-mini),
supports the Responses API and Structured Outputs. A server environment
variable can select another compatible model.

The working reference adapts the MIT-licensed
[`jinchenma94/bazi-skill`](https://github.com/jinchenma94/bazi-skill/tree/112a5d84cd1a001a0038cafca3be68d93e4c0cc9).
Its calculation-first workflow, element/polarity relationships and contextual
reading principles are translated into original English instructions. See
[source provenance and licensing](docs/SOURCES.md) for all five repositories
reviewed, what is actually integrated and what is excluded. This release does
not provide live classical-text retrieval or unrelated divination modules.

## Run locally

Use Node.js 22 or newer. There are no npm package dependencies. Python 3 is
needed only for the existing page-structure test.

```sh
git clone --branch feat/ai-readings https://github.com/EllieZhangy/ming-oracle.git
cd ming-oracle
cp .env.example .env
```

Edit the ignored `.env` locally and set `OPENAI_API_KEY`. Keep the key out of
frontend files and GitHub. Then run:

```sh
npm start
```

Open **http://localhost:8787**. The start command loads `.env` if present.
Without a configured key, the frontend still calculates the preliminary
element, but AI generation returns a clear connection error. Opening
`index.html` as a local file does not provide an AI server.

```sh
npm test
npm run build
```

Tests exercise chart boundaries, month logic, motion, request/response
validation, error handling and page structure. Provider calls are mocked;
passing tests does not establish live account access or reading quality.
The build copies only frontend assets to `dist/`; server modules and secrets
are excluded from the static output.

## Privacy and scope

Generating a reading sends birth date, optional time/city, words, area and
language from the browser to the server. The server sends the calculated
chart, city context, words, area and language to OpenAI. Requests use
`store: false`; that setting is not a promise of zero provider retention.
[OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data)
describe the applicable retention policies. The app adds no database,
analytics or persistent reading storage; its reading cache is page memory.
Hosting and provider infrastructure have their own data policies. Optional
Google Fonts requests do not include form contents.

- Dates use the entered civil clock and a midnight day boundary. Unknown time
  provisionally uses noon for the available pillars and omits the hour pillar.
- City is contextual; overseas timezone, daylight saving, local solar-term
  conversion and apparent solar time are not corrected. The chart is preliminary.
- The Day Master element is not a verified dominant or favorable element.
  Visible counts do not establish strength, deficiency or a complete personality.
- Monthly anchors use noon on the 15th of each civil month, with an 18-month
  later horizon and a server UTC report date. Windows suggest times for action
  or observation; they do not establish the date of a future event.
- No major luck cycles, complete strength/favorability assessment, partner
  compatibility or Western natal chart are calculated.
- Health concerns everyday wellbeing; Wealth concerns resource stewardship.
  The app does not diagnose, prescribe or make investment predictions.

The API has a best-effort in-memory limit of eight requests per minute per
visitor and four concurrent generations per warm instance. It is not a global
quota across serverless instances. See the [deployment guide](docs/DEPLOY.md)
for platform controls before broader public use.

## Visual identity

Paper, muted green and gold frame subtle elemental SVG motifs: pine, flame,
mountains, bronze mirror and flowing water. Hover or tap an element to let its
symbol unfold once, then return to the text. Touch, keyboard and reduced-motion
preferences are supported; decorative animation is hidden in print.

The bundled calendar library's MIT notice is in
[`vendor/LICENSE.lunar-javascript`](vendor/LICENSE.lunar-javascript), and the
adapted BaZi skill's MIT notice is in
[`ai/references/bazi-skill.LICENSE`](ai/references/bazi-skill.LICENSE).
