const dotenv = require('dotenv')

dotenv.config();

const config = {
  PORT: process.env.PORT || 5010,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/calc',
  JWT_SECRET: process.env.JWT_SECRET || 'f8@#vP*r2D8z!9S^5+Ll#3zD*p$@Fj%9',
};

module.exports = config;