import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "./api";
import { useState } from "react";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const RunCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast({
        title: "An error occured.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="50%">
      <Text mb={2} fontSize="large">
        Output:
      </Text>
      <Button
        variant="outline"
        colorScheme="#F5F5DC"
        mb={4}
        onClick={RunCode}
        isLoading={isLoading}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        color={isError ? "red" : "#F5F5DC"}
        borderColor={isError ? "red" : "#F5F5DC"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
