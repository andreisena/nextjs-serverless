import { useState } from "react";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/core";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import Head from "next/head";

const Home = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = data => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/user/[username]", `/user/${data.name}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      width="100%"
      px={[4, 20]}
      my={20}
    >
      <Head>
        <title>GitHub User Info - Serverless Next.js Example</title>
      </Head>
      <Heading size="lg" textAlign="center">
        GitHub User Info
      </Heading>
      <Heading size="xs" mt={2} textAlign="center">
        Serverless Next.js Example
      </Heading>
      <Box
        as="form"
        p={4}
        mx="auto"
        mt={[10, 20]}
        width={["100%", "400px"]}
        shadow="md"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.100"
        borderRadius="md"
        onSubmit={handleSubmit(onSubmit)}
        novalidate
      >
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">GitHub User</FormLabel>
          <Input
            name="name"
            placeholder="Type your GitHub username"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,38}$/i,
                message: "Invalid GitHub username"
              }
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          variantColor="teal"
          mt={4}
          isLoading={isSubmitting}
          isFullWidth
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;
