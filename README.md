# Flight Booking System - Combined API Documentation

This is the unified API documentation for your Flight Booking Microservices. It combines all your microservice APIs into one simple documentation that **actually works** with your deployed services on Render!

## 🎯 What This Does

- ✅ **One place for all APIs** - All your microservices documented together
- ✅ **Works with deployed services** - Automatically connects to your Render services  
- ✅ **No CORS issues** - Built-in proxy fixes "Failed to fetch" errors
- ✅ **Same UI as your individual docs** - Familiar interface you're already using
- ✅ **Easy to deploy on Render** - Simple one-click deployment
- ✅ **Test APIs directly** - "Try it out" actually calls your live services

## 🏗️ Your Microservices

| Service | Description | 
|---------|-------------|
| **API Gateway** | User authentication & management |
| **Flight Service** | Flights, airplanes, airports, cities |
| **Booking Service** | Flight bookings & payments |
| **Notification Service** | Notifications & tickets |

## 🚀 Deploy on Render (Recommended)

**👉 [See detailed deployment guide](./RENDER_DEPLOY.md)**

### Quick Steps:

1. **Deploy your microservices on Render first**
2. **Create new Web Service on Render for this documentation**
3. **Set environment variables with your service URLs:**
   ```
   API_GATEWAY_URL=https://your-api-gateway.onrender.com
   FLIGHT_SERVICE_URL=https://your-flight-service.onrender.com/api/v1
   BOOKING_SERVICE_URL=https://your-booking-service.onrender.com
   NOTIFICATION_SERVICE_URL=https://your-notification-service.onrender.com/api
   ```
4. **Deploy and test!**

Your documentation will be at: `https://your-docs.onrender.com/api-docs`

## 🏠 Local Development

```bash
npm install
npm start
```

Visit: http://localhost:3001/api-docs

**⚠️ Make sure your microservices are running first:**
- API Gateway on port 3006
- Flight Service on port 5000  
- Booking Service on port 4000
- Notification Service on port 3002

Then test the "Try it out" buttons - they should work without CORS errors!

## 🔍 What You Get

Once deployed, you'll have:

- **📚 Complete API Documentation**: All your microservices in one place
- **🔄 Working API Testing**: "Try it out" buttons that actually call your live services
- **🎯 Simple Interface**: Same clean UI as your individual service docs
- **📱 Mobile Friendly**: Works on all devices
- **🔗 Shareable**: Send one link to frontend developers

## 📞 Need Help?

1. **Deployment Issues**: Check [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)
2. **API Not Responding**: Verify your service URLs in environment variables
3. **CORS Errors**: Make sure your services allow requests from your docs domain

## 📂 Key Files

- `combined-swagger.yaml` - All your API definitions
- `combined-swagger.js` - Simple server (same style as your individual services) 
- `RENDER_DEPLOY.md` - Step-by-step deployment guide

That's it! Keep it simple, deploy on Render, and your documentation will work perfectly with your live services! 🎉