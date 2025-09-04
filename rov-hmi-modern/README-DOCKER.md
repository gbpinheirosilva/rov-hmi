# 🐳 ROV HMI Docker Deployment

This ROV HMI application is now ready for Docker deployment in your Proxmox LXC container!

## 📁 Files Created

### Docker Configuration:
- `Dockerfile` - Multi-stage build for React app with nginx
- `docker-compose.yml` - Development deployment (port 3000)
- `docker-compose.prod.yml` - Production deployment (port 80)
- `nginx.conf` - Production nginx configuration
- `.dockerignore` - Optimized build context

### Deployment Scripts:
- `deploy.sh` - Automated deployment script
- `build.sh` - Docker image build script
- `DEPLOYMENT.md` - Comprehensive deployment guide

## 🚀 Quick Start for Proxmox LXC

### 1. Prepare your LXC container:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y
```

### 2. Copy application to LXC:
```bash
# From your local machine
scp -r rov-hmi-modern/ root@your-lxc-ip:/opt/
```

### 3. Deploy:
```bash
# SSH into LXC
ssh root@your-lxc-ip

# Navigate to app directory
cd /opt/rov-hmi-modern

# Deploy (development - port 3000)
./deploy.sh

# OR deploy production (port 80)
docker-compose -f docker-compose.prod.yml up --build -d
```

### 4. Access:
- **Development**: http://your-lxc-ip:3000
- **Production**: http://your-lxc-ip

## 🏗️ Build Features

### Multi-stage Docker Build:
- **Stage 1**: Node.js build environment
- **Stage 2**: Nginx production server
- **Optimized**: Small final image (~50MB)

### Production Ready:
- ✅ Nginx with gzip compression
- ✅ Static asset caching (1 year)
- ✅ Security headers
- ✅ Health checks
- ✅ React Router support
- ✅ Error handling

### Performance Optimized:
- ✅ Gzip compression enabled
- ✅ Static assets cached
- ✅ Optimized nginx configuration
- ✅ Health check endpoints

## 🔧 Configuration Options

### Ports:
- **Development**: 3000 → 80 (internal)
- **Production**: 80 → 80 (direct)

### Environment:
- `NODE_ENV=production`
- Health check at `/health`
- Logs in `./logs/` directory

### SSL Support:
- Ready for SSL certificates
- Place certs in `./ssl/` directory
- Use `docker-compose.prod.yml`

## 📊 Monitoring

### Health Checks:
```bash
# Application health
curl http://your-lxc-ip/health

# Container status
docker-compose ps

# View logs
docker-compose logs -f
```

### Logs:
- **Application**: `./logs/` directory
- **Container**: `docker-compose logs`
- **Nginx**: Inside container `/var/log/nginx/`

## 🛠️ Management Commands

### Development:
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up --build -d

# Logs
docker-compose logs -f
```

### Production:
```bash
# Start
docker-compose -f docker-compose.prod.yml up -d

# Stop
docker-compose -f docker-compose.prod.yml down

# Rebuild
docker-compose -f docker-compose.prod.yml up --build -d
```

### Updates:
```bash
# Pull latest code
git pull

# Rebuild and restart
./deploy.sh --clean
```

## 🔒 Security Features

### Built-in Security:
- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Content-Type protection
- ✅ Referrer policy
- ✅ Non-root container execution

### Firewall Setup:
```bash
# Allow necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

## 📈 Performance

### Optimizations:
- **Image Size**: ~50MB (vs ~1GB development)
- **Load Time**: Optimized with gzip and caching
- **Memory**: ~100MB RAM usage
- **CPU**: Minimal overhead

### Resource Limits:
```yaml
# Add to docker-compose.yml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

## 🆘 Troubleshooting

### Common Issues:

1. **Port conflicts**:
   ```bash
   # Check ports
   netstat -tulpn | grep :80
   ```

2. **Permission issues**:
   ```bash
   # Make scripts executable
   chmod +x *.sh
   ```

3. **Build failures**:
   ```bash
   # Clean Docker cache
   docker system prune -a
   ```

4. **Container won't start**:
   ```bash
   # Check logs
   docker-compose logs
   ```

## 📋 Checklist for Deployment

- [ ] Docker installed on LXC
- [ ] Application copied to LXC
- [ ] Ports 80/3000 available
- [ ] Firewall configured
- [ ] SSL certificates (optional)
- [ ] Domain/DNS configured (optional)
- [ ] Monitoring setup (optional)

## 🎯 Next Steps

1. **Deploy to LXC**: Use the scripts provided
2. **Configure DNS**: Point domain to LXC IP
3. **Setup SSL**: Add Let's Encrypt certificates
4. **Monitor**: Set up logging and monitoring
5. **Backup**: Configure automated backups

## 📞 Support

The application is now ready for production deployment! All necessary files and scripts have been created for easy deployment in your Proxmox LXC container.

**Key Files:**
- `deploy.sh` - One-command deployment
- `docker-compose.prod.yml` - Production configuration
- `DEPLOYMENT.md` - Detailed instructions

Happy deploying! 🚀
