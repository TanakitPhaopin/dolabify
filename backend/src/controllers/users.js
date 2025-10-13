import { pool } from "../db.js";
import bcrypt from "bcrypt";

// Insert a new user
export const createUser = async (req, res) => {
  const { username, email, password, initial } = req.body;
  try {
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