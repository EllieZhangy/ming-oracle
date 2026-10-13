# AI skill sources and adaptation

Reviewed on 13 October 2026. Every source below is pinned to a commit so that
the prompt's provenance can be checked independently. Repository source is
reference material; none of its tool instructions are executed by this app.

## The skill that is actually integrated

[jinchenma94/bazi-skill at 112a5d84](https://github.com/jinchenma94/bazi-skill/tree/112a5d84cd1a001a0038cafca3be68d93e4c0cc9)
is MIT licensed, copyright 2025 jinchenma94. We reviewed `SKILL.md`,
`references/wuxing-tables.md`, `references/classical-texts.md` and `LICENSE`.

[`ai/knowledge.mjs`](../ai/knowledge.mjs) contains an original English adaptation
of these specific rules from `SKILL.md` and `references/wuxing-tables.md`:

- Calculate first and use the calculated pillars as the interpretation's
  authority; never let an LLM invent or overwrite a chart.
- Omit the hour pillar when birth time is unknown.
- Read the Day Master in relation to the rest of the chart.
- Determine ten-god categories from element relationships and matching or
  differing yin/yang polarity. Explain them in ordinary language.
- Consider the month branch, hidden-stem roots and supporting configuration;
  a count of visible elements alone does not establish chart strength.
- Give constructive, nonfatalistic interpretations and separate wellbeing
  reflections from diagnoses and resource reflections from investment advice.

The full upstream permission notice is preserved in
[`ai/references/bazi-skill.LICENSE`](../ai/references/bazi-skill.LICENSE).
The runtime reference is sent with each AI generation request. It is therefore
a working integration of suitable skill rules, rather than a decorative link.
`SOURCES` exports machine-readable attribution; `KNOWLEDGE` exports the actual
reference text the server supplies to the model.

We do **not** run the source's `scripts/pai_pan.py` or adopt its late-night
day-boundary convention. Ming Oracle retains the explicitly stated conventions
of its own lunar-library calculation. The model is told about that difference.
We do not adopt source claims that require unavailable calculations: verified
strength, special formations, favorable elements, major luck cycles, spirits
or a list of predicted past events. Fixed percentages for hidden-stem weights
are not used as an objective strength score.

The source's classical-text file was inspected, but its summaries and alleged
quotations are **not** imported into this release. The runtime pack contains
no verified original classical passages and no live retrieval system. The app
must not claim to have searched a classical library or manufacture quotations.

## Other user-supplied repositories reviewed

[FANzR-arch/Numerologist_skills at ea28c3fb](https://github.com/FANzR-arch/Numerologist_skills/tree/ea28c3fb7e808fa74f6b8e7b4c9ac8c8a9d44c39)
was reviewed through its repository tree, `README.md` and `bazi/SKILL.md`.
Its stated scope includes controlled charting workflows across several
divination systems. No license file or GitHub-detected license was present at
the reviewed commit. No source wording, code or Qimen/Ziwei rules are copied
or executed. A public repository is not by itself permission to redistribute.

[Ming-H/yinyuan-skills at b091c886](https://github.com/Ming-H/yinyuan-skills/tree/b091c8861a148b8260dedfbd06fc10daf7f886fc)
was reviewed through its repository tree, `SKILL.md` and
`references/bazi-matching.md`. Its workflows include two-person matching,
fortune sticks and romance-specific modules. No license file or
GitHub-detected license was present at the reviewed commit. None of its
wording, score weights, signs, spouse profiles or poems are imported. Our
love lens is original situation-aware writing; it cannot establish two-person
compatibility from one person's birth information.

[xr843/Master-skill at 56196ef8](https://github.com/xr843/Master-skill/tree/56196ef88a08e3cc633973fcf32113237f7f511b)
was reviewed through its repository tree, `SKILL.md` and `LICENSE`. The license
assigns MIT to named code directories, CC BY 4.0 to original prompt templates,
and CC BY-NC-SA 4.0 to original prebuilt persona/teaching content; third-party
excerpts retain their own rights. This release imports none of that material.
Buddhist teaching personas and its FoJin retrieval are outside this BaZi app's
current scope. We do not imply a Buddhist authority authored the readings.

[voidforall/fengshui.skill at 91762ccd](https://github.com/voidforall/fengshui.skill/tree/91762ccda4ea106260ff43f336df14adf08ae57d)
was reviewed through its repository tree, `README.md` and `SKILL.md`. It needs
house-facing directions, occupancy/construction dates and layout information
for its spatial methods. No license file or GitHub-detected license was
present at the reviewed commit. No persona, flying-star calculations,
date-selection rules or source wording are imported. Ming Oracle does not
collect the inputs needed to claim a fengshui analysis.

These four repositories have `usage: 'reference-only'` in the source manifest.
Their presence in the audit does not mean they are active modules or permitted
citations for an AI-generated BaZi claim.

## What the model may interpret

The server provides calculated Day Master, pillars, hidden stems, ten-god
relationships, visible counts and declared limitations. The model joins those
facts to the user's own free-text situation and selected topic. The monthly
anchors are representative calculations at noon on the 15th of each civil
month; they are not full solar-term monthly forecasts. A later supplied month
can be selected as a symbolic action window, with a stated chart relationship,
without claiming an event is certain to happen.

The AI may write evocative original English or Chinese interpretations and
specific, voluntary practices. It must preserve the distinction between
calculated chart facts, traditional symbolism and user-stated context. No
part of this integration establishes scientifically validated prediction.
