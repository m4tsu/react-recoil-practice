import {
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { FC, ReactNode } from 'react';
type Props = Pick<LinkProps, 'as' | 'href'> & {
  styles?: ChakraLinkProps;
  children?: ReactNode;
};
export const Link: FC<Props> = ({ styles, children, ...linkProps }) => {
  return (
    <NextLink {...linkProps} passHref>
      <ChakraLink _hover={{ textDecolation: 'none' }} {...styles}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};
