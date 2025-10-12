import { pool } from "../db.js";

// Insert a new user
export const createUser = async (req, res) => {
  const { username, email, password, initial, profile_color } = req.body;
  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, initial, profile_color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, password, initial, profile_color]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
