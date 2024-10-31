import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLabByClientService } from "../../services/client.services";
import { currencyUnit } from "../../consts";
import { Lab } from "../../models/Kit";
import { FaStar } from "react-icons/fa";

const ClientLabDetail = () => {
    const { id } = useParams();
    const [count, setCount] = useState<number>(0)
    const [lab, setLab] = useState<Lab>()

    useEffect(() => {
        if (id) {
            getLabDetail();
        }
    }, [id])

    const getLabDetail = async () => {
        if (id) {
            const response = await getLabByClientService(id, 1, 100)
            console.log("res: ", response)
            setLab(response.data)
        }
    }

    const handleSetCountPlus = () => {
        setCount(count + 1)
    }
    const handleSetCountMinus = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    return (
        <div className="mt-10 container px-20">
            <Row>
                <Col span={12}>
                    <iframe
                        width={"60%"}
                        src={lab?.lab_url}
                    />


                    <p className="mt-3">
                        Category : {lab?.category_name}
                    </p>

                    <p className="mt-3">
                        Quantity : {lab?.quantity}
                    </p>

                    <p className="mt-3">
                        Support count: {lab?.max_support_count}
                    </p>

                    <p className="my-3">
                        Description: {lab?.description}
                    </p>
                </Col>
                <Col span={12}>
                    <Title level={4}>
                        {lab?.name}
                    </Title>
                    <Title level={3} className="mt-3 font-bold">{lab?.price.toLocaleString("vi-VN")} {currencyUnit}</Title>
                    <div className="mt-2 grid grid-cols-3" style={{ padding: 0 }}>
                        <button
                            onClick={() => handleSetCountMinus()}
                            type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2">
                            <MinusOutlined />
                        </button>
                        <div className="flex justify-center items-center">
                            <Title level={3} >{count}</Title>
                        </div>
                        <button
                            onClick={() => handleSetCountPlus()}
                            type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2">
                            <PlusOutlined />
                        </button>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Add To Cart
                        </button>
                    </div>
                </Col>
            </Row>

            <div className="product-reviews">
                <h2 className="text-4xl my-5">Product Reviews</h2>
                {lab?.reviews && lab?.reviews.length > 0 ? (
                    <ul>
                        {lab?.reviews.map(review => (
                            <li
                                key={review._id}
                                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-2"
                            >
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                    <span className="font-bold">User Name:</span> {review.user_name}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-bold">Comment:</span> {review.comment}
                                </p>
                                <p className="flex items-center mb-2">
                                    <span className="font-bold text-gray-800 mr-2">Rating:</span>
                                    {Array.from({ length: review.rating }, (_, index) => (
                                        <FaStar key={index} className="text-yellow-400" />
                                    ))}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Created At:</span>{" "}
                                    {new Date(review.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments for this product.</p>
                )}
            </div>
        </div>
    )
}

export default ClientLabDetail;