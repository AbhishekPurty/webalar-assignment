import { connectToDatabase } from "./db/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { db } = await connectToDatabase();


    const task = await db.collection("tasks").insertOne({title:req.body.title, description:req.body.description, status:req.body.status, weather:req.body.weather, user: req.body.email})
    // console.log(task);
    

    return res.status(200).json({ data: task });

  } catch (error) {

    return res.status(500).json({ message: "Error adding task.", error: error.message });

  }
}
