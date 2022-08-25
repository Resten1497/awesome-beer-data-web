import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Box,
  Heading,
  Button,
  Link,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function readContainer() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery(["beerData"], async () => {
    return await axios("https://awesome-beer-sever.onrender.com/");
  });
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"80%"}
      height={"100vh"}
      margin={"0 auto"}
      textAlign={"left"}
      flexDirection={"column"}
    >
      <Box
        height={"11vh"}
        display={"flex"}
        flexDirection="row"
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Box flexDirection={"column"}>
          <Heading textAlign={"left"}>🍻</Heading>
          <Heading textAlign={"left"}>Awesome-beer</Heading>
        </Box>
        <Box height={"11vh"} display={"flex"} alignItems="center">
          <Button
            display={"flex"}
            bg={"blue.400"}
            color={"white"}
            onClick={() => {
              router.push({
                pathname: "/register",
                asPath: "/register",
              });
            }}
          >
            등록하기
          </Button>
          <Button
            display={"flex"}
            bg={"blue.400"}
            marginLeft={5}
            color={"white"}
          >
            파일다운
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems={"flex-start"}
        alignContent={"center"}
        justifyContent="center"
        overflow="scroll"
        width={"100%"}
        height={"80vh"}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="striped" size={"lg"}>
              <Thead>
                <Tr>
                  <Th>번호</Th>
                  <Th>시도명</Th>
                  <Th>이름</Th>
                  <Th>주소</Th>
                  <Th>종류</Th>
                  <Th>설명</Th>
                  <Th>네이버URL</Th>
                  <Th>홈페이지 주소</Th>
                  <Th>x</Th>
                  <Th>y</Th>
                </Tr>
              </Thead>
              <Tbody>{setTableRows(data.data)}</Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
function setTableRows(data) {
  console.log(data);
  return data.map((item, index) => {
    return (
      <Tr key={index}>
        <Td>{index}</Td>
        <Td>{item.sidoNm}</Td>
        <Td>{item.name}</Td>
        <Td>{item.address}</Td>
        <Td>{item.beerType}</Td>
        <Td>{item.desc}</Td>
        <Td>
          <Link href={item.naverUrl}>{item.naverUrl}</Link>
        </Td>
        <Td>{item.homepage}</Td>
        <Td>{item.x}</Td>
        <Td>{item.y}</Td>
      </Tr>
    );
  });
}
