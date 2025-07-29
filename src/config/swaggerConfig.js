const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5000;

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
                url: `http://localhost:${PORT}/api`,  // dynamically use port
            },
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
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/**/routes/*.js']  ,
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
}

module.exports = swaggerDocs;
