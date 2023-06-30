import React, {FC} from 'react';
import styles from './Login.module.css';
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input';
import * as yup from 'yup';

import {authService} from "../../services";
import {useAppDispatch} from "../../hooks/redux.hook";

const Login: FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email address').required('Email is required for filling'),
        password: yup.string().min(6, 'The password must contain at least 6 characters').required('Password is required to fill in'),
    });

    return (
        <div>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const {data} = await authService.login(values).catch(e => e.response);
                    if (data.message) {
                        alert(data.message)
                    } else {
                        localStorage.setItem('access_token', data.access_token);
                        navigate('/')
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className={styles.LoginBox}>
                            <div className={styles.LoginForm}>
                                <p>Please login</p>
                                <Field type="email" name="email" as={TextField} label="email" variant="standard"/>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        as={Input}
                                        id="standard-adornment-password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <ErrorMessage name="name" component="div"/>
                                <ErrorMessage name="password" component="div"/>
                                <Button type="submit" variant="contained">
                                    Login
                                </Button>
                                <p>If you do not have an account yet, please <Link to={'/registration'}>register</Link>
                                </p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default Login;
