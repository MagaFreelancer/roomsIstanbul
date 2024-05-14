import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import instance from '../../axios'
import { useAppDispatch } from '../../utils/hook'
import { login } from '../../redux/slices/auth'

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (location.pathname === 'login') {
            const userData = {
                email,
                password,
            }
            const { data } = await instance.post('/auth', userData)
            await dispatch(login(data))
            console.log(data);

        } else {
            if (password === repeatPassword) {
                const userData = {
                    email,
                    password,
                    firstName,
                    username,
                    createDate: new Date(),
                    imageUrl: "https://healingarts.ru/wp-content/uploads/2015/10/72f211u-960.jpg"
                }
                const { data } = await instance.post('/register', userData)
                await dispatch(login(data))
                console.log(data);
            }
        }
    }


    return (
        <div className="auth">
            <div className="auth__wrapper">
                <form className='auth__form' onSubmit={handleSubmit}>
                    {
                        location.pathname === '/login'
                            ? <Login setEmail={setEmail} setPassword={setPassword} navigate={navigate} />
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