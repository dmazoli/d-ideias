.PHONY: help configure run format test-backend test-frontend migration-generate

help:
	@echo "Available commands:"
	@echo "  configure 		- Set up the project by installing dependencies and copying configuration files."
	@echo "  run       		- Build and run the project using Docker Compose."
	@echo "  format    		- Format backend and frontend code."
	@echo "  test-backend		- Run backend unit and e2e tests."
	@echo "  test-frontend		- Run frontend tests."
	@echo "  migration-generate NAME=<name> - Generate backend migration file."

configure:
	@echo "Configuring the project..."
	@cd d-ideias-backend && npm install
	@cd d-ideias-frontend && npm install
	@cp contrib/.env.example .env
	@rm -rf .vscode && cp -r contrib/.vscode .vscode
	@echo "Project configured successfully."

run:
	@echo "Running the project..."
	@docker compose up

format:
	@echo "Formatting code..."
	@cd d-ideias-backend && npm run format
	@cd d-ideias-frontend && npm run format
	@echo "Code formatted successfully."

test-backend:
	@echo "Running backend tests..."
	@cd d-ideias-backend && npm run test && npm run test:e2e
	@echo "Backend tests completed."

test-frontend:
	@echo "Running frontend tests..."
	@cd d-ideias-frontend && npm run test
	@echo "Frontend tests completed."

migration-generate:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make migration-generate NAME=<MigrationName>"; \
		exit 1; \
	fi
	@echo "Generating backend migration: $(NAME)..."
	@cd d-ideias-backend && npm run migration:generate -- src/infrastructure/migrations/$(NAME)
	@echo "Migration generated successfully."
