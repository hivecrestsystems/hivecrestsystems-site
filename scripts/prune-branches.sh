#!/usr/bin/env bash
# Keep the most recent iteration branches (iter/NN-name) and delete older ones,
# both locally and on origin. main and dev are never touched.
#
#   npm run branches:prune            # dry run: shows what would be deleted
#   npm run branches:prune -- --apply # actually delete
#
# KEEP=3 by default; override with KEEP=5 npm run branches:prune
set -euo pipefail

KEEP="${KEEP:-3}"
APPLY=false
if [[ "${1:-}" == "--apply" ]]; then APPLY=true; fi

git fetch origin --prune --quiet

current="$(git branch --show-current)"

# Iteration branches from local and origin, de-duplicated.
branches="$(
  {
    git for-each-ref --format='%(refname:short)' 'refs/heads/iter/*'
    git for-each-ref --format='%(refname:lstrip=3)' 'refs/remotes/origin/iter/*'
  } | sort -u
)"

if [[ -z "$branches" ]]; then
  echo "No iteration branches found."
  exit 0
fi

# Order by iteration number, newest first. Names must look like iter/NN-something.
ordered="$(
  echo "$branches" | while read -r b; do
    if [[ "$b" =~ ^iter/([0-9]+) ]]; then
      echo "$((10#${BASH_REMATCH[1]})) $b"
    else
      echo "Skipping branch with unexpected name: $b" >&2
    fi
  done | sort -k1,1nr | cut -d' ' -f2
)"

echo "Keeping the ${KEEP} most recent iteration branches:"
echo "$ordered" | head -n "$KEEP" | sed 's/^/  keep    /'

old="$(echo "$ordered" | tail -n +"$((KEEP + 1))")"
if [[ -z "$old" ]]; then
  echo "Nothing to delete."
  exit 0
fi

echo "Older branches:"
for b in $old; do
  note=""
  if git show-ref --verify --quiet "refs/remotes/origin/dev" &&
     ! git merge-base --is-ancestor "$( git rev-parse --verify --quiet "refs/remotes/origin/$b" || git rev-parse "refs/heads/$b" )" origin/dev; then
    note=" (WARNING: not merged into dev)"
  fi
  if [[ "$b" == "$current" ]]; then
    echo "  skip    $b (currently checked out)"
    continue
  fi
  if $APPLY; then
    if git show-ref --verify --quiet "refs/heads/$b"; then git branch -D "$b"; fi
    if git show-ref --verify --quiet "refs/remotes/origin/$b"; then git push origin --delete "$b"; fi
    echo "  deleted $b$note"
  else
    echo "  delete  $b$note"
  fi
done

if ! $APPLY; then
  echo
  echo "Dry run only. Re-run with --apply to delete the branches above."
fi
