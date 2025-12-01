const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthService {
  async register(data) {
    const user = await User.create(data);
    return { user, token: this.generateToken(user._id) };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid credentials");
    return { user, token: this.generateToken(user._id) };
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }
}

module.exports = new AuthService();
