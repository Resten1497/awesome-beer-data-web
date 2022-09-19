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
  // res.send([
  //   {
  //     address: {
  //       address_name: "서울 강북구 수유동 521-55",
  //       b_code: "1130510300",
  //       h_code: "1130566000",
  //       main_address_no: "521",
  //       mountain_yn: "N",
  //       region_1depth_name: "서울",
  //       region_2depth_name: "강북구",
  //       region_3depth_h_name: "인수동",
  //       region_3depth_name: "수유동",
  //       sub_address_no: "55",
  //       x: "127.01197907255",
  //       y: "37.640282181227",
  //     },
  //     address_name: "서울 강북구 인수봉로 238",
  //     address_type: "ROAD_ADDR",
  //     road_address: {
  //       address_name: "서울 강북구 인수봉로 238",
  //       building_name: "",
  //       main_building_no: "238",
  //       region_1depth_name: "서울",
  //       region_2depth_name: "강북구",
  //       region_3depth_name: "수유동",
  //       road_name: "인수봉로",
  //       sub_building_no: "",
  //       underground_yn: "N",
  //       x: "127.01197907255",
  //       y: "37.640282181227",
  //       zone_no: "01036",
  //     },
  //     x: "127.01197907255",
  //     y: "37.640282181227",
  //   },
  //   {
  //     address: {
  //       address_name: "서울 강북구 수유동 521-55",
  //       b_code: "1130510300",
  //       h_code: "1130566000",
  //       main_address_no: "521",
  //       mountain_yn: "N",
  //       region_1depth_name: "서울",
  //       region_2depth_name: "강북구",
  //       region_3depth_h_name: "인수동",
  //       region_3depth_name: "수유동",
  //       sub_address_no: "55",
  //       x: "127.01197907255",
  //       y: "37.640282181227",
  //     },
  //     address_name: "서울 강북구 인수봉로 238",
  //     address_type: "ROAD_ADDR",
  //     road_address: {
  //       address_name: "서울 강북구 인수봉로 238",
  //       building_name: "",
  //       main_building_no: "238",
  //       region_1depth_name: "서울",
  //       region_2depth_name: "강북구",
  //       region_3depth_name: "수유동",
  //       road_name: "인수봉로",
  //       sub_building_no: "",
  //       underground_yn: "N",
  //       x: "127.01197907255",
  //       y: "37.640282181227",
  //       zone_no: "01036",
  //     },
  //     x: "127.01197907255",
  //     y: "37.640282181227",
  //   },
  // ]);
};
