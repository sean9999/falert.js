BUILD_FOLDER=build
REPO=github.com/sean9999/falert.js
NPM="@code_monk/falert"
SEMVER := $$(git tag --sort=-version:refname | head -n 1)

build:
	./build.sh

publish:
	echo npm publish ${NPM}

install:
	./install.sh

clean:
	./reset.sh
