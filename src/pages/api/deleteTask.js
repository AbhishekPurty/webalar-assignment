import { connectToDatabase } from "./db/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();

    
    const task = await db.collection("tasks").deleteOne({_id: new ObjectId(req.body.id)})
    

    return res.status(200).json({ data: task });

  } catch (error) {

    return res.status(500).json({ message: "Error deleting task.", error: error.message });

  }
}
