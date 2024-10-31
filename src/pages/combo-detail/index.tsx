
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
                />
            </div>
        </div>
    )
}

export default ClientComboDetail;