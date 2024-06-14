import { Flex } from "@chakra-ui/react";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex h={60} bgColor="orange.200">
       고양이 자랑터에 대한 설명 gif 이미지 반짝반짝하게
      </Flex>
    </Flex>
  );
};

export default Home;
