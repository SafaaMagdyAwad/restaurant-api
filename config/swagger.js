import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Resturant API",
      version: "1.0.0",
      description: "API documentation for Online Exam project",
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'local server',
      },{
        url:'https://restaurant-api-henna.vercel.app/',
        description:'Production server',
      }
    ],
  },
  // Use path.join to create an absolute path to your routes
  apis: [path.join(__dirname, "../routes/*.mjs")], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;