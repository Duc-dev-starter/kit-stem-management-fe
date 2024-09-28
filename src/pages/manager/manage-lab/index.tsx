import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Lab } from "../../../models/Kit.model";
import { getAllLabsFromManager } from "../../../services/lab.services";

const ManageLab = () => {
    const [labs, setlabs] = useState<Lab[]>([]);

    useEffect(() => {
        getAllKits();
    }, [])

    const getAllKits = async () => {
        const res = await getAllLabsFromManager();
        console.log("res: ", res)
        if (res && res.data.pageData) {
            setlabs(res.data.pageData);
            console.log("res.data.pageData: ", res.data.pageData)
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag className="cursor-pointer" >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Action',
            render:()=>(
                <>
                <EditOutlined className="m-2 text-blue-500" />
                <DeleteOutlined className="m-2 text-red-500" />
                </>
            )
        },
    ];

    return (
        <>
            <h1
                className="text-center font-bold my-5"
            >Manage LAB</h1>
            <Button type="primary" className="my-5 float-right">Add new</Button>
            <Table dataSource={labs} columns={columns} />
        </>
    )
}

export default ManageLab;