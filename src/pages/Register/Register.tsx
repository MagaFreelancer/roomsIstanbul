import { FC } from 'react'
import TextField from '@mui/material/TextField';
import './Login.scss'
import Button, { BtnClasses, BtnTypes } from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../redux/slices/authSlice';

const Login: FC = () => {
    const
        {
            register,
            handleSubmit,
            reset,
            formState: {
                errors,
            }
        } = useForm<UserAuth>({
            defaultValues: {
                login: '',
                email: '',
                password: '',
            }
        })

    const onSubmit = (data: UserAuth) => {
        console.log(data);
        reset()
    }
    return (
        <section className="login">
            <div className="login__wrapper">
                <h2 className="login__title">
                    Зайти в аккаунт
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className='login__form' >
                    <TextField
                        className='login__field'
                        label="Логин"
                        variant="outlined"
                        {...register('login', {
                            required: 'Укажите ваш логин'
                        })}
                        error={Boolean(errors.login?.message)}
                        helperText={errors.login?.message}
                    />
                    <TextField className='login__field'
                        label="Почта"
                        variant="outlined"
                        {...register('email', {
                            required: 'Укажите почту'
                        })}
                        type='email'
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />
                    <TextField className='login__field'
                        label="Пароль"
                        variant="outlined"
                        {...register('password', {
                            required: 'Создайте себе пароль'
                        })}
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                    />
                    <Button type={BtnTypes.SUBMIT} cls={BtnClasses.BUTTON_BIG}>Зарегистрироваться</Button>
                </form>
            </div>
        </section>
    )
}
export default Login
