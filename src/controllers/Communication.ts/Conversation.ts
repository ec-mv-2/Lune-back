import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  ],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, 
  lastMessageAt: { type: Date, default: Date.now }, 
  isRead: { type: Boolean, default: false }, 
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
