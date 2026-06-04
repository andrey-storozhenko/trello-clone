import { User } from "../models/user";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req,res) => {
    const { name, email, password } = req.body;

    const existingUser = User.findOne({ email });
    if (existingUser) {
        res.status(400).json({message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "Register successful",
        user,
    });
};

export const loginUser = async(req,res) => {
    const { email, password } = req.body;

    const user = await User.findByOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User with this email not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).json({ message: "Wrong password" });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "Login successful",
        user,
    });

};

export const logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logged out successfully",
  });
};