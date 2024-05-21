import { FC } from 'react'
import { TextField } from '@mui/material';
import { IPropsRegister } from '../../../common/types/auth';
import { BtnTypes } from '../../../common/types/button'
import LoadingButton from '@mui/lab/LoadingButton';
import './../Auth.scss'

const Register: FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
    const {
        navigate,
        errors,
        register,
        loading
    } = props

    return (
        <>
            <h2 className="register__title">
                Зарегистрировать аккаунт
            </h2>
            <TextField
                className='register__field'
                label="Имя"
                variant="outlined"
                error={!!errors.name?.message}
                helperText={errors.name ? `${errors.name.message}` : ''}
                {...register('name')}
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
            <LoadingButton type={BtnTypes.SUBMIT} sx={{ padding: '12px' }} loading={loading} variant="outlined">
                <span>Зарегистрироваться</span>
            </LoadingButton>
            <div className='auth__navigate'>
                У вас ecть аккаунт?
                <span className="incitingText" onClick={() => navigate('/login')}>Авторизация</span>
            </div>
        </>
    )
}
export default Register
