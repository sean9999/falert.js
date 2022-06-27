
build:
	npm run build:all

publish:
	npm run publish

install:
	npm install

clean:
	rm -rf .parcel-cache
	rm -rf ./dist/*
	rm -rf ./node_modules
	rm -f package-lock.json
