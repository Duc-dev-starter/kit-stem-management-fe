import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Image, Row } from 'antd';
const Navbar = () => {
    return (
        <>
            <div className='flex justify-between items-center p-3 bg-gray-300'>
                <MenuOutlined
                className='cursor-pointer'
                />
                <div className=''>
                <Image 
                    width={125}
                    src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500"
                />
                </div>
                <Row gutter={10}>
                    <Col>
                        <UserOutlined
                        className='cursor-pointer'
                        />
                    </Col>
                    <Col>
                        <ShoppingCartOutlined 
                        className='cursor-pointer'
                        />
                    </Col>
                </Row>
            </div>

        </>
    )
}
export default Navbar;