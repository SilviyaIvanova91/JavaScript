const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "q390vnodzmgszdfgsdz";

async function register(email, username, password) {
  const existingUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  if (existingUsername) {
    throw new Error("Username is taken!");
  }

  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (existingEmail) {
    throw new Error("Email is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    hashedPassword,
  });

  const token = createSession(user);

  return token;
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("Incorect email or passwrod");
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if (hasMatch == false) {
    throw new Error("Incorect email or passwsord!");
  }

  const token = createSession(user);
  return token;
}

function createSession({ _id, email, username }) {
  const payload = {
    _id,
    email,
    username,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  login,
  register,
  verifyToken,
};
