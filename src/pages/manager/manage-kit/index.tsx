import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Table, Tag } from "antd";
import { useState } from "react";
import { kitStatus, kitStatusColor } from "../../../consts";

const ManageKit = () => {
    const [open, setOpen] = useState(false);
    const [openChaneStatusKit, setOpenChangeStautsKit] = useState(false);
    const [openKitDetail, setOpenKitDetail] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const showModalKitDetail = () => {
        setOpenKitDetail(true);
    };

    const showModalChangeStautsKit = () => {
        setOpenChangeStautsKit(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setOpenKitDetail(false);
            setOpenChangeStautsKit(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setOpenKitDetail(false);
        setOpenChangeStautsKit(false);
    };

    // const handleChangeStatus = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            status: 1,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            status: 2,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <div onClick={showModalKitDetail} className="text-blue-500 cursor-pointer">
                    {name}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (stauts: number) => (
                <Tag className="cursor-pointer" onClick={showModalChangeStautsKit} color={kitStatusColor(stauts)}>
                    {kitStatus(stauts)}
                </Tag>
            )
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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

    return (
        <>
            <Modal
                title="Kit detail"
                open={openKitDetail}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Name: </p>
                <p>Code: </p>
                <p>Name: </p>
            </Modal>
            <Modal
                title="Change status kit"
                open={openChaneStatusKit}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    allowClear
                    options={[{ value: 'lucy', label: 'Lucy' }]}
                    placeholder="select it"
                />
            </Modal>
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
            >Manage KIT</h1>
            <Button onClick={showModal} type="primary" className="my-5 float-right">Add new</Button>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default ManageKit;