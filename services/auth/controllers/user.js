import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async ( req,res ) => {    

    try {
        const { name,email,password } = req.body;
        console.log(req.body);
        let userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: `User ${name} mail: ${email} already registered`
            });            
        }

        let newUser = new User(req.body);
        await newUser.save();

        return res.status(200).json({
            success: true,
            message: `User (${name} mail: ${email}) success created...`
        });
    } catch (error) {
        return res.status(500).json({
           success: false,
           message: `Error user registration ${error.message}`
        });     
    }
}

export const login = async ( req,res ) => {    

    try {
        const { email,password } =  req.body;        
        let user = await User.findOne({email});

        if (!user){
            return res.status(404).json({
                success: false,
                message: `user mail ${email} doesn't exist`
            });
        }

        if(password !== user.password){
            return res.status(401).json({
                status: false,
                message: `unauthorized user ${email} password`
            });
        }

        const payload = {
            name: user.name,
            email
        }
        console.log(payload);
        return await jwt.sign(payload,'secret',( err,token ) => {
            // return (err) ? console.log(err.message) :  res.status(200).json({token});
            if(err){
                console.log(err);
            } else {
                res.status(200).json({token});
            }
        });

        return res.status(200).json({
            success: true,
            message: `user mail ${email} logged In`
        });
            
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `error request ${error.message}`
        });
    }
}

export const getUser = async ( req,res ) => {    

    try {
        const { email } =  req.params;        
        let userFound = await User.findOne({email});

        if (!userFound){
            return res.status(404).json({
                success: false,
                message: `request user mail ${email} not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: userFound
        });
            
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `error request ${error.message}`
        });
    }
}