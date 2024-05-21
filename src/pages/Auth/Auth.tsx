import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { useForm } from 'react-hook-form';
import { AppErrors } from '../../common/errors';
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, RegisterSchema } from '../../utils/yup';
import { loginUser, registerUser } from '../../redux/thunk';


const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isloading = useAppSelector(e => e.auth.isloading)

    const {
        register,
        formState: {
            errors
        },
        handleSubmit } = useForm({
            resolver: yupResolver(
                location.pathname === '/login' ? LoginSchema : RegisterSchema,
            ),
        })
    const handleSubmitForm = async (data: any) => {

        if (location.pathname === '/login') {
            try {
                await dispatch(loginUser(data))
                navigate('/')
            } catch (e) {
                return e
            }
        } else {
            if (data.password === data.confirmPassword) {
                try {
                    const userData = {
                        email: data.email,
                        password: data.password,
                        firstName: data.name,
                        username: data.username,
                    }
                    await dispatch(registerUser(userData))
                    navigate('/')
                } catch (e) {
                    console.log(e);
                    return e
                }
            }
            else {
                throw Error(AppErrors.PasswordDoNotMatch)
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
                                navigate={navigate}
                                register={register}
                                errors={errors}
                                loading={isloading}
                            />
                            : location.pathname === '/register'
                                ?
                                <Register
                                    errors={errors}
                                    navigate={navigate}
                                    loading={isloading}
                                    register={register}
                                />
                                : null
                    }
                </form>
            </div>
        </div>
    )
}

export default Auth