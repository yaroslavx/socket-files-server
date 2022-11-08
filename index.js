import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';
import mongoose from 'mongoose';
import router from './api/routes.js';
import cors from 'cors';

const app = express();
const PORT = 4000;

await mongoose.connect(
  'mongodb+srv://admin:8h2iLrLNDi0OWt6x@cluster0.vle5lvv.mongodb.net/?retryWrites=true&w=majority'
);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get('/', (req, res) => {
  //   res.json({ data: 'hello from api' });
  res.sendFile(__dirname + '/index.html');
});

app.use('/', router);

io.on('connection', sockets);

httpServer.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});
