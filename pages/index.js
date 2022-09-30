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
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useReactTable } from "@tanstack/react-table";

export default function readContainer() {
  const router = useRouter();
  const { isLoading, error, data, isSuccess } = useQuery(
    ["beerData"],
    async () => {
      return await axios.get("api/getAllStore");
    }
  );

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
        <Flex flexDirection={"row"}>
          <Box flexDirection={"column"}>
            <Heading textAlign={"left"}>🍻</Heading>
            <Heading textAlign={"left"}>Awesome-beer</Heading>
          </Box>
          <Flex alignItems={"flex-end"} height={"10vh"} ml={5}>
            {isSuccess ? (
              <Center fontSize={15}>데이터 총 개수 : {data.data.length}</Center>
            ) : null}
          </Flex>
        </Flex>

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
            onClick={async () => {
              router.push({
                pathname: "/api/downloadFile",
                query: { type: "json" },
              });
            }}
          >
            JSON 파일다운
          </Button>
          <Button
            display={"flex"}
            bg={"blue.400"}
            marginLeft={5}
            color={"white"}
            onClick={async () => {
              router.push({
                pathname: "/api/downloadFile",
                query: { type: "csv" },
              });
            }}
          >
            CSV 파일다운
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
              <Tbody>
                {data.data.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      onClick={() => {
                        //alert(item._id);
                        router.push({
                          pathname: `/store/${item._id}`,
                        });
                      }}
                    >
                      <Td>{index + 1}</Td>
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
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

const TableComponent = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
};
