# 🚀 Quick Production Testing Guide

## Quick testing of `docker-compose.prod.yml` on a clean server

### ⚡ Quick start (5 minutes)

#### 1. Server preparation
```bash
# Install Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes to take effect
exit
# SSH back to server
```

#### 2. Clone and setup
```bash
# Clone the project
git clone https://github.com/your-username/nasa-explorer.git
cd nasa-explorer

# Create .env file
cat > .env << EOF
NASA_API_KEY=DEMO_KEY
NODE_ENV=production
EOF
```

#### 3. Automated testing
```bash
# Run automated test
./scripts/test-production.sh
```

### 🧪 Manual testing

#### Start services
```bash
cd infra
docker-compose -f docker-compose.prod.yml up --build -d
```

#### Check status
```bash
# Check containers
docker ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

#### API testing
```bash
# Health check
curl http://localhost:5000/health

# APOD
curl http://localhost:5000/api/apod

# Mars Rover
curl http://localhost:5000/api/mars?sol=1000

# NeoWs
curl http://localhost:5000/api/neows?start_date=2025-01-01&end_date=2025-01-07
```

#### Frontend testing
```bash
# Check accessibility
curl http://localhost:80

# Open in browser
# http://your-server-ip
```

### ✅ Success criteria

**All containers are running:**
- `nasa-backend-prod` ✅
- `nasa-frontend-prod` ✅
- `nasa-redis-prod` ✅

**API responds:**
- `GET /health` → 200 OK ✅
- `GET /api/apod` → JSON ✅
- `GET /api/mars` → JSON ✅
- `GET /api/neows` → JSON ✅

**Frontend works:**
- Homepage loads ✅
- Navigation works ✅
- 3D visualization works ✅

### 🔧 Troubleshooting

#### Port already in use
```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :5000

# Stop conflicting services
sudo systemctl stop apache2 nginx
```

#### Permission issues
```bash
# Fix Docker permissions
sudo chown $USER:$USER /var/run/docker.sock
sudo systemctl restart docker
```

#### Clean and rebuild
```bash
# Stop everything
docker-compose -f docker-compose.prod.yml down

# Clear cache
docker system prune -a

# Rebuild
docker-compose -f docker-compose.prod.yml up --build -d
```

### 📊 Monitoring

#### Check resources
```bash
# Resource usage
docker stats

# Disk usage
docker system df
```

#### Logs
```bash
# Backend logs
docker logs nasa-backend-prod

# Frontend logs
docker logs nasa-frontend-prod

# Redis logs
docker logs nasa-redis-prod
```

### 🛑 Stop

```bash
# Stop all services
docker-compose -f docker-compose.prod.yml down

# Remove containers and networks
docker-compose -f docker-compose.prod.yml down --remove-orphans
```

---

## 🎯 Result

After successful testing you will have:
- ✅ Working backend on port 5000
- ✅ Working frontend on port 80
- ✅ Working Redis for caching
- ✅ All API endpoints respond
- ✅ 3D visualization works
- ✅ Ready for production deployment

**Testing time:** ~5-10 minutes
**Complexity:** Low
**Result:** Fully working production environment
