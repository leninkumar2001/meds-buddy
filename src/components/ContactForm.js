import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';

export const ContactForm = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required'),
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  return (
    <Box width="100%" maxW="600px">
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.name && formik.errors.name} mb={4}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" {...formik.getFieldProps('name')} />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.email && formik.errors.email} mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" name="email" type="email" {...formik.getFieldProps('email')} />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.message && formik.errors.message} mb={4}>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea id="message" name="message" {...formik.getFieldProps('message')} />
          <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" isFullWidth>
          Send Message
        </Button>
      </form>
    </Box>
  );
};