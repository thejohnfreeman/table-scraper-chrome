# Default installation directory is specific to the development environment
# of the primary contributor.
INSTALL_DIR ?= /home/jfreeman/shared/table-scraper

# Recursively list all of the Git-visible files in the current directory.
# Effectively ignores temporary files and Git objects.
RSYNC_OPTS := --archive --delete --exclude='/.git' --filter=':- .gitignore' --filter=".- ${HOME}/.gitignore"

# Capture the file name from lines like these:
# drwxrwxr-x          4,096 2018/01/20 10:56:24 .
# -rw-rw-r--             14 2018/01/20 10:05:34 .gitignore
# -rw-rw-r--          1,075 2018/01/20 09:54:59 LICENSE
RSYNC_LS_PATTERN := '^[d-][rwx-]{9}\s+\d{1,3}(?:,\d{3})*\s+\d{4}/\d{2}/\d{2}\s+\d{2}:\d{2}:\d{2}\s+(.*)$$'

install:
	# Do not use Git because we want to install without first committing.
	rsync ${RSYNC_OPTS} build/ "${INSTALL_DIR}"

watch:
	while true; do rsync --list-only --exclude='/build' ${RSYNC_OPTS} . | rg ${RSYNC_LS_PATTERN} --replace '$$1' | entr -d bash -c 'npm test && npm run build && make install'; done
