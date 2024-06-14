import { FC } from 'react';
import { Layout } from 'antd';
import MenuList from './MenuList/MenuList';
import { Route, Routes } from 'react-router-dom';
import BreadCrumb from './BreadCrumb/BreadCrumb'
import { useLocation } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../utils/hook';
import PaymentPage from './PaymentPage/PaymentPage';
import "./Personal.scss"

const { Content } = Layout;

const Personal: FC = (): JSX.Element => {
    const { pathname } = useLocation()
    const { user, isloading, isLogged } = useAppSelector(e => e.auth)


    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="personal">
                <div className="personal__container container">
                    <Layout >
                        <MenuList />
                        <Layout >
                            <Content className='personal__wrapper' style={{ margin: '0 16px', }}>
                                <div className="personal__header">
                                    <BreadCrumb pathname={pathname} />
                                </div>
                                <Routes >
                                    <Route path="/profile" element={<ProfilePage user={user.data} isLogged={isLogged} />} />
                                    <Route path="/payment" element={<PaymentPage user={user.data} isLogged={isLogged} />} />
                                </Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        </>
    )
}

export default Personal