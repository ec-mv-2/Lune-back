import { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel";

export class CreateNotification {
  async handle(req: Request, res: Response) {
    try {
      const { message, receiverIds } = req.body;

      if (!message || !receiverIds || !Array.isArray(receiverIds)) {
        return res.status(400).send({
          success: false,
          message: "Message and receiverIds (array) are required.",
        });
      }

      const notification = await NotificationModel.create({
        message,
        receiverIds,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).send({
        success: true,
        notification,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "An error occurred while creating the notification.",
      });
    }
  }
}
