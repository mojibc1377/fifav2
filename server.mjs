import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('msg', async (message, roomId, challengeId) => {
      const newMessage = {
        text: message.text,
        senderId: message.senderId,
        timestamp: new Date().toISOString(),
      };

      // Save the message in the Challenge object in the database
      await prisma.challenge.update({
        where: { id: Number(challengeId) }, // Ensure the id is converted to a number
        data: {
          messages: {
            push: newMessage, // Add new message to the messages array
          },
        },
      });

      io.to(roomId).emit('message', newMessage);
    });

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });
  });

  // Express middleware for the API route
  server.get('/api/challenges/:id/messages', async (req, res) => {
    const { id } = req.params;



    try {
      const challenge = await prisma.challenge.findUnique({
        where: { id: Number(id) }, // Ensure the id is converted to a number
        select: { messages: true },
      });

      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      return res.status(200).json(challenge.messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.all('*', (req, res) => handle(req, res));

  httpServer.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
