
import { Col, Image, Row } from 'antd'
import { currencyUnit, priceDiscounted } from '../../../consts';
interface iCustomerCart {
    image: string;
    name: string;
    price: number;
    discount: number
}
const CustomerCart = ({ image, name, price, discount }: iCustomerCart) => {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Image src={image} />
                </Col>
                <Col className='mt-2' span={18}>
                    <p className='font-bold'>{name}</p>
                    <p>{priceDiscounted(price, discount)} {currencyUnit}</p>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerCart
