# Default installation directory is specific to the development environment
# of the primary contributor.
INSTALL_DIR ?= /home/jfreeman/shared/table-scraper

install:
	# Do not use Git because we want to install without first committing.
	rsync --archive --delete --exclude='/.git' --filter=':- .gitignore' --filter=".- ${HOME}/.gitignore" . "${INSTALL_DIR}"
