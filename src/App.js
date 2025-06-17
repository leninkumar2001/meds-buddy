import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Link,
  Heading,
  Text,
  Image,
  SimpleGrid,
  theme,
} from '@chakra-ui/react';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
import projectsData from './data/projects';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Header */}
      <Flex
        as="header"
        justify="space-between"
        p={4}
        bg="gray.800"
        color="white"
        position="fixed"
        width="100%"
        zIndex="100"
      >
        <Box>
          <Link href="#landing" mr={4}>
            Home
          </Link>
          <Link href="#projects" mr={4}>
            Projects
          </Link>
          <Link href="#contact">Contact</Link>
        </Box>
        <Box>
          <Link
            href="https://github.com/yourprofile"
            isExternal
            mr={2}
            _hover={{ textDecoration: 'underline' }}
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/yourprofile"
            isExternal
            _hover={{ textDecoration: 'underline' }}
          >
            LinkedIn
          </Link>
        </Box>
      </Flex>

      {/* Spacer to account for fixed header */}
      <Box height="60px" />

      {/* Landing Section */}
      <Box
        id="landing"
        p={10}
        textAlign="center"
        minHeight="100vh"
        bg="gray.50"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          borderRadius="full"
          boxSize="150px"
          src="/avatar.jpg"
          alt="Your Name"
          mb={4}
        />
        <Heading>Hi, I'm Your Name</Heading>
        <Text mt={2} maxW="600px">
          I am a passionate software developer specializing in React and modern
          web technologies. Welcome to my portfolio!
        </Text>
      </Box>

      {/* Projects Section */}
      <Box
        id="projects"
        p={10}
        bg="white"
        minHeight="100vh"
      >
        <Heading textAlign="center" mb={10}>
          Featured Projects
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        p={10}
        bg="gray.50"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading mb={6}>Contact Me</Heading>
        <ContactForm />
      </Box>
    </ChakraProvider>
  );
}

export default App;