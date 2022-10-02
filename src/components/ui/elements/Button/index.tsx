import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

type Props = ButtonProps;
export const Button: FC<Props> = (props) => {
  return <ChakraButton {...props} />;
};
