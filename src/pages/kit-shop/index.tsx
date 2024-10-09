import { Button, Dropdown, MenuProps } from "antd";
import Title from "antd/es/typography/Title";
import { Category } from "../../models";
import { useEffect, useState } from "react";
import { getCategoriesByClient } from "../../services";
import KitCard from "../../components/card";

const KitShop = () => {
    const [cates, setCates] = useState<Category[]>([]);

    useEffect(() => {
        getCategoriesFromHome();
    }, []);

    const getCategoriesFromHome = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
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
                    cates.map(cate => (
                        <>
                            <KitCard name={cate.name} />
                        </>
                    ))
                }
            </div>

        </div>
    );
};

export default KitShop;
