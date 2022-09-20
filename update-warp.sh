#!/bin/bash

version="1.2.7"

set -e

DIRS=(next node parcel rollup unpkg vite webpack4 webpack5 "$@")
for i in "${!DIRS[@]}";
do
  DIRS[i]="$PWD/${DIRS[i]}"
done

while IFS='' read -r line; do
  echo "Installing dependencies for $line"
  (cd "$line" \
   && tmp=$(mktemp) \
   && jq --arg version "$version" '.dependencies."warp-contracts"=$version' package.json > "$tmp" \
   && mv "$tmp" package.json \
   && yarn
  )
done < <(
  find "${DIRS[@]}" -iname 'package.json' ! -path '*/node_modules/*' ! -path '*/.next/*' -exec dirname {} \;
)

git commit -a -m "skynet: warp-contracts lib update to $version" && git push origin HEAD