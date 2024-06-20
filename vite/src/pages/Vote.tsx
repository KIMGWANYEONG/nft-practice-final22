import { Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import NftCard from "../components/NftCard";
import { NftMetadata } from "..";

const Vote: FC = () => {
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const { mintContract, signer, votingContract } =
    useOutletContext<OutletContext>();

  const getBalanceOf = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const getNftMetadata = async () => {
    try {
      const temp: NftMetadata[] = [];
      const tokenIdTemp: number[] = [];

      const totalSupply = await mintContract?.totalSupply();

      for (let i = 0; i < totalSupply; i++) {
        const tokenURI = await mintContract?.tokenURI(i + 1);
        const axiosResponse = await axios.get<NftMetadata>(tokenURI);

        if (axiosResponse.data) {
          temp.push(axiosResponse.data);
          tokenIdTemp.push(Number(i + 1));
        }
      }

      setNftMetadataArray((prev) => [...prev, ...temp]);
      setTokenIds((prev) => [...prev, ...tokenIdTemp]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mintContract || !signer) return;
    getBalanceOf();
    getNftMetadata();
  }, [mintContract, signer]);

  useEffect(() => console.log(tokenIds), [tokenIds]);

  return (
    <Flex
      w="100%"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap={2}
      mt={8}
      mb={20}
      textAlign="center"
    >
      {signer ? (
        <>
          <Text></Text>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
            ]}
            gap={6}
            justifyItems="center"
          >
            {nftMetadataArray.map((v, i) => (
              <NftCard
                key={i}
                nftMetadata={v}
                tokenId={tokenIds[i]}
                votingContract={votingContract}
              />
            ))}
          </Grid>
        </>
      ) : (
        <Text>🦊You should connect MetaMask!</Text>
      )}
    </Flex>
  );
};

export default Vote;
