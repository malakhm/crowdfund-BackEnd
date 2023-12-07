
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
            if (match && foundUser.confirmedByAdmin) {
                //create JWTs

                // Authenticate user with jwt
                const token = jwt.sign(
                    { 
                        id: foundUser.id ,
                        isDonor: foundUser.isDonor,
                        isCreator: foundUser.isCreator
                    },
                     process.env.ACCESS_TOKEN_SECRET, 
                    {expiresIn: '1d'});

                res.status(200).send({
                    id: foundUser.id,
                    username: foundUser.username,
                    first_name: foundUser.first_name,
                    last_name:foundUser.last_name,
                    email:foundUser.email,
                    dob:foundUser.dob,
                    gender:foundUser.gender,
                    phone_number:foundUser.phone_number,
                    isDonor:foundUser.isDonor,
                    isCreator:foundUser.isCreator,
                    confirmedByAdmin:foundUser.confirmedByAdmin,
                    accessToken: token,
            },);}
            else if(match){ res.status(406).send({status: "406"})}
            else{ res.status(401).send({status: "401"});}
            }
            catch (err) {
                return res.status(500).send('Sign in error');


            }


    }}


export default authController