const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key"; // Change this!

app.use(cors());
app.use(express.json());

// Dummy user data - replace with real DB in production
const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    // Password hash for "open"
    passwordHash:
      "$2a$10$FqIklD5Q7Zn8cFuz0OYmkONoLf7kY8K7ZjDhO8HpcpqIN27IpED3m",
  },
];

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route example
app.get("/api/dashboard-data", authenticateToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.email}, this is your dashboard data.`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
