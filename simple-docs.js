const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001;

// Simple CORS fix
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Smart proxy - route to correct services
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3006', // default
  changeOrigin: true,
  router: (req) => {
    const path = req.path;
    
    // API Gateway (port 3006) - User authentication & management
    if (path.startsWith('/api/v1/user')) {
      return 'http://localhost:3006';
    }
    
    // Booking Service (port 4000) - Bookings & payments
    if (path.startsWith('/api/v1/booking')) {
      return 'http://localhost:4000';
    }
    
    // Flight Service (port 5000) - Flights, airplanes, airports, cities, info
    if (path.startsWith('/api/v1/flights') || 
        path.startsWith('/api/v1/airplanes') || 
        path.startsWith('/api/v1/airports') ||
        path.startsWith('/api/v1/cities') ||
        path.startsWith('/api/v1/info')) {
      return 'http://localhost:5000';
    }
    
    // Notification Service (port 3002) - Tickets, notifications  
    if (path.startsWith('/api/v1/ticket') || 
        path.startsWith('/api/v1/info-noti')) {
      return 'http://localhost:3002';
    }
    
    // Default to API Gateway
    return 'http://localhost:3006';
  },
  onError: (err, req, res) => {
    console.log(`❌ Service error for ${req.path}:`, err.message);
    res.status(502).json({ 
      error: 'Service unavailable', 
      path: req.path,
      message: 'Make sure the service is running'
    });
  }
}));

// Complete swagger spec with ALL your APIs
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Flight Booking System - Complete API Collection',
    version: '1.0.0',
    description: 'All your microservice APIs in one place - ready for testing!'
  },
  servers: [
    { url: 'http://localhost:3001', description: 'All Services (Auto-routed)' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    // ===================================
    // API GATEWAY - USER AUTHENTICATION  
    // ===================================
    '/api/v1/user/signup': {
      post: {
        tags: [' Authentication'],
        summary: 'Register New User',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', example: 'password123' }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'User created successfully' },
          '400': { description: 'Bad request' }
        }
      }
    },
    '/api/v1/user/signin': {
      post: {
        tags: [' Authentication'],
        summary: 'User Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { 
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/api/v1/user/role': {
      post: {
        tags: [' Authentication'],
        summary: 'Assign User Role (Admin only)',
        security: [{ bearerAuth: [] }],
        responses: { 
          '200': { description: 'Role assigned' },
          '403': { description: 'Access denied' }
        }
      }
    },
    '/api/v1/user': {
      get: {
        tags: ['User Management'],
        summary: 'Get All Users',
        responses: { '200': { description: 'List of users' } }
      }
    },
    '/api/v1/user/{id}': {
      get: {
        tags: ['User Management'],
        summary: 'Get User by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'User details' },
          '404': { description: 'User not found' }
        }
      }
    },

    // ===================================
    // FLIGHT SERVICE - SYSTEM INFO
    // ===================================
    '/api/v1/info': {
      get: {
        tags: [' System Info'],
        summary: 'Get Flight Service Info',
        responses: { '200': { description: 'Service information' } }
      }
    },

    // ===================================
    // FLIGHT SERVICE - FLIGHTS
    // ===================================
    '/api/v1/flights': {
      get: {
        tags: ['Flights'],
        summary: 'Get All Flights',
        responses: { '200': { description: 'List of all flights' } }
      },
      post: {
        tags: ['Flights'],
        summary: 'Create New Flight',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['flightNumber', 'airplaneId', 'departureAirportId', 'arrivalAirportId', 'departureTime', 'arrivalTime', 'price', 'totalSeats'],
                properties: {
                  flightNumber: { type: 'string', example: 'AI101' },
                  airplaneId: { type: 'integer', example: 1 },
                  departureAirportId: { type: 'string', example: 'DEL' },
                  arrivalAirportId: { type: 'string', example: 'BOM' },
                  departureTime: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00Z' },
                  arrivalTime: { type: 'string', format: 'date-time', example: '2024-01-15T12:30:00Z' },
                  price: { type: 'number', example: 5500.50 },
                  boardingGate: { type: 'string', example: 'A12' },
                  totalSeats: { type: 'integer', example: 180 }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'Flight created successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    },
    '/api/v1/flights/{id}': {
      get: {
        tags: ['Flights'],
        summary: 'Get Flight by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'Flight details' },
          '404': { description: 'Flight not found' }
        }
      }
    },
    '/api/v1/flights/{id}/seats': {
      patch: {
        tags: ['Flights'],
        summary: 'Update Flight Seats',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['seats'],
                properties: {
                  seats: { type: 'integer', example: 150 }
                }
              }
            }
          }
        },
        responses: { 
          '200': { description: 'Seats updated successfully' },
          '404': { description: 'Flight not found' }
        }
      }
    },

    // ===================================
    // FLIGHT SERVICE - AIRPLANES
    // ===================================
    '/api/v1/airplanes': {
      get: {
        tags: ['Airplanes'],
        summary: 'Get All Airplanes',
        responses: { '200': { description: 'List of airplanes' } }
      },
      post: {
        tags: ['Airplanes'],
        summary: 'Create New Airplane',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['modelNumber', 'capacity'],
                properties: {
                  modelNumber: { type: 'string', example: 'Boeing 737-800' },
                  capacity: { type: 'integer', example: 180 }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'Airplane created successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    },
    '/api/v1/airplanes/{id}': {
      get: {
        tags: ['Airplanes'],
        summary: 'Get Airplane by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'Airplane details' },
          '404': { description: 'Airplane not found' }
        }
      },
      delete: {
        tags: ['Airplanes'],
        summary: 'Delete Airplane',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'Airplane deleted successfully' },
          '404': { description: 'Airplane not found' }
        }
      }
    },

    // ===================================
    // FLIGHT SERVICE - AIRPORTS
    // ===================================
    '/api/v1/airports': {
      get: {
        tags: ['Airports'],
        summary: 'Get All Airports',
        responses: { '200': { description: 'List of airports' } }
      },
      post: {
        tags: ['Airports'],
        summary: 'Create New Airport',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'code', 'address', 'cityId'],
                properties: {
                  name: { type: 'string', example: 'Indira Gandhi International Airport' },
                  code: { type: 'string', example: 'DEL' },
                  address: { type: 'string', example: 'New Delhi, India' },
                  cityId: { type: 'integer', example: 1 }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'Airport created successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    },
    '/api/v1/airports/{id}': {
      get: {
        tags: ['Airports'],
        summary: 'Get Airport by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'Airport details' },
          '404': { description: 'Airport not found' }
        }
      },
      delete: {
        tags: ['Airports'],
        summary: 'Delete Airport',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'Airport deleted successfully' },
          '404': { description: 'Airport not found' }
        }
      }
    },

    // ===================================
    // FLIGHT SERVICE - CITIES
    // ===================================
    '/api/v1/cities': {
      post: {
        tags: ['Cities'],
        summary: 'Create New City',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'Mumbai' }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'City created successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    },
    '/api/v1/cities/{id}': {
      delete: {
        tags: ['Cities'],
        summary: 'Delete City',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }
        ],
        responses: { 
          '200': { description: 'City deleted successfully' },
          '404': { description: 'City not found' }
        }
      }
    },

    // ===================================
    // BOOKING SERVICE
    // ===================================
    '/api/v1/booking': {
      post: {
        tags: ['Bookings'],
        summary: 'Create Flight Booking',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['flightId', 'userId', 'status', 'noOfSeats', 'totalCost'],
                properties: {
                  flightId: { type: 'string', example: '1' },
                  userId: { type: 'string', example: '1' },
                  status: { 
                    type: 'string', 
                    enum: ['booked', 'cancelled', 'initiated', 'pending'],
                    example: 'initiated' 
                  },
                  noOfSeats: { type: 'integer', example: 2 },
                  totalCost: { type: 'integer', example: 11000 }
                }
              }
            }
          }
        },
        responses: { 
          '200': { description: 'Booking created successfully' },
          '400': { description: 'Invalid booking data' }
        }
      }
    },
    '/api/v1/booking/payments': {
      post: {
        tags: ['Payments'],
        summary: 'Process Payment',
        parameters: [
          { 
            name: 'x-idempotency-key', 
            in: 'header', 
            required: true, 
            schema: { type: 'string' },
            example: 'payment-unique-key-123',
            description: 'Unique key to ensure idempotent payment'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['totalCost', 'userId', 'bookingId'],
                properties: {
                  totalCost: { type: 'number', example: 11000.50 },
                  userId: { type: 'string', example: '1' },
                  bookingId: { type: 'string', example: 'booking-123' }
                }
              }
            }
          }
        },
        responses: { 
          '200': { description: 'Payment processed successfully' },
          '400': { description: 'Payment failed' }
        }
      }
    },

    // ===================================
    // NOTIFICATION SERVICE
    // ===================================
    '/api/v1/info-noti': {
      get: {
        tags: ['Notifications'],
        summary: 'Get Notification Service Info',
        responses: { '200': { description: 'Service information' } }
      }
    },
    '/api/v1/ticket': {
      post: {
        tags: ['Tickets'],
        summary: 'Create Notification Ticket',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['subject', 'content', 'RecepientEmail'],
                properties: {
                  subject: { type: 'string', example: 'Flight Booking Confirmation' },
                  content: { type: 'string', example: 'Your flight has been successfully booked.' },
                  RecepientEmail: { type: 'string', format: 'email', example: 'customer@example.com' },
                  status: { type: 'string', example: 'pending' }
                }
              }
            }
          }
        },
        responses: { 
          '201': { description: 'Ticket created successfully' },
          '400': { description: 'Bad request' }
        }
      }
    }
  }
};

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Simple docs running - just start your services and test!'
  });
});

// Home
app.get('/', (req, res) => {
  res.json({
    message: 'Flight Booking - Simple API Testing',
    docs: 'http://localhost:3001/docs',
    instructions: [
      '1. Start your microservices on their usual ports',
      '2. Visit /docs to test all APIs',
      '3. All requests automatically route to correct services'
    ]
  });
});

app.listen(PORT, () => {
  console.log('🚀 Flight Booking System - Complete API Documentation');
  console.log('📚 All APIs available at: http://localhost:3001/docs');
  console.log('');
  console.log('🔄 Smart routing configured:');
  console.log('  📍 API Gateway (port 3006): Authentication & User Management');
  console.log('  📍 Flight Service (port 5000): Flights, Airplanes, Airports, Cities');  
  console.log('  📍 Booking Service (port 4000): Bookings & Payments');
  console.log('  📍 Notification Service (port 3002): Tickets & Notifications');
  console.log('');
  console.log('📋 Complete API Collection:');
  console.log('  🔐 Auth: signup, signin, role assignment');
  console.log('  👥 Users: get all users, get user by ID');
  console.log('  ✈️  Flights: create, get all, get by ID, update seats');
  console.log('  🛩️  Airplanes: create, get all, get/delete by ID');
  console.log('  🏢 Airports: create, get all, get/delete by ID');
  console.log('  🏙️  Cities: create, delete by ID');
  console.log('  🎫 Bookings: create flight booking');
  console.log('  💳 Payments: process payment with idempotency');
  console.log('  🎟️  Tickets: create notification tickets');
  console.log('  ℹ️  Info: service status endpoints');
  console.log('');
  console.log('✅ All "Try it out" buttons work - no CORS issues!');
  console.log('🎉 Ready for testing!');
});

module.exports = app;