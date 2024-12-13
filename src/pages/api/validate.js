import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  const token = req.body.token; // Extract token from Bearer header

  if (!token) {
    return res.status(401).json({ message: "Token is missing." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return res.status(200).json({ message: "Token is valid.", decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}
