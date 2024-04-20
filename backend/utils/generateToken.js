const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token,{
        maxAge: 15*24*60*60*1000, //Age of Cookei: 15 days
        httpOnly: true, //Prevent XSS Attacks (Cross Site Scripting Attack)
        sameSite: "strict", //CSRF Attacks (Cross Site Request Forgery)
        secure: process.env.NODE_ENV !== "development" ? true : false
    });
}

module.exports = generateTokenAndSetCookie;