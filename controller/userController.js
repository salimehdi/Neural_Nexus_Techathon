
import UserModel from "../models/User/UserModel.js";

const createUser = async (req, res, next) => {
    try {
        const { user_id, name, phone, address, role, image_url } = req.body;

        const newUser = new UserModel({
            user_id, 
            name, 
            phone, 
            address, 
            role, 
            image_url
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};

export default createUser;
