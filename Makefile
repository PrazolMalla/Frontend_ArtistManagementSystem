
# For Development
dev-build:
	docker compose -f docker-compose.dev.yaml build
dev-up:
	docker compose -f docker-compose.dev.yaml up 
dev-down:
	docker compose -f docker-compose.dev.yaml down
dev-db:
	docker-compose -f docker-compose.dev.yaml up db


# For Production
prod-build:
	docker compose -f docker-compose.production.yaml build
prod-up:
	docker compose -f docker-compose.production.yaml up
prod-down:
	docker compose -f docker-compose.production.yaml down
prod-db:
	docker-compose -f docker-compose.production.yaml up db
