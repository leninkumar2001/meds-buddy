import React from 'react';
import { Box, Image, Heading, Text, Link, HStack } from '@chakra-ui/react';

export const ProjectCard = ({
  title,
  description,
  image,
  githubLink,
  demoLink,
}) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
    <Image src={image} alt={`${title} screenshot`} borderRadius="md" mb={4} />
    <Heading size="md" mb={2}>{title}</Heading>
    <Text mb={4}>{description}</Text>
    <HStack spacing={4}>
      {githubLink && (
        <Link href={githubLink} isExternal color="blue.500" fontWeight="bold">
          GitHub
        </Link>
      )}
      {demoLink && (
        <Link href={demoLink} isExternal color="blue.500" fontWeight="bold">
          Live Demo
        </Link>
      )}
    </HStack>
  </Box>
);