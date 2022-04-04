import * as yup from 'yup';
import { FC } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '../components/Box';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
import FormControl from '../components/FormControl';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';
import { ApiClient } from '../api.client';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/slices/auth.slice';

const apiClient = ApiClient.getInstance();

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export const LoginPage: FC<RouteComponentProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<{
        email: string;
        password: string;
    }>({
        resolver: yupResolver(schema),
    });

    return (
        <Container>
            <Box>
                <h1>Login</h1>

                <form
                    onSubmit={handleSubmit(async (val) => {
                        try {
                            const { token, user } = await apiClient.login(
                                val.email,
                                val.password,
                            );
                            dispatch(authActions.setToken(token));
                            dispatch(authActions.setUser(user));

                            await navigate('/');
                        } catch (err) {
                            console.log(err);
                        }
                    })}
                >
                    <FormGroup>
                        <FormControl>
                            <label htmlFor="email">Email Address</label>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <ErrorMessage>
                                    {errors.email.message}
                                </ErrorMessage>
                            )}
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormControl>
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                placeholder="test1234"
                                {...register('password')}
                            />
                            {errors.password && (
                                <ErrorMessage>
                                    {errors.password.message}
                                </ErrorMessage>
                            )}
                        </FormControl>
                    </FormGroup>

                    <Button type="submit" disabled={!isDirty || isSubmitting}>
                        {isSubmitting ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
