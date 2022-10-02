import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, ReactNode, useCallback } from 'react';

type UseModalParams = {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};
export const useModal = ({
  isOpen: externalIsOpen,
  onOpen,
  onClose,
}: UseModalParams) => {
  const {
    onClose: closeFunc,
    onOpen: openFunc,
    isOpen: isOpenDefault,
  } = useDisclosure();
  const isOpen = externalIsOpen ? externalIsOpen : isOpenDefault;
  const close = useCallback(() => {
    onClose?.();
    closeFunc();
  }, [closeFunc, onClose]);

  const open = useCallback(() => {
    onOpen?.();
    openFunc();
  }, [onOpen, openFunc]);

  type ModalProps = {
    title: ReactNode;
    body: ReactNode;
  };
  const Modal = useCallback(
    ({ body, title }: ModalProps) => {
      return (
        <ChakraModal isOpen={isOpen} onClose={close}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{body}</ModalBody>
          </ModalContent>
        </ChakraModal>
      );
    },
    [close, isOpen]
  );

  return { Modal, close, open };
};
