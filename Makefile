INSTALL_DIR ?= /home/jfreeman/shared/table-scraper

install:
	GIT_WORK_TREE="$(INSTALL_DIR)" git checkout --force
