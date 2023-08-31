const jwt = require("jsonwebtoken");
const { loginSchema, signupSchema } = require("../validators/userSchema");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const { connect, close } = require("../config/db");

const generateToken = (email) => {
  return jwt.sign(
    {
      sub: email,
    },
    // "secret",
    process.env.SECRET_KEY,
    { expiresIn: 60 * 10 }
  );
};
const generateRefreshToken = (email) => {
  return jwt.sign(
    {
      sub: email,
    },
    process.env.REFERSH_TOKEN_SECRET_KEY,
    { expiresIn: 60 * 30 }
  );
};
// const validatePAssword = async (password, ) => {
//   const result = await bcrypt.compare(password, user.password);
//   if (result !== true) return Promise.reject("invalid password");
//   return Promise.resolve();
// };
// const findUser = async (email) => {
//   const user = await User.findOne({ email });
//   if (!user) return Promise.reject("user does not exist");
//   return Promise.resolve(user);
// };
const login = async (email, password) => {
  try {
    await connect();
    const { value, error } = loginSchema.validate({ email, password });
    if (error) throw error;
    const user = await User.findOne({ email });
    const result = await bcrypt.compare(password, user.password);
    if (result !== true) throw "invalid password";
    if (!user) throw "user does not exist";
    return Promise.resolve({
      access_token: generateToken(email),
      refresh_token: generateRefreshToken(email),
    });
  } catch (error) {
    return Promise.reject(error);
  } finally {
    close();
  }
};

const register = async (email, password, confirmPassword) => {
  try {
    await connect();
    const { value, error } = signupSchema.validate({
      email,
      password,
      repeat_password: confirmPassword,
    });
    if (error) throw error;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    close();
  }
};
const regenerateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFERSH_TOKEN_SECRET_KEY);
    const email = decoded.sub;
    return Promise.resolve({
      new_access_token: generateToken(email),
      refresh_token: generateRefreshToken(email),
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { register, login, generateToken, regenerateToken };
