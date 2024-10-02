import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services';
import { getUserFromLocalStorage } from '../../utils';
import { roles } from '../../enum';
import { Row } from 'antd'; // Correct import for Row component

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
    role: string | null;
    fullName: string | null;
    email: string | null;
  }>({
    role: null,
    fullName: null,
    email: null,
  });

  const user = getUserFromLocalStorage();
  const userRole = user?.role;

  useEffect(() => {
    if (userRole && user) {
      setDataUser({
        role: userRole,
        fullName: user.name,
        email: user.email,
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
        getItem('Dashboard', '/manager/dashboard', <DesktopOutlined />),
        getItem('Manage KIT', '/manager/manage-kit', <UserOutlined />),
        getItem('Manage LAB', '/manager/manage-lab', <DesktopOutlined />),
        getItem('Manage KIT delivery', '/manager/manage-kit-delivery', <UserOutlined />),
      ]);
    } else if (dataUser.role === roles.ADMIN) {
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

  const dropdownItems: MenuProps["items"] =
    dataUser.role === roles.MANAGER
      ? [
        {
          label: (
            <div className="text-sm">
              <Row>
                <Col span={8} className="p-4 pt-2 pb-2">
                  <Avatar
                    src={
                      typeof user.avatar === "string"
                        ? user.avatar
                        : undefined
                    }
                    className="hover:cursor-pointer mr-5 border border-black"
                    size={50}
                    icon={<UserOutlined />}
                  />
                </Col>
                <Col span={16} className="pt-3 pr-3">
                  <Row>
                    <p className="text-base font-bold">{dataUser.fullName}</p>
                  </Row>
                  <div>
                    <p className="text-md">{dataUser.email}</p>
                  </div>
                </Col>
              </Row>
            </div>
          ),
          key: "1",
        },
        {
          label: (
            <p
              onClick={() => logout(navigate)}
              className="text-lg hover:cursor-pointer hover:text-red-600"
            >
              Logout
            </p>
          ),
          key: "3",
        },
      ]
      : [
        {
          label: (
            <button
              onClick={() => logout(navigate)}
              className="text-lg hover:cursor-pointer hover:text-red-600 bg-transparent border-none p-0"
            >
              Logout
            </button>
          ),
          key: "1",
        },
      ];

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
            <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    src={
                      typeof user.avatar === "string"
                        ? user.avatar
                        : undefined
                    }
                    className="hover:cursor-pointer border border-black"
                    size={40}
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Space>
              <button
                onClick={() => logout(navigate)}
                className="text-base text-white border border-red-300 bg-red-500 hover:border-red-700 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-300"
              >
                Logout
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
