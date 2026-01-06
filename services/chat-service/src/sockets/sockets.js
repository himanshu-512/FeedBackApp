import Message from '../models/Message.js';

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChannel', ({ channelId }) => {
      socket.join(channelId);
      console.log(`Socket ${socket.id} joined channel ${channelId}`);
    });

    socket.on('sendMessage', async (data) => {
      const { channelId, userId, username, text } = data;

      if (!channelId || !userId || !text) return;

      const message = await Message.create({
        channelId,
        userId,
        username,
        text
      });

      io.to(channelId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default chatSocket;
