import { Button, Flex, Text } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { ChangeEvent, FC, useEffect, useState } from "react";
import mintNftAbi from "./mintNftAbi.json";
import axios from "axios";

const Minting: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET,
          },
        }
      );

      return `https://orange-electrical-bison-402.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(error);
    }
  };

  const uploadMetadata = async (image: string, fileName: string) => {
    try {
      const metadata = JSON.stringify({
        pinataContent: {
          name: fileName,
          description: "Cat",
          image,
        },
        pinataMetadata: {
          name: fileName,
        },
      });

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: import.meta.env.VITE_PINATA_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET,
          },
        }
      );

      return `https://orange-electrical-bison-402.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.currentTarget.files || !contract) return;

      const file = e.currentTarget.files[0];
      const fileName = file.name;
      const formData = new FormData();

      formData.append("file", file);

      const imageUrl = await uploadImage(formData);
      const metadataUrl = await uploadMetadata(imageUrl!, fileName);

      const tx = await contract.mintNft(metadataUrl);

      await tx.wait();

      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!signer) return;

    setContract(
      new Contract(
        "0x9e7216e3923f0608e4aD19Ed0c257694828D1641",
        mintNftAbi,
        signer
      )
    );
  }, [signer]);

  return (
    <Flex
      w="100%"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      {signer ? (
        <>
          <Text>{signer.address}</Text>
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={onChangeFile}
          />
          <label htmlFor="file">
            <Text bgColor={"red"}>Minting</Text>
          </label>
        </>
      ) : (
        <Button onClick={onClickMetamask}>🦊Login and Mint</Button>
      )}
    </Flex>
  );
};

export default Minting;
