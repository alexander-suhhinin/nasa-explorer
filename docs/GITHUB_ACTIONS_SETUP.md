# 🚀 GitHub Actions Setup Guide

## Setting up CI/CD Pipeline for NASA Explorer

This document contains detailed instructions for setting up GitHub Actions to automate the CI/CD pipeline for the NASA Explorer project.

---

## 📋 Workflows Overview

### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
Main workflow for continuous integration and deployment:
- ✅ Lint & Test - code checking and testing
- ✅ Build - application building
- ✅ Security Scan - security scanning
- ✅ Docker Build - Docker image building
- ✅ Deploy to Staging - staging deployment
- ✅ Deploy to Production - production deployment

### 2. **Security & Code Analysis** (`.github/workflows/security.yml`)
Specialized workflow for security:
- ✅ CodeQL Analysis - code vulnerability analysis
- ✅ Dependency Review - dependency checking
- ✅ NPM Security Audit - npm security audit
- ✅ Snyk Security Scan - Snyk scanning
- ✅ Docker Security Scan - Docker image scanning

### 3. **Notifications** (`.github/workflows/notifications.yml`)
CI/CD status notifications:
- ✅ Slack notifications
- ✅ Email notifications
- ✅ Microsoft Teams notifications

### 4. **Status Badges** (`.github/workflows/status-badges.yml`)
Automatic status badge updates in README.

---

## 🔧 Secrets Configuration

### Required Secrets

#### Vercel (Frontend Deployment)
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

#### Render (Backend Deployment)
```bash
RENDER_TOKEN=your_render_token
RENDER_SERVICE_ID=your_render_service_id
```

#### Notifications
```bash
# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Email
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NOTIFICATION_EMAIL=admin@yourcompany.com

# Microsoft Teams
TEAMS_WEBHOOK_URL=https://yourcompany.webhook.office.com/webhookb2/YOUR/TEAMS/WEBHOOK
```

#### Security (optional)
```bash
SNYK_TOKEN=your_snyk_token
```

---

## 📝 Step-by-step Setup

### 1. Vercel Setup

#### Getting Vercel token:
1. Log into [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings → Tokens
3. Create a new token named "NASA Explorer CI/CD"
4. Copy the token

#### Getting Vercel Project ID:
1. In Vercel Dashboard, find your project
2. Go to Settings → General
3. Copy the Project ID

#### Getting Vercel Org ID:
1. In Vercel Dashboard, go to Settings → General
2. Copy the Team ID (this is the Org ID)

### 2. Render Setup

#### Getting Render token:
1. Log into [Render Dashboard](https://dashboard.render.com)
2. Go to Account → API Keys
3. Create a new API key
4. Copy the key

#### Getting Render Service ID:
1. In Render Dashboard, find your service
2. Copy the Service ID from URL or settings

### 3. Slack Notifications Setup

#### Creating Slack Webhook:
1. Go to [Slack API](https://api.slack.com/apps)
2. Create a new app
3. Enable Incoming Webhooks
4. Create a webhook for #deployments channel
5. Copy the webhook URL

### 4. Email Notifications Setup

#### Gmail App Password:
1. Enable 2FA in Google Account
2. Go to Security → App passwords
3. Create a password for "NASA Explorer CI/CD"
4. Use this password in EMAIL_PASSWORD

### 5. Microsoft Teams Setup

#### Creating Teams Webhook:
1. In Teams, go to a channel
2. Click "..." → Connectors
3. Configure Incoming Webhook
4. Copy the webhook URL

---

## 🔐 Adding Secrets to GitHub

### Via GitHub Web Interface:
1. Go to your repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret individually

### Via GitHub CLI:
```bash
# Install GitHub CLI
gh auth login

# Add secrets
gh secret set VERCEL_TOKEN --body "your_vercel_token"
gh secret set VERCEL_ORG_ID --body "your_vercel_org_id"
gh secret set VERCEL_PROJECT_ID --body "your_vercel_project_id"
gh secret set RENDER_TOKEN --body "your_render_token"
gh secret set RENDER_SERVICE_ID --body "your_render_service_id"
gh secret set SLACK_WEBHOOK_URL --body "your_slack_webhook_url"
gh secret set EMAIL_USERNAME --body "your_email@gmail.com"
gh secret set EMAIL_PASSWORD --body "your_app_password"
gh secret set NOTIFICATION_EMAIL --body "admin@yourcompany.com"
gh secret set TEAMS_WEBHOOK_URL --body "your_teams_webhook_url"
```

---

## 🚀 Environment Setup

### Staging Environment
1. In GitHub repository, go to Settings → Environments
2. Create environment "staging"
3. Add protection rules (optional):
   - Required reviewers
   - Wait timer
   - Deployment branches

### Production Environment
1. Create environment "production"
2. Add strict protection rules:
   - Required reviewers (required)
   - Wait timer (recommended 5 minutes)
   - Deployment branches (main only)

---

## 📊 Monitoring and Logs

### Viewing logs:
1. Go to Actions tab in GitHub
2. Select workflow
3. Click on specific job
4. View logs for each step

### Status notifications:
- Slack: automatic notifications in #deployments
- Email: notifications on failures
- Teams: notifications on all completions

---

## 🔧 Troubleshooting

### Common issues:

#### 1. Vercel deployment fails
```bash
# Check:
- VERCEL_TOKEN is valid
- VERCEL_ORG_ID is correct
- VERCEL_PROJECT_ID exists
- Project is connected to repository
```

#### 2. Render deployment fails
```bash
# Check:
- RENDER_TOKEN is valid
- RENDER_SERVICE_ID is correct
- Service is configured for auto-deploy
```

#### 3. Slack notifications not working
```bash
# Check:
- SLACK_WEBHOOK_URL is correct
- Webhook is active
- #deployments channel exists
```

#### 4. Email notifications not working
```bash
# Check:
- EMAIL_USERNAME is correct
- EMAIL_PASSWORD (app password, not regular password)
- 2FA is enabled in Google Account
```

---

## 📈 Metrics and Analytics

### GitHub Actions Analytics:
- Workflow execution time
- Deployment success rate
- Resource usage
- Popular branches

### Performance monitoring:
- Build time
- Test time
- Deployment time
- Failure count

---

## 🎯 Best Practices

### 1. Security
- ✅ Use app passwords for email
- ✅ Regularly rotate tokens
- ✅ Limit token permissions
- ✅ Use environments for production

### 2. Performance
- ✅ Cache dependencies
- ✅ Use matrix builds for parallelization
- ✅ Optimize Docker layers
- ✅ Monitor execution time

### 3. Reliability
- ✅ Add retry logic for unstable operations
- ✅ Use conditional deployments
- ✅ Set up rollback strategies
- ✅ Monitor health checks

---

## 🎉 Result

After setup you will have:

✅ **Fully automated CI/CD pipeline**
✅ **Enterprise-level security**
✅ **Real-time notifications**
✅ **Monitoring and analytics**
✅ **Professional deployment process**

**Setup time:** 30-60 minutes
**Complexity:** Medium
**Result:** Production-ready CI/CD system
