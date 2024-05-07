import { FC } from 'react'
import TextField from '@mui/material/TextField';
import Button, { BtnClasses, BtnTypes } from '../../components/Button/Button';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { selectAuth } from '../../redux/slices/authSlice';
import { fetchAuth } from '../../redux/slices/authSlice';
import './Login.scss'


const Login: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectAuth);
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
                email: '',
                password: '',
            }
        })

    const onSubmit = (data: UserAuth) => {
        getAuth(data)
        reset()

    }
    const getAuth = async (params: UserAuth) => {
        console.log(params);
        
        dispatch(fetchAuth(params))
    }
    if (isAuth) {
        return <Navigate to="/" />
    }
    return (
        <section className="login">
            <div className="login__wrapper">
                <h2 className="login__title">
                    Зайти в аккаунт
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className='login__form' >
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
                    <Button type={BtnTypes.SUBMIT} cls={BtnClasses.BUTTON_BIG}>Авторизоваться</Button>
                </form>
            </div>
        </section>
    )
}
export default Login
