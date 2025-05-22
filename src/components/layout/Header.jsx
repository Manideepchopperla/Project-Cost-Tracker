import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { ChevronDownIcon, LogOut, CircleDollarSign } from 'lucide-react';
import { logoutUser } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box
      as="header"
      // bg="green.600"
      color="white"
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
      className="transition-all bg-blue-950 duration-300"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <CircleDollarSign size={28} className="mr-2" />
            <Heading size="md" fontWeight="bold">Project Cost Tracker</Heading>
          </Flex>

          <Flex align="center" >
            {user && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon className='text-white mt-1' />}
                  variant="ghost"
                  _hover={{ bg: 'green.700' }}
                  _active={{ bg: 'green.800' }}
                >
                  <Flex align="center">
                    <Avatar
                      size="sm"
                      name={user.email}
                      bg="secondary.500"
                      color="white"
                      mr={2}
                    />
                    <Text className='text-white' fontSize="sm" display={{ base: 'none', md: 'block' }}>
                      {user.email}
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList bg="white" color="gray.800">
                  <MenuItem
                    icon={<LogOut size={16} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;