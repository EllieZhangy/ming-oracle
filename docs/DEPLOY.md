# Deploy Ming Oracle on Vercel

Vercel is the implemented deployment path for the full website and server-side
AI endpoint. GitHub remains the source repository. The frontend and API can
share one Vercel origin, so the browser needs no separate connection setting.
Vercel's [Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js)
support the Web Request/Response handler used in `api/reading.mjs`.

This guide does not assert that a live backend already exists. A working
deployment needs the owner's Vercel account, an OpenAI API key and model access.
The AI implementation is currently prepared on **`feat/ai-readings`**. `main`
and the existing GitHub Pages website remain the rule-based version until the
real API smoke test succeeds and the AI branch is merged.

## Import the repository

1. In Vercel, choose **Add New → Project**, connect GitHub and import
   **EllieZhangy/ming-oracle**.
2. Keep the project root at the repository root. Choose the **Other** framework
   preset and a Node.js runtime of **22 or newer**.
3. Keep the settings provided by `vercel.json`: **Build Command**
   `npm run build`, **Output Directory** `dist`, and a 60-second maximum duration
   for `api/reading.mjs`.
4. Add the server variables below, then deploy **`feat/ai-readings`**, using the
   branch procedure below. An import of `main` does not contain the new API.

The static build excludes server source and secrets. Vercel separately bundles
the function in the root `api/` directory. Do not change the output directory
to the repository root. These settings follow Vercel's
[build configuration](https://vercel.com/docs/builds/configure-a-build) and
[GitHub integration](https://vercel.com/docs/git/vercel-for-github).

## Select the AI branch for the first deployment

After connecting the repository, open the project's **Deployments → Create
Deployment** and supply `feat/ai-readings` as the Git reference. With `main`
still the production branch, this is a Preview deployment; scope its API key
to **Preview**. Test the full website there before merging.

To make a separate production AI deployment while keeping GitHub Pages on
`main`, set **Project Settings → Environments → Production → Branch Tracking**
to `feat/ai-readings`, save, and create a deployment from that branch. Scope its
key to **Production**. These controls are described in
[Vercel's Git deployment guide](https://vercel.com/docs/git).

Only after a real nature request and focused season request succeed should the
AI branch be merged. After merging, set Production Branch Tracking back to
`main` if you changed it. Future commits on `main` then use the normal automatic
deployment flow. No merge is needed to test a branch deployment.

## Configure server environment variables

- **`OPENAI_API_KEY` — required:** add the owner's key as a **Secret** environment
  variable for Production. Add a Preview-scoped key only if preview readings
  should work. Enter it in Vercel's dashboard, not a source file or browser code.
- **`OPENAI_MODEL` — optional:** defaults to `gpt-4.1-mini`. An override must
  support the Responses API and strict Structured Outputs with this request
  shape. Availability depends on the OpenAI project. The
  [default model's documentation](https://developers.openai.com/api/docs/models/gpt-4.1-mini)
  confirms the supported endpoint and output feature.
- **`ALLOWED_ORIGINS` — optional:** a comma-separated list of additional frontend
  origins, with protocol and host but no path or trailing slash. The endpoint
  already permits its own origin and `https://elliezhangy.github.io`. Add a
  custom frontend origin if needed.

For example, a custom frontend origin could be `https://oracle.example.com`;
that is an example, not a deployed address. No browser configuration contains
an OpenAI API key.

New or changed environment variables apply on the next deployment. Redeploy
after changing them, as explained by
[Vercel's environment-variable guide](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables).

## Verify the full Vercel website

Leave the public connection file at:

```js
window.MING_CONFIG = { apiBase: '' };
```

An empty value uses `/api/reading` on the website's own origin. Open the
deployment URL Vercel actually returns, enter a test birth date and situation,
and generate the elemental-nature reading. Choose an area and generate the
season report. Confirm that it responds to the specific situation and shows
three different monthly titles and actions. Confirm the end-of-report PDF
button stays optional. A successful static page or deployment build alone is
not verification of live AI generation.

The public website link in the README can be updated to the verified production
URL once both reading stages work and it is ready for visitors. Keep the same
link for phone and desktop;
the website adapts to the screen.

## Keep the GitHub Pages frontend

GitHub Pages serves frontend files only. To use it with the Vercel backend,
first verify the production Vercel deployment above and complete the AI branch
merge when ready to change the Pages website. Then set `config.js` to
that deployment's **HTTPS origin**, commit the public URL and let Pages publish:

```js
// Replace this example host with the verified production origin.
window.MING_CONFIG = { apiBase: 'https://your-verified-project.vercel.app' };
```

Use no `/api/reading` suffix or URL path; the client appends the endpoint.
The GitHub Pages origin is already allowed by the backend. For another frontend
origin, add it to `ALLOWED_ORIGINS` and redeploy the backend. Deployment
protection must allow the intended public frontend to reach the production API.
Until that connection is configured, the Pages version cannot generate AI
readings and displays a connection message rather than stock copy.

## Troubleshoot a reading

- **AI not connected / 503:** check that `OPENAI_API_KEY` is set for the
  deployment's environment, then redeploy. On Pages, also check `apiBase`.
- **Origin not allowed / 403:** use the exact frontend origin in
  `ALLOWED_ORIGINS`. A domain with a page path is not an origin.
- **Provider error / 502:** check the key, API account/model access and provider
  status. The application hides raw provider error bodies and secrets.
- **Busy / 429:** wait before retrying; either the app or provider may be limiting
  requests. The app sends a 60-second retry hint for a 429 response.
- **Timeout / 504:** the provider request is capped at 45 seconds. Retry once
  connectivity is steady; static hosting cannot resolve a backend timeout.
- **Invalid AI output:** the report is rejected if its shape, dates or monthly
  uniqueness checks fail. The UI lets the user retry; it does not substitute
  a template report.

## Data and public usage

The browser sends date, time, city, phrase, area and language to the endpoint.
The server calculates the chart, then sends chart facts, city context, phrase,
area and language to OpenAI. It sets `store: false` and keeps no application
database. Provider and hosting retention policies still apply; see
[OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).
Do not log request bodies or secrets when diagnosing deployment problems.

The in-process limiter permits eight requests per minute per visitor and four
concurrent generations per warm instance. New or parallel instances have
separate counters; this is a best-effort throttle, not a strict global quota
or spending cap. Before a broader launch, configure a platform rule for
`/api/reading` in the [Vercel Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
and appropriate provider spend controls. Platform rate-limit counters also
have regional scope, so review their documented behavior when scaling.

The curated, licensed reference and excluded source modules are documented in
[`SOURCES.md`](SOURCES.md). The backend preserves the app's existing report
sections; it is not a complete BaZi forecasting engine or a classical-text RAG
service.
