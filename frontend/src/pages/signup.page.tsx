import * as yup from 'yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import Box from '../components/Box';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
import FormControl from '../components/FormControl';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { ApiClient } from '../api.client';
import { authActions } from '../store/slices/auth.slice';

const apiClient = ApiClient.getInstance();

type IForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

const yupSchema = yup
    .object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email().required('Email address is required'),
        password: yup.string().required('Password is required'),
        repeatPassword: yup
            .string()
            .required('Repeat password is required')
            .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    })
    .required();

export const SignUpPage: FC<RouteComponentProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<IForm>({
        defaultValues: {},
        resolver: yupResolver(yupSchema),
    });

    return (
        <Container>
            <Box>
                <h1>Sign Up</h1>

                <form
                    onSubmit={handleSubmit(async (val) => {
                        try {
                            const result = await apiClient.signup(val);
                            console.log(result);

                            dispatch(authActions.setToken(result.token));
                            dispatch(authActions.setUser(result.user));

                            await navigate('/');
                        } catch (err) {
                            console.error(err);
                        }
                    })}
                >
                    <FormGroup columns={2}>
                        <FormControl>
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                type="text"
                                id="firstName"
                                {...register('firstName')}
                            />
                            {errors?.firstName && (
                                <ErrorMessage>
                                    {errors.firstName.message}
                                </ErrorMessage>
                            )}
                        </FormControl>

                        <FormControl>
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                type="text"
                                id="lastName"
                                {...register('lastName')}
                            />
                            {errors?.lastName && (
                                <ErrorMessage>
                                    {errors.lastName.message}
                                </ErrorMessage>
                            )}
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormControl>
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                {...register('email')}
                            />
                            {errors?.email && (
                                <ErrorMessage>
                                    {errors.email.message}
                                </ErrorMessage>
                            )}
                        </FormControl>
                    </FormGroup>

                    <FormGroup columns={2}>
                        <FormControl>
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                {...register('password')}
                            />
                            {errors?.password && (
                                <ErrorMessage>
                                    {errors.password.message}
                                </ErrorMessage>
                            )}
                        </FormControl>

                        <FormControl>
                            <label htmlFor="repeatPassword">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                id="repeatPassword"
                                {...register('repeatPassword')}
                            />
                            {errors?.repeatPassword && (
                                <ErrorMessage>
                                    {errors.repeatPassword.message}
                                </ErrorMessage>
                            )}
                        </FormControl>
                    </FormGroup>

                    <Button type="submit" disabled={!isDirty || isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUpPage;
