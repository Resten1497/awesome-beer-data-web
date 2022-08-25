import { atom } from "recoil";

export const beerStoreDataState = atom({
  key: "beerStoreDataState",
  default: {
    sidoNm: "",
    name: "",
    naverUrl: "",
    address: "",
    beerType: "",
    desc: "",
    homepage: "",
  },
});
