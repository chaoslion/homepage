init:
    cp -av /workspace/content/deploy/ /home/node/.ssh
    chmod 0600 /home/node/.ssh/key
    test -d node_modules || pnpm install
    pnpm exec astro telemetry disable
    uv sync

go:
    pnpm exec astro dev --host 0.0.0.0

check:
    pnpm exec astro check
