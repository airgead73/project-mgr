module.exports = {
  PORT: process.env.PORT,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,  
  DB_DEV: process.env.DEV_MONGO_URI,
  DB: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  SESSION_EXP: 86400000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  RATE_LIMIT: 100,
  SALT_ROUNDS: process.env.SALT_ROUNDS,  
  ISDEV: process.env.NODE_ENV === 'development'
};