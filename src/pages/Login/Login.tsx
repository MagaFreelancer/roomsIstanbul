import { FC } from 'react'
import TextField from '@mui/material/TextField';
import { BtnTypes } from '../../common/types/button'
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from '../../utils/yup';
import { loginUser } from '../../redux/thunk/auth';
import './Login.scss'
//2
const Login: FC = (): JSX.Element => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isloading = useAppSelector(e => e.auth.isloading)
    const {
        register,
        formState: {
            errors
        },
        handleSubmit } = useForm({
            resolver: yupResolver(LoginSchema),
        })
    const handleSubmitForm = async (data: any) => {
        try {
            await dispatch(loginUser(data))
            navigate('/')
        } catch (e) {
            return e
        }
    }

    return (
        <div className="login">
            <div className="login__wrapper">
                <form className='login__form' onSubmit={handleSubmit(handleSubmitForm)}>
                    <h2 className="login__title">
                        Зайти в аккаунт
                    </h2>
                    <TextField className='login__field'
                        label="Почта"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email ? `${errors.email.message}` : ''}
                        {...register('email')}
                    />
                    <TextField className='login__field'
                        label="Пароль"
                        variant="outlined"

                        error={!!errors.password}
                        helperText={errors.password ? `${errors.password.message}` : ''}
                        {...register('password')}
                    />
                    <LoadingButton sx={{ padding: '12px' }} type={BtnTypes.SUBMIT} loading={isloading} variant="outlined">
                        <span>Авторизоваться</span>
                    </LoadingButton>
                    <div className='auth__navigate'>
                        У вас нет аккаунта?
                        <span className="incitingText" onClick={() => navigate('/register')}>Регистрация</span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
