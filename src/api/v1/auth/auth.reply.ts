//reply type schema for authentication

export const signinReply = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 1 },
      rememberme: { type: "boolean" },
    },
  },
};
