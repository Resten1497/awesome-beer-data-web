import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");
  db.collection("beerTest")
    .find()
    .toArray(function (err, data) {
      res.send(data);
    });
};
