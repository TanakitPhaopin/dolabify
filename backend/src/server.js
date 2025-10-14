import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import testRouter from './routes/test.js';
import userRouter from './routes/users.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
if (process.env.NODE_ENV === "production") {
  // Production
  app.use(cors());
  console.log("CORS: Production mode (allow all origins)");
} else {
  // Development
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  console.log("CORS: Development mode (localhost:5173 only)");
}
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the Dolabify API');
});

// Routes
app.use('/', testRouter);
app.use('/api', userRouter);


// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Database connection error' });
  }
});
    
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});