import clientPromise from "../../lib/mongodb";
import path from "path";
import fs from "fs";
import { Parser, parse } from "json2csv";

export default async (req, res) => {
  let { type } = req.query;
  const fields = [
    "sidoNm",
    "name",
    "address",
    "beerType",
    "desc",
    "naverUrl",
    "homepageUrl",
    "x",
    "y",
  ];

  const client = await clientPromise;
  const db = client.db("awesomebeerdb");
  console.log(type);
  db.collection("beerStore")
    .find({}, { projection: { _id: 0, idx: 0 } })
    .sort({ sidoNm: 1 })
    .toArray(function (err, data) {
      let filePath = "";
      let fileName = "";
      let result = "";
      console.log(data);
      if (type === "csv") {
        filePath = path.join(__dirname, "data.csv");
        fileName = "data.csv";
        result = parse(data, { fields });
      }
      if (type === "json") {
        filePath = path.join(__dirname, "data.json");
        fileName = "data.json";
        result = JSON.stringify(data);
      }

      fs.open(filePath, "w+", function (err, fd) {
        fs.writeFile(fd, result, function (err) {});
      });
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename=${fileName}`,
      });

      var readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
      readStream.on("end", function () {
        fs.unlink(filePath, function () {
          console.log("file deleted");
        });
      });
    });
};
