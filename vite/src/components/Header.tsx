import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import mintAbi from "../abis/mintAbi.json";
import saleAbi from "../abis/saleAbi.json";
import votingAbi from "../abis/votingAbi.json"; // votingAbi 추가
import {
  mintContractAddress,
  saleContractAddress,
  votingContractAddress, // votingContractAddress 추가
} from "../abis/contractAddress";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  setMintContract: Dispatch<SetStateAction<Contract | null>>;
  setSaleContract: Dispatch<SetStateAction<Contract | null>>;
  setVotingContract: Dispatch<SetStateAction<Contract | null>>; // setVotingContract 추가
}

const Header: FC<HeaderProps> = ({
  signer,
  setSigner,
  setMintContract,
  setSaleContract,
  setVotingContract, // setVotingContract 추가
}) => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const {
    isOpen: isFirstModalOpen,
    onOpen: onFirstModalOpen,
    onClose: onFirstModalClose,
  } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  const {
    isOpen: isThirdModalOpen,
    onOpen: onThirdModalOpen,
    onClose: onThirdModalClose,
  } = useDisclosure();
  const {
    isOpen: isFourthModalOpen,
    onOpen: onFourthModalOpen,
    onClose: onFourthModalClose,
  } = useDisclosure();

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!signer) {
      setMintContract(null);
      setSaleContract(null);
      setVotingContract(null); // votingContract 초기화

      return;
    }

    setMintContract(new Contract(mintContractAddress, mintAbi, signer));
    setSaleContract(new Contract(saleContractAddress, saleAbi, signer));
    setVotingContract(new Contract(votingContractAddress, votingAbi, signer)); // votingContract 설정
  }, [signer]);

  useEffect(() => {
    if (clickCount === 3) {
      onFirstModalOpen();
    } else if (clickCount === 10) {
      onSecondModalOpen();
      setClickCount(0); // 클릭 수 초기화
    }
  }, [clickCount, onFirstModalOpen, onSecondModalOpen]);

  const handleImageClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleThirdModalOpen = () => {
    onThirdModalOpen();
    setTimeout(onFourthModalOpen, 30000); // 30초 후에 네 번째 모달 열기
  };

  return (
    <Flex h={24} justifyContent="space-between">
      <Flex
        flexDir={["column", "column", "row"]}
        w={40}
        fontSize={[16, 16, 20]}
        fontWeight="semibold"
        alignItems="center"
      >
        <Image
          w={16}
          src="/images/cats.gif"
          alt="반짝반짝"
          marginRight={10}
          onClick={handleImageClick}
        />
        <Flex flexDir={"column"}>
          <Button
            variant="link"
            colorScheme="black"
            onClick={() => navigate("/")}
            size={["xs", "xs", "md"]}
          >
             CSTW
          </Button>
        </Flex>
      </Flex>
      <Flex alignItems="center" gap={[2, 2, 4]}>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("Rank")}
          size={["xs", "xs", "md"]}
        >
           Rank
        </Button>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/minting")}
          size={["xs", "xs", "md"]}
        >
          Upload Cat
        </Button>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/vote")}
          size={["xs", "xs", "md"]}
        >
          Vote
        </Button>
      </Flex>
      <Flex w={40} justifyContent="end" alignItems="center">
        {signer ? (
          <Menu>
            <MenuButton size={["xs", "xs", "md"]} as={Button}>
              {signer.address.substring(0, 5)}...
              {signer.address.substring(signer.address.length - 5)}
            </MenuButton>
            <MenuList minW={[20, 20, 40]}>
              <MenuItem fontSize={[8, 8, 12]} onClick={() => setSigner(null)}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={onClickMetamask} size={["xs", "xs", "md"]}>
            🦊 Login
          </Button>
        )}
      </Flex>

      {/* 첫 번째 모달 */}
      <Modal
        isOpen={isFirstModalOpen}
        onClose={onFirstModalClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Why do you do?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onFirstModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 두 번째 모달 */}
      <Modal
        isOpen={isSecondModalOpen}
        onClose={onSecondModalClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>!!!!!!!!!!!!!!!!??</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Congratuation Prize is 100USDT</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={6}
              fontSize={20}
              onClick={handleThirdModalOpen}
            >
              Don't click please wait
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 세 번째 모달 */}
      <Modal
        isOpen={isThirdModalOpen}
        onClose={onThirdModalClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You have warrior's heart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>100USDT is dissapear</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onThirdModalClose}>
              One more chance?
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 네 번째 모달 */}
      <Modal
        isOpen={isFourthModalOpen}
        onClose={onFourthModalClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Surprise!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image w={16} src="/images/surprise.jpeg" alt="Surprise" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onFourthModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
