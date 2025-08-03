# 🚀 How to Deploy Combined API Documentation on Render

This guide will help you deploy the combined swagger documentation on Render so it works with your deployed microservices.

## 📋 Step-by-Step Deployment

### 1. Deploy Your Microservices First

Make sure all your microservices are deployed on Render first:
- API Gateway
- Flight Service  
- Booking Service
- Notification Service

Note down their URLs (they'll look like `https://your-service-name.onrender.com`)

### 2. Deploy Documentation Service

1. **Create New Web Service on Render**
   - Connect your GitHub repository
   - Choose "Web Service"
   - Root Directory: Leave empty (or the path where these files are)

2. **Configure Build & Deploy Settings**
   ```
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables**
   
   Add these environment variables in Render dashboard:
   
   ```
   PORT=3001
   NODE_ENV=production
   API_GATEWAY_URL=https://your-api-gateway.onrender.com
   FLIGHT_SERVICE_URL=https://your-flight-service.onrender.com/api/v1
   BOOKING_SERVICE_URL=https://your-booking-service.onrender.com
   NOTIFICATION_SERVICE_URL=https://your-notification-service.onrender.com/api
   ```
   
   **⚠️ IMPORTANT**: Replace the URLs above with your actual Render service URLs!

### 3. Test the Deployment

Once deployed, your documentation will be available at:
- **📚 Documentation**: `https://your-docs-service.onrender.com/api-docs`
- **🏠 Overview**: `https://your-docs-service.onrender.com/`
- **❤️ Health Check**: `https://your-docs-service.onrender.com/health`

### 4. Verify API Calls Work

1. Open your documentation URL
2. Try any API endpoint using "Try it out"
3. The requests should now go to your deployed services instead of localhost!

## 🔧 Example Configuration

If your services are deployed like this:
- API Gateway: `https://flight-api-gateway.onrender.com`
- Flight Service: `https://flight-service-api.onrender.com`
- Booking Service: `https://flight-booking-api.onrender.com`
- Notification Service: `https://flight-notifications.onrender.com`

Your environment variables should be:
```
API_GATEWAY_URL=https://flight-api-gateway.onrender.com
FLIGHT_SERVICE_URL=https://flight-service-api.onrender.com/api/v1
BOOKING_SERVICE_URL=https://flight-booking-api.onrender.com
NOTIFICATION_SERVICE_URL=https://flight-notifications.onrender.com/api
```

## 🎯 What This Fixes

- ✅ **CORS Issues Solved** - Uses proxy to avoid cross-origin problems
- ✅ **API calls work locally and deployed** - No more "Failed to fetch" errors
- ✅ **Same simple UI** as your individual service docs
- ✅ **Automatic proxy configuration** based on environment
- ✅ **Health checks** show proxy targets and status
- ✅ **Simple deployment process**

## 🔄 How the Proxy Works

The documentation server acts as a proxy:
- Your browser makes requests to the docs server (same origin, no CORS)
- Docs server forwards requests to your actual microservices
- Responses are sent back through the docs server
- All CORS headers are handled automatically

## 🐛 Troubleshooting

**Problem**: "Failed to fetch" errors
**Solution**: The proxy should fix this automatically. Check health endpoint to verify proxy configuration.

**Problem**: API calls still go to localhost
**Solution**: Make sure you've set the environment variables correctly in Render

**Problem**: Service shows as down
**Solution**: Check if your microservice URLs are correct and accessible

**Problem**: 502 Service Unavailable
**Solution**: One of your microservices is not running or the URL is incorrect. Check the service logs and environment variables.

**Problem**: Proxy not working
**Solution**: 
1. Check `/health` endpoint to see proxy configuration
2. Verify your environment variables are set correctly
3. Make sure your microservices are accessible from the docs server

## 📞 Quick Test

After deployment, visit your health endpoint to see if all service URLs are configured correctly:
`https://your-docs-service.onrender.com/health`

It should show all your service URLs.