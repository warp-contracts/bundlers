#!/bin/bash

version="1.0.3"

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
   && jq --arg version "$version" '.dependencies."warp-contracts-plugin-deploy"=$version' package.json > "$tmp" \
   && mv "$tmp" package.json \
   && yarn
  )
done < <(
  find "${DIRS[@]}" -iname 'package.json' ! -path '*/node_modules/*' ! -path '*/.next/*' -exec dirname {} \;
)

yarn install
git commit -a -m "skynet: warp-contracts-plugin-deploy lib update to $version" && git push origin HEAD