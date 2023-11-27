
import Users from "../Models/usersModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

class authController {

    static async handleLogin(req, res) {
        const { username, password } = req.body;


        try {
            if (!username || !password)
                return res.status(400).json( //400 means bad request
                    {
                        message: 'username and password are required fields! ',
                    });
            const foundUser = await Users.findOne({ where: { username: username } });

            if (!foundUser) {
                return res.status(401).json({ alert: "unauthorized login 1" });; //401 means unauthorized 
            }

            //evaluate password
            const match = await bcrypt.compare(password, foundUser.password);

            if (match) {
                //create JWTs
                // Authenticate user with jwt
                const token = jwt.sign({ id: foundUser.id },
                     process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '1d'});

                res.status(200).send({
                    id: foundUser.id,
                    email: foundUser.username,
                    accessToken: token,
            },);}
            else { console.log("wrong password") }
            }catch (err) {
                return res.status(500).send('Sign in error');


            }


    }}


export default authController