# 🚀 Complete Render Deployment Guide

## 📋 What You're Deploying

✅ **API Gateway** (Authentication & User Management)  
✅ **Flight Service** (Flights, Airplanes, Airports, Cities)  
✅ **Booking Service** (Bookings & Payments)  
✅ **Notification Service** (Email & Tickets)  
✅ **Combined API Documentation** (All APIs in one place)  

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Remove Config Files from Git (Security)
```bash
# Add these to your .gitignore
echo "*/config.json" >> .gitignore
echo "*/.env" >> .gitignore
echo "*/config/*.json" >> .gitignore

# Remove any existing config files from git history
git rm --cached */config.json
git rm --cached */.env
git commit -m "Remove sensitive config files"
```

### 1.2 Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## 🌐 Step 2: Deploy on Render

### 2.1 Create Account & Connect GitHub
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your repository

### 2.2 Deploy Using render.yaml
1. Render will automatically detect the `render.yaml` file
2. Click "Apply" to deploy all services
3. Wait for all services to deploy (5-10 minutes)

---

## 🔐 Step 3: Configure Environment Variables

After deployment, you need to set these environment variables manually in Render dashboard:

### 🗄️ Database Configuration (for all services)
```bash
DB_HOST=your-database-host
DB_USER=your-database-username  
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

### 📧 Email Configuration (Notification Service)
```bash
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=your-app-password  # Use Gmail App Password, not regular password
```

### 🐰 RabbitMQ Configuration (if using external)
```bash
RABBIT_MQ_SERVICE=your-rabbitmq-url
```

---

## 🔧 Step 4: Handle Config.json Files

### Option 1: Use Environment Variables (Recommended)

**In your code, replace:**
```javascript
// Old way
const config = require('./config.json');
const dbHost = config.database.host;

// New way  
const dbHost = process.env.DB_HOST || 'localhost';
```

### Option 2: Create Config at Runtime
```javascript
// Create config dynamically from environment variables
const config = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN || '1d'
  },
  email: {
    user: process.env.GMAIL_EMAIL,
    password: process.env.GMAIL_PASSWORD
  }
};
```

---

## 📱 Step 5: Test Your Deployment

### 5.1 Individual Services
After deployment, your services will be available at:
- **API Gateway**: `https://flight-api-gateway.onrender.com`
- **Flight Service**: `https://flight-service.onrender.com`  
- **Booking Service**: `https://flight-booking-service.onrender.com`
- **Notification Service**: `https://flight-notification-service.onrender.com`

### 5.2 Combined API Documentation
- **All APIs**: `https://flight-api-docs.onrender.com/docs`

Test some endpoints using the "Try it out" buttons!

---

## 🛠️ Step 6: Update URLs in Documentation

After deployment, update the server URL in `simple-docs.js`:

```javascript
servers: [
  { 
    url: 'https://flight-api-docs.onrender.com', 
    description: 'All Services (Auto-routed)' 
  }
]
```

---

## 🔍 Troubleshooting

### Service Not Starting?
1. Check logs in Render dashboard
2. Verify environment variables are set
3. Check Dockerfile paths

### Database Connection Issues?
1. Verify DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
2. Check if database allows external connections
3. Use Render's managed PostgreSQL if needed

### API Calls Not Working?
1. Check `/health` endpoint of each service
2. Verify service URLs in environment variables
3. Check CORS settings in your services

### Config.json Issues?
1. Convert all config files to environment variables
2. Never commit sensitive data to git
3. Use Render's environment variable feature

---

## 📋 Environment Variables Checklist

### ✅ API Gateway
- [ ] PORT (auto-set to 3006)
- [ ] NODE_ENV (auto-set to production)  
- [ ] JWT_SECRET_KEY (auto-generated)
- [ ] EXPIRES_IN (auto-set to 1d)
- [ ] DB_HOST (set manually)
- [ ] DB_USER (set manually)
- [ ] DB_PASSWORD (set manually)
- [ ] DB_NAME (set manually)

### ✅ Flight Service  
- [ ] PORT (auto-set to 5000)
- [ ] NODE_ENV (auto-set to production)
- [ ] DB_HOST (set manually)
- [ ] DB_USER (set manually)
- [ ] DB_PASSWORD (set manually)
- [ ] DB_NAME (set manually)

### ✅ Booking Service
- [ ] PORT (auto-set to 4000)
- [ ] NODE_ENV (auto-set to production)
- [ ] FLIGHT_SERVICE (auto-set from Flight Service)
- [ ] USER_SERVICE (auto-set from API Gateway)
- [ ] DB_HOST (set manually)
- [ ] DB_USER (set manually)
- [ ] DB_PASSWORD (set manually)
- [ ] DB_NAME (set manually)
- [ ] RABBIT_MQ_SERVICE (set manually if needed)

### ✅ Notification Service
- [ ] PORT (auto-set to 3002)
- [ ] NODE_ENV (auto-set to production)
- [ ] GMAIL_EMAIL (set manually)
- [ ] GMAIL_PASSWORD (set manually)
- [ ] DB_HOST (set manually)
- [ ] DB_USER (set manually)
- [ ] DB_PASSWORD (set manually)
- [ ] DB_NAME (set manually)
- [ ] RABBIT_MQ_SERVICE (set manually if needed)

### ✅ Documentation Service
- [ ] PORT (auto-set to 3001)
- [ ] NODE_ENV (auto-set to production)
- [ ] API_GATEWAY_URL (auto-set from API Gateway)
- [ ] FLIGHT_SERVICE_URL (auto-set from Flight Service)
- [ ] BOOKING_SERVICE_URL (auto-set from Booking Service)
- [ ] NOTIFICATION_SERVICE_URL (auto-set from Notification Service)

---

## 🎉 Final Result

Once everything is deployed:

🔗 **Your Combined API Documentation**: `https://flight-api-docs.onrender.com/docs`

**All your microservices working together with one simple testing interface!** 🚀