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
    <Flex flexDir="column" justifyContent="center" width="100%" padding={20}>
      <Heading size="md" mb={20} textAlign="center">
        Serverless Next.js with @chakra-ui
      </Heading>
      <Box
        as="form"
        p={4}
        mx="auto"
        width="400px"
        shadow="md"
        onSubmit={handleSubmit(onSubmit)}
        novalidate
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">GitHub User</FormLabel>
          <Input
            name="name"
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
