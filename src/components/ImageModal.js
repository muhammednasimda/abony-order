import {
  Modal,
  ModalOverlay,
  ModalBody,
  Flex,
  ModalContent,
  Img,
} from "@chakra-ui/react";

const ImageModal = ({ image, isImageOpen, onImageClose }) => {
  return (
    <Modal isOpen={isImageOpen} onClose={onImageClose} size="lg" isCentered>
      <ModalOverlay />

      <ModalContent w="90%" borderRadius="20px">
        <ModalBody>
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Img src={image} h="60vh" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
