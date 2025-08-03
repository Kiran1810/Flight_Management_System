# 🎯 Simple API Testing - All Services in One Place

## 🚀 Quick Start

### 1. Install & Run
```bash
npm install
npm start
```

### 2. Visit Your Docs
http://localhost:3001/docs

### 3. Test Your APIs
- All your microservice APIs in one place
- "Try it out" buttons that actually work
- No CORS errors!

## ⚡ Requirements

Just make sure your services are running:
- **API Gateway**: port 3006  
- **Flight Service**: port 5000
- **Booking Service**: port 4000
- **Notification Service**: port 3002

## 🎉 That's It!

The docs automatically route requests to the right services. Just test away!

## 🔍 Complete API Collection

###  Authentication & User Management
- **User Signup** - Register new users
- **User Signin** - Login and get JWT token  
- **Role Assignment** - Assign admin roles (Admin only)
- **Get All Users** - List all registered users
- **Get User by ID** - Get specific user details

### ✈️ Flight Management  
- **Create Flight** - Add new flights to the system
- **Get All Flights** - List all available flights
- **Get Flight by ID** - Get specific flight details
- **Update Flight Seats** - Modify available seat count

### 🛩️ Airplane Management
- **Create Airplane** - Add new airplanes to fleet
- **Get All Airplanes** - List all airplanes
- **Get Airplane by ID** - Get specific airplane details
- **Delete Airplane** - Remove airplane from fleet

### 🏢 Airport Management
- **Create Airport** - Add new airports
- **Get All Airports** - List all airports
- **Get Airport by ID** - Get specific airport details
- **Delete Airport** - Remove airport

### 🏙️ City Management
- **Create City** - Add new cities
- **Delete City** - Remove city by ID

### 🎫 Booking & Payments
- **Create Booking** - Book flights for users
- **Process Payment** - Handle payment with idempotency protection

### 🎟️ Notifications & Tickets
- **Create Notification Ticket** - Send notifications/emails
- **Service Info** - Get service status

### ℹ️ System Information
- **Flight Service Info** - Health check for flight service
- **Notification Service Info** - Health check for notification service

**All with working "Try it out" buttons and proper examples! 🚀**