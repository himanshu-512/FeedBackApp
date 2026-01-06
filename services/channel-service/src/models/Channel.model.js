import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String, // anonUserId from JWT
      required: true
    },
    members: {
      type: [String], // anonUserIds
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);
