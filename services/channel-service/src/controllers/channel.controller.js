import Channel from '../models/Channel.model.js';

// GET /channels
export const listChannels = async (req, res) => {
  const channels = await Channel.find().sort({ createdAt: -1 });
  res.json(channels);
};

// POST /channels
export const createChannel = async (req, res) => {
  const { name } = req.body;
  const userId = req.headers['x-user-id'];

  if (!name) {
    return res.status(400).json({ message: 'Channel name required' });
  }

  const channel = await Channel.create({
    name,
    createdBy: userId,
    members: [userId]
  });

  res.status(201).json(channel);
};

// POST /channels/:id/join
export const joinChannel = async (req, res) => {
  const channelId = req.params.id;
  const userId = req.headers['x-user-id'];

  const channel = await Channel.findById(channelId);

  if (!channel) {
    return res.status(404).json({ message: 'Channel not found' });
  }

  if (!channel.members.includes(userId)) {
    channel.members.push(userId);
    await channel.save();
  }

  res.json({ message: 'Joined channel successfully' });
};
