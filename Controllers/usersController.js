import Users from '../Models/usersModel.js'
import sequelize from '../Config/connection.js';
import { Op } from "sequelize"
import bcrypt from 'bcrypt'
class UsersController {
    // get all users
    static async getAllUsers(req, res) {
        try {
            const getAll = await Users.findAll();
            res.status(200).json(
                {
                    data: getAll,
                    status: 200,
                    success: true,
                    message: 'All users found!'
                }
            );
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


    // get one user
    static async getOneUser(req, res) {
        const { id } = req.params;
        try {
            const getUser = await Users.findOne({ where: { id: id } });
            res.status(200).json(getUser);
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
        try {
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
                res.status(403).json({ message: 'Invalid password' })
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
            // Hash the password
        

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
        const
            { username,
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
                    confirmedByAdmin
                },
                {
                    where: { id: id }
                }

            );
            res.status(200).json({ message: `dvdwv${updateUsers}` });

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

    // delete a user

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Users.destroy({ where: { id: id } });
            res.status(200).json(deleted);

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

    // get users by username

    static async getByUsername(req, res) {
        const { username } = req.params;
        try {
            const getUser = await Users.findOne({ where: { username: username } });
            res.status(200).json(getUser);

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

    // get all accepted Donors
    static async getDonors(req, res) {


        try {
            const getUser = await Users.findAll({ where: { isDonor: true } });

            res.status(200).json(getUser);

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

    // getCreators
    static async getCreators(req, res) {

        try {
            const getUser = await Users.findOne({
                where: {
                    [Op.and]: [
                        { isCreator: true },
                        { confirmedByAdmin: true }
                    ]
                }
            });
            res.status(200).json(getUser);

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

    // getPending

    static async getPending(req, res) {

        try {
            const getUser = await Users.findOne({
                where: {
                    [Op.and]: [
                        { isCreator: true },
                        { isDonor: true },
                        { confirmedByAdmin: true }
                    ]
                }
            });
            res.status(200).json(getUser);

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







}

export default UsersController