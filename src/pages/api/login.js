import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "./db/mongodb";

const SECRET = process.env.JWT_SECRET; // Add this in .env.local

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const { db } = await connectToDatabase();

    // Find the user by email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in.", error: error.message });
  }
}
