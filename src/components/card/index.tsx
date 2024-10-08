import { Card } from "antd";
import Meta from "antd/es/card/Meta";

interface iKitCard{
    name: string,
}

const KitCard = ({name}:iKitCard) => {
    return (
        <Card
            className="my-3"
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title={name} description="www.instagram.com" />
            <div className="text-center mt-20">
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Add To Cart
                </button>
            </div>
        </Card>
    )
}

export default KitCard;