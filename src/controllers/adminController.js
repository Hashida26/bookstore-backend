const User= require('../models/userModel')
const getAllUsers = async (req, res) => {
    try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports={getAllUsers}


