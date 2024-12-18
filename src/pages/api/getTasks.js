import { connectToDatabase } from "./db/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();

    const tasks = await db.collection("tasks").find({user: req.query.id}).toArray()
    

    return res.status(200).json({ data: tasks });

  } catch (error) {

    return res.status(500).json({ message: "Error retrieving tasks.", error: error.message });

  }
}
