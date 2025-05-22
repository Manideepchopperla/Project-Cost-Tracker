import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
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
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
import { deleteItem } from '../../redux/slices/itemsSlice';
import ItemForm from './ItemForm';

const ItemsList = ({ userId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { items, isLoading } = useSelector(state => state.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Handle item edit
  const handleEdit = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  // Handle item delete
  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem({ userId, itemId }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Item deleted',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not delete item',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  // Handle add item click
  const handleAddClick = () => {
    setSelectedItem(null);
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
          bg="primary.500"
          color="white"
          p={4}
          justify="space-between"
          align="center"
        >
          <Heading size="md">Project Items</Heading>
          <Button
            leftIcon={<Plus size={16} />}
            size="sm"
            onClick={handleAddClick}
            colorScheme="whiteAlpha"
          >
            Add Item
          </Button>
        </Flex>

        {/* Content */}
        <Box p={0}>
          {isLoading ? (
            <Flex justify="center" align="center" py={10}>
              <Spinner size="lg" color="primary.500" />
            </Flex>
          ) : items.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={10}
              px={4}
              textAlign="center"
            >
              <Text color="gray.500" mb={4}>No items added yet</Text>
              <Button
                leftIcon={<Plus size={16} />}
                colorScheme="primary"
                size="sm"
                onClick={handleAddClick}
              >
                Add Your First Item
              </Button>
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Item Name</Th>
                    <Th isNumeric>Cost</Th>
                    <Th width="60px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id} _hover={{ bg: 'gray.50' }}>
                      <Td>{item.name}</Td>
                      <Td isNumeric fontWeight="medium">
                        {formatCurrency(item.cost)}
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
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<Trash2 size={16} />}
                              color="red.500"
                              onClick={() => handleDelete(item.id)}
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

      {/* Item Form Modal */}
      <ItemForm
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
        userId={userId}
      />
    </>
  );
};

export default ItemsList;