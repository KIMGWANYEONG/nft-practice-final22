import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
    >
      <Image
        maxWidth={850}
        maxHeight={1000}
        src="/images/winnercat.jpg"
        alt="KING"
      />
      <Flex></Flex>
    </Flex>
  );
};

export default Home;
