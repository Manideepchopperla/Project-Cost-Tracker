import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Spinner, useDisclosure } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser } from './redux/slices/authSlice';
import { fetchItems, clearItems } from './redux/slices/itemsSlice';
import { fetchOtherCosts, clearOtherCosts } from './redux/slices/otherCostsSlice';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(setUser({
          uid: user.uid,
          email: user.email
        }));
        
        // Fetch user's items and costs
        dispatch(fetchItems(user.uid));
        dispatch(fetchOtherCosts(user.uid));
      } else {
        // User is signed out
        dispatch(setUser(null));
        dispatch(clearItems());
        dispatch(clearOtherCosts());
      }
      setInitializing(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  if (initializing) {
    return (
      <Flex h="100vh" justify="center" align="center">
        <Spinner size="xl" color="primary.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      {user ? <Dashboard /> : <AuthPage />}
    </Box>
  );
}

export default App;