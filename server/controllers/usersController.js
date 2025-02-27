const bcrypt = require("bcryptjs");
const User = require('../schema/user')
const jwt = require('jsonwebtoken');

const usersController = {
   async createUser(req, res) {
      try {
         const { username, password, admin } = req.body;

         // Validate input
         if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
         }

         // Check if user already exists
         const existingUser = await User.findOne({ username });
         if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
         }

         // Hash password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         // Create new user
         const newUser = new User({ username, password: hashedPassword, admin });
         await newUser.save();

         res.status(201).json({ message: "User created successfully", user: { username } });

      } catch (err) {
         console.error("Error creating user:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   },

   async loginUser(req, res) {
      try {
         const { username, password } = req.body;

         // Validate input
         if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
         }

         // Check if user exists
         const user = await User.findOne({ username });
         if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
         }



         // Compare password
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
         }


         const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "3d",
         });

         res.status(200).cookie("authToken", token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
         }).json({ message: "Login successful", token, isAdmin: user.admin });

      } catch (err) {
         console.error("Error logging in user:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   },

   async initialLogin(req, res) {
      try {
         const authHeader = req.headers.authorization;

         if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
         }

         const token = authHeader.split(" ")[1];

         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
         }

         // Check if user exists
         const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
         }

         // Generate a new token (optional)
         const newToken = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "3d",
         });

         res.status(200).json({
            success: true,
            message: "Initial login successful",
            authToken: newToken,
            isAdmin: user.admin,
         });

      } catch (error) {
         console.error("Error during initial login:", error);
         res.status(500).json({ message: "Internal server error", error: error.message });
      }
   }

};

module.exports = usersController;
