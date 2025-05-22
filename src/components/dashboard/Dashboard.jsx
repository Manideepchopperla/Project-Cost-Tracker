import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from '@chakra-ui/react';
import Header from '../layout/Header';
import ItemsList from '../items/ItemsList';
import OtherCostsList from '../costs/OtherCostsList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.items);
  const { costs } = useSelector(state => state.otherCosts);

  // Calculate totals
  const itemsTotal = items.reduce((total, item) => total + Number(item.cost), 0);
  const costsTotal = costs.reduce((total, cost) => total + Number(cost.amount), 0);
  const grandTotal = itemsTotal + costsTotal;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
        <Box mb={8}>
          <Heading size={{ base: 'md', md: 'lg' }} mb={6} color="gray.700">
            Project Dashboard
          </Heading>

          {/* Stats Overview for small devices (less than md) */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            mb={8}
            className="transform transition-all duration-300 hover:shadow-lg"
            display={{ base: 'block', md: 'none' }}
          >

            <Flex justify="space-between" mb={6} flexWrap="wrap" gap={4}>
              <Stat flex="1" minW="140px" textAlign="center">
                <StatLabel fontSize="sm" color="gray.600">
                  Items Total
                </StatLabel>
                <StatNumber
                  fontSize="lg"
                  color="primary.600"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(itemsTotal)}
                </StatNumber>
              </Stat>

              <Stat flex="1" minW="140px" textAlign="center">
                <StatLabel fontSize="sm" color="gray.600">
                  Other Costs
                </StatLabel>
                <StatNumber
                  fontSize="lg"
                  color="secondary.600"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(costsTotal)}
                </StatNumber>
              </Stat>
            </Flex>

            <Box textAlign="center">
              <Stat display="inline-block" textAlign="center">
                <StatLabel fontSize="sm" color="gray.600">
                  Grand Total
                </StatLabel>
                <StatNumber
                  fontSize="xl"
                  color="accent.600"
                  fontWeight="bold"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(grandTotal)}
                </StatNumber>
              </Stat>
            </Box>
          </Box>

          {/* Stats Overview for devices md and up */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            mb={8}
            className="transform transition-all duration-300 hover:shadow-lg"
            display={{ base: 'none', md: 'block' }}
          >
            <StatGroup>
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Items Total
                </StatLabel>
                <StatNumber
                  fontSize="2xl"
                  color="primary.600"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(itemsTotal)}
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Other Costs
                </StatLabel>
                <StatNumber
                  fontSize="2xl"
                  color="secondary.600"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(costsTotal)}
                </StatNumber>
              </Stat>

              <Stat>
                <StatLabel fontSize="lg" color="gray.600">
                  Grand Total
                </StatLabel>
                <StatNumber
                  fontSize="3xl"
                  color="accent.600"
                  fontWeight="bold"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  overflowWrap="break-word"
                >
                  {formatCurrency(grandTotal)}
                </StatNumber>
              </Stat>
            </StatGroup>
          </Box>

          {/* Main Content */}
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={4}
            align="stretch"
          >
            {/* Items Section */}
            <Box flex={1}>
              <ItemsList userId={user.uid} />
            </Box>

            {/* Other Costs Section */}
            <Box flex={1}>
              <OtherCostsList userId={user.uid} />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

