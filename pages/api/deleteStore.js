import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");
  console.log("aa");
  if (req.method == "POST") {
    let query = req.body;
    db.collection("beerStore")
      .deleteOne({ _id: ObjectId(query._id) })
      .then((data) => {
        if (data.acknowledged == true) {
          console.log("delete success");
          res.status(200).send();
        } else {
          res.status(400).send();
        }
      });
  } else {
    res.send(400);
  }
};
