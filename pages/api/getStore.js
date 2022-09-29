import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");

  let { id } = req.query;

  db.collection("beerStore")
    .findOne({ _id: ObjectId(id) })
    .then((data) => {
      res.send(data);
    });

};
