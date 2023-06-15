.PHONY: clean build
install:
	rm -rf pkg src && makepkg -sfi && makepkg --printsrcinfo > .SRCINFO
clean:
	rm -rf pkg src fantasy* fmg*
build:
	rm -rf pkg src && makepkg -sf && makepkg --printsrcinfo > .SRCINFO
get:
	makepkg -g
info:
	makepkg --printsrcinfo > .SRCINFO
