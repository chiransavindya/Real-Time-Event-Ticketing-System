import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  cors: {
    origins: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  }
};