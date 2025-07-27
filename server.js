// ==================== IMPORT DEPENDENCIES ====================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const db = require('./src/config/database');  // Sequelize connection
const app = require('./src/app');            // Main app configuration

// ==================== LOAD ENV VARIABLES ====================
dotenv.config({ path: path.join(__dirname, '.env') });

// ==================== CREATE EXPRESS SERVER ====================
const server = express();

// ==================== SECURITY & LOGGING MIDDLEWARE ====================
server.use(helmet());    // Adds security headers
server.use(cors());      // Handles Cross-Origin requests
server.use(morgan('dev'));// Logs HTTP requests

// ==================== BODY PARSER ====================
server.use(express.json({ limit: '10mb' }));  // Parse JSON bodies
server.use(express.urlencoded({ extended: true }));

// ==================== STATIC FILES (OPTIONAL) ====================
// For serving images if you temporarily store uploads before Cloudinary
// server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== CONNECT TO DATABASE ====================
db.authenticate()
    .then(() => {
        console.log('Database connected...');
        // Run migrations or sync models
        return db.sync(); // { force: false } to not drop tables
    })
    .catch((err) => console.error('Database connection error:', err));

// ==================== ROUTES ====================
server.use('/api', app); // Prefix all routes with /api

// ==================== ERROR HANDLING ====================
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
