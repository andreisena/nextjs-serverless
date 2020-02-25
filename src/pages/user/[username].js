import {
  Button,
  ButtonGroup,
  Heading,
  Flex,
  Avatar
} from "@chakra-ui/core";
import axios from "axios";
import Error from 'next/error'

const Home = ({ data, error }) => {
  if (error) {
    return <Error statusCode="404" />
  }
  return (
    <Flex
      flexDir="column"
      textAlign="center"
      justifyContent="center"
      width="100%"
      padding={20}
    >
      <Avatar m="0 auto" size="xl" name={data.name} src={data.avatar_url} />
      <Heading size="xs" m={3}>
        {data.name}
      </Heading>
      <ButtonGroup>
        <Button variantColor="teal">{data.followers}</Button>
        <Button>{data.following}</Button>
      </ButtonGroup>
    </Flex>
  );
};

Home.getInitialProps = async ({ query }) => {
  const { username } = query;
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return { data };
  } catch (error) {
    return { error }
  }
};

export default Home;
