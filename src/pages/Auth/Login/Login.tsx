import { FC } from 'react'
import TextField from '@mui/material/TextField';
import { IPropsLogin } from '../../../common/types/auth';
import { BtnTypes } from '../../../common/types/button'
import LoadingButton from '@mui/lab/LoadingButton';
import './../Auth.scss'

const Login: FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const { navigate, register, errors, loading } = props;
    return (
        <>
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
            <LoadingButton sx={{ padding: '12px' }} type={BtnTypes.SUBMIT} loading={loading} variant="outlined">
                <span>Авторизоваться</span>
            </LoadingButton>
            <div className='auth__navigate'>
                У вас нет аккаунта?
                <span className="incitingText" onClick={() => navigate('/register')}>Регистрация</span>
            </div>
        </>
    )
}
export default Login
