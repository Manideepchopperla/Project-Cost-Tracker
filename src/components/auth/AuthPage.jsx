import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { registerUser, loginUser, loginWithGoogle, clearError } from '../../redux/slices/authSlice';
import { CircleDollarSign } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const toast = useToast();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isLogin) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .catch((err) => {
          toast({
            title: 'Login Failed',
            description: err || 'Invalid credentials',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      dispatch(registerUser({ email, password }))
        .unwrap()
        .catch((err) => {
          toast({
            title: 'Registration Failed',
            description: err || 'Could not create account',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = () => {
    dispatch(loginWithGoogle())
      .unwrap()
      .catch((err) => {
        toast({
          title: 'Google Sign In Failed',
          description: err || 'Could not sign in with Google',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    dispatch(clearError());
  };

  return (
    <Box className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Container maxW="md" centerContent>
        <VStack spacing={8} align="center" w="full">
          <Flex 
            direction="column" 
            align="center" 
            justify="center"
            bg="white"
            p={8}
            rounded="xl"
            shadow="lg"
            w="full"
          >
            <Flex 
              mb={6}
              p={4}
              bg="primary.500"
              color="white"
              rounded="full"
              w="16"
              h="16"
              justify="center"
              align="center"
            >
              <CircleDollarSign size={32} />
            </Flex>
            
            <Heading as="h1" size="xl" textAlign="center" mb={6} color="gray.800">
              Project Cost Tracker
            </Heading>
            
            <Heading as="h2" size="md" mb={6} color="gray.600" fontWeight="medium">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </Heading>
            
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Stack spacing={4} w="full">
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor="gray.300"
                  />
                </FormControl>
                
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderColor="gray.300"
                  />
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="primary"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  w="full"
                  mt={4}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </Stack>
            </form>
            
            <Flex align="center" my={6} w="full">
              <Divider />
              <Text px={3} color="gray.500" fontSize="sm">OR</Text>
              <Divider />
            </Flex>
            
            <Button
              w="full"
              variant="outline"
              leftIcon={
                <Box as="span" mr={2}>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                </Box>
              }
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
              colorScheme="gray"
            >
              Continue with Google
            </Button>
            
            <Box mt={6}>
              <Text color="gray.600" fontSize="sm" textAlign="center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  colorScheme="primary"
                  ml={2}
                  fontSize="sm"
                  onClick={toggleAuthMode}
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </Button>
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default AuthPage;