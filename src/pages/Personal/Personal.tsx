import { Layout } from 'antd';
import MenuList from './MenuList/MenuList';
import { Route, Routes } from 'react-router-dom';
import BreadCrumb from './BreadCrumb/BreadCrumb'
import { useLocation } from 'react-router-dom';
import "./Personal.scss"
const { Content } = Layout;

const Personal = () => {
    const { pathname } = useLocation()
    return (
        <>
            <div className="personal">
                <div className="personal__container container">
                    <Layout >
                        <MenuList />
                        <Layout >
                            <Content style={{ margin: '0 16px', }}>
                                <BreadCrumb pathname={pathname} />
                                <Routes >
                                    <Route path="/profile" element={<MenuList />} />
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