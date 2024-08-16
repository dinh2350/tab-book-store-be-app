export const bookSwagger = {
  "/books": {
    get: {
      tags: ["Book"],
      summary: "Get all books",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "The page number to retrieve",
          required: false,
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          description: "The number of items to retrieve per page",
          required: false,
          schema: {
            type: "integer",
            example: 10,
          },
        },
        {
          name: "sortBy",
          in: "query",
          description: "The column to sort by (e.g., title, author, price)",
          required: false,
          schema: { type: "string", example: "title" },
        },
        {
          name: "order",
          in: "query",
          description:
            "The sorting order (ASC for ascending, DESC for descending)",
          required: false,
          schema: { type: "string", enum: ["ASC", "DESC"], example: "ASC" },
        },
      ],
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
      tags: ["Book"],
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
      tags: ["Book"],
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
      tags: ["Book"],
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
      tags: ["Book"],
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
};
