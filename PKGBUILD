# Maintainer: aerian <wo199710@hotmail.com>

pkgname=fantasy-map-generator
_pkgname=fmg
_pkgver=1.8
pkgver=v${_pkgver}
pkgrel=1
pkgdesc="Web application generating interactive and highly customizable maps "
arch=("any")
url="https://github.com/Azgaar/Fantasy-Map-Generator"
license=('MIT')
depends=('electron' libappindicator-gtk3 ffmpeg)
conflicts=(fantasy-map-generator-git)
source=(${_pkgname}-$pkgver.tar.gz::https://codeload.github.com/Azgaar/Fantasy-Map-Generator/tar.gz/refs/tags/$pkgver
        electron.main.js)
sha256sums=('927ba205d4cf13d15446c3c5f1e25026b59f8fb833f0e19ede475ad07344ad6e'
            '7b21b853c45a627c0068a9ad1805cc185e63a541da0ba9fcc99502f95da8301d')

package() {
    name="Fantasy-Map-Generator"
    cp "$srcdir/electron.main.js" "$srcdir/${name}-${_pkgver}/"
    install -d "$pkgdir"/usr/lib
    install -d "$pkgdir"/usr/bin
    install -d "$pkgdir"/usr/share/applications
    install -d "$pkgdir"/usr/share/icons
    cp "$srcdir/${name}-${_pkgver}"/images/favicon-32x32.png "$pkgdir/usr/share/icons/fmg.png"
    cp -R "$srcdir/${name}-${_pkgver}" "$pkgdir"/usr/lib/${pkgname}

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
