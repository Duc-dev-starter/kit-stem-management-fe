import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "../../../services";
import { Category } from "../../../models";
import { useNavigate } from "react-router-dom";

const ShopDropDown = () => {
    const navigate= useNavigate();
    const [cates, setCates] = useState<Category[]>([])

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p>KIT</p>
            ),
            onClick:()=>{
                navigate("/kit-shop")
            }
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];

    useEffect(()=>{
        getCategoriesFromHome();
    },[])

    const getCategoriesFromHome = async()=>{
        const res = await getCategories("", 1, 100)
        if(res){
            setCates(res.data.pageData)
        }
    }

    return (
        <div className="w-full">
            <Dropdown  className="w-full" menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space className="text-black">
                        Shop
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default ShopDropDown;
