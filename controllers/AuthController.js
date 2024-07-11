const {genPassword, validatePassword} = require("../utils/passwordUtils");
const Author = require("../models/Author");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.authList = async (req,res) => {
    try {
        const result = await Author.find({}).select("display_name email").exec();
        if(!result) {
            console.error("Author not found");
            return res.status(404).json({message:"Author not found"});
        }
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        res.status(500).json({mesage:"Server error"});
    }
}

exports.authRegister = async (req,res)  => {
    const { displayName, email, password } = req.body;
    if(!displayName || !email || !password) {
        res.status(400).json({message:"Credentials not correct"});
        return;
    }
    try {
        const alreadyExists = await Author.findOne({emai:email});
        if(!alreadyExists) {
            const hashedPassword = await genPassword(password);
            const newAuthor = new Author({
                display_name : displayName,
                joined_on : new Date(),
                email : email,
                password : hashedPassword
            })
            await newAuthor.save();
            res.status(200).json({message:"Author saved success"});
        } else {
            res.status(400).json({message:"User already exists"});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

exports.authLogin = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({message:"Credentials not provided"});
        return;
    }
    try {
        const foundAuthor =await  Author.findOne({email:email});
        if(!foundAuthor) {
            res.status(400).json({message:"Author not found"});
            return;
        }
        const passwordValidation = await validatePassword(password, foundAuthor.password);
        console.log(passwordValidation);
        if(!passwordValidation) {
            res.status(400).json({message:"Invalid password"});
            return;
        }
        const token = jwt.sign({userId:foundAuthor._id}, process.env.JWT_SECRET, {expiresIn : '2d'});
        res.json({token});
    } catch(err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}