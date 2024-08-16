export const authSwagger = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SignUpRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "500": {
          description: "Failed to create user",
        },
      },
    },
  },
  "/auth/signin": {
    post: {
      tags: ["Auth"],
      summary: "Sign in a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SignInRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Sign in successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignInResponse",
              },
            },
          },
        },
        "401": {
          description: "Invalid email or password",
        },
        "500": {
          description: "Failed to sign in",
        },
      },
    },
  },
};
