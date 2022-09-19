import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function DeleteModal({ isOpen, onClose, deleteEvent }) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            가게 삭제
          </AlertDialogHeader>

          <AlertDialogBody>
            가게를 삭제 하시겠습니까? 되돌릴 수 없습니다.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteEvent();
              }}
              ml={3}
            >
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
