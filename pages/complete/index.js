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
  theme,
} from "@chakra-ui/react";
import { beerStoreDataState } from "../../states";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Register() {
  const router = useRouter();
  var data = router.query;
  // console.log(data);
  if (router.isReady && data) {
    axios.post("http://localhost:3001/dbUpdateTest", data);
    return <></>;
  }
}
