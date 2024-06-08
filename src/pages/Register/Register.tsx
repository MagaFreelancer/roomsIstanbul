import { FC } from 'react'
import { TextField } from '@mui/material';
import { BtnTypes } from '../../common/types/button'
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { useForm } from 'react-hook-form';
import { AppErrors } from '../../common/errors';
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from '../../utils/yup';
import { registerUser } from '../../redux/thunk/auth';

import './Register.scss'
//2
const Register: FC = (): JSX.Element => {
    const { isLogged } = useAppSelector(e => e.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isloading = useAppSelector(e => e.auth.isloading)
    if (isLogged) {
        navigate('/')
    }
    const {
        register,
        formState: {
            errors
        },
        handleSubmit } = useForm({
            resolver: yupResolver(RegisterSchema),
        })
    const handleSubmitForm = async (data: any) => {
        if (data.password === data.confirmPassword) {
            try {
                const userData = {
                    email: data.email,
                    password: data.password,
                    firstName: data.name,
                    username: data.username,
                    favorite: [],
                    imageUrl: ''
                }
                await dispatch(registerUser(userData))
                navigate('/')
            } catch (e) {
                return e
            }
        }
        else {
            throw Error(AppErrors.PasswordDoNotMatch)
        }
    }
    return (
        <div className="register">
            <div className="register__wrapper">
                <form  className='register__form' onSubmit={handleSubmit(handleSubmitForm)}>
                    <h2 className="register__title">
                        Зарегистрировать аккаунт
                    </h2>
                    <TextField
                        className='register__field'
                        label="Имя"
                        variant="outlined"
                        error={!!errors.firstName?.message}
                        helperText={errors.firstName ? `${errors.firstName.message}` : ''}
                        {...register('firstName')}
                    />
                    <TextField
                        className='register__field'
                        label="Username"
                        variant="outlined"
                        error={!!errors.username?.message}
                        helperText={errors.username ? `${errors.username.message}` : ''}
                        {...register('username')}

                    />
                    <TextField className='register__field'
                        label="Почта"
                        variant="outlined"
                        type='email'
                        error={!!errors.email?.message}
                        helperText={errors.email ? `${errors.email.message}` : ''}
                        {...register('email')}
                    />
                    <TextField className='register__field'
                        label="Пароль"
                        variant="outlined"
                        error={!!errors.password?.message}
                        helperText={errors.password ? `${errors.password.message}` : ''}
                        {...register('password')}
                    />
                    <TextField className='register__field'
                        label="Повторите ваш пароль"
                        variant="outlined"
                        error={!!errors.confirmPassword?.message}
                        helperText={errors.confirmPassword ? `${errors.confirmPassword.message}` : ''}
                        {...register('confirmPassword')}
                    />
                    <LoadingButton type={BtnTypes.SUBMIT} sx={{ padding: '12px' }} loading={isloading} variant="outlined">
                        <span>Зарегистрироваться</span>
                    </LoadingButton>
                    <div className='auth__navigate'>
                        У вас ecть аккаунт?
                        <span className="incitingText" onClick={() => navigate('/login')}>Авторизация</span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register
