
import { FC, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button, { BtnClasses, BtnTypes } from '../../components/Button/Button';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {
    selectAuth, UserAuth,
    fetchAuth,
    selectAuthS
} from '../../redux/slices/authSlice';
import { DataStatus } from "../../redux/slices/roomsSlice"
import './Login.scss'

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectAuth);
    const { data, status } = useSelector(selectAuthS)


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

    const onSubmit = async (values: UserAuth) => {
        await dispatch(fetchAuth(values))
        reset()

    }


    useEffect(() => {
        if (status !== DataStatus.LOADING) {
            if (isAuth) {
                localStorage.setItem('token', data!.token)
                localStorage.setItem('data', JSON.stringify(data))
            }
        }
    }, [status])
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
