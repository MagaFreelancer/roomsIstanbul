import { FC } from 'react'
import Button from '../../Button/Button';
import { Typography, TextField } from '@mui/material';
import { IPropsRegister } from '../../../common/types/auth';
import { BtnClasses, BtnTypes } from '../../../common/types/button'
import './../Auth.scss'

const Register: FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
    const {
        navigate,
        setPassword,
        setRepeatPassword,
        setEmail,
        setFirstName,
        setUsername
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
                onChange={(e) => setFirstName(e.target.value)}

            // {...register('login', {
            //     required: 'Укажите ваш логин'
            // })}
            // error={Boolean(errors.login?.message)}
            // helperText={errors.login?.message}
            />
            <TextField
                className='register__field'
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}

            // {...register('login', {
            //     required: 'Укажите ваш логин'
            // })}
            // error={Boolean(errors.login?.message)}
            // helperText={errors.login?.message}
            />
            <TextField className='register__field'
                label="Почта"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}

                // {...register('email', {
                //     required: 'Укажите почту'
                // })}
                type='email'
            // error={Boolean(errors.email?.message)}
            // helperText={errors.email?.message}
            />
            <TextField className='register__field'
                label="Пароль"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}

            // {...register('password', {
            //     required: 'Создайте себе пароль'
            // })}
            // error={Boolean(errors.password?.message)}
            // helperText={errors.password?.message}
            />
            <TextField className='register__field'
                label="Повторите ваш пароль"
                variant="outlined"
                onChange={(e) => setRepeatPassword(e.target.value)}

            // {...register('password', {
            //     required: 'Создайте себе пароль'
            // })}
            // error={Boolean(errors.password?.message)}
            // helperText={errors.password?.message}
            />
            <Button type={BtnTypes.SUBMIT} cls={BtnClasses.BUTTON_BIG}>Зарегистрироваться</Button>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', }}>У вас ecть аккаунта?<span className="incitingText" onClick={() => navigate('/login')}>Авторизация</span></Typography>
        </>
    )
}
export default Register
