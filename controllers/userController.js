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
      // res.status(200).json(saveData);
      res.status(200).json({ message: "User created successfully" });
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

export const getUserById = async (req, res) => {
  try {
    //extract userData based on user request through the param
    const id = req.params.id;
    //check the user based on provide id into db the user exists or not
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "No User found with this id" });
    } else {
      res.status(200).json(userExist);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    //extract userData based on user request through the param
    const id = req.params.id;
    //check the user based on provide id into db the user exists or not
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "No User found with this id" });
    } else {
      //update user through the id
      const updatedData = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res
        .status(200)
        .json(`The User ${updatedData.name} is updated successfully`);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    //extract userData based on user request through the param
    const id = req.params.id;
    //check the user based on provide id into db the user exists or not
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "No User found with this id" });
    } else {
      const deletedUser = await User.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: `The User ${deletedUser.name} delete Successfully` });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
