import { Button, Dropdown, MenuProps, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Category } from "../../models";
import { useEffect, useState } from "react";
import { getCategories } from "../../services";

const KitShop = () => {
    const [cates, setCates] = useState<Category[]>([]);

    useEffect(() => {
        getCategoriesFromHome();
    }, []);

    const getCategoriesFromHome = async () => {
        const res = await getCategories("", 1, 100);
        if (res) {
            console.log("res", res)
            setCates(res.data.pageData);
        }
    };

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
        <div className="container mx-auto mt-2">
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
        </div>
    );
};

export default KitShop;
