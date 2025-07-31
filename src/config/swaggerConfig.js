const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5001;

// Define file paths
const routeFiles = [
    path.join(__dirname, '../entities/user/userRoutes.js'),
    path.join(__dirname, '../entities/auth/authRoutes.js'),
    path.join(__dirname, '../entities/course/courseRoutes.js'),
    path.join(__dirname, '../entities/enrollment/enrollmentRoutes.js')
];

// Debug: Check if files exist
console.log('🔍 Checking swagger route files:');
const existingFiles = [];
routeFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        console.log(`✅ Found: ${filePath}`);
        existingFiles.push(filePath);
    } else {
        console.log(`❌ Missing: ${filePath}`);
    }
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Management API',
            version: '1.0.0',
            description: 'API documentation for Student Management System with Admin and User authentication',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>'
                },
            },
            schemas: {
                UserRegister: {
                    type: 'object',
                    required: ['fullName', 'email', 'password'],
                    properties: {
                        fullName: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        phoneNumber: { type: 'string', example: '+250788123456' },
                        dateOfBirth: { type: 'string', format: 'date', example: '2000-05-15' },
                        password: { type: 'string', example: 'password123' },
                    },
                },
                UserLogin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', example: 'john@example.com' },
                        password: { type: 'string', example: 'password123' },
                    },
                },
                UserUpdate: {
                    type: 'object',
                    properties: {
                        fullName: { type: 'string', example: 'John Updated' },
                        phoneNumber: { type: 'string', example: '+250788123456' },
                        dateOfBirth: { type: 'string', format: 'date', example: '2001-01-01' },
                    },
                },
                AdminLogin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', example: 'mwambutsadaryce@gmail.com' },
                        password: { type: 'string', example: 'Ineza2005' },
                    },
                },
                AdminRegister: {
                    type: 'object',
                    required: ['fullName', 'email', 'password'],
                    properties: {
                        fullName: { type: 'string', example: 'John Admin' },
                        email: { type: 'string', example: 'admin@example.com' },
                        password: { type: 'string', example: 'adminpassword123' },
                        phoneNumber: { type: 'string', example: '+250788123456' },
                    },
                },
                AdminResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string', example: '1' },
                                        email: { type: 'string', example: 'admin@example.com' },
                                        role: { type: 'string', example: 'admin' },
                                        fullName: { type: 'string', example: 'John Admin' },
                                    },
                                },
                                token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                            },
                        },
                        message: { type: 'string' },
                    },
                },
                Course: {
                    type: 'object',
                    required: ['title', 'description'],
                    properties: {
                        title: { type: 'string', example: 'Introduction to Programming' },
                        description: { type: 'string', example: 'Learn basic programming concepts' },
                        duration: { type: 'number', example: 40 },
                        credits: { type: 'number', example: 3 },
                    },
                },
                Enrollment: {
                    type: 'object',
                    required: ['courseId'],
                    properties: {
                        courseId: { type: 'string', example: '1' },
                        enrollmentDate: { type: 'string', format: 'date', example: '2024-01-15' },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string', example: '1' },
                                        fullName: { type: 'string', example: 'John Doe' },
                                        email: { type: 'string', example: 'john@example.com' },
                                        role: { type: 'string', example: 'user' },
                                    },
                                },
                                token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                            },
                        },
                        message: { type: 'string' },
                    },
                },
            },
        },
        // Removed global security - only apply to specific routes that need it
    },
    // Use only files that actually exist
    apis: existingFiles.length > 0 ? existingFiles : [
        // Fallback patterns
        './src/entities/**/*Routes.js',
        './src/entities/**/*routes.js'
    ],
};

const swaggerSpec = swaggerJsdoc(options);

// Debug output
console.log('📚 Swagger schemas loaded:', Object.keys(swaggerSpec.components?.schemas || {}));
console.log('🛣️  Swagger paths loaded:', Object.keys(swaggerSpec.paths || {}));

function swaggerDocs(app) {
    const swaggerOptions = {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true, // Keep token after page refresh
            authAction: {
                bearerAuth: {
                    name: 'bearerAuth',
                    schema: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    },
                    value: 'Bearer <your_token_here>'
                }
            }
        },
        customCss: `
            .swagger-ui .topbar { display: none; }
            .swagger-ui .auth-wrapper { margin-bottom: 20px; }
            .swagger-ui .btn.authorize { 
                background-color: #49cc90; 
                border-color: #49cc90; 
            }
            .swagger-ui .btn.authorize:hover { 
                background-color: #3ba372; 
                border-color: #3ba372; 
            }
            .swagger-ui .info .title { color: #2c3e50; }
            .swagger-ui .info .description { color: #34495e; }
        `,
        customSiteTitle: "Student Management API - Admin & User Authentication"
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
    console.log(`🔐 Click the "Authorize" button in Swagger to add your JWT token`);
    console.log(`👑 Default Admin: ${swaggerSpec.components?.schemas?.AdminLogin?.properties?.email?.example} / ${swaggerSpec.components?.schemas?.AdminLogin?.properties?.password?.example}`);
}

module.exports = swaggerDocs;