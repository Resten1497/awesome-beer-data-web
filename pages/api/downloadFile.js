import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import fs from "fs";
export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");
  db.collection("beerStore")
    .find()
    .sort({ sidoNm: 1 })
    .toArray(function (err, data) {
      let filePath = path.join(__dirname, "data.json");
      fs.open(filePath, "w", function (err, fd) {
        fs.writeFile(fd, JSON.stringify(data), function (err) {});
      });
      var stat = fs.statSync(filePath);

      res.writeHead(200, {
        "Content-Disposition": `attachment; filename=data.json`,
      });

      var readStream = fs.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);
    });
};
