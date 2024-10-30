
import { Col, Image, Row } from 'antd'
import { currencyUnit, priceDiscounted } from '../../../consts';
import { deleteCartService } from '../../../services/cart.services';
interface iCustomerCart {
    image: string;
    name: string;
    price: number;
    discount: number;
    getCarts:()=> void;
    id: string;
}
const CustomerCart = ({ image, name, price, discount,getCarts, id }: iCustomerCart) => {
    const handleRemoveItemFromCart = async(id: string)=>{
        const response = await deleteCartService(id);
        if(response){
            getCarts();
        }
    }
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Image src={image} />
                </Col>
                <Col className='mb-2' span={18}>
                    <p className='font-bold'>{name}</p>
                    <p>{priceDiscounted(price, discount)} {currencyUnit}</p>
                    <p onClick={()=>handleRemoveItemFromCart(id)} className='text-red-500 cursor-pointer'>Remove</p>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerCart
