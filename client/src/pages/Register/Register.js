import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { FaKey, FaUser } from 'react-icons/fa';
import { Container, Button, Alert } from 'react-bootstrap';
import './Register.scss';
//api
import { addUser } from '../../api/User';
//component
import Input from '../../components/Input/Input';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required.'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters.'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required.')
        .oneOf([yup.ref('password'), null], 'Passwords must match.')
});

const Register = () => {
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();
    return (
        <Container fluid className="register-container">
            <h1 className="text-center">Register</h1>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        const res = await addUser(values.username, values.password);
                        if (res.status === 201) {
                            history.push('/signin');
                        }
                    } catch (err) {
                        if (err.response.data.userExists) {
                            setStatus({ username: 'Username already exists.' });
                        } else {
                            setShowAlert(true);
                        }
                    }
                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, touched, status, handleSubmit }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className="register-form"
                    >
                        <Alert
                            variant="danger"
                            show={showAlert}
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            <Alert.Heading>Server Error</Alert.Heading>
                            An error occured has occured on the server. Please try again at a later
                            time.
                        </Alert>
                        <Field
                            name="username"
                            type="input"
                            as={Input}
                            label="Username"
                            Icon={FaUser}
                            placeholder="Enter username"
                            error={
                                (status && status.username) ||
                                (touched['username'] && errors['username'])
                            }
                            className="mb-1"
                        />
                        <Field
                            name="password"
                            type="password"
                            as={Input}
                            label="Password"
                            Icon={FaKey}
                            placeholder="Enter password"
                            error={touched['password'] && errors['password']}
                            className="mb-1"
                        />
                        <Field
                            name="confirmPassword"
                            type="password"
                            as={Input}
                            label="Confirm Password"
                            Icon={FaKey}
                            placeholder="Confirm password"
                            error={touched['confirmPassword'] && errors['confirmPassword']}
                            className="mb-1"
                        />
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="danger"
                            size="lg"
                            block
                            className="mt-3"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Register;
