import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Drawer, Image, Row, Typography } from "antd";
import "./navbar.css"; // Import CSS for hover effects
import { useNavigate } from "react-router-dom";
import ShopDropDown from "./shop";
import DropdownAvatar from "../dropdown/DropdownAvatar";
import { useEffect, useState } from "react";
import CustomerCart from "./cart";
import { getCartsService } from "../../services/cart.services";
import { Cart } from "../../models/Cart.model";
import { imageTemp } from "../../consts/others";
import { getUserFromLocalStorage } from "../../utils";
import { User } from "../../models";

const { Text } = Typography;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [carts, setCarts] = useState<Cart[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if(user){
      getCarts();
    }
  }, [user])

  useEffect(() => {
    getUser()
  }, [])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const getUser = () => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }
  const getCarts = async () => {
    const response = await getCartsService("", "")
    if (response && response.data.pageData) {
      setCarts(response.data.pageData)
    } else if (response && response.data) {
      setCarts(response.data)
    }
  }
  return (
    <>
      <Drawer title="Your Cart" onClose={onClose} open={open}>
        {
          carts.map(item => (
            <>
              <CustomerCart
                image={imageTemp}
                name={item.cart_no}
                price={item.price}
                discount={item.discount}
                id={item._id}
                getCarts={getCarts}
              />
            </>
          ))
        }
        <div className="flex justify-center mt-2">
          <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Checkout
          </button>
        </div>
      </Drawer>
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
                <a href="/blog" className="navbar-link">
                  Blog
                </a>
              </Text>
            </Col>
            <Col style={{ padding: "28px 14px" }}>
              <Text>
                <a href="#" className="navbar-link">
                  <ShopDropDown />
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
                user ?
                  <>
                    <DropdownAvatar dataUser={user} />
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
                onClick={showDrawer}
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
    </>
  );
};

export default Navbar;
