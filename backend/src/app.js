import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv
import router from "./router.js";

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
}));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;