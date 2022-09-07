import { useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Store() {
  const router = useRouter();
  const storeId = router.query.id;
  console.log(storeId);
  const { register, handleSubmit, watch } = useForm();
  const { isLoading, error, data, isSuccess } = useQuery(
    ["store", storeId],
    async () => {
      if (storeId !== undefined) {
        console.log("fetching", storeId);
        return await axios.get("/api/getStore", { params: { id: storeId } });
        // return await axios.get("http://localhost:3001/dbFindTest", {
        //   params: {
        //     id: storeId,
        //   },
        // });
      }
    }
  );
  const updateMutateHandler = useMutation((store) => {
    //return axios.post("/api/updateStore", { _id: storeId, ...store });
    return axios.post("http://localhost:3001/dbUpdateTest", {
      _id: storeId,
      result: { ...store },
    });
  });

  const [store, setStore] = useState({
    sidoNm: "",
    name: "",
    naverUrl: "",
    address: "",
    beerType: "",
    desc: "",
    homepage: "",
    x: "",
    y: "",
  });

  if (isLoading) {
    return <Spinner />;
  } else if (isSuccess && updateMutateHandler.isSuccess === false) {
    return (
      <Flex
        alignItems={"center"}
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Flex height={600} width={1000} flexDirection={"column"}>
          <Heading>🍻</Heading>
          <Heading>Awesome-beer</Heading>
          <form onSubmit={handleSubmit(updateMutateHandler.mutate)}>
            <Stack spacing={3}>
              <Text fontSize="xl">맥주집 데이터를 수정하는 페이지입니다.</Text>
              <Flex dir="row">
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  지역
                </Text>
                <Select
                  placeholder="지역"
                  {...register("sidoNm")}
                  defaultValue={data.data.sidoNm}
                >
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
              </Flex>
              <Flex dir="row">
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  가게명
                </Text>
                <Input
                  name="name"
                  placeholder="가게명"
                  {...register("name", { required: true })}
                  defaultValue={data.data.name}
                />
              </Flex>
              <Flex flexDirection={"row"}>
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  네이버 URL
                </Text>
                <Input
                  name="naverUrl"
                  placeholder="네이버지도 url"
                  {...register("naverUrl", { required: true })}
                  defaultValue={data.data.naverUrl}
                />
              </Flex>
              <Flex flexDirection={"row"}>
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  도로명 주소
                </Text>
                <Input
                  name="address"
                  placeholder="도로명 주소"
                  {...register("address", { required: true })}
                  defaultValue={data.data.address}
                />
              </Flex>
              <Flex flexDirection={"row"}>
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  가게타입
                </Text>
                <Select
                  placeholder="가게타입"
                  name="beerType"
                  {...register("beerType", { required: true })}
                  defaultValue={data.data.beerType}
                >
                  <option value="브루펍">브루펍</option>
                  <option value="바틀샵">바틀샵</option>
                  <option value="탭룸">탭룸</option>
                  <option value="공방">공방</option>
                  <option value="기타">기타</option>
                </Select>
              </Flex>
              <Flex flexDirection={"row"}>
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  가게설명
                </Text>
                <Input
                  name="desc"
                  placeholder="가게설명"
                  {...register("desc")}
                  defaultValue={data.data.desc}
                />
              </Flex>
              <Flex flexDirection={"row"}>
                <Text fontSize={15} w={40} textAlign={"center"} lineHeight={10}>
                  홈페이지
                </Text>
                <Input
                  name="homepage"
                  placeholder="홈페이지"
                  {...register("homepage", { required: true })}
                  defaultValue={data.data.homepage}
                />
              </Flex>
              <Box
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Input m={2} {...register("x")} value={data.data.x} readOnly />
                <Input m={2} {...register("y")} value={data.data.y} readOnly />
                <Button m={2} w={"500px"} type="button">
                  좌표 변경
                </Button>
              </Box>

              <Button type="submit">등록</Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    );
  } else if (updateMutateHandler.isSuccess) {
    alert("수정이 완료되었습니다.");
    router.push("/");
  }
}
