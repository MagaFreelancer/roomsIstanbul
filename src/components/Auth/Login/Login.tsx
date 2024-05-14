
import { FC } from 'react'
import Button from '../../Button/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IPropsLogin } from '../../../common/types/auth';
import { BtnClasses, BtnTypes } from '../../../common/types/button'
import './../Auth.scss'

const Login: FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const { navigate, setEmail, setPassword } = props;
    return (
        <>
            <h2 className="login__title">
                Зайти в аккаунт
            </h2>
            <TextField className='login__field'
                label="Почта"
                variant="outlined"
                // {...register('email', {
                //     required: 'Укажите почту'
                // })}
                type='email'
                onChange={(e) => setEmail(e.target.value)}
            // error={Boolean(errors.email?.message)}
            // helperText={errors.email?.message}
            />
            <TextField className='login__field'
                label="Пароль"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
            // {...register('password', {
            //     required: 'Создайте себе пароль'
            // })}
            // error={Boolean(errors.password?.message)}
            // helperText={errors.password?.message}
            />
            <Button type={BtnTypes.SUBMIT} cls={BtnClasses.BUTTON_BIG}>Авторизоваться</Button>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', }}>
                У вас нет аккаунта?
                <span className="incitingText" onClick={() => navigate('/register')}>Регистрация</span>
            </Typography>
        </>
    )
}
export default Login
