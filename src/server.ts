import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { AppDataSource } from "./configs/data-source.config";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { PORT } from "./environment/variable.env";
import { container } from "./configs/inversify.config";
import path from "path";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const server = new InversifyExpressServer(container);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API",
      version: "1.0.0",
    },
    paths: {
      "/books": {
        get: {
          summary: "Get all books",
          responses: {
            "200": {
              description: "A list of books",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new book",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "The created book",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
          },
        },
      },
      "/books/{id}": {
        get: {
          summary: "Get a book by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "The book ID",
            },
          ],
          responses: {
            "200": {
              description: "The book data",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
            "404": {
              description: "Book not found",
            },
          },
        },
        put: {
          summary: "Update a book by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "The book ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The updated book",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
            "404": {
              description: "Book not found",
            },
          },
        },
        delete: {
          summary: "Delete a book by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "The book ID",
            },
          ],
          responses: {
            "204": {
              description: "No Content",
            },
            "500": {
              description: "Failed to delete book",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated ID of the book",
            },
            title: {
              type: "string",
              description: "The title of the book",
            },
            author: {
              type: "string",
              description: "The author of the book",
            },
            publishedDate: {
              type: "string",
              format: "date",
              description: "The date when the book was published",
            },
            // Add other book properties here
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.setConfig((app) => {
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
});

server.setErrorConfig((app) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: "An unexpected error occurred" });
  });
});

AppDataSource.initialize()
  .then(() => {
    const app = server.build();
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
