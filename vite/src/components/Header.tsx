import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { ethers } from "ethers";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
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

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
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

  return (
    <Flex h={24} justifyContent="space-between">
      <Flex
        flexDir={["column", "column", "row"]}
        w={40}
        fontSize={[16, 16, 20]}
        fontWeight="semibold"
        alignItems="center"
      >
        <Image w={16} src="/images/cats.gif" alt="반짝반짝" marginRight={10} />
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
    </Flex>
  );
};

export default Header;
