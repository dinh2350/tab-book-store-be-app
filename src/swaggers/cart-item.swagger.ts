export const cartItemComponent = {
  CartItem: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The auto-generated ID of the cart item",
        example: 1,
      },
      userId: {
        type: "integer",
        description: "The ID of the user who owns the cart item",
        example: 1,
      },
      bookId: {
        type: "integer",
        description: "The ID of the book in the cart item",
        example: 1,
      },
      quantity: {
        type: "integer",
        description: "The quantity of the book in the cart item",
        example: 2,
      },
    },
  },
  CreateCartItemDto: {
    type: "object",
    properties: {
      userId: {
        type: "integer",
        description: "The ID of the user who owns the cart item",
        example: 1,
      },
      bookId: {
        type: "integer",
        description: "The ID of the book to add to the cart",
        example: 1,
      },
      quantity: {
        type: "integer",
        description: "The quantity of the book to add to the cart",
        example: 2,
      },
    },
    required: ["userId", "bookId", "quantity"],
  },
};

export const cartItemPath = {
  "/cart-items": {
    get: {
      summary: "Get all cart items",
      tags: ["CartItems"],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "The page number for pagination",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "The number of items per page",
        },
        {
          name: "sortBy",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
          description: "The field to sort by",
        },
        {
          name: "order",
          in: "query",
          required: false,
          schema: {
            type: "string",
            enum: ["ASC", "DESC"],
          },
          description: "The order of sorting",
        },
      ],
      responses: {
        "200": {
          description: "A list of cart items",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/CartItem",
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to fetch cart items",
        },
      },
    },
    post: {
      summary: "Create a new cart item",
      tags: ["CartItems"],
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
              $ref: "#/components/schemas/CreateCartItemDto",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "The cart item was created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CartItem",
              },
            },
          },
        },
        "500": {
          description: "Failed to create cart item",
        },
      },
    },
  },
  "/cart-items/{id}": {
    get: {
      summary: "Get a cart item by ID",
      tags: ["CartItems"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The ID of the cart item",
        },
      ],
      responses: {
        "200": {
          description: "A cart item",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CartItem",
              },
            },
          },
        },
        "404": {
          description: "Cart item not found",
        },
        "500": {
          description: "Failed to fetch cart item",
        },
      },
    },
    put: {
      summary: "Update a cart item by ID",
      tags: ["CartItems"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The ID of the cart item",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCartItemDto",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "The cart item was updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CartItem",
              },
            },
          },
        },
        "404": {
          description: "Cart item not found",
        },
        "500": {
          description: "Failed to update cart item",
        },
      },
    },
    delete: {
      summary: "Delete a cart item by ID",
      tags: ["CartItems"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The ID of the cart item",
        },
      ],
      responses: {
        "204": {
          description: "The cart item was deleted successfully",
        },
        "500": {
          description: "Failed to delete cart item",
        },
      },
    },
  },
};
