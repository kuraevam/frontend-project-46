# Makefile
install:
	npm install

run:
	node src/index.js

gendiff:
	node ./bin/gendiff.js

lint:
	npm run lint
