import { authSwagger } from "./auth.swagger";
import { bookSwagger } from "./book.swagger";
import { userSwagger } from "./user.swagger";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated ID of the book",
              example: 1,
            },
            title: {
              type: "string",
              description: "The title of the book",
              maxLength: 30,
              example: "A Great Book",
            },
            image: {
              type: "string",
              description: "The URL of the book's image",
              nullable: true,
              example: "http://example.com/image.jpg",
            },
            category: {
              type: "string",
              enum: ["drama", "comedy", "sport"],
              description: "The category of the book",
              example: "drama",
            },
            quantity: {
              type: "integer",
              description: "The current number of books available in the store",
              example: 10,
            },
            price: {
              type: "number",
              format: "float",
              description: "The price of the book",
              example: 19.99,
            },
            description: {
              type: "string",
              description: "A detailed description of the book",
              nullable: true,
              example: "This is a detailed description of the book.",
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
              description: "The status of the user account",
              example: "ACTIVE",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated ID of the user",
              example: 1,
            },
            username: {
              type: "string",
              description: "The first name of the user",
              example: "John",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "The password of the user",
              example: "password123",
            },
            role: {
              type: "string",
              enum: ["Admin", "User"],
              description: "The role of the role account",
              example: "User",
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
              description: "The status of the user account",
              example: "ACTIVE",
            },
            createdBy: {
              type: "integer",
              description: "The ID of the user who created this user",
              example: 1,
            },
            updatedBy: {
              type: "integer",
              description: "The ID of the user who last updated this user",
              example: 2,
            },
            createdDate: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was created",
              example: "2024-01-01T12:00:00Z",
            },
            updatedDate: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was last updated",
              example: "2024-01-02T12:00:00Z",
            },
          },
        },
        PaginatedBooks: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Book",
              },
            },
            total: {
              type: "integer",
              description: "The total number of books",
              example: 100,
            },
            page: {
              type: "integer",
              description: "The current page number",
              example: 1,
            },
            pageCount: {
              type: "integer",
              description: "The total number of pages",
              example: 10,
            },
          },
        },
        SignInRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "The email of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "The password of the user",
              example: "password123",
            },
          },
        },
        SignInResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT token",
              example: "your_jwt_token",
            },
          },
        },
        SignUpRequest: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "The username of the user",
              example: "John",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "The password of the user",
              example: "password123",
            },
          },
          required: ["username", "email", "password"],
        },
      },
    },
    paths: {
      ...bookSwagger,
      ...userSwagger,
      ...authSwagger,
    },
  },
  apis: [],
};
