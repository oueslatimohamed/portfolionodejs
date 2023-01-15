import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup  (req,res) {
    const {username, password} = req.body;
    const userfound =  await User.findOne({"username": username});
    
    if(userfound) {
        return res.status(403).json({error: "user is already exist !"});
    } else {
        const user = await User.create(req.body)
        const image =  await req.file.filename;
        const hash = await bcrypt.hash(password,10);
        user.password = hash;
        user.image =`${req.protocol}://${req.get('host')}/img/${image}`
        await user.save();
        return res.status(201).json({success : true});    
    }
    
}

export async function signin (req,res) {
    const {username,password} =  req.body;
    const user = await User.findOne({"username": username});
    if(!user){
        return res.status(403).json({error: "user not found"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(403).json({error : "password failed"})
    }

    const payload = {id:user.id};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({success: true , token: token,role: user.role});
}

export async function profile (req,res) {
    if(!req.user){
        return res.status('401').json({error: "You're not authenticated!"});
    }
    const user = await User.findById(req.user._id);

    res.status(200).json({user: user});
}

export async function editProfile (req,res) {
    try {
        const user =  await User.findByIdAndUpdate(req.user._id,req.body);
        await user.save();
        return res.status(200).json({message : "updated"});
    } catch(e){
        res.status(500).json({Error:"Server error"});
    }
}