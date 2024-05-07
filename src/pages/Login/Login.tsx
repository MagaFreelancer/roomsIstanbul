import {FC} from 'react'
import TextField from '@mui/material/TextField';
import './Login.scss'
import Button, { BtnClasses } from '../../components/Button/Button';
const Login: FC = () => {
	
	return (
	<section className="login">
        <div className="login__wrapper">
            <h2 className="login__title">
                Зайти в аккаунт
            </h2>
            <form className='login__form' >
            <TextField className='login__field' label="Логин" variant="outlined" />
            <TextField className='login__field' label="Почта" variant="outlined" />
            <TextField className='login__field' label="Пароль" variant="outlined" />
            <Button cls={BtnClasses.BUTTON_BIG}>Зарегистрироваться</Button>
            </form>
        </div>
    </section>
	)
}
export default Login
