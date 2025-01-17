const jwt = require('jsonwebtoken');
const { User  } = require('../model/models')

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        console.log("Decoded payload:", decoded); 
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        console.error("JWT verification error:", error); 
        return res.status(400).send('Invalid Token.');
    }
    
};

// Authorize middleware: Verifies the user's role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access Denied. You do not have the required permissions.');
        }
        next();
    };
};

module.exports = { authenticate, authorize };
