import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   
  text: { type: String, required: true },  
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
