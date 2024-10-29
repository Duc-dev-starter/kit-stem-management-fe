import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { currencyUnit, priceDiscounted } from "../../consts";

interface ProductCard {
    name: string,
    image?: string,
    lab_url?: string,
    price: number,
    discount:number;
    category_name: string
    id?: string
}

const ProductCard = ({ name, image, price, category_name, id, lab_url, discount }: ProductCard) => {
    return (
        <Card
            className="my-3"
            hoverable
            style={{ width: 240 }}
            cover={
                image ? <div style={{ height: 200, overflow: 'hidden' }}>
                    <img alt="example" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                    : <div><iframe style={{ width: '100%', height: '100%', objectFit: 'cover' }}  src={lab_url}></iframe></div>

            }
        >
            <p className="my-2 text-gray-400">{category_name}</p>
            <Meta title={name} description={<p className="text-black font-bold">{priceDiscounted(price, discount)} {currencyUnit}</p>} />
           {
            id && <div className="text-center mt-20">
             <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                 Add To Cart
             </button>
         </div>
           }
        </Card>
    )
}

export default ProductCard;