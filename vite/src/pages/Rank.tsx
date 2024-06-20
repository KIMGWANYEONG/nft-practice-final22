import { Flex, Grid, Text, Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import NftCard from "../components/NftCard";

const Rank: FC = () => {
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const { mintContract, signer, votingContract } =
    useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mintContract || !signer) return;
    getNftMetadata();
  }, [mintContract, signer]);

  const getRankedNfts = () => {
    return nftMetadataArray
      .map((nft, index) => ({ nft, tokenId: tokenIds[index] }))
      .sort((a, b) => b.nft.score - a.nft.score) // 예시로 score 속성 기준 정렬
      .slice(0, 3);
  };

  const rankedNfts = getRankedNfts();

  return (
    <Flex w="100%" alignItems="center" flexDir="column" gap={6} mt={8} mb={20}>
      {signer ? (
        <>
          <Text fontSize="2xl" mb={4} textAlign="center">
            Top 3 🐱CAT🐱 Rankings
          </Text>
          {rankedNfts.length > 0 && (
            <>
              <Box textAlign="center">
                <Text fontSize="xl" mb={2} textAlign="center">
                  1st Place
                </Text>
                <NftCard
                  nftMetadata={rankedNfts[0].nft}
                  tokenId={rankedNfts[0].tokenId}
                  votingContract={votingContract}
                  style={{ transform: "scale(2)" }} // 1등 이미지 크기 조정
                />
              </Box>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                gap={6}
                mt={6}
                textAlign="center"
              >
                {rankedNfts.slice(1).map((v, i) => (
                  <Box key={i} textAlign="center">
                    <Text fontSize="xl" mb={2} textAlign="center">
                      {i + 2}nd Place
                    </Text>
                    <NftCard
                      nftMetadata={v.nft}
                      tokenId={v.tokenId}
                      votingContract={votingContract}
                    />
                  </Box>
                ))}
              </Grid>
            </>
          )}
        </>
      ) : (
        <Text textAlign="center">🦊You should connect MetaMask! </Text>
      )}
    </Flex>
  );
};

export default Rank;
