import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import instance from '../../axios'
import { useAppDispatch } from '../../utils/hook'
import { login } from '../../redux/slices/auth'
import { useForm } from 'react-hook-form'
import { AppErrors } from '../../common/errors'
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginSchema } from '../../utils/yup'
const Auth = () => {
    const {
        register,
        formState: {
            errors
        },
        handleSubmit } = useForm({
            resolver: yupResolver(LoginSchema)
        })
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useAppDispatch()

    const handleSubmitForm = async (data: any) => {

        if (location.pathname === 'login') {
            try {
                const userData = {
                    email: data.email,
                    password: data.password,
                }
                const user = await instance.post('/auth', userData)
                await dispatch(login(user))
            } catch (e) {
                return e
            }

        } else {
            if (password === repeatPassword) {
                try {
                    const userData = {
                        email,
                        password,
                        firstName,
                        username,
                        createDate: new Date(),
                        imageUrl: "https://healingarts.ru/wp-content/uploads/2015/10/72f211u-960.jpg"
                    }
                    const user = await instance.post('/register', userData)
                    await dispatch(login(user))
                } catch (e) {
                    throw Error(AppErrors.PasswordDoNotMatch)
                }
            }
        }
    }


    return (
        <div className="auth">
            <div className="auth__wrapper">
                <form className='auth__form' onSubmit={handleSubmit(handleSubmitForm)}>
                    {
                        location.pathname === '/login'
                            ? <Login
                                setEmail={setEmail}
                                setPassword={setPassword}
                                navigate={navigate}
                                register={register}
                                errors={errors}
                            />
                            : location.pathname === '/register'
                                ?
                                <Register
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    setRepeatPassword={setRepeatPassword}
                                    setFirstName={setFirstName}
                                    setUsername={setUsername}
                                    navigate={navigate} />
                                : null
                    }
                </form>
            </div>
        </div>
    )
}

export default Auth