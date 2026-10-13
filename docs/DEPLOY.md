# Deploy Ming Oracle on Vercel

Vercel is the implemented deployment path for the full website and server-side
AI endpoint. GitHub remains the source repository. The frontend and API can
share one Vercel origin, so the browser needs no separate connection setting.
Vercel's [Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js)
support the Web Request/Response handler used in `api/reading.mjs`.

A working deployment needs the owner's Vercel account, an OpenAI API key and model access.
The owner's current deployment serves **`main`** at
[ming-oracle-eta.vercel.app](https://ming-oracle-eta.vercel.app/). Vercel's
Production Branch tracks `main`. The owner's
[environment-variable settings](https://vercel.com/elliezhangy/ming-oracle/settings/environment-variables)
contain the server secret; saving a changed key requires a new deployment.
Real English nature and season generation were tested using fictional inputs.
The earlier browser-only edition is preserved on `legacy-static` and in the
`v0.1.0` release. The existing
[GitHub Pages website](https://elliezhangy.github.io/ming-oracle/) publishes
`legacy-static`, separately from the current `v0.2.0` application on Vercel.

The steps below also explain how to create a separate deployment for a fork.

## Import the repository

1. In Vercel, choose **Add New → Project**, connect GitHub and import
   **EllieZhangy/ming-oracle**.
2. Keep the project root at the repository root. Choose the **Other** framework
   preset and a Node.js runtime of **22 or newer**.
3. Keep the settings provided by `vercel.json`: **Build Command**
   `npm run build`, **Output Directory** `dist`, and a 60-second maximum duration
   for `api/reading.mjs`.
4. Set the Production Branch to **`main`**, add the server variables below, and
   deploy. Feature branches can use the Preview workflow below.

The static build excludes server source and secrets. Vercel separately bundles
the function in the root `api/` directory. Do not change the output directory
to the repository root. These settings follow Vercel's
[build configuration](https://vercel.com/docs/builds/configure-a-build) and
[GitHub integration](https://vercel.com/docs/git/vercel-for-github).

## Production and Preview branches

In **Project Settings → Environments → Production → Branch Tracking**, select
`main`. Commits merged into `main` then use Vercel's normal automatic Production
deployment flow. Scope the production API key to **Production**.

Develop changes on a feature branch and open a pull request against `main`.
Vercel can create a Preview deployment for that branch. A manual deployment is
also available through **Deployments → Create Deployment**, using the feature
branch as the Git reference. Scope a key to **Preview** only if those previews
should generate reports. Test both a nature request and a focused season
request before merging. No merge is needed to test a Preview deployment.

The `legacy-static` branch is an archive and is not a Production or Preview
branch for the current application. The `v0.1.0` and `v0.2.0` tags preserve
released source snapshots; branch updates do not move those tags. See
[Vercel's Git deployment guide](https://vercel.com/docs/git) for branch controls.

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

## Preserve the static GitHub Pages edition

In GitHub **Settings → Pages**, publish from the **`legacy-static`** branch and
the **`/ (root)`** folder. This keeps the existing Pages URL available as the
archived browser-only edition. It uses original rule-based copy, requires no
API key and does not send reading inputs to the Vercel endpoint.

GitHub Pages serves frontend files only. If a separate frontend for the
current application is needed in the future, publish its built static assets
and set its public `config.js` to the verified Vercel **HTTPS origin**:

```js
// Replace this example host with the verified production origin.
window.MING_CONFIG = { apiBase: 'https://your-verified-project.vercel.app' };
```

Use no `/api/reading` suffix or URL path; the client appends the endpoint.
The GitHub Pages origin is already allowed by the backend. For another frontend
origin, add it to `ALLOWED_ORIGINS` and redeploy the backend. Deployment
protection must allow the intended public frontend to reach the production API.
Without that connection, a separately published current-version frontend
cannot generate reports and displays a connection message rather than stock
copy. This configuration is not needed by the archived `legacy-static` edition.

## Troubleshoot a reading

- **AI not connected / 503:** check that `OPENAI_API_KEY` is set for the
  deployment's environment, then redeploy. For a separately hosted current
  frontend, also check `apiBase`; the archived static edition does not use it.
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
  a template report. A parsed report that fails shape or factual-pattern
  validation gets at most one rewrite within the same 45-second request budget.

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
