import { Card, message } from "antd";
import Meta from "antd/es/card/Meta";
import { currencyUnit, PATH, priceDiscounted } from "../../consts";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils";
import { createCartSerivce } from "../../services/cart.services";

interface ProductCard {
    name: string,
    image?: string;
    price: number,
    discount: number;
    category_name: string
    id?: string,
    kitId?: string;
}

const KitCard = ({ name, image, price, category_name, discount, kitId }: ProductCard) => {
    const navigate = useNavigate();
    const handleAddToCart =async()=>{
        const user = getUserFromLocalStorage()
        if(!user){
            navigate(PATH.LOGIN)
        }else{
            if(kitId){
                const response = await createCartSerivce(kitId, "kit");
                if(response){
                    message.success("Add Cart Successfully!")
                }
            }
        }
    }
    return (
        <Card
            className="my-3"
            hoverable
            style={{ width: 240 }}
            cover={<Link to={`/kit/${kitId}`} style={{ height: 200, overflow: 'hidden' }}>
                <img alt="example" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
            }
        >
            <Link to={`/kit/${kitId}`}>
                <p className="my-2 text-gray-400">{category_name}</p>
                <Meta title={name} description={<p className="text-black font-bold">{priceDiscounted(price, discount)} {currencyUnit}</p>} />
            </Link>
            {
                kitId && <div className="text-center mt-20">
                    <button onClick={handleAddToCart} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Add To Cart
                    </button>
                </div>
            }
        </Card>
    )
}

export default KitCard;