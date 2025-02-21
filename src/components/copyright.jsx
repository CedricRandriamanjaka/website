import { Text } from '@chakra-ui/react';

export const Copyright = (props) => {
  return (
    <Text fontSize="sm" color="gray.500" {...props}>
      &copy; {new Date().getFullYear()} Cedric Randriamanjaka. Tous droits réservés.
    </Text>
  );
};
