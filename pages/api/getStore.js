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
  // res.send({
  //   idx: 1,
  //   address: "서울 강남구 역삼로 118",
  //   beerType: "브루펍",
  //   desc: "구스 아일랜드 직영펍",
  //   homepage: "https://gooseisland.kr",
  //   name: "Goose Island Brewhouse Seoul",
  //   naverUrl: "https://map.naver.com/v5/entry/place/505375149",
  //   sidoNm: "서울",
  //   x: "127.03218003162604",
  //   y: "37.49343153399763",
  // });
};
