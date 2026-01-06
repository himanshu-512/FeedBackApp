import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import chatSocket from './sockets/sockets.js';

const app = express();
const server = http.createServer(app);

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'Chat Service running' });
});

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

chatSocket(io);

const PORT = process.env.PORT || 4003;
server.listen(PORT, () => {
  console.log(`Chat Service running on port ${PORT}`);
});
