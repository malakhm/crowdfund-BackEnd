import adminModel from "../Models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config()
class adminController {
  static async createAdmin(req, res) {
    try {
      const { username, password } = req.body
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
        res.status(403).json({ message: 'Weak Password' })
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


  static async SignIn(req, res) {
    const { username, password } = req.body;


        try {
            if (!username || !password)
                return res.status(400).json( //400 means bad request
                    {
                        message: 'username and password are required fields! ',
                    });
            const foundUser = await adminModel.findOne({ where: { username: username } });

            if (!foundUser) {
                return res.status(401).json({ alert: "unauthorized login 1" });; //401 means unauthorized 
            }

            //evaluate password
            const match = await bcrypt.compare(password, foundUser.password);

            if (match) {
                //create JWTs
              
                res.json({ success: `User ${username} is logged in successfully, ${token}` });

            }

            else {
                res.status(401).json({ alert: "unauthorized login" }); //401 means unauthorized
            }
        }
        catch (err) {
            res.status(500)
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

  static async findallAdmins(req, res) {
    try {
      const findAdmins = await adminModel.findAll();
      res.status(200).json(findAdmins);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
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
