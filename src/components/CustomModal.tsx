import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiDetail } from "react-icons/bi";

type CustomModalProps = {
  name: string;
  value: string;
  specialization: string;
  description: string;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  name,
  value,
  specialization,
  description,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        mt={2}
        leftIcon={<BiDetail />}
        colorScheme="teal"
        variant="solid"
        size="sm"
        onClick={onOpen}
        ref={btnRef.current}
      >
        Details!
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef.current}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <strong>value</strong>: {value}
            </Text>
            <br />
            <Text>
              <strong>specialization</strong>: {specialization}
            </Text>
            <br />
            <Text>
              <strong>description</strong>: {description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
