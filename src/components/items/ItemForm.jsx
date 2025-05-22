import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { DollarSign } from 'lucide-react';
import { addItem, updateItem } from '../../redux/slices/itemsSlice';

const ItemForm = ({ isOpen, onClose, item, userId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set form values when editing
  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setCost(item.cost?.toString() || '');
    } else {
      setName('');
      setCost('');
    }
  }, [item]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim() || !cost || isNaN(Number(cost)) || Number(cost) <= 0) {
      toast({
        title: 'Invalid input',
        description: 'Please provide a valid name and cost (positive number)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    if (item) {
      // Update existing item
      dispatch(updateItem({
        userId,
        itemId: item.id,
        name: name.trim(),
        cost: Number(cost),
      }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Item updated',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setName('');
          setCost('');
          onClose();
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not update item',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
          
        });
    } else {
      // Add new item
      dispatch(addItem({
        userId,
        name: name.trim(),
        cost: Number(cost),
      }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Item added',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setName('');
          setCost('');
          onClose();
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not add item',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(5px)"
      />
      <ModalContent>
        <ModalHeader>
          {item ? 'Edit Item' : 'Add New Item'}
        </ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <FormControl isRequired mb={4}>
              <FormLabel>Item Name</FormLabel>
              <Input
                placeholder="Enter item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Cost</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<DollarSign size={16} color="gray" />}
                />
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="primary" 
              mr={3} 
              type="submit"
              isLoading={isLoading}
            >
              {item ? 'Update' : 'Add'}
            </Button>
            <Button onClick={onClose} variant="ghost">Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ItemForm;