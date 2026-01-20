import axios from "axios";
import Message from "../models/message.model.js";

const CHANNEL_SERVICE_URL = "http://localhost:3000";

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("joinChannel", ({ channelId }) => {
      socket.join(channelId);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { channelId, userId, username, text } = data;

        if (!channelId || !userId || !text) return;

        // 🔥 CALL CHANNEL SERVICE (SOURCE OF TRUTH)
        const res = await axios.get(
          `${CHANNEL_SERVICE_URL}/channels/${channelId}/is-member/${userId}`
        );

        if (!res.data.isMember) {
          socket.emit("errorMessage", {
            message: "You must join this channel to chat",
          });
          return;
        }

        // ✅ SAVE MESSAGE
        const message = await Message.create({
          channelId,
          userId,
          username,
          text,
        });

        io.to(channelId).emit("newMessage", message);
      } catch (err) {
        console.log("SEND MESSAGE ERROR:", err.message);
        socket.emit("errorMessage", {
          message: "Message failed",
        });
      }
    });
  });
};

export default chatSocket;
