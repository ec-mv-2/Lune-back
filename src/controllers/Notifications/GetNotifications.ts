import { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel";

export class GetNotifications {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).send({
          success: false,
          message: "User ID is required.",
        });
      }

      const notifications = await NotificationModel.find({
        receiverIds: userId,
      }).sort({ createdAt: -1 });

      return res.status(200).send({
        success: true,
        notifications,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "An error occurred while fetching notifications.",
      });
    }
  }
}
