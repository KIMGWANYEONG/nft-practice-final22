import { FC, useEffect, useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { NftMetadata } from "../types";

interface NftCardProps {
  nftMetadata: NftMetadata;
  tokenId: number;
  votingContract: Contract | null;
}

const NftCard: FC<NftCardProps> = ({
  nftMetadata,
  tokenId,
  votingContract,
}) => {
  const [votes, setVotes] = useState<number>(0);

  const getTokenVotes = async () => {
    try {
      if (!votingContract) return;
      const votes = await votingContract.getTokenVotes(tokenId);
      setVotes(Number(votes));
    } catch (error) {
      console.error("Error fetching token votes:", error);
    }
  };

  const vote = async () => {
    try {
      if (!votingContract) return;
      const tx = await votingContract.vote(tokenId);
      await tx.wait(); // 트랜잭션이 완료될 때까지 대기
      getTokenVotes(); // 투표 수를 업데이트
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    getTokenVotes();
  }, [votingContract, tokenId]);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      <Image src={nftMetadata.image} alt={nftMetadata.name} boxSize="200px" />
      <Text mt="2" fontWeight="bold" as="h4" lineHeight="tight">
        {nftMetadata.name}
      </Text>
      <Text mt="2">{votes} Votes</Text>
      <Button mt="2" onClick={vote}>
        Vote
      </Button>
    </Box>
  );
};

export default NftCard;
