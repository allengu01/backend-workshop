import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Image,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';

const MemberFormModal = ({ isModalOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input
              placeholder="Role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              placeholder="Image"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onSubmit(name, role, image)}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MemberCard = ({ name, role, image }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Image
            src={`./assets/${image}`}
            width="200px"
            height="200px"
            objectFit="contain"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Role
            </Heading>
            <Text pt="2" fontSize="sm">
              {role}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

const App = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const data = (await axios.get('http://localhost:4000/members')).data;
    console.log(data);
    setMembers(data);
    setLoading(false);
  };

  const addMember = async (name, role, image) => {
    const data = {
      name,
      role,
      image,
    };
    await axios.post('http://localhost:4000/members', data);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {isLoading ? (
            <Spinner />
          ) : (
            <VStack spacing={8}>
              {members.map(m => {
                return (
                  <MemberCard name={m.name} role={m.role} image={m.image} />
                );
              })}
              <IconButton
                icon={<AddIcon />}
                onClick={() => setModalOpen(true)}
              />
            </VStack>
          )}
        </Grid>
      </Box>
      <MemberFormModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addMember}
      />
    </ChakraProvider>
  );
};

export default App;
