import React, { useEffect, useState } from 'react';
import { DesktopOutlined, DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
//   (icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
//   }),
// );

const Dashboard: React.FC = () => {
  const [itemsNav, setItems] = useState<MenuItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/manager')) {
      setItems([
        getItem('Dashboard', '/manager/dashboard', <DesktopOutlined />),
        getItem('Manage KIT', '/manager/manage-kit', <UserOutlined />),
        getItem('Manage LAB', '/manager/manage-lab', <DesktopOutlined />),
        getItem('Manage KIT delivery', '/manager/manage-kit-delivery', <UserOutlined />),
      ]);
    } else if (currentPath.startsWith('/admin')) {
      setItems([
        getItem('Dashboard', '/admin/dashboard', <DesktopOutlined />),
        getItem('Manage Users', '/admin/manage-users', <UserOutlined />),
        getItem('Manage Categories', '/admin/manage-categories', <UserOutlined />),
        getItem('Manage Blogs', '/admin/manage-blogs', <DesktopOutlined />),
      ]);
    }
  };

  const handleClick = (e: { key: React.Key }) => {
    navigate(e.key as string); // Navigate to the selected key
  };

  const handleLogout = () => {
    localStorage.clear();
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={handleLogout} className='text-red-500'>
          Log out
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme='dark'
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
        >
          <div className="demo-logo-vertical" />
          <Menu
            className="py-4 bg-white-50 h-full"
            onClick={handleClick}
            theme='light'
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={itemsNav}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Sider>
        <Layout className="bg-stone-100">
          <Header className='flex justify-between items-center drop-shadow-xl bg-white'>
            <div>
              <p>Welcome back</p>
            </div>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar size={32} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '30px 10px', flexGrow: 1 }}>
            <div
              style={{
                padding: "5px 20px",
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©{new Date().getFullYear()} Created by CrunchLabs
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
