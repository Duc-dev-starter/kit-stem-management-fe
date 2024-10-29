
import Title from "antd/es/typography/Title";
import { Category } from "../../models";
import { useEffect, useState } from "react";
import { getCategoriesByClient } from "../../services";
import KitCard from "../../components/card";
import { getCombosByClientService } from "../../services/client.services";
import { Link } from "react-router-dom";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Combo } from "../../models/Combo.model";
const ComboShop = () => {
    const [cates, setCates] = useState<Category[]>([]);
    const [combos, setCombos] = useState<Combo[]>([]);
    const [filterByCate, setFilterByCate] = useState<string>('')
    const [filterByCateName, setFilterByCateName] = useState<string>('')
    useEffect(() => {
        getCategoriesFromHome();
        getCombosByCLient()
    }, [filterByCate]);

    const getCategoriesFromHome = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
            setCates(res.data.pageData);
        }
    };

    const getCombosByCLient = async () => {
        const response = await getCombosByClientService(filterByCate, "", 1, 100)
        if (response) {
            setCombos(response.data.pageData)
        }
    }

    const handleFilterByCate = (e: DropdownChangeEvent) => {
        console.log("e: ", e)
        setFilterByCate(e._id)
        setFilterByCateName(e.name)
    }

    return (
        <div className="container px-10 mt-2">
            <img src="https://www.crunchlabs.com/cdn/shop/files/crunchlabs-education-hero_ce8466b9-af5a-4f5f-a421-1efd4be7526b.png?v=1684885608" alt="" />
            <div className="mt-5 flex justify-between">
                <div>
                    <Title level={1} className="font-bold">Merchandise</Title>
                </div>
                <div>
                    <div className="card flex justify-center">
                        <Dropdown onChange={(e) => handleFilterByCate(e.value)} style={{ backgroundColor: "white" }} options={cates} optionLabel="name"
                            placeholder={`${filterByCate}` ? `Sort by: ${filterByCateName}` : "Selected All"} className="w-full md:w-14rem" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 pl-10">
                {
                    combos.map(kit => (
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

export default ComboShop;
