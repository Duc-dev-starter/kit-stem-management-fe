import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const ManageKit = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
            >Manage KIT</h1>
            <Button type="primary" className="my-5 float-right">Add new</Button>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default ManageKit;