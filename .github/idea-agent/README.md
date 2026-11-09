# Idea Discussion Agent

An autonomous agent that keeps a GitHub repository's Discussions alive:

- **Seed** — every Monday it reads the repo's open issues and the last two weeks of
  commits, picks up to three themes worth arguing about, and opens a discussion for
  each so contributors have somewhere to pitch.
- **Review** — when someone posts an idea in a discussion, the agent answers within a
  minute with a first-pass review: a verdict, a score out of 100, overlaps with
  existing discussions and issues, the files the idea would touch (checked against the
  real file tree, never invented), and the questions the author still needs to answer.

Everything runs on GitHub Actions with the workflow's own `GITHUB_TOKEN`. No external
API key, no third-party service, no secrets to rotate. The script is Python standard
library only — nothing is installed at run time.

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
2. Asks GitHub Models (`openai/gpt-4o-mini` by default, `gpt-4.1-mini` as fallback) for
   a strict JSON verdict — verdict, score, strengths, concerns, overlaps, relevant
   files, next steps, open questions.
3. **Validates the answer before posting**: any file path that is not in the real tree
   is dropped, HTML-comment markers are neutralised, list lengths are capped.
4. Replies in-thread with a `### Idea review` comment.

If the model is unavailable (rate limit, org policy, `model.enabled: false`), the agent
falls back to a rule-based review — keyword overlap for duplicates, filename matching
for code location, length and specificity for the score. Less sharp, still useful, and
the workflow never fails because of a model outage.

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
| `model.name` | `openai/gpt-4o-mini` | Any model on GitHub Models |
| `model.fallback_models` | `["openai/gpt-4.1-mini"]` | Tried in order if the first fails |

Change `model.name` to `openai/gpt-4o` or `openai/gpt-4.1` for sharper reviews; the
cost is paid in Actions minutes and GitHub Models quota, not in dollars to a vendor.

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
| Reviews are bland | Rule-based fallback is running — check the model name and the run log |

---

## Turning it off

Delete `.github/workflows/idea-agent.yml` (keeps everything else), or set
`"enabled": false` on `review` and `max_topics_per_run: 0` to silence it without
removing the code.
