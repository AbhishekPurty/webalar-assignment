import { connectToDatabase } from "./db/mongodb";

export default async function handler(req, res) {
  try{
    let {db, client} = await connectToDatabase()
    await db.collection('users').insertOne({email:"Abhishek"})
    res.status(200).json({msg: "Success"})
  }
  catch(err){
    res.status(500).json({msg: err})
  }
}
