# Maintainer: aerian <wo199710@hotmail.com>

pkgname=fantasy-map-generator-git
_pkgname=fmg
_pkgver=1.8
pkgver=r1354.c74d38ea
pkgrel=1
pkgdesc="Web application generating interactive and highly customizable maps "
arch=("any")
url="https://github.com/Azgaar/Fantasy-Map-Generator"
license=('MIT')
depends=('electron' libappindicator-gtk3 ffmpeg)
conflicts=(fantasy-map-generator)
source=(git+https://github.com/Azgaar/Fantasy-Map-Generator
        electron.main.js)
sha256sums=('SKIP'
            '7b21b853c45a627c0068a9ad1805cc185e63a541da0ba9fcc99502f95da8301d')
_name="Fantasy-Map-Generator"

pkgver() {
  cd "${_name}"
  ( set -o pipefail
    git describe --long 2>/dev/null | sed 's/\([^-]*-g\)/r\1/;s/-/./g' ||
    printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
  )
}

package() {
    cp "$srcdir/electron.main.js" "$srcdir/${_name}"
    install -d "$pkgdir"/usr/lib
    install -d "$pkgdir"/usr/bin
    install -d "$pkgdir"/usr/share/applications
    install -d "$pkgdir"/usr/share/icons
    cp "$srcdir/${_name}"/images/icons/favicon-32x32.png "$pkgdir/usr/share/icons/fmg.png"
    cp -R "$srcdir/${_name}" "$pkgdir"/usr/lib/${pkgname}

    echo "#!/bin/env bash
NODE_ENV=""
cd /usr/lib/${pkgname}
electron electron.main.js" >> "$pkgdir/usr/bin/${_pkgname}"

    echo "[Desktop Entry]
Type=Application
Icon=fmg
Categories=Utility;Graphics;
MimeType=
Exec=fmg
Name=Fantasy Map Generator
Keywords=map;generator;fantasy;fmg;
Terminal=false
SingleMainWindow=true" >> "$pkgdir"/usr/share/applications/$pkgname.desktop
    chmod +x "$pkgdir/usr/bin/${_pkgname}"
    rm -rf "$pkgdir"/usr/lib/${pkgname}/.git
}
