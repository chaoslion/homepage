FROM node:26-trixie

RUN apt-get update && apt-get install -y --no-install-recommends python3 rsync fzf graphviz git-lfs
RUN npm install -g pnpm@latest-12 @fontsource-variable/geist @fontsource-variable/space-grotesk

USER node
ENV PATH="/home/node/.local/bin:${PATH}"
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN uv tool install rust-just
RUN mkdir -p ~/.local/share/fonts /tmp/fonts
COPY fonts/*.zip /tmp/fonts/
RUN \
    cd /tmp/fonts && \
    for f in *.zip; do unzip -q "$f" -d "${f%.zip}"; done && \
    find /tmp/fonts -name *.ttf -exec cp -t ~/.local/share/fonts/ {} + && \
    cd - && \
    rm -rf /tmp/fonts && \
    fc-cache -f
