import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { FaKey, FaUser } from 'react-icons/fa';
import { Container, Button, Alert } from 'react-bootstrap';
import './Signin.scss';
//api
import { signInUser } from '../../api/User';
//components
import Input from '../../components/Input/Input';
//context
import { useAuthContext } from '../../contexts/AuthContext';

const SERVER_ERROR_MESSAGE = {
    heading: 'Server Error',
    message: 'An error occured has occured on the server. Please try again at a later time'
};
const CREDENTIAL_ERROR_MESSAGE = {
    message: 'The username or password you entered is incorrect.'
};

const Signin = () => {
    const { setIsAuth } = useAuthContext();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const history = useHistory();

    const handleSignIn = async (username, password) => {
        try {
            const res = await signInUser(username, password);
            if (res.status === 200) {
                setIsAuth(true);
                history.push('/');
            }
        } catch (err) {
            if (err.response.data.incorrectCredentials) {
                setErrorMsg(CREDENTIAL_ERROR_MESSAGE);
            } else {
                setErrorMsg(SERVER_ERROR_MESSAGE);
            }
            setShowAlert(true);
        }
    };

    return (
        <Container fluid className="signin-container">
            <h1 className="text-center">Sign in</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleSignIn(values.username, values.password);
                    //solution for memory leak when setSubmitting : https://github.com/formium/formik/issues/2430
                    if (window.location.pathname === '/signin') setSubmitting(false);
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className="signin-form"
                    >
                        <Alert
                            variant="danger"
                            show={showAlert}
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            {errorMsg && errorMsg.heading ? (
                                <Alert.Heading>{errorMsg.heading}</Alert.Heading>
                            ) : null}
                            {errorMsg && errorMsg.message}
                        </Alert>
                        <Field
                            name="username"
                            type="input"
                            as={Input}
                            label="Username"
                            Icon={FaUser}
                            placeholder="Enter username"
                            className="mb-1"
                        />
                        <Field
                            name="password"
                            type="password"
                            as={Input}
                            label="Password"
                            Icon={FaKey}
                            placeholder="Enter password"
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
                            Sign in
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Signin;
