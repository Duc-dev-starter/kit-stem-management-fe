
import { Col, message, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLabByClientService } from "../../services/client.services";
import { currencyUnit, PATH, reloadApp } from "../../consts";
import { Lab } from "../../models/Kit";
import { getUserFromLocalStorage } from "../../utils";
import { createCartSerivce } from "../../services/cart.services";

const ClientLabDetail = () => {
    const { id } = useParams();
    const [count, setCount] = useState<number>(0)
    const [lab, setLab] = useState<Lab>()
    const navigate = useNavigate();
    const handleAddToCart =async()=>{
        const user = getUserFromLocalStorage()
        if(!user){
            navigate(PATH.LOGIN)
        }else{
            if(id){
                const response = await createCartSerivce(id, "lab");
                if(response){
                    message.success("Add Cart Successfully!")
                    reloadApp()
                }
            }
        }
    }
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
                        
                    </div>
                    <div className="flex justify-center mt-3">
                        <button onClick={()=>handleAddToCart()} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Add To Cart
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ClientLabDetail;