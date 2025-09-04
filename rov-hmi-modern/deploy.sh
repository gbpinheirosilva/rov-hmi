#!/bin/bash

# ROV HMI Deployment Script
# This script builds and deploys the ROV HMI application using Docker

set -e

echo "🚀 Starting ROV HMI Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down || true

# Remove old images (optional)
if [ "$1" = "--clean" ]; then
    print_status "Cleaning up old images..."
    docker-compose down --rmi all || true
fi

# Build and start the application
print_status "Building and starting ROV HMI application..."
docker-compose up --build -d

# Wait for the application to be ready
print_status "Waiting for application to be ready..."
sleep 10

# Check if the application is running
if docker-compose ps | grep -q "Up"; then
    print_success "ROV HMI application is running successfully!"
    print_status "Application is available at: http://localhost:3000"
    print_status "Health check: http://localhost:3000/health"
    
    # Show container status
    echo ""
    print_status "Container Status:"
    docker-compose ps
    
    # Show logs
    echo ""
    print_status "Recent logs:"
    docker-compose logs --tail=20
else
    print_error "Failed to start the application. Check logs with: docker-compose logs"
    exit 1
fi

echo ""
print_success "Deployment completed successfully! 🎉"
print_status "To view logs: docker-compose logs -f"
print_status "To stop: docker-compose down"
print_status "To restart: docker-compose restart"
