import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Drawer, Image, Row, Typography } from "antd";
import "./navbar.css"; // Import CSS for hover effects
import { Link, useNavigate } from "react-router-dom";
import ShopDropDown from "./shop";
import DropdownAvatar from "../dropdown/DropdownAvatar";
import { useEffect, useState } from "react";
import { deleteCartService, getCartsService, itemsCart, updateCart } from "../../services/cart.services";
import { Cart } from "../../models/Cart.model";
import { imageTemp } from "../../consts/others";
import { getUserFromLocalStorage } from "../../utils";
import { User } from "../../models";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { currencyUnit, priceDiscounted, reloadApp } from "../../consts";
import { useLocation } from 'react-router-dom';
import { PATH } from "../../consts";

const { Text } = Typography;

const Navbar = () => {
  const location = useLocation(); 
  const [open, setOpen] = useState(false);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cancelCarts, setCancelCarts] = useState<Cart[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [selectedCarts, setSelectedCarts] = useState<itemsCart[]>([]);

  useEffect(() => {
    if (user ||  location.pathname === '/') {
      getCarts();
      getCancelCarts();
    }
  }, [user])

  useEffect(() => {
    getUser()
  }, [user?.role])

  const showDrawer = () => {
    setOpen(true);
    getCarts();
  };

  const onClose = () => {
    setOpen(false);
  };
  const getUser = () => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }
  const onChange: CheckboxProps['onChange'] = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    console.log("selectedCarts: ", selectedCarts)
    if (isChecked) {
      // Nếu check tất cả, thêm toàn bộ cart vào state
      const newItem = carts.map(item => ({
        _id: item._id, // Sử dụng id để tránh trùng tên với thuộc tính có sẵn
        cart_no: item.cart_no,
      }));
      const newItem2= cancelCarts.map(item => ({
        _id: item._id, // Sử dụng id để tránh trùng tên với thuộc tính có sẵn
        cart_no: item.cart_no,
      }));
      setSelectedCarts([...newItem, ...newItem2]);
    } else {
      // Nếu bỏ chọn tất cả, xóa hết cart khỏi state
      setSelectedCarts([]);
    }
  };


  const getCarts = async () => {
    const response = await getCartsService("", "new")
    if (response && response.data.pageData) {
      setCarts(response.data.pageData)
    } else if (response && response.data) {
      setCarts(response.data)
    }
  }

  const getCancelCarts = async () => {
    const response = await getCartsService("", "cancel")
    if (response && response.data.pageData) {
      setCancelCarts(response.data.pageData)
    } else if (response && response.data) {
      setCancelCarts(response.data)
    }
  }

  const updateSelectedCarts = (cart: Cart) => {
    const newItem = {
      _id: cart._id,
      cart_no: cart.cart_no
    }
    if (selectedCarts.includes(newItem)) {
      setSelectedCarts(selectedCarts.filter(item => item !== newItem))
    } else {
      setSelectedCarts([...selectedCarts, newItem])
    }
  };

  const handleUpdateWaitingPaid = async () => {
    const response = await updateCart("waiting_paid", selectedCarts)
    setOpen(false)
    if (response) {
      navigate("/check-out")
      reloadApp()
    }
  }

  const handleRemoveItemFromCart = async (id: string) => {
    const response = await deleteCartService(id);
    if (response) {
      getCarts();
    }
  };
  const isChecked = (cart: Cart) => {
    const newItem = {
      _id: cart._id,
      cart_no: cart.cart_no
    }
    const res = selectedCarts.some(selectedCart => selectedCart._id === newItem._id);
    console.log("selectedCarts: ", selectedCarts)
    if (res) {
      return true
    }
    return false
  }
  return (
    <>
      <Drawer title="Your Cart" onClose={onClose} open={open}>
        {
          carts.map(item => (
            <div>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={6} className='flex items-center'>
                      <Checkbox
                        checked={isChecked(item)}
                        onChange={() => updateSelectedCarts(item)}
                      />
                    </Col>
                    <Col span={18}>
                      <Image src={imageTemp} />
                    </Col>
                  </Row>
                </Col>
                <Col className='mb-2' span={16}>
                  <p className='font-bold'>{item.cart_no}</p>
                  <p>{priceDiscounted(item.price, item.discount)} {currencyUnit}</p>
                  <p onClick={() => handleRemoveItemFromCart(item._id)} className='text-red-500 cursor-pointer'>Remove</p>
                </Col>
              </Row>
            </div>
          ))
        }
        {
          cancelCarts.map(item => (
            <div>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={6} className='flex items-center'>
                      <Checkbox
                        checked={isChecked(item)}
                        onChange={() => updateSelectedCarts(item)}
                      />
                    </Col>
                    <Col span={18}>
                      <Image src={imageTemp} />
                    </Col>
                  </Row>
                </Col>
                <Col className='mb-2' span={16}>
                  <p className='font-bold'>{item.cart_no}</p>
                  <p>{priceDiscounted(item.price, item.discount)} {currencyUnit}</p>
                  <p onClick={() => handleRemoveItemFromCart(item._id)} className='text-red-500 cursor-pointer'>Remove</p>
                </Col>
              </Row>
            </div>
          ))
        }
        <div className="flex justify-center mt-2">
          <Checkbox onChange={onChange} className="mr-2"><p className="mt-2">Select All</p></Checkbox>
          <div  >
            <button onClick={() => handleUpdateWaitingPaid()} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Checkout
            </button>
          </div>
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
          <Link className="cursor-pointer" to={PATH.HOME}>
            <Image
              width={125}
              src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500"
              alt="Logo"
              preview={false}
            />
          </Link>
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
            {
              user && <Col>
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
            }
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
