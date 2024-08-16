export const userSwagger = {
  "/users": {
    get: {
      tags: ["User"],
      summary: "Get all users",
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
          description:
            "The column to sort by (e.g., username, email, createdDate)",
          required: false,
          schema: { type: "string", example: "username" },
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
          description: "A list of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["User"],
      summary: "Create a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "The created user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
    },
  },
  "/users/{id}": {
    get: {
      tags: ["User"],
      summary: "Get a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The user ID",
        },
      ],
      responses: {
        "200": {
          description: "The user data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "404": {
          description: "User not found",
        },
      },
    },
    put: {
      tags: ["User"],
      summary: "Update a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The user ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "The updated user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "404": {
          description: "User not found",
        },
      },
    },
    delete: {
      tags: ["User"],
      summary: "Delete a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "The user ID",
        },
      ],
      responses: {
        "204": {
          description: "No Content",
        },
        "500": {
          description: "Failed to delete user",
        },
      },
    },
  },
};
