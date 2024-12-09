const jwt = require("jsonwebtoken");
const { AsaUser } = require('../models/user');

 const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first",
        });
    }
    try {
        const decoded = jwt.verify(token, "jkkkk");
        req.user = await AsaUser.findOne({where:{id:decoded.id}});
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid token"+err.message,
        });
    }
};
module.exports={isAuthenticated};