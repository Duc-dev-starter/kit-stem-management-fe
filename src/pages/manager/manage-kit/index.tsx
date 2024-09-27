import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { kitStatus, kitStatusColor } from "../../../consts";
import { getAllKitsFromManager } from "../../../services/kit.services";
import { Kit } from "../../../models/Kit.model";
import { Link, useNavigate } from "react-router-dom";

const ManageKit = () => {
    const [open, setOpen] = useState(false);
    const [openConfirmDeketeKit, setOpenConfirmDeleteKit] = useState(false);
    const [openChaneStatusKit, setOpenChangeStautsKit] = useState(false);
    const [openKitDetail, setOpenKitDetail] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [kitDetail, setKitDetail] = useState<Kit>();
    const [kits, setKits] = useState<Kit[]>([])

    const navigate = useNavigate();

    useEffect(() => {
        getAllKits();
    }, [])

    const getAllKits = async () => {
        const res = await getAllKitsFromManager();
        console.log("res: ", res)
        if (res && res.data.pageData) {
            setKits(res.data.pageData);
            console.log("res.data.pageData: ", res.data.pageData)
        }
    }


    const showModal = () => {
        setOpen(true);
    };

    const showModalConfirmDeleteKit = () => {
        setOpenConfirmDeleteKit(true);
    };

    const showModalKitDetail = (record: Kit) => {
        setOpenKitDetail(true);
        setKitDetail(record);
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
            setOpenConfirmDeleteKit(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setOpenKitDetail(false);
        setOpenChangeStautsKit(false);
        setOpenConfirmDeleteKit(false);
    };

    // const handleChangeStatus = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    const columns = [
        {
            title: 'KIT Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Kit) => (
                <Link className="text-blue-500" to={`/manager/manage-kit/${record._id}`}>
                    {name}
                </Link>
            )
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            render: (user_name: string) => (
                <div onClick={showModalKitDetail} className="text-blue-500 cursor-pointer">
                    {user_name}
                </div>
            )
        },
        {
            title: 'Cate Name',
            dataIndex: 'category_name',
            key: 'category_name',
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag className="cursor-pointer" onClick={showModalChangeStautsKit} color={kitStatusColor(status)}>
                    {kitStatus(status)}
                </Tag>
            )
        },
        {
            title: 'Action',
            render: () => (
                <>
                    <EditOutlined className="m-2 text-blue-500" />
                    <DeleteOutlined onClick={showModalConfirmDeleteKit} className="m-2 text-red-500" />
                </>
            )
        },
    ];

    return (
        <>
            <Modal
                title="Delete KIT"
                open={openConfirmDeketeKit}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do you want to delete this KIT ?</p>
            </Modal>
            {/* Kit Detail Modal */}
            <Modal
                title="Kit detail"
                footer=""
                open={openKitDetail}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="text-center">
                    <p>Name: {kitDetail?.name}</p>
                    <p>Cate Name: {kitDetail?.category_name}</p>
                    <p>Discount: {kitDetail?.discount}</p>
                    <Image src={kitDetail?.image_url}></Image>
                    <p>Lab Count: {kitDetail?.lab_count}</p>
                    <p>Name: {kitDetail?.price}</p>
                    <p>Status: {kitDetail?.status}</p>
                </div>
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
            <Table dataSource={kits} columns={columns} />
        </>
    )
}

export default ManageKit;