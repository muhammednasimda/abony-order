import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import styles from "../pages/css/addOrder.module.scss";

const LoadingCard = ({ isLoading, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      width="10"
      size="xs"
      isCentered
    >
      <ModalOverlay />

      <ModalContent w="130px" height="130px" borderRadius="20px">
        <ModalBody>
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <svg
                class={styles.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class={styles.checkmark__circle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class={styles.checkmark__check}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingCard;
