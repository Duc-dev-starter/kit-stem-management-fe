import React, { useEffect, useState } from 'react';
import { BookOutlined, DashboardOutlined, DeliveredProcedureOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services';
import { getUserFromLocalStorage } from '../../utils';
import { roles } from '../../enum';
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { DropdownAvatar } from '../../components';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
  const [itemsNav, setItems] = useState<MenuItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [dataUser, setDataUser] = useState<{
    name: string | null;
    email: string | null;
    avatar: string | null;
    google_id?: string,
    role: string | null
  }>({
    name: null,
    email: null,
    avatar: null,
    role: null
  });

  const user = getUserFromLocalStorage();
  const userRole = user?.role;

  useEffect(() => {
    if (userRole && user) {
      setDataUser({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        google_id: user.google_id,
        role: user.role
      });
    }
  }, [userRole]);

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
      label: <Link to={String(key)}>{label}</Link>,
    } as MenuItem;
  }

  useEffect(() => {
    loadItems();
  }, [dataUser.role]);

  const loadItems = async () => {
    if (dataUser.role === roles.MANAGER) {
      setItems([
        getItem('Dashboard', '/manager/dashboard', <DashboardOutlined />),
        getItem('Manage KITs', '/manager/manage-kits', <ToolOutlined />),
        getItem('Manage LABs', '/manager/manage-labs', <BookOutlined />),
        getItem('Manage KIT delivery', '/manager/manage-kit-delivery', <DeliveredProcedureOutlined />),
        getItem('Manage Users', '/manager/manage-users', <UserOutlined />)
      ]);
    } else if (dataUser.role === roles.ADMIN) {
      setItems([
        getItem('Dashboard', '/admin/dashboard', <AiOutlineDashboard />),
        getItem('Manage Users', '/admin/manage-users', <UserOutlined />),
        getItem('Manage Categories', '/admin/manage-categories', <BiCategory />),
        getItem('Manage Blogs', '/admin/manage-blogs', <FaRegNewspaper />),
      ]);
    }
  };

  const handleClick = (e: { key: React.Key }) => {
    navigate(e.key as string); // Navigate to the selected key
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
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
          {dataUser.role !== roles.ADMIN ? (
            <DropdownAvatar dataUser={dataUser} />
          ) : (
            <Space>
              <button
                onClick={() => logout(navigate)}
                className="flex gap-1 items-center text-base text-white border border-red-300 bg-red-500 hover:border-red-700 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-300"
              >
                <IoLogOutOutline /><span className='mb-[0.1rem]'>Sign out</span>
              </button>
            </Space>
          )}
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
  );
};

export default Dashboard;
