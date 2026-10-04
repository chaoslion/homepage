posts := "content/blog/posts"

generate:
    export FZF_DEFAULT_OPTS="--bind 'ctrl-a:select-all'" \
    && find {{ posts }} -type f -name "assets.py" -print0 \
    | fzf -m --read0 --print0 \
    | xargs -0 -r -n 1 uv run python

generate-all:
    find {{ posts }} -type f -name "assets.py" -print0 | xargs -0 -r -n 1 uv run python

push:
    uv run site-assets push

pull:
    uv run site-assets pull --extract .

upscale-osci:
    #!/bin/bash
    readonly OSCI_WIDTH=320
    readonly OSCI_HEIGHT=234
    readonly OSCI_WIDTH_TWICE=640
    readonly OSCI_HEIGHT_TWICE=469

    function find_images() {
        local width="$1"
        local height="$2"
        find "{{ posts }}" -type f ! -name "*-original.png" -iname "*.png" -exec identify -format "%w %h %i\n" {} + | awk -v w="$width" -v h="$height" '$1==w && $2==h {print $3}'
    }

    function upscale_image() {
        local image="$1"
        local image_original="${image::-4}-original.png"
        mv "${image}" "${image_original}"
        magick "${image_original}" -filter Point -resize 1280x960 "${image}"
        echo "processed ${image}"
    }

    for image in $(find_images "${OSCI_WIDTH}" "${OSCI_HEIGHT}"); do
        upscale_image "${image}"
    done

    for image in $(find_images "${OSCI_WIDTH_TWICE}" "${OSCI_HEIGHT_TWICE}"); do
        upscale_image "${image}"
    done
