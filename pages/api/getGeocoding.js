import axios from "axios";

export default (req, res) => {
  
  let url =
    "https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&page=1&size=10&query=";
  let address = req.query.address;
  axios
    .get(url + encodeURI(address), {
      headers: {
        Authorization: `${process.env.KAKAO_KEY}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(405).send("error");
    });
};
