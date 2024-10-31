import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Image, Input, InputNumber, message, Modal, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { currencyUnit, kitStatus, kitStatusColor, priceDiscounted } from "../../../consts";
import { Kit } from "../../../models/Kit";
import { Link } from "react-router-dom";
import { getCategories, getKits, getUserDetail } from "../../../services";
import { Category, User } from "../../../models";
import { createKIT, deleteKit, updateKit } from "../../../services/kit.services";
import Title from "antd/es/typography/Title";
import ModalUser from "./modal-user";
interface FieldData {
    name: string[]; // Mảng tên trường
    value?: string;    // Giá trị của trường có thể là bất kỳ hoặc undefined
}
const ManageKit = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [openConfirmDeketeKit, setOpenConfirmDeleteKit] = useState(false);
    const [openChaneStatusKit, setOpenChangeStautsKit] = useState(false);
    const [openKitDetail, setOpenKitDetail] = useState(false);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [kitDetail, setKitDetail] = useState<Kit>();
    const [dataKits, setDataKits] = useState<Kit[]>([])
    // const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 100, total: 0 });
    const [categories, setCategories] = useState<Category[]>([])
    const [hideImage, setHideImage] = useState(false);
    const [hideVideo, setHideVideo] = useState(false);
    const [kitEdit, setKitEdit] = useState<Kit>()
    const [kitDetete, setKitDelete] = useState<Kit>()
    const [user, setUser] = useState<User>()
    // const navigate = useNavigate();
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const onFinish: FormProps['onFinish'] = async (values: Kit) => {
        if (kitEdit) {
            console.log("id: ", values._id)
            const res = await updateKit(kitEdit._id, values)
            if (res) {
                console.log("res updateKit", res);
                handleOk();
                form.resetFields();
                console.log("res", res);
                fetchKits();
                message.success("Update KIT Successfully!")
            }
        } else {
            const res = await createKIT(values);
            if (res) {
                handleOk();
                form.resetFields();
                console.log("res", res);
                fetchKits();
                message.success("Create KIT Successfully!")
            }
        }
    };
    useEffect(() => {
        fetchKits();
        getAllCategories();
        if (kitEdit) {
            form.setFieldsValue({
                name: kitEdit.name,
                category_id: kitEdit.category_id,
                description: kitEdit.description,
                image_url: kitEdit.image_url,
                video_url: kitEdit.video_url,
                price: kitEdit.price,
                discount: kitEdit.discount,
            });
        }
    }, [kitEdit, form])

    const fetchKits = async () => {
        const responseKits = await getKits();
        setDataKits(responseKits.data.pageData);
        // setPagination({
        //     ...pagination,
        //     total: responseKits.data.pageInfo.totalItems,
        //     current: responseKits.data.pageInfo.pageNum,
        //     pageSize: responseKits.data.pageInfo.pageSize,
        // });
    }

    const handleDeleteKit = async (record: Kit) => {
        console.log("record: ", record)
        if (record.description === undefined || record.description === "") {
            record.description = "temp to delete";
        } else {
            const res = await deleteKit(record._id, record);
            if (res) {
                message.success("Delete Kit Successfully !")
                console.log("res: ", res);
            }
            fetchKits()
        }
    }

    const showModal = (record?: Kit) => {
        console.log("clicked")
        setOpen(true);
        if (record) {
            setKitEdit(record)
        } else {
            form.resetFields()
        }

    };

    const showModalUser = async (userId: string) => {

        if (userId) {
            const response = await getUserDetail(userId)
            if (response) {
                console.log("res: ", response)
                setUser(response.data)
                setOpenModalUser(true)
            }
        }
    };

    const showModalConfirmDeleteKit = (record: Kit) => {
        setOpenConfirmDeleteKit(true);
        setKitDelete(record)
    };

    const showModalKitDetail = (record: Kit) => {
        setOpenKitDetail(true);
        setKitDetail(record);
    };

    const showModalChangeStautsKit = () => {
        setOpenChangeStautsKit(true);
    };

    // const handlePaginationChange = (page: number, pageSize?: number) => {
    //     setPagination((prev) => ({
    //         ...prev,
    //         current: page,
    //         pageSize: pageSize || 10,
    //     }));
    // };

    // const handleTableChange = (pagination: TablePaginationConfig) => {
    //     setPagination(pagination);
    // };

    const handleOk = async () => {
        if (kitDetete) {
            const res = await handleDeleteKit(kitDetete)
            console.log("handle delete: ", res);
        }
        setOpen(false);
        setOpenKitDetail(false);
        setOpenChangeStautsKit(false);
        setOpenConfirmDeleteKit(false);
        setOpenModalUser(false)
    };
    type FieldsChangeHandler = (changedFields: FieldData[]) => void;
    const handleFieldsChange: FieldsChangeHandler = (changedFields) => {
        const imageUrl = changedFields.find(field => field.name[0] === 'image_url');
        const videoUrl = changedFields.find(field => field.name[0] === 'video_url');
        console.log("value img:", imageUrl?.value + "")
        console.log("value video:", videoUrl?.value + "")
        if (imageUrl && imageUrl.value !== undefined) {
            setHideVideo(!!imageUrl.value); // Ẩn trường Video URL nếu Image URL được nhập
        }
        if (videoUrl && videoUrl.value !== undefined) {
            setHideImage(!!videoUrl.value); // Ẩn trường Image URL nếu Video URL được nhập
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setOpenKitDetail(false);
        setOpenChangeStautsKit(false);
        setOpenConfirmDeleteKit(false);
        setOpenModalUser(false)
        // form.setFieldsValue([])
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
                // <Link className="text-blue-500" to={`/manager/manage-kit/${record._id}`}>
                //     {name}
                // </Link>
                <>{name}</>
            )
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            render: (user_name: string, record: Kit) => (
                <div onClick={() => showModalUser(record.user_id)} className="text-blue-500 cursor-pointer">
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
            title: 'Price Discounted',
            render: (record: Kit) => (
                <div>
                    {priceDiscounted(record.price, record.discount)} {currencyUnit}
                </div>
            )
        },
        {
            title: 'Price',
            render: (record: Kit) => (
                <div>
                    {record.price} {currencyUnit}
                </div>
            )

        },
        {
            title: 'Discount',
            render: (record: Kit) => (
                <div>
                    {record.discount}%
                </div>
            )
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
            render: (record: Kit) => (
                <>
                    <EditOutlined onClick={() => showModal(record)} className="m-2 text-blue-500" />
                    <DeleteOutlined onClick={() => showModalConfirmDeleteKit(record)}
                        className="m-2 text-red-500" />
                </>
            )
        },
    ];

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getAllCategories = async () => {
        const res = await getCategories("", 1, 100);
        if (res) {
            console.log("res cate: ", res);
            setCategories(res.data.pageData);
        }
    }


    return (
        <>
            <ModalUser
                handleCancel={handleCancel}
                handleOk={handleOk}
                isModalOpen={openModalUser}
                user={user}
            />
            {/* Modal Delete KIT */}
            <Modal
                title="Delete KIT"
                open={openConfirmDeketeKit}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Do you want to delete {kitDetete?.name} ?</p>
            </Modal>
            {/* Kit Detail Modal */}
            <Modal
                title="Kit detail"
                footer=""
                open={openKitDetail}
                onOk={handleOk}
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
            {/* Add new kit and edit kit */}
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                footer=""
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    onFieldsChange={(_, allFields) => handleFieldsChange(allFields)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' },
                        {
                            validator: (_, value) => {
                                const cleanedValue = value.trim().replace(/\s+/g, " ");
                                if (cleanedValue.length === 0) {
                                    return Promise.reject(new Error("Name cannot be empty or only spaces"));
                                }
                                return Promise.resolve();
                            },
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category_id"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Select
                            defaultValue="Please select a categories"
                            style={{ width: 250 }}
                            onChange={handleChange}
                            options={categories.map(cate => (
                                { value: cate._id, label: cate.name }
                            ))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Description cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Select
                            defaultValue="Please select a status"
                            style={{ width: 250 }}
                            onChange={handleChange}
                            options={[
                                {
                                    options: [
                                        { label: <span>{kitStatus(statusOfKit.NEW)}</span>, value: statusOfKit.NEW },
                                        { label: <span>{kitStatus(statusOfKit.ACTIVE)}</span>, value: statusOfKit.ACTIVE },
                                        { label: <span>{kitStatus(statusOfKit.CONFIRMED_DELIVERED)}</span>, value: statusOfKit.CONFIRMED_DELIVERED },
                                        { label: <span>{kitStatus(statusOfKit.DELIVERED)}</span>, value: statusOfKit.DELIVERED },
                                        { label: <span>{kitStatus(statusOfKit.INACTIVE)}</span>, value: statusOfKit.INACTIVE },
                                        { label: <span>{kitStatus(statusOfKit.IN_WAREHOUSE)}</span>, value: statusOfKit.IN_WAREHOUSE },
                                        { label: <span>{kitStatus(statusOfKit.POPULAR)}</span>, value: statusOfKit.POPULAR },
                                        { label: <span>{kitStatus(statusOfKit.RETURNED)}</span>, value: statusOfKit.RETURNED },
                                        { label: <span>{kitStatus(statusOfKit.SHIPPED)}</span>, value: statusOfKit.SHIPPED },
                                        { label: <span>{kitStatus(statusOfKit.SOLD_OUT)}</span>, value: statusOfKit.SOLD_OUT },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item> */}
                    {!hideImage && (
                        <Form.Item
                            label="Image URL"
                            name="image_url"
                            rules={[{ required: !hideVideo, message: 'Please input your image URL!' },
                            {
                                validator: (_, value) => {
                                    if (!value || value.trim() === "") {
                                        return Promise.reject(new Error('Image URL cannot be just spaces!'));
                                    }
                                    return Promise.resolve();
                                }
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {!hideVideo && (
                        <Form.Item
                            label="Video URL"
                            name="video_url"
                            rules={[{ required: !hideImage, message: 'Please input your video URL!' },
                            {
                                validator: (_, value) => {
                                    if (!value || value.trim() === "") {
                                        return Promise.reject(new Error('Video URL cannot be just spaces!'));
                                    }
                                    return Promise.resolve();
                                }
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Price cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[
                            { required: true, message: 'Please input your discount must be between 0.1 and 1!' },
                            {
                                type: 'number',
                                min: 0.1,
                                max: 1,
                                message: 'Discount must be between 0.1 and 1',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || value.trim() === "") {
                                        return Promise.reject(new Error('Discount cannot be just spaces!'));
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber type="number" min={0.1} max={1} step={0.1} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Title level={1}
                className="text-center font-bold my-5"
            >Manage KIT</Title>
            <Button onClick={() => showModal()} type="primary" className="mb-5 float-right">Add new</Button>
            <Table
                columns={columns}
                dataSource={dataKits}
                // pagination={false}
                // onChange={handleTableChange}
                rowKey="_id"
            />
            {/* <div className="flex justify-end py-8">
                <Pagination
                    total={pagination.total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger
                />
            </div> */}
        </>
    )
}

export default ManageKit;