import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

const ManageSupporter =()=>{
    const [supporters, setSupporters] = useState();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <div className="text-blue-500 cursor-pointer">
                    {name}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <div></div>
            )
        },
        {
            title: 'LAB Video',
            dataIndex: 'lab_url',
            key: 'lab_url',
            render: (lab_url: string) => (
                <div>
                    <iframe src={lab_url}></iframe>
                </div>
            )
        },
        {
            title: 'Action',
            render: (record: Lab) => (
                <>
                    <EditOutlined  className="m-2 text-blue-500" />
                    <DeleteOutlined  className="m-2 text-red-500" />
                </>
            )
        },
    ];

    return(
        <>
            <Title className="text-center py-5" level={1}>ManageSupporter</Title>
            <Button type="primary" className="mb-5 float-right">Add new</Button>
            <Table
                columns={columns}
                dataSource={dataLabs}
                pagination={false}
                onChange={handleTableChange}
                rowKey="_id"
            />
        </>
    )
}
export default ManageSupporter;