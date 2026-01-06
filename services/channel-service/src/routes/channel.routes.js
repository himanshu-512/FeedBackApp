import express from 'express';
import {
  listChannels,
  createChannel,
  joinChannel
} from '../controllers/channel.controller.js';

const router = express.Router();

router.get('/', listChannels);
router.post('/', createChannel);
router.post('/:id/join', joinChannel);

export default router;
