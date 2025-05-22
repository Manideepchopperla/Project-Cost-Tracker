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
import { addOtherCost, updateOtherCost } from '../../redux/slices/otherCostsSlice';

const OtherCostForm = ({ isOpen, onClose, cost, userId }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set form values when editing
  useEffect(() => {
    if (cost) {
      setDescription(cost.description || '');
      setAmount(cost.amount?.toString() || '');
    } else {
      setDescription('');
      setAmount('');
    }
  }, [cost]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!description.trim() || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: 'Invalid input',
        description: 'Please provide a valid description and amount (positive number)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    if (cost) {
      // Update existing cost
      dispatch(updateOtherCost({
        userId,
        costId: cost.id,
        description: description.trim(),
        amount: Number(amount),
      }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Cost updated',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not update cost',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Add new cost
      dispatch(addOtherCost({
        userId,
        description: description.trim(),
        amount: Number(amount),
      }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Cost added',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error || 'Could not add cost',
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
          {cost ? 'Edit Cost' : 'Add New Cost'}
        </ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <FormControl isRequired mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter cost description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
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
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="secondary" 
              mr={3} 
              type="submit"
              isLoading={isLoading}
            >
              {cost ? 'Update' : 'Add'}
            </Button>
            <Button onClick={onClose} variant="ghost">Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OtherCostForm;