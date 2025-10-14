import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Insert a new user
export const createUser = async (req, res) => {
  const { username, email, password, initial } = req.body;
  try {
    // Check if email already exists
    const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check if username already exists
    const usernameCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Profile color
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, initial, profile_color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, initial, randomColor]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Access token
    const accessToken = jwt.sign(
      { user_id: user.user_id, username: user.username },
        process.env.ACCESS_JWT_SECRET,
      { expiresIn: "15s" }
    );
    // Refresh token
    const refreshToken = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "50s" }
    );
    // Set HttpOnly cookies
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 1000, // 15 seconds
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 50 * 1000, // 50 seconds
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
