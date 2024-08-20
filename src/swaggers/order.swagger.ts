export const orderSwagger = {
  components: {
    schemas: {
      Order: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "The auto-generated ID of the order",
            example: 1,
          },
          userId: {
            type: "integer",
            description: "The ID of the user who placed the order",
            example: 1,
          },
          items: {
            type: "array",
            description: "The list of items in the order",
            items: {
              type: "object",
              properties: {
                bookId: {
                  type: "integer",
                  description: "The ID of the book in the order",
                  example: 1,
                },
                quantity: {
                  type: "integer",
                  description: "The quantity of the book in the order",
                  example: 2,
                },
              },
            },
          },
          totalPrice: {
            type: "number",
            description: "The total price of the order",
            example: 29.99,
          },
        },
        required: ["userId", "items", "totalPrice"],
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/orders": {
      get: {
        summary: "Get all orders",
        tags: ["Orders"],
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "string",
            },
            description: "The page number for pagination",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "string",
            },
            description: "The number of items per page",
          },
          {
            in: "query",
            name: "sortBy",
            schema: {
              type: "string",
            },
            description: "The field to sort by",
          },
          {
            in: "query",
            name: "order",
            schema: {
              type: "string",
              enum: ["ASC", "DESC"],
            },
            description: "The order of sorting",
          },
        ],
        responses: {
          "200": {
            description: "A list of orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
          },
          "500": {
            description: "Failed to fetch orders",
          },
        },
      },
      post: {
        summary: "Create a new order",
        tags: ["Orders"],
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
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "The order was created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "500": {
            description: "Failed to create order",
          },
        },
      },
    },
    "/orders/checkout": {
      post: {
        tags: ["Order"],
        security: [{ BearerAuth: [] }],
        summary: "Checkout cart",
        description: "Checkout the user's cart",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "CheckoutCartDto",
            required: true,
            schema: {
              $ref: "#/definitions/CheckoutCartDto",
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful checkout",
          },
          "400": {
            description: "Validation error",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/orders/{id}": {
      get: {
        summary: "Get an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The ID of the order",
          },
        ],
        responses: {
          "200": {
            description: "An order object",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "404": {
            description: "Order not found",
          },
          "500": {
            description: "Failed to fetch order",
          },
        },
      },
      put: {
        summary: "Update an order by ID",
        tags: ["Orders"],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The ID of the order",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The order was updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "404": {
            description: "Order not found",
          },
          "500": {
            description: "Failed to update order",
          },
        },
      },
      delete: {
        summary: "Delete an order by ID",
        tags: ["Orders"],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The ID of the order",
          },
        ],
        responses: {
          "204": {
            description: "The order was deleted successfully",
          },
          "500": {
            description: "Failed to delete order",
          },
        },
      },
    },
  },
};
