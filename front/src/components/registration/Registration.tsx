import React, {FC} from 'react';
import styles from './Registration.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input';

import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as yup from "yup";
import {userService} from "../../services/";

const Registration: FC = () => {
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
                initialValues={{email: '', password: '', role: ''}}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    const {data} = await userService.postOne(values).catch(e => e.response);
                    if (data.message) {
                        alert(data.message)
                    } else {
                        alert('Successfully register, please login')
                        navigate('/login');
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className={styles.RegistrationBox}>
                            <div className={styles.RegistrationForm}>
                                <p>Please register</p>
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
                                <InputLabel id="demo-simple-select-label">role</InputLabel>
                                <Field
                                    name="role"
                                    as={Select}
                                    label="Role"
                                    variant="standard"
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'guest'}>Guest</MenuItem>
                                    <MenuItem value={'user'}>User</MenuItem>
                                </Field>
                                <ErrorMessage name="name" component="div"/>
                                <ErrorMessage name="password" component="div"/>
                                <Button type="submit" variant="contained">
                                    Register
                                </Button>
                                <p>If you don't have an account yet, please <Link to={'/login'}>login</Link></p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Registration;

