install:
	npm i

start:
	npx vite

start-production:
	vite preview

build:
	npx vite build

analyze-bundle:
	ANALYZE=true npx vite build
	google-chrome dist/stats.html
