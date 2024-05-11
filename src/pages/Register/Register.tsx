import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button, { BtnClasses, BtnTypes } from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { RegisterType, fetchRegister } from '../../redux/slices/registerSlice';
import { useAppDispatch } from '../../redux/store'
import { DataStatus } from '../../redux/slices/roomsSlice';
import { useSelector } from 'react-redux';
import { selectAuth, selectAuthS } from '../../redux/slices/authSlice';
import { fetchAuth } from '../../redux/slices/authSlice';
import './Register.scss'

const Register: FC = () => {
    const dispatch = useAppDispatch()
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
        } = useForm<RegisterType>({
            defaultValues: {
                login: "maga",
                email: "esteticnmone@gmail.com",
                password: "123",
                imageUrl: "https://media.istockphoto.com/id/1464539429/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B4%D1%83%D0%BC%D1%87%D0%B8%D0%B2%D1%8B%D0%B9-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D1%81-%D1%86%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D1%8B%D0%BC-%D0%BF%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=GUgYgV6goaJq-Pr8PMAASHniInL81Y-Bew2WETiDCoQ=",
                id: '2'
            }
        })

    const onSubmit = async (values: RegisterType) => {
        await dispatch(fetchRegister(values))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])
    if (isAuth) {
        console.log(isAuth);
        
        return <Navigate to="/" />
    }
    return (
        <section className="register">
            <div className="register__wrapper">
                <h2 className="register__title">
                    Зайти в аккаунт
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className='register__form' >
                    <TextField
                        className='register__field'
                        label="Логин"
                        variant="outlined"
                        {...register('login', {
                            required: 'Укажите ваш логин'
                        })}
                        error={Boolean(errors.login?.message)}
                        helperText={errors.login?.message}
                    />
                    <TextField className='register__field'
                        label="Почта"
                        variant="outlined"
                        {...register('email', {
                            required: 'Укажите почту'
                        })}
                        type='email'
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />
                    <TextField className='register__field'
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
export default Register
