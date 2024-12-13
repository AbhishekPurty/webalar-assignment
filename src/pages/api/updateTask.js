import { connectToDatabase } from "./db/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();

    let id = req.body.id
    delete req.body.id
    const task = await db.collection("tasks").updateOne({_id: new ObjectId(id)}, { $set: req.body })
    

    return res.status(200).json({ data: task });

  } catch (error) {

    return res.status(500).json({ message: "Error updating task.", error: error.message });

  }
}
