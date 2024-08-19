export const cartSwagger = {
  "/carts/add-book": {
    post: {
      tags: ["Cart"],
      summary: "Add a book to the cart",
      description: "Adds a book to the user's cart. Requires authentication.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AddBookToCartDto",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Book successfully added to the cart",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  bookId: { type: "integer", example: 1 },
                  quantity: { type: "integer", example: 1 },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-01-01T12:00:00Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-01-01T12:00:00Z",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Book not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string", example: "Book not found" },
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to add book to cart",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Failed to add book to cart",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
