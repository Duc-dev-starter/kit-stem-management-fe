import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
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
  const [items, setItems] = useState<MenuItem[]>([]);
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
        getItem('Manage Categories', '/admin/manage-categories', <UserOutlined />),
        getItem('Manage Users', '/admin/manage-users', <UserOutlined />),
        getItem('Manage Blogs', '/admin/manage-blogs', <DesktopOutlined />),
      ]);
    }
  };

  const handleClick = (e: { key: React.Key }) => {
    navigate(e.key as string); // Navigate to the selected key
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu style={{ minHeight: '100vh' }} onClick={handleClick} theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by Thanh Tung
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
