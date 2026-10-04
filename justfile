mod dev "justfile-dev.just"
mod assets "justfile-assets.just"

_default:
    just --choose

build:
    pnpm exec astro build
    pnpm exec rangefind build dist/client --enrich plugins/rangefind/enrich.mjs

preview:
    pnpm exec astro preview --host 0.0.0.0

build-clean:
    rm -rf dist*
    just build

build-deploy: build-clean
    cp package.json dist/package.json
    cd dist && pnpm install --prod && tar -czf ../dist.tar.gz .

deploy:
    uv run site-deploy
