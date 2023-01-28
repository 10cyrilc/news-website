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
  SkeletonCircle,
  Stack,
  HStack,
  Skeleton
} from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios';

function App() {

  const [news, setNews] = useState([])
  const [newsData, setNewsData] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const params = new URLSearchParams([["sources", process.env.REACT_APP_NEWS_API_SOURCE]])
    const header = {
      'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY
    }

    axios.get("https://newsapi.org/v2/top-headlines", { headers: header, params })
      .then(res => {
        const newsRes = res.data

        setNewsData(newsRes.status)
        setNews(newsRes.articles)
      }, [])
      .catch((e) => {
        setError(JSON.stringify(e))
      }
      )
  }, [])
  if (newsData === 'ok') {

    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <HStack pb={5} justifyContent='space-between'>
              <Heading>News</Heading>
              <ColorModeSwitcher />
            </HStack>
            <SimpleGrid spacing={6} px={3} justify='center' templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
              {news.map((newsItem, index) => {
                return (
                  <Cards keys={index} headline={newsItem.title} description={newsItem.description} linkTo={newsItem.url} imageLink={newsItem.urlToImage} published={newsItem.publishedAt} />
                )
              })}
            </SimpleGrid>
          </Grid>
        </Box>
      </ChakraProvider>
    );
  } else if (error !== null && newsData === null) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }
  else {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
      </Box>
    )
  }
}

function Cards(props) {
  return (
    <Card maxW='sm' align='center' key={props.keys}>
      <CardBody>
        <Image
          src={props.imageLink}
          alt={props.headline}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md' align='left'>{props.headline}</Heading>
          <br />
          <Text align='left' fontSize='.8em'>
            {props.description}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={props.linkTo} isExternal fontSize='.8em'>
          Read <ExternalLinkIcon boxSize="4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default App;
