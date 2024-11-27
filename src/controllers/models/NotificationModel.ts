import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
  message: string;
  receiverIds: mongoose.Types.ObjectId[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  receiverIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);

export default NotificationModel;
