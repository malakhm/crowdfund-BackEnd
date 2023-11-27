import Notifications from "../Models/notificationsModel.js";

class notificationsController {
  static async findallNotifcations(req, res) {
    try {
      const Notification = await Notifications.findAll();
      res.status(200).json(Notification);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }

  static async findNotificationsByPk(req, res) {
    try {
      const Notification = await Notifications.findByPk(req.params.id);
      res.status(200).json(Notification);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }
}

export default notificationsController;
