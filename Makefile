start-build:
	docker compose -f docker-compose.dev.yaml build --no-cache
start-up:
	docker compose -f docker-compose.dev.yaml up 
start-down:
	docker compose -f docker-compose.dev.yaml down
start-db:
	docker-compose -f docker-compose.dev.yaml up db


