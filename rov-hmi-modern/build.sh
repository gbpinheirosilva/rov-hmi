#!/bin/bash

# ROV HMI Build Script
# This script builds the Docker image for the ROV HMI application

set -e

echo "🔨 Building ROV HMI Docker Image..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Build the Docker image
print_status "Building Docker image..."
docker build -t rov-hmi:latest .

# Check if build was successful
if [ $? -eq 0 ]; then
    print_success "Docker image built successfully!"
    
    # Show image info
    echo ""
    print_status "Image information:"
    docker images rov-hmi:latest
    
    echo ""
    print_status "To run the container:"
    echo "docker run -d -p 3000:80 --name rov-hmi-app rov-hmi:latest"
    echo ""
    print_status "To test locally:"
    echo "http://localhost:3000"
else
    echo "❌ Build failed. Check the output above for errors."
    exit 1
fi
