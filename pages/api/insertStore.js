import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");
  if (req.method == "POST") {
    let query = req.body;
    db.collection("beerTest")
      .insertOne(query)
      .then((data) => {
        if (data.acknowledged) {
          res.status(200).send();
        } else {
          res.status(400).send();
        }
      });
  } else {
    res.send(400);
  }
};
