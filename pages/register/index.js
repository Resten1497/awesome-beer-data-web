import { useState, useRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  Text,
  Link,
  Box,
  Stack,
  Button,
  Input,
  Heading,
  Flex,
  useDisclosure,
  Select,
  Lorem,
  ModalFooter,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import GeocodingModal from "../components/modal/";
import axios from "axios";
export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();
  const objectRef = useRef({
    sidoNm: "",
    name: "",
    naverUrl: "",
    address: "",
    beerType: "",
    desc: "",
    homepage: "",
  });
  const { register, handleSubmit, watch } = useForm();
  const [store, setStore] = useState({
    sidoNm: "",
    name: "",
    naverUrl: "",
    address: "",
    beerType: "",
    desc: "",
    homepage: "",
  });
  const InsertMutateHandler = useMutation((data) => {
    return axios.post("/api/insertStore", { data: data });
  });

  const getModalValue = (geoData) => {
    InsertMutateHandler.mutate({ ...store, x: geoData.x, y: geoData.y });
  };
  const onSubmit = (data) => {
    setStore(data);
    onOpen();

    // router.push({
    //   pathname: "/selectGeoData",
    //   query: { ...data },
    //   asPath: "/selectGeoData",
    //   state: { ...data },
    // });
  };
  if (InsertMutateHandler.isSuccess) {
    alert("등록되었습니다.");
    router.push("/");
  } else {
    return (
      <Flex
        alignItems={"center"}
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <GeocodingModal
          onClose={onClose}
          isOpen={isOpen}
          storeAddress={store.address}
          ModalValue={getModalValue}
        />
        <Flex height={600} width={1000} flexDirection={"column"}>
          <Heading>🍻</Heading>
          <Heading>Awesome-beer</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Text fontSize="xl">
                맥주집에 대한 데이터를 추가하는 페이지입니다.
              </Text>
              <Select placeholder="지역" {...register("sidoNm")}>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="강원">강원</option>
                <option value="충청">충청</option>
                <option value="대전">대전</option>
                <option value="경상">경상</option>
                <option value="대구">대구</option>
                <option value="전라">전라</option>
                <option value="광주">광주</option>
                <option value="부산">부산</option>
                <option value="울산">울산</option>
                <option value="제주">제주</option>
              </Select>
              <Input
                autocomplete="off"
                name="name"
                placeholder="가게명"
                {...register("name", { required: true })}
              />
              <Input
                name="address"
                ref={ref}
                autocomplete="off"
                defaultValue=""
                placeholder="도로명 주소"
                {...register("address", { required: true })}
              />
              <Flex flexDirection={"row"}>
                <Input
                  autocomplete="off"
                  name="naverUrl"
                  placeholder="네이버지도 url"
                  {...register("naverUrl", { required: true })}
                />
                <Button
                  marginLeft={2}
                  onClick={() => {
                    window.open("https://map.naver.com/v5");
                  }}
                >
                  네이버 지도
                </Button>
              </Flex>

              <Select
                placeholder="가게타입"
                name="beerType"
                {...register("beerType", { required: true })}
              >
                <option value="브루펍">브루펍</option>
                <option value="바틀샵">바틀샵</option>
                <option value="탭룸">탭룸</option>
                <option value="공방">공방</option>
                <option value="기타">기타</option>
              </Select>
              <Input
                autocomplete="off"
                name="desc"
                placeholder="가게설명"
                {...register("desc")}
              />
              <Input
                autocomplete="off"
                name="homepage"
                placeholder="홈페이지"
                {...register("homepage", { required: true })}
              />
              <Button type="submit">등록</Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    );
  }
}
