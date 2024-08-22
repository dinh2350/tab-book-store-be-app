export const cartSwagger = {
  path: {
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
    "/carts/detail": {
      get: {
        tags: ["Cart"],
        summary: "Get a cart by ID",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            schema: {
              type: "integer",
            },
            description: "The cart ID",
          },
        ],
        responses: {
          "200": {
            description: "The cart data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/definitions/Cart",
                },
              },
            },
          },
          "404": {
            description: "Book not found",
          },
        },
      },
    },
  },
  definitions: {
    Cart: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
          description: "Unique identifier for the cart",
        },
        createdBy: {
          type: "integer",
          format: "int64",
          description: "ID of the user who created the cart",
        },
        totalPrice: {
          type: "number",
          format: "decimal",
          description: "Total price of all items in the cart",
        },
        status: {
          type: "string",
          enum: ["PENDING", "DONE", "CANCELLED"],
          description: "Status of the cart",
        },
        cartItems: {
          type: "array",
          items: {
            $ref: "#/definitions/CartItem",
          },
          description: "List of items in the cart",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          description: "Timestamp when the cart was created",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          description: "Timestamp when the cart was last updated",
        },
      },
      required: ["createdBy", "totalPrice", "status"],
    },
    CartItem: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
          description: "Unique identifier for the cart item",
        },
        bookId: {
          type: "integer",
          format: "int64",
          description: "ID of the book in the cart item",
        },
        quantity: {
          type: "integer",
          format: "int32",
          description: "Quantity of the book in the cart item",
        },
        price: {
          type: "number",
          format: "decimal",
          description: "Price of the book in the cart item",
        },
      },
      required: ["bookId", "quantity", "price"],
    },
  },
};
