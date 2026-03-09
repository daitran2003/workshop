import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Text, Button, Flex } from "@chakra-ui/react";
import type { ModalProps } from "@chakra-ui/modal";

import { showTransactionHash } from "../utils";

interface IProps extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  hash?: string;
  title?: string;
}

export default function SuccessModal({ isOpen, onClose, hash, title, ...props }: IProps) {
  const onNavigation = () => {
    if (typeof window !== "undefined") {
      window.open(`https://sepolia.etherscan.io/tx/${hash}`, "_blank");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} {...props}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent py="30px">
        <ModalCloseButton />
        <ModalBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            w="full"
            direction="column"
          >
            <Text fontFamily="Noto Sans" fontSize="20px">
              {title}
            </Text>

            <Text fontStyle="italic" fontSize="12px" mt="10px">
              Your Transaction Successful!
            </Text>

            <Button w="full" colorScheme="blue" mt="20px" onClick={onNavigation}>
              {showTransactionHash(hash || "")}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
