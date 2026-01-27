import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import { url } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Exam API",
      version: "1.0.0",
      description: "API documentation for Online Exam project",
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'local server',
      },{
        url:'https://resturant-api-one.vercel.app',
        description:'Production server',
      }
    ],
  },
  // Use path.join to create an absolute path to your routes
  apis: [path.join(__dirname, "../routes/*.mjs")], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;