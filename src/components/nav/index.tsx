import {
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Col, Image, Row, Typography } from "antd";
  import './navbar.css'; // Import CSS for hover effects
  
  const { Text } = Typography;
  
  const Navbar = () => {
    return (
      <Row
        className="navbar"
        justify="space-around"
        align="middle"
        style={{
          // margin: "0 200px",
          padding: "0px 130px",
          backgroundColor: "#fff", 
        }}
      >
        {/* Left Links Section */}
        <Col xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent: "center",marginLeft: '0px' }}>
          <Row gutter={20} align="middle" style={{display: "flex",paddingLeft: '70px'}}>
            <Col style={{ padding: '28px 8px' }}>
              <Text style={{ color: "black", textDecoration: "none" }}>
                <a href="#" className="navbar-link"> {/* Updated to use class */}
                  Subscription Boxes
                </a>
              </Text>
            </Col>
            <Col style={{ padding: '28px 8px' }}>
              <Text>
                <a href="#" className="navbar-link">
                  Our Company
                </a>
              </Text>
            </Col>
            <Col style={{ padding: '28px 8px' }}>
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
          lg={6}
          className="logo-container"
          style={{ textAlign: "center" }}
        >
          <Image
            width={125}
            src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500"
            alt="Logo"
          />
        </Col>
  
        {/* Right Icons Section */}
        <Col xs={24} sm={12} md={8} lg={6} style={{ display: "flex", justifyContent:"center" }}>
          <Row gutter={20} align="middle">
            <Col style={{ padding: '28px 8px' }}>
              <Text>
                <a href="#" className="navbar-link">
                  Schools & Groups
                </a>
              </Text>
            </Col>
            <Col>
              <UserOutlined
                className="navbar-icon cursor-pointer logo-user"
                style={{ fontSize: "24px", color: "black", textDecoration: "none" }}
              />
            </Col>
            <Col>
              <ShoppingCartOutlined
                className="navbar-icon cursor-pointer shopping-cart"
                style={{ fontSize: "24px", color: "black", textDecoration: "none" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  
  export default Navbar;
  