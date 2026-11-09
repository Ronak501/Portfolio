# Idea Discussion Agent

An autonomous agent that keeps a GitHub repository's Discussions alive:

- **Seed** — every Monday it reads the repo's open issues and the last two weeks of
  commits, picks up to three themes worth arguing about, and opens a discussion for
  each so contributors have somewhere to pitch.
- **Review** — when someone posts an idea in a discussion, the agent answers within a
  minute with a first-pass review: a verdict, a score out of 100, overlaps with
  existing discussions and issues, the files the idea would touch (checked against the
  real file tree, never invented), and the questions the author still needs to answer.

Everything runs on GitHub Actions with the workflow's own `GITHUB_TOKEN` — no bot account,
no server, nothing to host. Reviews use whichever LLM key you add as a repository secret
(OpenAI, Groq, Gemini or Sarvam); with no key at all the agent still runs on its built-in
rule-based reviewer. The script is Python standard library only — nothing is installed at
run time.

---

## One-time setup (2 minutes)

1. **Enable Discussions** — *Settings → General → Features → Discussions*.
   The agent checks this and exits cleanly if it is off.
2. **Create an `Ideas` category** — *Discussions → ✏️ (edit categories) → New category*,
   format **Open**. If you would rather keep the default categories, set
   `category_name` in `config.json` to whichever one you want (the agent falls back to
   the first non-Announcements category).
3. **Allow the token to write** — *Settings → Actions → General → Workflow permissions*:
   keep "Read repository contents" and let the workflow request `discussions: write`
   (already declared in the workflow file). No further change is usually needed.
4. **Run it once by hand** — *Actions → Idea Discussion Agent → Run workflow*, tick
   `dry_run` first to see what it would post.

That's it. After the first manual run it runs itself weekly and on every new idea.

---

## Files

```
.github/workflows/idea-agent.yml     the schedule, permissions and triggers
.github/idea-agent/agent.py          the agent (stdlib only)
.github/idea-agent/config.json       knobs
.github/idea-agent/README.md         this file
```

---

## How a review is produced

For each new comment in a discussion:

1. Collects context: the thread title and body, the idea text (up to 4 000 chars), the
   titles of other discussions and open issues, and the repository's file tree.
2. Asks the configured model for a strict JSON verdict — verdict, score, strengths,
   concerns, overlaps, relevant files, next steps, open questions.
3. **Validates the answer before posting**: any file path that is not in the real tree
   is dropped, HTML-comment markers are neutralised, list lengths are capped.
4. Replies in-thread with a `### Idea review` comment.

If no model is configured, or the call fails (rate limit, bad key, provider outage), the
agent falls back to a rule-based review — keyword overlap for duplicates, filename
matching for code location, length and specificity for the score. Less sharp, still
useful, and the workflow never fails because of a model outage.

### Choosing a model provider

GitHub Models was retired on 30 July 2026 (the endpoint still answers `200 OK` with an
empty body), so the agent speaks plain OpenAI-compatible chat-completions to whichever
key it finds. Add **one** of these as a repository secret — *Settings → Secrets and
variables → Actions → New repository secret* — and the next run picks it up:

| Secret | Provider | Default model | Notes |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | OpenAI | `gpt-4o-mini` | sharpest reviews, cheapest of the good ones |
| `GROQ_API_KEY` | Groq | `llama-3.3-70b-versatile` | free tier, very fast |
| `GEMINI_API_KEY` | Google AI Studio | `gemini-2.0-flash` | free tier |
| `SARVAM_API_KEY` | Sarvam AI | `sarvam-m` | good for Indic-language threads |

Precedence is the order above. To pin one provider instead of auto-detecting, set
`model.provider` in `config.json` (`openai`, `groq`, `gemini`, `sarvam`, or any other
value for a custom endpoint) and, for a custom endpoint, `model.base_url`,
`model.api_key_env` and `model.name`.

Not sure why the model is quiet? *Actions → Idea Discussion Agent → Run workflow* with
**diagnose** ticked prints the endpoint, whether the key is visible, and the raw reply.

Every posted comment ends with an invisible `<!-- idea-agent:review:<id> -->` marker, so
a comment is never reviewed twice, even across re-runs. Seeded discussions carry a
`<!-- idea-agent:seed:<hash> -->` marker and a title check, so re-running never
duplicates a thread.

---

## Triggers

| Trigger | What runs |
| --- | --- |
| `schedule` — Mondays 03:30 UTC (09:00 IST) | seed + sweep recent discussions for unreviewed ideas |
| `discussion_comment` (created) | review that one comment |
| `workflow_dispatch` | whatever `mode` you pick: `both`, `seed`, `review` |

Run it on demand:

```bash
gh workflow run idea-agent.yml -f mode=seed -f max_topics=2
gh workflow run idea-agent.yml -f mode=review -f dry_run=true
```

---

## Config (`config.json`)

| Key | Default | Meaning |
| --- | --- | --- |
| `category_name` | `Ideas` | Discussion category for seeded topics |
| `max_topics_per_run` | `3` | Cap on discussions opened per run |
| `lookback_days` | `14` | Window of commits considered when seeding |
| `min_comment_chars` | `40` | Shorter comments ("+1", "nice") are not reviewed |
| `review.enabled` | `true` | Turn the review half off entirely |
| `review.max_reviews_per_run` | `10` | Model calls per run |
| `review.lookback_days` | `45` | How far back the weekly sweep looks |
| `model.enabled` | `true` | `false` = always use the rule-based reviewer |
| `model.provider` | `auto` | `openai` / `groq` / `gemini` / `sarvam` / anything else for custom |
| `model.name` | `""` | Blank = the provider's default; otherwise the model ID |
| `model.fallback_models` | `[]` | Tried in order if the first model fails |
| `model.base_url` | – | Custom OpenAI-compatible endpoint, e.g. `https://host/v1` |
| `model.api_key_env` | `MODEL_API_KEY` | Env var holding the key for a custom endpoint |

Swap `model.name` for a stronger model (`gpt-4o`, `llama-3.3-70b-versatile`) if reviews
feel thin. Cost is your provider's, not GitHub's — one review is a couple of thousand
tokens.

---

## Cost and limits

- One run is a couple of dozen API calls plus 1–10 model calls; well inside the free
  GitHub Models tier for a small repo.
- The agent writes **only** discussion comments and discussions. It never touches code,
  issues, PRs or repo settings, and it requests no write permission beyond
  `discussions: write`.
- `concurrency` prevents two runs from overlapping.

---

## Security notes

- Comment text is treated as data, never as instructions: the system prompt says so and
  the code never executes anything it reads.
- Model output is untrusted too: file paths are checked against the real tree, markers
  are stripped, text is length-capped and escaped before it lands in a comment.
- The token is the ephemeral `GITHUB_TOKEN`; nothing is stored in the repo.
- Comments shorter than `min_comment_chars`, comments by bots, and comments carrying an
  agent marker are skipped — so the agent cannot loop on itself.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Workflow exits with "Discussions are disabled" | Enable Discussions in repo settings |
| "no discussion category available" | Create the `Ideas` category, or set `category_name` |
| No reviews appear | Check `min_comment_chars`; check the run summary for model errors |
| "Resource not accessible by integration" | Settings → Actions → General → Workflow permissions |
| Reviews are bland | Rule-based fallback is running — run the workflow with **diagnose** ticked |
| `! no model key set` in the log | Add one provider secret (table above) |

---

## Turning it off

Delete `.github/workflows/idea-agent.yml` (keeps everything else), or set
`"enabled": false` on `review` and `max_topics_per_run: 0` to silence it without
removing the code.
