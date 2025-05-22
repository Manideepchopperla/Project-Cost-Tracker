import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useDisclosure,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from '@chakra-ui/react';
import { MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
import { deleteOtherCost } from '../../redux/slices/otherCostsSlice';
import OtherCostForm from './OtherCostForm';

const OtherCostsList = ({ userId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { costs, isLoading } = useSelector(state => state.otherCosts);
  const [selectedCost, setSelectedCost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Handle cost edit
  const handleEdit = (cost) => {
    setSelectedCost(cost);
    onOpen();
  };

  // Handle cost delete
  const handleDelete = (costId) => {
    if (window.confirm('Are you sure you want to delete this cost?')) {
      dispatch(deleteOtherCost({ userId, costId }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Cost deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not delete cost',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  // Handle add cost click
  const handleAddClick = () => {
    setSelectedCost(null);
    onOpen();
  };

  return (
    <>
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
        height="100%"
        className="transform transition-all duration-300 hover:shadow-lg"
      >
        {/* Header */}
        <Flex
          bg="secondary.500"
          color="white"
          p={4}
          justify="space-between"
          align="center"
        >
          <Heading size="md">Other Costs</Heading>
          <Button
            leftIcon={<Plus size={16} />}
            size="sm"
            onClick={handleAddClick}
            colorScheme="whiteAlpha"
          >
            Add Cost
          </Button>
        </Flex>

        {/* Content */}
        <Box p={0}>
          {isLoading ? (
            <Flex justify="center" align="center" py={10}>
              <Spinner size="lg" color="secondary.500" />
            </Flex>
          ) : costs.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={10}
              px={4}
              textAlign="center"
            >
              <Text color="gray.500" mb={4}>No other costs added yet</Text>
              <Button
                leftIcon={<Plus size={16} />}
                colorScheme="secondary"
                size="sm"
                onClick={handleAddClick}
              >
                Add Your First Cost
              </Button>
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Description</Th>
                    <Th isNumeric>Amount</Th>
                    <Th width="60px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {costs.map((cost) => (
                    <Tr key={cost.id} _hover={{ bg: 'gray.50' }}>
                      <Td>{cost.description}</Td>
                      <Td isNumeric fontWeight="medium">
                        {formatCurrency(cost.amount)}
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={16} />}
                            variant="ghost"
                            size="sm"
                            aria-label="Options"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<Edit size={16} />}
                              onClick={() => handleEdit(cost)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<Trash2 size={16} />}
                              color="red.500"
                              onClick={() => handleDelete(cost.id)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Box>

      {/* Cost Form Modal */}
      <OtherCostForm
        isOpen={isOpen}
        onClose={onClose}
        cost={selectedCost}
        userId={userId}
      />
    </>
  );
};

export default OtherCostsList;