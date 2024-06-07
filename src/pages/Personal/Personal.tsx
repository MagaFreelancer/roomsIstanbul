import { Breadcrumb, Layout } from 'antd';
import MenuList from './MenuList/MenuList';
const { Content } = Layout;

import "./Personal.scss"
import { Route, Routes } from 'react-router-dom';

const Personal = () => {
   

    return (
        <>
            <div className="personal">
                <div className="personal__container container">
                    <Layout >
                        <MenuList />
                        <Layout >
                            <Content style={{ margin: '0 16px', }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>User</Breadcrumb.Item>
                                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                </Breadcrumb>
                                <Routes >
                                    <Route path="/profile" element={ <MenuList />} />
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