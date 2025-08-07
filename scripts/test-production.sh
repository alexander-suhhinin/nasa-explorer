#!/bin/bash

# NASA Explorer Production Testing Script
# This script automates the testing of docker-compose.prod.yml on a clean server

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="nasa-explorer"
COMPOSE_FILE="infra/docker-compose.prod.yml"
BACKEND_URL="http://localhost:5000"
FRONTEND_URL="http://localhost:80"
HEALTH_ENDPOINT="/health"
API_ENDPOINTS=("/api/apod" "/api/mars?sol=1000" "/api/neows?start_date=2025-01-01&end_date=2025-01-07")

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1

    log "Waiting for $service_name to be ready..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" >/dev/null 2>&1; then
            success "$service_name is ready!"
            return 0
        fi

        log "Attempt $attempt/$max_attempts - $service_name not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done

    error "$service_name failed to start within $((max_attempts * 2)) seconds"
    return 1
}

# Function to test API endpoint
test_api_endpoint() {
    local endpoint=$1
    local url="$BACKEND_URL$endpoint"

    log "Testing API endpoint: $endpoint"

    if curl -s -f "$url" >/dev/null 2>&1; then
        success "API endpoint $endpoint is working"
        return 0
    else
        error "API endpoint $endpoint failed"
        return 1
    fi
}

# Function to test frontend
test_frontend() {
    log "Testing frontend accessibility"

    if curl -s -f "$FRONTEND_URL" >/dev/null 2>&1; then
        success "Frontend is accessible"
        return 0
    else
        error "Frontend is not accessible"
        return 1
    fi
}

# Function to check container health
check_container_health() {
    local container_name=$1

    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container_name.*Up"; then
        success "Container $container_name is running"
        return 0
    else
        error "Container $container_name is not running"
        return 1
    fi
}

# Function to check resource usage
check_resource_usage() {
    log "Checking resource usage..."

    echo "Container Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

    echo -e "\nDisk Usage:"
    docker system df
}

# Main testing function
main() {
    echo -e "${BLUE}🚀 NASA Explorer Production Testing${NC}"
    echo "=================================="

    # Check prerequisites
    log "Checking prerequisites..."

    if ! command_exists docker; then
        error "Docker is not installed"
        exit 1
    fi

    if ! command_exists docker-compose; then
        error "Docker Compose is not installed"
        exit 1
    fi

    if ! command_exists curl; then
        error "curl is not installed"
        exit 1
    fi

    success "All prerequisites are met"

    # Check if we're in the right directory
    if [ ! -f "$COMPOSE_FILE" ]; then
        error "docker-compose.prod.yml not found. Please run this script from the project root."
        exit 1
    fi

    # Check environment file
    if [ ! -f ".env" ]; then
        warning "No .env file found. Creating one with DEMO_KEY..."
        cat > .env << EOF
NASA_API_KEY=DEMO_KEY
NODE_ENV=production
EOF
    fi

    # Stop any existing containers
    log "Stopping any existing containers..."
    docker-compose -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true

    # Build and start services
    log "Building and starting services..."
    docker-compose -f "$COMPOSE_FILE" up --build -d

    # Wait a moment for services to start
    sleep 10

    # Check container status
    log "Checking container status..."
    containers=("nasa-backend-prod" "nasa-frontend-prod" "nasa-redis-prod")

    for container in "${containers[@]}"; do
        check_container_health "$container"
    done

    # Wait for backend to be ready
    wait_for_service "$BACKEND_URL$HEALTH_ENDPOINT" "Backend"

    # Test API endpoints
    log "Testing API endpoints..."
    for endpoint in "${API_ENDPOINTS[@]}"; do
        test_api_endpoint "$endpoint"
    done

    # Test frontend
    test_frontend

    # Check resource usage
    check_resource_usage

    # Show logs summary
    log "Recent logs summary:"
    echo "Backend logs (last 10 lines):"
    docker logs --tail 10 nasa-backend-prod 2>/dev/null || echo "No backend logs available"

    echo -e "\nFrontend logs (last 10 lines):"
    docker logs --tail 10 nasa-frontend-prod 2>/dev/null || echo "No frontend logs available"

    # Final status
    echo -e "\n${GREEN}🎉 Production testing completed!${NC}"
    echo -e "${BLUE}Frontend URL:${NC} $FRONTEND_URL"
    echo -e "${BLUE}Backend URL:${NC} $BACKEND_URL"
    echo -e "${BLUE}Health Check:${NC} $BACKEND_URL$HEALTH_ENDPOINT"

    # Show running containers
    echo -e "\n${BLUE}Running containers:${NC}"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Cleanup function
cleanup() {
    log "Cleaning up..."
    docker-compose -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true
}

# Trap to ensure cleanup on script exit
trap cleanup EXIT

# Run main function
main "$@"
