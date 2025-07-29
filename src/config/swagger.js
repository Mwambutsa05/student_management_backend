const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Management API',
            version: '1.0.0',
            description: 'API documentation for Student Management System',
        },
        servers: [
            {
                url: 'http://localhost:5001/api',  // Make sure this matches your API base URL
            },
        ],
    },
    apis: ['./src/entities/**/*.js'], // Path to your route files with swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(server) {
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:5000/api-docs');
}

module.exports = setupSwagger;
