import adminModel from "../Models/adminModel.js";
import bcrypt from "bcrypt";
class adminController {
  static async createAdmin(req, res) {
    try {
      const { username, password } = req.body
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
        res.status(403).json({ message: 'Invalid password' })
        return

    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await adminModel.create({ username, password: hashedPassword });
      res.status(200).json(newAdmin);
    }
    
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }

  static async findallAdmins(req, res) {
    try {
      const findAdmins = await adminModel.findAll();
      res.status(200).json(findAdmins);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }

  static async deleteAdmin(req, res) {
    const { id } = req.params;
    try {
      const admin = await adminModel.findOne({ where: { id: id } });
      if (!admin) {
        res.status(404).json({ error: "No Such Id" });
      } else {
        await admin.destroy();
        res.status(200).json(admin);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  static async findAdminByPk(req, res) {
    try {
      const findAdmin = await adminModel.findByPk(req.params.id);
      res.status(200).json(findAdmin);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }
  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const admin = await adminModel.findOne({ where: { id: id } });

      if (!admin) {
        res.status(404).json({ error: "No Such Id" });
      } else {
        await adminModel.update(req.body, {
          where: { id: id },
        });
        res.status(200).json(admin);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }
}

export default adminController;
