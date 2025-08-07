

# 🚀 NASA Explorer – Deployment Guide

This document explains how to deploy the **NASA Explorer** project in production using **Vercel** (frontend) and **Render/Fly.io** (backend), along with Docker and GitHub Actions CI/CD.

---

## 1. Frontend Deployment (Vercel)

**Tech stack:** React + Vite

1. Create a **Vercel account** (if you don’t have one).
2. Connect your **GitHub repository**.
3. Select the `frontend/` folder as the project root.
4. Configure environment variables:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
5. Trigger deployment:
   - On push to `main`, Vercel will auto-deploy.
   - Or deploy manually from the Vercel dashboard.

✅ **Frontend URL Example:**
`https://nasa-explorer.vercel.app`

---

## 2. Backend Deployment (Render or Fly.io)

**Tech stack:** Node.js + Express

### Option 1: Render
1. Create a **Render account** and connect your **GitHub repository**.
2. Add a **Web Service**:
   - Root directory: `backend/`
   - Build command: `npm install && npm run build || echo "No build step"`
   - Start command: `npm start`
3. Add environment variables:
   - `NASA_API_KEY=YOUR_KEY`
   - `PORT=5000` (Render automatically assigns `$PORT`)
4. Render will provide a public URL like:
   `https://nasa-backend.onrender.com`

### Option 2: Fly.io (Docker-based)
1. Install Fly CLI: `brew install flyctl` (macOS)
2. Run `fly launch` from `backend/` folder.
3. Use provided `Dockerfile.backend` for the image.
4. Configure environment variables in Fly dashboard.
5. Deploy:
   ```bash
   fly deploy
   ```

✅ **Backend URL Example:**
`https://nasa-backend.fly.dev`

---

## 3. Docker Deployment (Local or Production Server)

### Local Development
```bash
docker-compose up --build
```
Services:
- `http://localhost:3000` → frontend
- `http://localhost:5000` → backend
- `localhost:6379` → Redis cache

### Production with Docker
1. Copy `.env` to production server.
2. Use the same `docker-compose.yml` or separate prod configuration.
3. Configure reverse proxy (e.g., **NGINX**) for HTTPS.

---

## 4. GitHub Actions CI/CD

The project includes `.github/workflows/ci.yml` which:

1. Installs dependencies
2. Runs lint and tests
3. Builds frontend & backend
4. Provides placeholders for:
   - **Frontend deploy to Vercel**
   - **Backend deploy to Render/Fly.io**

**Tip:** Replace placeholder deploy steps with real commands or GitHub Actions marketplace integrations:
- [Vercel Action](https://github.com/marketplace/actions/vercel-action)
- [Render Deploy Action](https://github.com/marketplace/actions/render-deploy-action)

---

## 5. Checklist Before Production

- [ ] All environment variables set on Vercel/Render/Fly
- [ ] `.env` file excluded from repository (`.gitignore`)
- [ ] SSL configured (Vercel and Render provide it by default)
- [ ] Tests passing on CI/CD
- [ ] GitHub Actions auto-deploy works

---

With this setup, **NASA Explorer** is ready for production deployment with automated CI/CD 🚀

# 🚀 Production Deployment & Testing Guide

## Testing `docker-compose.prod.yml` on a Clean Server

This guide provides step-by-step instructions for testing the production Docker Compose setup on a clean server.

---

## 📋 Prerequisites

### Server Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 10GB+ free space
- **Network**: Internet access for pulling images

### Required Environment Variables
```bash
NASA_API_KEY=your_nasa_api_key_here
```

---

## 🔧 Server Setup

### 1. Install Docker & Docker Compose

**Ubuntu/Debian:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes
exit
# SSH back to server
```

**CentOS/RHEL:**
```bash
# Install Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Verify Installation
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker
docker run hello-world
```

---

## 🚀 Deployment Testing

### 1. Clone Repository
```bash
# Clone the project
git clone https://github.com/your-username/nasa-explorer.git
cd nasa-explorer

# Check out the correct branch/tag
git checkout main
```

### 2. Configure Environment
```bash
# Create environment file
cat > .env << EOF
NASA_API_KEY=DEMO_KEY
NODE_ENV=production
EOF

# Verify environment file
cat .env
```

### 3. Build and Start Services
```bash
# Navigate to infra directory
cd infra

# Build and start all services
docker-compose -f docker-compose.prod.yml up --build -d

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

### 4. Monitor Startup Process
```bash
# Watch logs for all services
docker-compose -f docker-compose.prod.yml logs -f

# Or watch specific service logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f redis
```

---

## 🧪 Testing Checklist

### 1. Service Health Checks

**Check Container Status:**
```bash
# Verify all containers are running
docker ps

# Expected output:
# nasa-backend-prod    Up
# nasa-frontend-prod    Up
# nasa-redis-prod       Up
```

**Check Service Logs:**
```bash
# Backend logs
docker logs nasa-backend-prod

# Frontend logs
docker logs nasa-frontend-prod

# Redis logs
docker logs nasa-redis-prod
```

### 2. Network Connectivity

**Test Internal Network:**
```bash
# Check if containers can communicate
docker exec nasa-frontend-prod ping backend
docker exec nasa-frontend-prod ping redis
```

**Test Port Exposure:**
```bash
# Check if ports are exposed
netstat -tlnp | grep :80
netstat -tlnp | grep :5000
```

### 3. API Endpoint Testing

**Test Backend API:**
```bash
# Health check
curl http://localhost:5000/health

# APOD endpoint
curl http://localhost:5000/api/apod

# Mars endpoint
curl http://localhost:5000/api/mars?sol=1000

# NeoWs endpoint
curl http://localhost:5000/api/neows?start_date=2025-01-01&end_date=2025-01-07
```

**Test Frontend (via Nginx):**
```bash
# Frontend homepage
curl http://localhost:80

# API proxy through Nginx
curl http://localhost:80/api/apod
```

### 4. Frontend Functionality

**Browser Testing:**
```bash
# Open browser and navigate to:
http://your-server-ip

# Test the following features:
# ✅ Homepage loads
# ✅ Navigation works
# ✅ APOD gallery loads
# ✅ Mars Rover photos load
# ✅ NeoWs data loads
# ✅ 3D visualization works
```

### 5. Performance Testing

**Load Testing:**
```bash
# Install Apache Bench (if not available)
sudo apt install apache2-utils  # Ubuntu/Debian
sudo yum install httpd-tools    # CentOS/RHEL

# Test API performance
ab -n 100 -c 10 http://localhost:5000/api/apod

# Test frontend performance
ab -n 100 -c 10 http://localhost:80/
```

**Resource Usage:**
```bash
# Monitor resource usage
docker stats

# Check disk usage
docker system df
```

---

## 🔍 Troubleshooting

### Common Issues

**1. Port Already in Use:**
```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :5000

# Stop conflicting services
sudo systemctl stop apache2  # if Apache is running
sudo systemctl stop nginx    # if Nginx is running
```

**2. Permission Issues:**
```bash
# Fix Docker permissions
sudo chown $USER:$USER /var/run/docker.sock

# Or restart Docker service
sudo systemctl restart docker
```

**3. Build Failures:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose -f docker-compose.prod.yml build --no-cache
```

**4. Network Issues:**
```bash
# Check Docker networks
docker network ls

# Inspect network
docker network inspect nasa-explorer_nasa_network
```

### Debug Commands

**Container Debugging:**
```bash
# Enter running container
docker exec -it nasa-backend-prod sh
docker exec -it nasa-frontend-prod sh

# Check container environment
docker exec nasa-backend-prod env
```

**Log Analysis:**
```bash
# Search for errors in logs
docker-compose -f docker-compose.prod.yml logs | grep -i error
docker-compose -f docker-compose.prod.yml logs | grep -i fail
```

---

## 📊 Monitoring & Maintenance

### 1. Health Monitoring
```bash
# Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash
echo "=== NASA Explorer Health Check ==="
echo "Date: $(date)"

# Check containers
echo "Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check API endpoints
echo "API Health:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health
echo " - Backend Health"

curl -s -o /dev/null -w "%{http_code}" http://localhost:80/
echo " - Frontend"

# Check resource usage
echo "Resource Usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
EOF

chmod +x health-check.sh
./health-check.sh
```

### 2. Backup Strategy
```bash
# Backup environment configuration
cp .env .env.backup.$(date +%Y%m%d)

# Backup Docker volumes (if any)
docker run --rm -v nasa-explorer_redis_data:/data -v $(pwd):/backup alpine tar czf /backup/redis-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### 3. Update Process
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d

# Verify update
./health-check.sh
```

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ **All containers are running:**
- `nasa-backend-prod` - Status: Up
- `nasa-frontend-prod` - Status: Up
- `nasa-redis-prod` - Status: Up

✅ **API endpoints respond correctly:**
- `GET /health` - Returns 200 OK
- `GET /api/apod` - Returns valid JSON
- `GET /api/mars` - Returns valid JSON
- `GET /api/neows` - Returns valid JSON

✅ **Frontend is accessible:**
- `http://your-server-ip` loads successfully
- All navigation links work
- 3D visualization loads
- Images and data display correctly

✅ **Performance is acceptable:**
- Page load time < 3 seconds
- API response time < 1 second
- No memory leaks or excessive CPU usage

---

## 📝 Post-Deployment Checklist

- [ ] All services are running
- [ ] API endpoints are responding
- [ ] Frontend is accessible
- [ ] 3D visualization works
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Performance is acceptable
- [ ] Logs show no errors
- [ ] Environment variables are set correctly
- [ ] SSL certificate is configured (if needed)
- [ ] Monitoring is set up
- [ ] Backup strategy is in place

---

## 🔒 Security Considerations

### 1. Firewall Configuration
```bash
# Configure UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS (if using SSL)
sudo ufw enable
```

### 2. SSL/TLS Setup (Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 3. Environment Security
```bash
# Use strong NASA API key
# Never commit .env files to version control
# Regularly rotate API keys
# Monitor API usage
```

---

This guide ensures a robust testing and deployment process for the NASA Explorer production environment.