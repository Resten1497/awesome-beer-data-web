import {
  ChakraProvider,
  Box,
  Text,
  Link,
  Stack,
  Input,
  Button,
  Heading,
  Flex,
  SimpleGrid,
  theme,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { axios } from "axios";
import { useQuery } from "@tanstack/react-query";

export default function selectGeoData() {
  const router = useRouter();
  var inputData = router.query;

  const { isLoading, error, data } = useQuery(
    ["geoData", inputData],
    async () => {
      if (inputData.address != "") {
        return await axios.get(
          //`https://awesome-beer-sever.onrender.com/geocoding?address=${address.address}`
          "/api/getGeocoding"
        );
      }
    }
  );
  if (data !== undefined && router.isReady) {
    return (
      <Flex
        bg="gray.50"
        alignItems={"center"}
        justifyContent="center"
        flexDirection={"column"}
        width={"100%"}
        height={"100vh"}
      >
        <Flex height={600} width={1000} flexDirection={"column"}>
          <Heading>GeoCoding 을 위한 주소를 선택해주세요</Heading>

          <Text fontSize={"2xl"} p={2}>
            입력 주소 : {inputData.address}
          </Text>

          <SimpleGrid columns={[1]} spacing="40px" marginTop={10}>
            {data.data.map((item, index) => {
              return (
                <Box
                  key={index}
                  bg="white"
                  p={5}
                  boxShadow={"md"}
                  borderColor="gray.300"
                  borderRadius={10}
                  height="80px"
                  onClick={() => {
                    console.log(item.y, item.x);
                    router.push({
                      query: { ...inputData, x: item.y, y: item.x },
                      pathname: "/complete",
                    });
                  }}
                >
                  <Text fontSize={"2xl"}>{item.address_name}</Text>
                </Box>
              );
            })}
          </SimpleGrid>
        </Flex>
        <Center>찾는 주소가 없다면, 다시 입력해주세요</Center>
        <Center>
          동, 호 같은 상세 주소를 제외하면 더 정확한 결과를 도출할 수 있습니다.
        </Center>
      </Flex>
    );
  }
}
