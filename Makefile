.PHONY: help configure run format

help:
	@echo "Available commands:"
	@echo "  configure - Set up the project by installing dependencies and copying configuration files."
	@echo "  run       - Build and run the project using Docker Compose."
	@echo "  format    - Format backend and frontend code."

configure:
	@echo "Configuring the project..."
	@cd d-ideias-backend && npm install
	@cd d-ideias-frontend && npm install
	@cp contrib/.env.example .env
	@rm -rf .vscode && cp -r contrib/.vscode .vscode
	@echo "Project configured successfully."

run:
	@echo "Running the project..."
	@docker-compose up --build

format:
	@echo "Formatting code..."
	@cd d-ideias-backend && npm run format
	@cd d-ideias-frontend && npm run format
	@echo "Code formatted successfully."

test-backend:
	@echo "Running backend tests..."
	@cd d-ideias-backend && npm run test && npm run test:e2e
	@echo "Backend tests completed."
