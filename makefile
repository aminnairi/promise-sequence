# Rules that prevent conflicting with other similar files or folders
.PHONY: install test build publish

# Base options when running docker-compose
DOCKER_COMPOSE_RUN_OPTIONS=--rm

ifeq (${CI},true)
	# Additional options when running docker-compose in GitHub Action
	DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

# Install the project's dependencies
install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm install

# Run the unit tests
test:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm test

# Build the optimized library file
build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run build

# Publish the new library version to the NPM registries
publish:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm publish --access public
