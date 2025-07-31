// ==================== IMPORT DEPENDENCIES ====================
console.log('Starting server from index.js');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./src/config/database');
const seedData = require('./src/seeders/seedData');

// ==================== LOAD ENV VARIABLES ====================
dotenv.config({ path: path.join(__dirname, '.env') });

// ==================== CREATE EXPRESS SERVER ====================
const server = express();

// ==================== SECURITY MIDDLEWARE ====================
server.use(helmet());
server.use(cors({
    origin: process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// ==================== RATE LIMITING ====================
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many requests, please try again later'
    }
});
server.use('/api', apiLimiter);

// ==================== LOGGING ====================
server.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ==================== BODY PARSER ====================
server.use(express.json({
    limit: process.env.BODY_LIMIT || '10mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));
server.use(express.urlencoded({
    extended: true,
    limit: process.env.URLENCODED_LIMIT || '10mb'
}));

// ==================== DATABASE INITIALIZATION ====================
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        const syncOptions = {
            alter: process.env.NODE_ENV !== 'production',
            force: process.env.DB_FORCE_SYNC === 'true',
            logging: console.log
        };

        await sequelize.sync(syncOptions);
        console.log(' Database models synchronized');

        await seedData();
        console.log('Database seeding completed');
    } catch (err) {
        console.error('Database initialization failed:', err);
        process.exit(1);
    }
};


console.log('🔄 Loading API routes...');
const apiRoutes = require('./src/app');
server.use('/api', apiRoutes);
console.log('✅ API routes loaded');

// ======= SWAGGER SETUP START =======
const swaggerDocs = require('./src/config/swaggerConfig');
swaggerDocs(server);
// ======= SWAGGER SETUP END =======

// ==================== HEALTH CHECKS ====================
server.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        database: sequelize.authenticate() ? 'CONNECTED' : 'DISCONNECTED',
        timestamp: new Date().toISOString()
    });
});

// ==================== ERROR HANDLING ====================
server.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.stack);

    const errorResponse = {
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production'
                ? 'An unexpected error occurred'
                : err.message,
            ...(process.env.NODE_ENV !== 'production' && {
                stack: err.stack
            })
        }
    };

    res.status(err.status || 500).json(errorResponse);
});

// ==================== SERVER STARTUP ====================
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await initializeDatabase();

    server.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
        console.log(`📍 http://localhost:${PORT}`);
        console.log(`🔗 API Base: /api`);
        console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
        console.log(`👑 Default Admin: mwambutsadaryce@gmail.com / Ineza2005`);
    });
};

startServer();

// ==================== GRACEFUL SHUTDOWN ====================
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
