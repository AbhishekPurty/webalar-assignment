import bcrypt from "bcrypt";
import { connectToDatabase } from "./db/mongodb";

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

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await db.collection("users").insertOne({ email, password: hashedPassword });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user.", error: error.message });
  }
}
