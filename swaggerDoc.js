const swaggerUi =require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router();

const options = {
//swagger문서 설정
    swaggerDefinition: {
        info: {
            title: 'WSS API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'dochoon.com:3000',
        basePath: '/api/'
    },
//swagger api가 존재하는 곳 입니다.
    apis: ['./api/*'],
//securityDefinitions
};

const specs = swaggereJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router
