const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const keysecret = process.env.KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.amazoneweb;

        const verifyToken = jwt.verify(token, keysecret)
        console.log(verifyToken);

        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log(rootUser);

        if (!rootUser) {
            throw new Error("user not found")
        };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("unauthorized User")
        console.log(error);
        alert("login first")
    }
}


module.exports = authenticate;