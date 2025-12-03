import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      name: user.name,
      age: user.age ?? null,
      about: user.about ?? "",
      token,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      name: user.name,
      age: user.age ?? null,
      about: user.about ?? "",
      token,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name email age about"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching profile details.", details: error });
  }
};

const updateProfile = async (req, res) => {
  const { age, about } = req.body;

  try {
    const updates = {};
    if (age !== undefined) updates.age = age;
    if (about !== undefined) updates.about = about;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
      select: "name email age about",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating profile.", details: error.message });
  }
};

export { loginUser, signupUser, getProfile, updateProfile };
