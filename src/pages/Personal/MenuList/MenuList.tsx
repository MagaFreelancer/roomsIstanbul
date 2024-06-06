import React, { useState } from 'react'
import {
    HistoryOutlined,
    LogoutOutlined,
    MoonOutlined,
    PayCircleOutlined,
    ProfileOutlined,
    QrcodeOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/profile">Профиль</Link>, 'home', <UserOutlined />),
    getItem(<Link to="/payment">Платежи</Link>, 'payment', <PayCircleOutlined />),
    getItem(<Link to="/rooms">Офисы</Link>, 'rooms', <ProfileOutlined />),
    getItem(<Link to="/story">История</Link>, 'story', <HistoryOutlined />),
    getItem(<Link to="/settings">Настройки</Link>, 'settings', <SettingOutlined />, [
        getItem(<Link to="/theme">Тема</Link>, 'theme', <MoonOutlined />),
        getItem(<Link to="/code">QR code</Link>, 'code', <QrcodeOutlined />),
    ]),
    getItem(<Link to="/logout">Выход</Link>, 'logout', <LogoutOutlined />),
];
const MenuList = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu className='profile__sidebar' defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default MenuList