const User = require('../models/user.model');

const getUserForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUserForSidebar Controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = { getUserForSidebar };