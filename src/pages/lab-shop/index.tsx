
import Title from "antd/es/typography/Title";
import { Category } from "../../models";
import { useEffect, useState } from "react";
import { getCategoriesByClient } from "../../services";
import { Lab } from "../../models/Kit";
import { getLabsByClientService } from "../../services/client.services";

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import LabCard from "../../components/lab-card";

const LabShop = () => {
    const [cates, setCates] = useState<Category[]>([]);
    const [labs, setLabs] = useState<Lab[]>([]);
    const [filterByCate, setFilterByCate] = useState<string>('')
    const [filterByCateName, setFilterByCateName] = useState<string>('')
    useEffect(() => {
        getCategoriesFromHome();
        getLabsByCLient(filterByCate)
    }, [filterByCate]);

    const getCategoriesFromHome = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
            setCates(res.data.pageData);
        }
    };

    const getLabsByCLient = async (filterByCate: string) => {
        const response = await getLabsByClientService(filterByCate, "", "", 1, 100)
        if (response) {
            setLabs(response.data.pageData)
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
                    <Title level={1} className="font-bold">LAB Shop</Title>
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
                    labs.map(lab => (
                        <LabCard
                                name={lab.name}
                                lab_url={lab.lab_url}
                                price={lab.price}
                                category_name={lab.category_name}
                                labId={lab._id}
                                discount={lab.discount}
                            />
                    ))
                }
            </div>

        </div>
    );
};

export default LabShop;
