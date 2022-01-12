import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import useFetch from "use-http";
import { TiClipboard } from "react-icons/ti";

export default function Home() {
  const inputRef = useRef(null);
  const shortApi = useFetch("/api/short");
  const [host, setHost] = useState("");
  const shortLink = () => {
    let link = inputRef.current.value;
    shortApi.post({ link }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    setHost(window.location.host);
  }, []);
  return (
    <Box maxW="lg" m="0 auto">
      <Box mt={12} bg="gray.100" rounded="lg">
        <Box
          py={5}
          px={3}
          roundedTop={"lg"}
          bgGradient="linear(to-r, blue.300, blue.500)"
          color="white"
        >
          <Heading size="md">Link Shortner</Heading>
        </Box>
        <Box py={4} px={6}>
          <Text color={"gray.500"} fontSize="sm">
            Enter your link to make it short.
          </Text>
          <Input
            ref={inputRef}
            placeholder="Enter your link"
            mt={4}
            variant={"flushed"}
          />
          <Button mt={4} colorScheme={"blue"} onClick={shortLink}>
            Short
          </Button>
          <HStack>
            <Box mt={4}>
              <Text>http://localhost:3000/{shortApi.data?.code}</Text>
            </Box>
            <Spacer />
            <CopyToClipboard text={`host/${shortApi.data?.code}`}>
              <Box fontSize={"3xl"} cursor={"pointer"}>
                <TiClipboard />
              </Box>
            </CopyToClipboard>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
