import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Heading,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  HStack,
  Flex,
} from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { ProgressBar } from 'loading-animations-react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://inshorts.deta.dev/news?category=technology')
      .then(res => {
        const newsRes = res.data;
        setNews(newsRes.data);
        setLoaded(true);
      }, [])
      .catch(e => {
        setError(JSON.stringify(e));
      });
  }, []);
  if (loaded) {
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <HStack pb={5} justifyContent="space-between">
              <Heading>News</Heading>
              <ColorModeSwitcher />
            </HStack>
            <SimpleGrid
              spacing={6}
              px={3}
              justify="center"
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            >
              {news.map((newsItem, index) => {
                return (
                  <Cards
                    key={index}
                    headline={newsItem.title}
                    description={newsItem.content}
                    linkTo={newsItem.url}
                    imageLink={newsItem.imageUrl}
                    publishedDate={newsItem.date}
                    publishedTime={newsItem.time}
                  />
                );
              })}
            </SimpleGrid>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  } else if (error !== null && news === null) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  } else {
    return (
      <Flex
        height="97vh"
        width="97vw"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="30%" height="50%" fontSize={52}>
          <ProgressBar
            borderColor="#fff"
            sliderColor="#00ff00"
            sliderBackground="rgb(0,0,0)"
            text=" "
            className="loader"
          />
        </Box>
      </Flex>
    );
  }
}

function Cards(props) {
  return (
    <Card maxW="sm" align="center">
      <CardBody>
        <Image src={props.imageLink} alt={props.headline} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md" align="left">
            {props.headline}
          </Heading>
          <br />
          <Text align="left" fontSize=".8em">
            {props.description}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter fontSize="0.7em">
        Published at: {props.publishedDate} - {props.publishedTime}
      </CardFooter>
      <Divider />
      <CardFooter>
        <Link href={props.linkTo} isExternal fontSize=".8em">
          Read <ExternalLinkIcon boxSize="4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default App;
