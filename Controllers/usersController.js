import Users from '../Models/usersModel.js'
import sequelize from '../Config/connection.js';
import { Op, where } from "sequelize"

import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
class UsersController {
  // get all users
  static async getAllUsers(req, res) {
    try {
      const getAll = await Users.findAll({where: {
        confirmedByAdmin: true
      }});
      res.status(200).json({
        data: getAll,
        status: 200,
        success: true,
        message: "All users found!",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // get one user
  static async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const getUser = await Users.findOne({ where: { id: id } });
      res.status(200).json(getUser);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

    // create a new user
    static async createUser(req, res) {
        const { username,
            password,
            first_name,
            last_name,
            email,
            dob,
            gender,
            phone_number,
            isDonor,
            isCreator,
            confirmedByAdmin } = req.body;

        // check if user already exists
        const oldUser = await Users.findOne({ where: {username:username}});
        if (oldUser) return res.status(409).json("user already exists!!");
        try {
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
                res.status(422).json({ message: 'Invalid password' })
                return

            }
            else {
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUser = await Users.create(
                {
                    username,
                    password: hashedPassword,
                    first_name,
                    last_name,
                    email,
                    dob,
                    gender,
                    phone_number,
                    isDonor,
                    isCreator,
                    confirmedByAdmin
                }
            );
          
        

            res.status(200).json(createUser);


        }
        catch (err) {
            res.status(500).json({
                data: null,
                status: 500,
                success: false,
                message: err.message
            });
        }
    }


  // update/edit a user

  static async editUser(req, res) {
    const { id } = req.params;
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      dob,
      gender,
      phone_number,
      isDonor,
      isCreator,
      confirmedByAdmin,
    } = req.body;
    try {
      const updateUsers = await Users.update(
        {
          username,
          password,
          first_name,
          last_name,
          email,
          dob,
          gender,
          phone_number,
          isDonor,
          isCreator,
          confirmedByAdmin,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ message: `user updated successfullyyyyy!!!` });
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // delete a user

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Users.destroy({ where: { id: id } });
      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // get users by username

  static async getByUsername(req, res) {
    const { username } = req.params;
    try {
      const getUser = await Users.findOne({ where: { username: username } });
      res.status(200).json(getUser);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // get all accepted Donors
  static async getDonors(req, res) {
    try {
      const donorUsers = await Users.findAll({
        where: {
          isDonor: 1,
          confirmedByAdmin: 1,
        },
      });

      if (donorUsers.length === 0) {
        return res.status(404).json({ error: "No donor was found!" });
      }

      // Send the list of donor users as a response
      return res.status(200).json(donorUsers);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // getCreators
  static async getCreators(req, res) {
    try {
      const creatorUsers = await Users.findAll({
        where: {
          isCreator: 1,
          confirmedByAdmin: 1,
        },
      });

      if (creatorUsers.length === 0) {
        return res.status(404).json({ error: "No creator was found!" });
      }

      // Send the list of donor users as a response
      return res.status(200).json(creatorUsers);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
  // getPending

  static async getPending(req, res) {
    try {
      const getUser = await Users.findAll({
        where: {
          confirmedByAdmin: 0,
        },
      });
      res.status(200).json(getUser);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }

  // Accept a user
  static async acceptUser(req, res) {
    const { id } = req.params;

    try {
      const acceptUser = await Users.update(
        {
          confirmedByAdmin: 1,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json(acceptUser);
    } catch (err) {
      res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: err.message,
      });
    }
  }
}

export default UsersController;
