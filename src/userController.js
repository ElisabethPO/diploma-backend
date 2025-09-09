import User from './user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("Original password:", password);
      console.log("Hashed password:", hashedPassword);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      await user.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
      res.status(500).json({ message: 'Server error' });
    }
  }


  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_secret_key',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();
