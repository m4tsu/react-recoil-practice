import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Link } from '@/components/ui/Link';

type Props = {
  children: ReactNode;
};
export const AppLayout = ({ children }: Props) => {
  return (
    <Flex direction="column" minHeight="100vh" gap="10">
      <Box
        as="nav"
        py="4"
        bgColor="blackAlpha.700"
        color="white"
        position="sticky"
        top="0"
      >
        <Container maxW="4xl">
          <Flex justifyContent="space-between">
            <Link href="/">
              <Text as="h2" fontWeight="bold" fontSize="3xl">
                Top
              </Text>
            </Link>

            <Flex gap="4">
              <Link
                href="/populationChanges"
                styles={{
                  display: 'flex',
                  px: '4',
                  alignItems: 'center',
                  _hover: {
                    textDecoration: 'underline',
                    textDecorationColor: 'white',
                  },
                }}
              >
                <Text>人口推移ページへ</Text>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box as="main">
        <Container maxW="4xl">{children}</Container>
      </Box>
    </Flex>
  );
};
