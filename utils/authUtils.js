const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authenticate token
exports.authenticateToken = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[2];
    if(!token) {
        return res.status(401).json({message:'Acccess denied'});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({message:'Invalid token'});
    }
};
