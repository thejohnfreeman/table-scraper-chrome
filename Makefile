INSTALL_DIR ?= ~/shared/table-scraper

install:
	rsync --archive --delete . $(INSTALL_DIR)
