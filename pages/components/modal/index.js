import React, { useEffect, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Lorem,
  SimpleGrid,
  Box,
  Text,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import { Map } from "immutable";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
function GeocodingModal({ isOpen, onClose, storeAddress, ModalValue }) {
  const router = useRouter();

  const [storeResult, setStoreResult] = useState(null);

  const { isLoading, error, data, isSuccess } = useQuery(
    ["storeGeocoding", storeAddress],
    async () => {
      console.log(storeAddress);
      if (storeAddress != "" && storeAddress != undefined) {
        return await axios.get("/api/getGeocoding", {
          params: { address: storeAddress },
        });
      }
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>위치 선택</ModalHeader>
        <ModalBody>
          <Text>
            가게의 주소를 선택해주세요. 찾는 주소가 없다면, 다시 입력해주세요.
            <br />
            동, 호 같은 상세 주소를 제외하면 더 정확한 결과를 도출할 수
            있습니다.
          </Text>
          <SimpleGrid columns={[2]} spacing="50px" marginTop={5}>
            {isSuccess
              ? data.data.documents.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      bg="white"
                      p={5}
                      boxShadow={"md"}
                      borderColor="gray.400"
                      border={1}
                      borderRadius={10}
                      marginBottom={5}
                      height="80px"
                      onClick={() => {
                        console.log(item.y, item.x);
                        ModalValue({
                          x: item.y,
                          y: item.x,
                        });
                        // InsertHandler.mutate({
                        //   ...storeData,
                        //   x: item.y,
                        //   y: item.x,
                        // });
                      }}
                    >
                      <Text fontSize={"2xl"}>{item.address_name}</Text>
                    </Box>
                  );
                })
              : null}
          </SimpleGrid>
          {isSuccess && data.data.documents.length === 0 ? (
            <Center h={60}>검색 결과가 없습니다.</Center>
          ) : null}
        </ModalBody>
      </ModalContent>

      <ModalCloseButton />
    </Modal>
  );
}
export default GeocodingModal;
