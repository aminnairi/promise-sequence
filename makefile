.PHONY: install test build

DOCKER_COMPOSE_RUN_OPTIONS=--rm

ifeq (${CI},true)
	DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm install

test:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm test

build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run build
