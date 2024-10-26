import { Button, Dropdown, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import { Category, Kit } from "../../models";
import { useEffect, useState } from "react";
import { getCategoriesByClient } from "../../services";
import KitCard from "../../components/card";
import { getKitsByClientService } from "../../services/client.services";
import { Link } from "react-router-dom";

const KitShop = () => {
    const [cates, setCates] = useState<Category[]>([]);
    const [kits, setKits] = useState<Kit[]>([]);
    useEffect(() => {
        getCategoriesFromHome();
        getKitsByCLient()
    }, []);

    const getCategoriesFromHome = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
            setCates(res.data.pageData);
        }
    };

    const getKitsByCLient = async () => {
        const response = await getKitsByClientService("", "", "", 1, 100)
        if (response) {
            setKits(response.data.pageData)
        }
    }
    // Chuyển đổi cates thành menu items cho Dropdown
    const items: MenuProps['items'] = cates.map((cate) => ({
        key: cate._id,
        label: (
            <a href={`/category/${cate._id}`}>
                {cate.name}
            </a>
        ),
    }));

    return (
        <div className="container px-10 mt-2">
            <img src="https://www.crunchlabs.com/cdn/shop/files/crunchlabs-education-hero_ce8466b9-af5a-4f5f-a421-1efd4be7526b.png?v=1684885608" alt="" />
            <div className="mt-5 flex justify-between">
                <div>
                    <Title level={1} className="font-bold">Merchandise</Title>
                </div>
                <div>
                    <Button className="mr-5 border-black">
                        Filter
                    </Button>
                    <Dropdown menu={{ items }} placement="bottom">
                        <Button>Categories</Button>
                    </Dropdown>
                </div>
            </div>
            <div className="grid grid-cols-4 pl-10">
                {
                    kits.map(kit => (
                        <Link to={`/kit/${kit._id}`}>
                            <KitCard name={kit.name}
                                image={kit.image_url}
                                price={kit.price}
                                category_name={kit.category_name}
                                id={kit._id}
                            />
                        </Link>
                    ))
                }
            </div>

        </div>
    );
};

export default KitShop;
