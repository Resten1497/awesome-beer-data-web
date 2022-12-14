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
            <Heading textAlign={"left"}>π»</Heading>
            <Heading textAlign={"left"}>Awesome-beer</Heading>
          </Box>
          <Flex alignItems={"flex-end"} height={"10vh"} ml={5}>
            {isSuccess ? (
              <Center fontSize={15}>λ°μ΄ν° μ΄ κ°μ : {data.data.length}</Center>
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
            λ±λ‘νκΈ°
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
            JSON νμΌλ€μ΄
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
            CSV νμΌλ€μ΄
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
                  <Th>λ²νΈ</Th>
                  <Th>μλλͺ</Th>
                  <Th>μ΄λ¦</Th>
                  <Th>μ£Όμ</Th>
                  <Th>μ’λ₯</Th>
                  <Th>μ€λͺ</Th>
                  <Th>λ€μ΄λ²URL</Th>
                  <Th>ννμ΄μ§ μ£Όμ</Th>
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
