import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    //hold user requested input into newUser variable
    const newUser = new User(req.body);

    //take email and check into db the user exists or not
    const { email } = newUser;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    } else {
      //save user input into db
      const saveData = await newUser.save();
      res.status(200).json(saveData);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    //retrive all data from db
    const userData = await User.find();
    //if there is no user
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
