import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Switch, Table } from "antd";
import { useState } from "react";

const ManageUser = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

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
            title: 'Status',
            render: () => (
                <>
                    <Switch defaultChecked onChange={onChange} />
                </>
            )
        },
        {
            title: 'Action',
            render: () => (
                <>
                    <EditOutlined className="m-2 text-blue-500" />
                    <DeleteOutlined className="m-2 text-red-500" />
                </>
            )
        },
    ];

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            <h1
                className="text-center font-bold my-5"
            >Manage User</h1>
            <Button onClick={showModal} type="primary" className="my-5 float-right">Add new</Button>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default ManageUser;