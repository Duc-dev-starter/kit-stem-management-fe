import {  ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, Image, MenuProps, Row, Space, Typography } from "antd";
import "./navbar.css"; // Import CSS for hover effects
import {  useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils";

const { Text } = Typography;

const Navbar = () => {

  const navigate = useNavigate();

  const userData = getUserFromLocalStorage();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      key: '2',
      label: 'Profile',
      onClick:()=>{
        navigate("/customer/profile")
      }
    },
    {
      key: '3',
      label: 'Change Password',
      onClick:()=>{
        navigate("/change-password")
      }
    },
    {
      key: '4',
      label: 'Log out',
      onClick:()=>{
        localStorage.clear();
        navigate("/login")
      }
    },

  ];

  return (
    <Row
      className="navbar"
      justify="space-between" // Adjust spacing between columns
      align="middle"
      style={{
        padding: "0 50px", // Added padding for left and right
        backgroundColor: "#fff",
        position: "sticky",
        width: "100%" /* Make navbar span the full width */,
        top: 0 /* Fix to the top of the viewport */,
        left: 0 /* Ensure it's aligned to the left */,
        zIndex: 1000 /* Set z-index to stay above other content */,
      }}
    >
      {/* Left Links Section */}
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={8} // Increased size for left column
        style={{
          display: "flex",
          justifyContent: "center", // Align to the left
          alignItems: "center", // Vertically center items
        }}
      >
        {/* Updated Row to ensure all items are in a single row */}
        <Row gutter={20} align="middle">
          <Col style={{ padding: "28px 14px" }}>
            <Text style={{ color: "black", textDecoration: "none" }}>
              <a href="#" className="navbar-link">
                Subscription Boxes
              </a>
            </Text>
          </Col>
          <Col style={{ padding: "28px 14px" }}>
            <Text>
              <a href="#" className="navbar-link">
                Our Company
              </a>
            </Text>
          </Col>
          <Col style={{ padding: "28px 14px" }}>
            <Text>
              <a href="#" className="navbar-link">
                Shop
              </a>
            </Text>
          </Col>
        </Row>
      </Col>

      {/* Center Logo */}
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={4} // Reduced size for center logo
        className="logo-container"
        style={{ textAlign: "center" }}
      >
        <Image
          width={125}
          src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500"
          alt="Logo"
          preview={false}
        />
      </Col>

      {/* Right Icons Section */}
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={8}
        style={{
          display: "flex",
          justifyContent: "center", // Align to the right
          alignItems: "center", // Vertically center items
        }}
      >
        <Row gutter={20} align="middle">
          <Col style={{ padding: "28px 14px" }}>
            <Text>
              <a href="#" className="navbar-link">
                Schools & Groups
              </a>
            </Text>
          </Col>
          <Col>

            {
              userData ?
                <>
                  <Dropdown className="mb-100" menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space> <Avatar size="large" icon={<UserOutlined />} /></Space>
                    </a>
                  </Dropdown>

                </>
                :
                <UserOutlined
                  onClick={() => { navigate('login') }}
                  className="navbar-icon cursor-pointer logo-user"
                  style={{
                    fontSize: "24px",
                    color: "black",
                    textDecoration: "none",
                  }}
                />
            }

          </Col>
          <Col>
            <ShoppingCartOutlined
              className="navbar-icon cursor-pointer shopping-cart"
              style={{
                fontSize: "24px",
                color: "black",
                textDecoration: "none",
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Navbar;
