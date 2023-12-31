export const jwtFactory = {
  useFactory: async () => ({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    },
  }),
};
