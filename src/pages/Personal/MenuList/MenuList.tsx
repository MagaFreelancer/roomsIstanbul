import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    CheckOutlined,
    HistoryOutlined,
    LogoutOutlined,
    MoonOutlined,
    PayCircleOutlined,
    ProfileOutlined,
    QrcodeOutlined,
    SettingOutlined,
    StarOutlined,
    UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd';


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
    getItem(<Link to="/personal/profile">Профиль</Link>, 'profile', <UserOutlined />),
    getItem(<Link to="/personal/payment">Платежи</Link>, 'payment', <PayCircleOutlined />),
    getItem('Офисы', 'offices', <ProfileOutlined />, [
        getItem(<Link to="/personal/favourite">Избранное</Link>, 'favourite', <StarOutlined />),
        getItem(<Link to="/personal/rented">Аренндованное</Link>, 'rented', <CheckOutlined />),
    ]),
    getItem(<Link to="/personal/story">История</Link>, 'story', <HistoryOutlined />),
    getItem('Настройки', 'settings', <SettingOutlined />, [
        getItem(<Link to="/personal/theme">Тема</Link>, 'theme', <MoonOutlined />),
        getItem(<Link to="/personal/code">QR code</Link>, 'code', <QrcodeOutlined />),
    ]),
    getItem(<div >Выход</div>, 'logout', <LogoutOutlined />),
];
const MenuList = () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(["profile"])
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation()
    const path = pathname.split('/')
    useEffect(() => {
        setSelectedKeys([path[2]])
    }, [pathname])


    return (

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu className='profile__sidebar' selectedKeys={selectedKeys} mode="inline" items={items} />
        </Sider>
    )
}

export default MenuList