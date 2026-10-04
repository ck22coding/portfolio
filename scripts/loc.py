"""Count lines added in commits authored by Carter across local repos.

Run from this Mac (it reads local clones): python3 scripts/loc.py
Writes src/stats.json, which the home page's CountUp reads.
Counts added lines in code files only; skips other people's cloned repos,
lockfiles, build output, and merge commits.
"""
import os, re, subprocess, collections, json, datetime

ROOTS = ["/Users/carterking/Projects", "/Users/carterking/Sandbox", "/Users/carterking/Foundry"]
# clones of other people's projects
SKIP_REPOS = re.compile(r"(codegraph|ai-engineering/curriculum|memory-management/ecc|_references/|canvas-learning-harness)")
SKIP_FILES = re.compile(
    r"(^|/)(node_modules|dist|build|_site|\.next|out|vendor|site_libs|coverage|\.expo|ios/Pods|__pycache__)/"
    r"|(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?|uv\.lock|poetry\.lock|Cargo\.lock)$"
    r"|\.(min\.js|min\.css|map|svg|csv|jsonl|ipynb|lock|snap)$"
)
CODE_EXT = re.compile(r"\.(ts|tsx|js|jsx|mjs|cjs|py|sh|rs|go|sql|css|scss|html|qmd|swift|kt|java|rb|toml|ya?ml)$")
ME = re.compile(r"carterk2102|ck22coding|carter", re.I)

repos = []
for root in ROOTS:
    for d, dirs, _ in os.walk(root):
        if d.count(os.sep) - root.count(os.sep) > 5:
            dirs[:] = []
            continue
        dirs[:] = [x for x in dirs if x not in ("node_modules", "worktrees")]
        if ".git" in os.listdir(d):
            if not SKIP_REPOS.search(d):
                repos.append(d)

seen = set()
authors = collections.Counter()
tot_all = tot_code = commits = 0
per_repo = []
for r in repos:
    out = subprocess.run(
        ["/usr/bin/git", "-C", r, "log", "--all", "--no-merges", "--numstat", "--format=@@%H\t%an\t%ae"],
        capture_output=True, text=True, errors="replace").stdout
    mine = False
    ra = rc = n = 0
    for line in out.splitlines():
        if line.startswith("@@"):
            h, an, ae = line[2:].split("\t")
            authors[f"{an} <{ae}>"] += 1
            mine = bool(ME.search(an + ae)) and h not in seen
            if mine:
                seen.add(h); n += 1
            continue
        if not mine or not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) != 3 or parts[0] == "-":
            continue
        if SKIP_FILES.search(parts[2]):
            continue
        add = int(parts[0])
        ra += add
        if CODE_EXT.search(parts[2]):
            rc += add
    per_repo.append((rc, ra, n, r))
    tot_all += ra; tot_code += rc; commits += n

for rc, ra, n, r in sorted(per_repo, reverse=True):
    print(f"{rc:>9} code  {ra:>9} all  {n:>5} commits  {r}")
print(f"\nTOTAL code-ext lines added: {tot_code}\nTOTAL all text lines added (incl. markdown/json): {tot_all}\ncommits: {commits}  repos: {len(repos)}")
counted = sum(1 for rc, ra, n, r in per_repo if n)
out_path = os.path.join(os.path.dirname(__file__), "..", "src", "stats.json")
with open(out_path, "w") as f:
    json.dump({"linesOfCode": tot_code, "commits": commits, "repos": counted, "asOf": datetime.date.today().isoformat()}, f, indent=2)
    f.write("\n")
print(f"wrote {os.path.normpath(out_path)}")
