
import { Col, Image, message, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getComboByClientService } from "../../services/client.services";
import { currencyUnit, PATH, priceDiscounted, reloadApp } from "../../consts";
import { Combo } from "../../models/Combo.model";

import { getUserFromLocalStorage } from "../../utils";
import { createCartSerivce } from "../../services/cart.services";
import { imageTemp } from "../../consts/others";
import LabCard from "../../components/lab-card";
import { FaStar } from "react-icons/fa";

const ClientComboDetail = () => {
    const { id } = useParams();
    const [count, setCount] = useState<number>(0)
    const [combo, setCombo] = useState<Combo>()
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            getLabDetail();
        }
    }, [id])

    const getLabDetail = async () => {
        if (id) {
            const response = await getComboByClientService(id)
            console.log("res: ", response)
            setCombo(response.data)
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
    const handleAddToCart = async () => {
        const user = getUserFromLocalStorage()
        if (!user) {
            navigate(PATH.LOGIN)
        } else {
            if (id) {
                const response = await createCartSerivce(id, "combo");
                if (response) {
                    message.success("Add Cart Successfully!")
                    reloadApp()
                }
            }
        }
    }
    return (
        <div className="mt-10 container px-20">
            <Row>
                <Col span={12}>
                <Title level={2}>Kit of combo</Title>
                    <Image
                        width={"60%"}
                        src={combo?.image_url ||imageTemp}
                    />
                    <p className="mt-3">
                        {combo?.description}
                    </p>
                </Col>
                <Col span={12}>
                    <Title level={4}>
                        {combo?.name}
                    </Title>
                    <Title level={3} className="mt-3 font-bold">{priceDiscounted(combo?.price || 0, combo?.discount||0)} {currencyUnit}</Title>
                    <div className="mt-2 grid grid-cols-3" style={{ padding: 0 }}>
                        {/* <button
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
                        </button> */}
                    </div>
                    <div className="flex justify-center mt-3">
                        <button onClick={() => handleAddToCart()} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Add To Cart
                        </button>
                    </div>
                </Col>
            </Row>
            {/* <Link to={`/lab/${combo?.labs._id}`}>
            </Link> */}
            <div>
                <Title level={2}>Lab of combo</Title>
                <LabCard
                    name={combo?.labs.name}
                    lab_url={combo?.labs.lab_url ||imageTemp}
                    price={combo?.labs.price}
                    category_name={combo?.category_name || ""}
                    discount={combo?.labs.discount}
                    labId={combo?.labs._id}
                />
            </div>

            <div className="product-reviews">
                <h2 className="text-4xl my-5">Product Reviews</h2>
                {combo?.reviews && combo?.reviews.length > 0 ? (
                    <ul>
                        {combo?.reviews.map(review => (
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

export default ClientComboDetail;