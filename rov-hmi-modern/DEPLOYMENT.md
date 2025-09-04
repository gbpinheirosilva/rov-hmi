# ROV HMI Deployment Guide

This guide explains how to deploy the ROV HMI application using Docker in a Proxmox LXC container.

## Prerequisites

### On your Proxmox LXC container:
- Docker installed
- Docker Compose installed
- Port 80 (and optionally 443) available
- At least 1GB RAM and 2GB disk space

### Install Docker on LXC:
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y

# Add user to docker group (optional)
usermod -aG docker $USER
```

## Quick Deployment

### 1. Copy the application to your LXC container:
```bash
# From your local machine, copy the rov-hmi-modern folder to your LXC
scp -r rov-hmi-modern/ root@your-lxc-ip:/opt/
```

### 2. Deploy the application:
```bash
# SSH into your LXC container
ssh root@your-lxc-ip

# Navigate to the application directory
cd /opt/rov-hmi-modern

# Run the deployment script
./deploy.sh
```

### 3. Access the application:
- **Local access**: http://your-lxc-ip:3000
- **Production access**: http://your-lxc-ip (port 80)

## Manual Deployment

### Development/Testing (Port 3000):
```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production (Port 80):
```bash
# Build and start production version
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop
docker-compose -f docker-compose.prod.yml down
```

## Configuration Options

### Environment Variables:
Create a `.env` file to customize settings:
```bash
# .env file
NODE_ENV=production
PORT=80
```

### Custom Ports:
Edit `docker-compose.yml` to change ports:
```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

### SSL/HTTPS Setup:
1. Place SSL certificates in `./ssl/` directory
2. Use `docker-compose.prod.yml` which includes SSL support
3. Update nginx.conf to enable SSL

## Monitoring and Maintenance

### Health Checks:
- **Application health**: http://your-lxc-ip/health
- **Container status**: `docker-compose ps`
- **Logs**: `docker-compose logs -f`

### Updates:
```bash
# Pull latest changes
git pull

# Rebuild and restart
./deploy.sh --clean
```

### Backup:
```bash
# Backup application data
tar -czf rov-hmi-backup-$(date +%Y%m%d).tar.gz .

# Backup Docker volumes
docker run --rm -v rov-hmi-modern_logs:/data -v $(pwd):/backup alpine tar czf /backup/logs-backup.tar.gz -C /data .
```

## Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :80
   
   # Kill the process or change port in docker-compose.yml
   ```

2. **Permission denied**:
   ```bash
   # Make sure deploy script is executable
   chmod +x deploy.sh
   
   # Check Docker permissions
   sudo usermod -aG docker $USER
   ```

3. **Build fails**:
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Application not accessible**:
   ```bash
   # Check container status
   docker-compose ps
   
   # Check logs
   docker-compose logs
   
   # Check firewall
   ufw status
   ```

### Logs Location:
- **Application logs**: `./logs/` directory
- **Docker logs**: `docker-compose logs`
- **Nginx logs**: Inside container at `/var/log/nginx/`

## Security Considerations

### Firewall Setup:
```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

### SSL/TLS:
- Use Let's Encrypt for free SSL certificates
- Configure nginx to redirect HTTP to HTTPS
- Update docker-compose.prod.yml for SSL

### Container Security:
- Run containers as non-root user
- Use specific image tags (not `latest`)
- Regularly update base images
- Scan images for vulnerabilities

## Performance Optimization

### Resource Limits:
Add to docker-compose.yml:
```yaml
services:
  rov-hmi:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

### Caching:
- Static assets are cached for 1 year
- Enable gzip compression
- Use CDN for better performance

## Support

For issues or questions:
1. Check the logs: `docker-compose logs -f`
2. Verify container status: `docker-compose ps`
3. Check health endpoint: http://your-lxc-ip/health
4. Review this deployment guide

## File Structure

```
rov-hmi-modern/
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Development deployment
├── docker-compose.prod.yml    # Production deployment
├── nginx.conf                 # Nginx configuration
├── .dockerignore              # Docker ignore file
├── deploy.sh                  # Deployment script
├── DEPLOYMENT.md              # This file
└── src/                       # React application source
```
