#!/usr/bin/env bash
# Tag the current production commit (origin/main) as the next release: v1, v2, ...
# Run after a dev -> main release PR has been merged.
#
#   npm run release:tag
set -euo pipefail

git fetch origin --tags --quiet

last="$(git tag --list 'v[0-9]*' | sed 's/^v//' | sort -n | tail -n 1)"
next="v$(( ${last:-0} + 1 ))"
target="$(git rev-parse origin/main)"

if git tag --points-at "$target" | grep -q '^v[0-9]'; then
  echo "origin/main ($(git rev-parse --short "$target")) is already tagged: $(git tag --points-at "$target" | tr '\n' ' ')"
  exit 0
fi

echo "Will tag origin/main $(git rev-parse --short "$target") as $next:"
git log -1 --format='  %h %s (%an, %ad)' --date=short "$target"
read -r -p "Create and push $next? [y/N] " answer
if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
  echo "Cancelled."
  exit 1
fi

git tag -a "$next" "$target" -m "Release $next"
git push origin "$next"
echo "Pushed $next."
