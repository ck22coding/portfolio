#!/usr/bin/env python3
"""Write src/activity.json: per-day activity counts for the two grids on the home page.

  github  contributions per day, from the GitHub GraphQL API through the `gh` CLI
          (uses whatever account `gh` is logged in as; no token is stored here)
  claude  prompts typed per day in Claude Code, from ~/.claude/history.jsonl

Only a date and a count per day are written. No prompts, paths, or project names.
Run: python3 scripts/activity.py
"""
import collections
import datetime
import json
import pathlib
import subprocess

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "activity.json"
HISTORY = pathlib.Path.home() / ".claude" / "history.jsonl"
QUERY = "{viewer{contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}"


def with_levels(days):
    """Add a 0-4 level to each day, splitting the non-zero counts into quartiles."""
    counts = sorted(d["count"] for d in days if d["count"] > 0)
    cuts = [counts[len(counts) * q // 4] for q in (1, 2, 3)] if counts else []
    for d in days:
        d["level"] = 0 if d["count"] == 0 else 1 + sum(d["count"] >= c for c in cuts)
    return days


def github():
    raw = subprocess.run(["gh", "api", "graphql", "-f", f"query={QUERY}"], capture_output=True, text=True, check=True)
    weeks = json.loads(raw.stdout)["data"]["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
    return with_levels([{"date": d["date"], "count": d["contributionCount"]} for w in weeks for d in w["contributionDays"]])


def claude(start, end):
    # history.jsonl has one line per prompt typed. The stats cache is not used: it is
    # built from transcripts, which expire, so it has holes wherever it went unrefreshed.
    by_day = collections.Counter()
    for line in HISTORY.open(errors="ignore"):
        try:
            stamp = json.loads(line).get("timestamp")
        except json.JSONDecodeError:
            continue
        if isinstance(stamp, (int, float)):
            by_day[datetime.datetime.fromtimestamp(stamp / 1000).date().isoformat()] += 1
    first, last = min(by_day), max(by_day)
    # Pad both ends so this grid covers the same dates as the GitHub one.
    by_day.setdefault(start, 0)
    by_day.setdefault(end, 0)
    days = [{"date": k, "count": v} for k, v in sorted(by_day.items()) if start <= k <= end]
    return with_levels(days), max(first, start), last


gh_days = github()
claude_days, claude_since, claude_as_of = claude(gh_days[0]["date"], gh_days[-1]["date"])
OUT.write_text(
    json.dumps(
        {
            "asOf": datetime.date.today().isoformat(),
            "claudeSince": claude_since,
            "claudeAsOf": claude_as_of,
            "github": gh_days,
            "claude": claude_days,
        }
    )
    + "\n"
)
print(f"wrote {OUT}: {len(gh_days)} GitHub days, {len(claude_days)} Claude Code days")
