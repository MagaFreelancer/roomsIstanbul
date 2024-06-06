import { Breadcrumb, Layout, theme } from 'antd';
import MenuList from './MenuList/MenuList';
const { Content } = Layout;

import "./Personal.scss"

const Personal = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                                <div
                                    style={{
                                        padding: 24,
                                        minHeight: 360,
                                        background: colorBgContainer,
                                        borderRadius: borderRadiusLG,
                                    }}
                                >
                                    Bill is a cat.
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        </>
    )
}

export default Personal