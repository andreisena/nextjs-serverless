import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  Stack,
  PseudoBox
} from "@chakra-ui/core";
import axios from "axios";
import Error from "next/error";
import Head from "next/head";
import { GoRepoForked, GoStar } from "react-icons/go";

import colors from "../../utils/colors";

const Repo = ({ repo, ...rest }) => {
  return (
    <Box
      p={5}
      pos="relative"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.300"
      borderRadius="md"
      {...rest}
    >
      <Heading fontSize="lg">
        <PseudoBox
          as="a"
          href={`https://github.com/${repo.full_name}`}
          target="_blank"
          rel="noopener"
          color="blue.700"
          _hover={{ color: "blue.500" }}
        >
          {repo.name}
        </PseudoBox>
      </Heading>
      {repo.fork && (
        <Badge variantColor="green" pos="absolute" top={4} right={4}>
          Fork
        </Badge>
      )}
      {!!repo.description ? (
        <Text mt={4}>{repo.description}</Text>
      ) : (
        <Text as="em" mt={4} display="inline-block">
          No description provided.
        </Text>
      )}
      <Flex mt={4}>
        {repo.language && (
          <Flex mr={5} alignItems="center">
            <Box
              display="inline-flex"
              size={3}
              mr={1}
              borderRadius="full"
              backgroundColor={colors[repo.language] || "gray.700"}
            />
            <Text as="span" fontSize="xs" color="gray.700">
              {repo.language}
            </Text>
          </Flex>
        )}
        {repo.stargazers_count > 0 && (
          <Flex mr={5} alignItems="center">
            <Box as={GoStar} size="16px" mr={1} color="gray.700" />
            <Text as="span" fontSize="xs" color="gray.700">
              {repo.stargazers_count}
            </Text>
          </Flex>
        )}
        {repo.forks_count > 0 && (
          <Flex mr={5} alignItems="center">
            <Box as={GoRepoForked} size="16px" mr={1} color="gray.700" />
            <Text as="span" fontSize="xs" color="gray.700">
              {repo.forks_count}
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

const Home = ({ info, repos, error }) => {
  if (error) {
    return <Error statusCode="404" />;
  }

  return (
    <Box px={[4, 20]} mb={[4, 20]}>
      <Head>
        <title>GitHub Info - User @{info.login}</title>
        <meta
          name="description"
          content={info.bio || `GitHub information of @${info.login}.`}
        />
      </Head>
      <Flex justifyContent="center" my={[10, 20]}>
        <Avatar name={info.name} src={info.avatar_url} />
        <Box ml="3">
          <Text fontWeight="bold">{info.name}</Text>
          {!!info.company && <Text fontSize="sm">{info.company}</Text>}
          <Badge ml="1" variantColor="green">
            {info.followers} followers
          </Badge>
          <Badge ml="1" variantColor="blue">
            {info.following} following
          </Badge>
        </Box>
      </Flex>
      <Stack spacing={4}>
        {repos.map(repo => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </Stack>
    </Box>
  );
};

Home.getInitialProps = async ({ query }) => {
  const { username } = query;

  const apiGet = async url => {
    const response = await axios.get(url);
    return response.data;
  };

  try {
    const [info, repos] = await axios.all([
      apiGet(`https://api.github.com/users/${username}`),
      apiGet(`https://api.github.com/users/${username}/repos`)
    ]);

    return { info, repos };
  } catch (error) {
    return { error };
  }
};

export default Home;
