import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'REST API built with Node.js + Express + TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        variables: {
          port: { default: '3000' },
        },
      },
    ],
  },
  apis: ['./src/presentation/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
