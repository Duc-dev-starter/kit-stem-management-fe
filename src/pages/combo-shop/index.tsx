
import Title from "antd/es/typography/Title";
import { Category } from "../../models";
import { useEffect, useState } from "react";
import { getCategoriesByClient } from "../../services";
import KitCard from "../../components/card";
import { Link } from "react-router-dom";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Combo } from "../../models/Combo.model";
import { getCombosByClientService } from "../../services/client.services";
import ComboCard from "../../components/combo-card";
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

    const handleAddToCart =()=>{
        const user = getUserFromLocalStorage()
        if(!user){
            navigate(PATH.LOGIN)
        }
    }

    return (
        <div className="container px-10 mt-2">
            <img src="https://www.crunchlabs.com/cdn/shop/files/crunchlabs-education-hero_ce8466b9-af5a-4f5f-a421-1efd4be7526b.png?v=1684885608" alt="" />
            <div className="mt-5 flex justify-between">
                <div>
                    <Title level={1} className="font-bold">Combo Shop</Title>
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
                    combos.map(combo => (
                        <ComboCard name={combo.name}
                        image={combo.items[0].details.image_url}
                        price={combo.price}
                        category_name={combo.category_name}
                        comboId={combo._id}
                        discount={combo.discount}
                    />
                    ))
                }
            </div>

        </div>
    );
};

export default ComboShop;
