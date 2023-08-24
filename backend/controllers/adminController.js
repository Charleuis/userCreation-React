import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, isAdmin: true });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged Out" });
});

const usersList = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  await User.deleteOne({ _id });
  const remainingUsers = await User.find({ isAdmin: false });
  res.json({ status: "ok", users: remainingUsers });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      image: "dummy.png",
    });
    newUser.save();
    res.status(200).json({ message: "user created" });
  } else {
    res.status(400).json({ message: "failed to confirm password" });
  }
});

const userDetails = asyncHandler(async (req, res) => {
  const id = req.body._id;
  const user = await User.findOne({ _id: id });
  res.status(200).json(user);
});

const editUser = asyncHandler(async (req, res) => {
  const { _id, name, email, image } = req.body;
  await User.findByIdAndUpdate(_id, { $set: { name, email, image } });
  res.status(200).json("User edit succussfull");
});

export {
  authAdmin,
  logoutAdmin,
  usersList,
  deleteUser,
  createUser,
  userDetails,
  editUser,
};
