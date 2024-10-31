

import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, Table, message } from 'antd';
import type { FormProps } from 'antd';
import { Category, Kit } from '../../../models';
import { Lab } from '../../../models/Kit';
import { getCategories, getKits, getLabs } from '../../../services';
import Title from 'antd/es/typography/Title';
import { createComboService, editComboService, getCombosByClientService } from '../../../services/combo.services';
import { Combo } from '../../../models/Combo.model';
import ModalKitDetail from './modal-kit-detail';
import ModalLabDetail from './modal-lab-detail';
import { currencyUnit, priceDiscounted } from '../../../consts';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';
const ManagerManageCombo = () => {
    const [form] = Form.useForm();
    const [kits, setKits] = useState<Kit[]>([])
    const [kitDetail, setKitDetail] = useState<Kit>()
    const [labs, setLabs] = useState<Lab[]>([])
    const [labDetail, setLabDetail] = useState<Lab>()
    const [cates, setCates] = useState<Category[]>([])
    const [combos, setCombos] = useState<Combo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalKitDetailOpen, setIsModalKitDetailOpen] = useState(false);
    const [isModalLabDetailOpen, setIsModalLabDetailOpen] = useState(false);
    const [comboEdit, setComboEdit] = useState<Combo>()
    const [comboIdEdit, setComboIdEdit] = useState<string>('')
    useEffect(() => {
        getKitsFromManager()
        getLabsFromManager()
        getCategoriesFromManager()
        getCombosByCLient()
    }, [])

    useEffect(() => {
        if (comboIdEdit && comboEdit ) {
            form.setFieldsValue({
                name: comboEdit.name,
                category_id: comboEdit.category_id,
                description: comboEdit.description,
                kitId: comboEdit.items[0].itemId,
                labId: comboEdit.items[1].itemId,
                price: comboEdit.price,
                discount: comboEdit.discount,
                quantity: comboEdit.quantity,
                image_url: comboEdit.image_url,
            });
        }
    }, [comboEdit, comboIdEdit])

    const getCombosByCLient = async () => {
        const response = await getCombosByClientService("", "", 1, 100)
        if (response) {
            setCombos(response.data.pageData)
        }
    }

    const getCategoriesFromManager = async () => {
        const response = await getCategories("", 1, 100);
        if (response) {
            console.log("getCategoriesFromManager: ", response)
            setCates(response.data.pageData)
        }
    }
    const getKitsFromManager = async () => {
        const response = await getKits("", "", "", false, 1, 100);
        if (response) {
            console.log("getKitsFromManager: ", response)
            setKits(response.data.pageData)
        }
    }

    const getLabsFromManager = async () => {
        const response = await getLabs("", "", "", false, 1, 100);
        if (response) {
            console.log("getLabsFromCLient: ", response)
            setLabs(response.data.pageData)
        }
    }

    type FieldType = {
        name: string;
        price: number;
        quantity: number;
        discount: number;
        kitId: string;
        labId: string;
        category_id: string;
        description: string;
        image_url: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        if (!comboIdEdit) {
            const response = await createComboService(values)
            console.log("res: ", response)
            if (response.data) {
                message.success("Create Combo Successfully!")
                setIsModalOpen(false);
                getCombosByCLient()
                form.resetFields();
            }
        }else{
            const response = await editComboService(values, comboIdEdit)
            console.log("res: ", response)
            if (response.data) {
                message.success("Update Combo Successfully!")
                setIsModalOpen(false);
                getCombosByCLient()
                form.resetFields();
            }
        }
    };

    const showModal = (record?: Combo) => {
        setIsModalOpen(true);
        if (record) {
            setComboEdit(record)
            setComboIdEdit(record._id)
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalKitDetailOpen(false);
        setIsModalLabDetailOpen(false);
        form.resetFields()
        setComboIdEdit('')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalKitDetailOpen(false);
        setIsModalLabDetailOpen(false);
        form.resetFields()
        setComboIdEdit('')
    };

    const handleChangeKITname = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangeLABname = (value: string) => {
        console.log(`selected ${value}`);
    };

    const showModalKitDetail = (record: Kit) => {
        setIsModalKitDetailOpen(true);
        setKitDetail(record)
    };

    const showModalLabDetail = (record: Lab) => {
        setIsModalLabDetailOpen(true);
        setLabDetail(record)
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kit',
            render: (record: Combo) => (
                <div className='text-blue-500 cursor-pointer' onClick={() => showModalKitDetail(record?.items[0].details)}>
                    {record?.items[0].details.name}
                </div>
            )
        },
        {
            title: 'Lab',
            render: (record: Combo) => (
                <div className='text-blue-500 cursor-pointer' onClick={() => showModalLabDetail(record?.items[1].details)}>
                    {record?.items[1].details.name}
                </div>
            )
        },
        {
            title: 'Price Discounted',
            render: (record: Combo) => (
                <div>
                    {priceDiscounted(record.price, record.discount)} {currencyUnit}
                </div>
            )
        },
        {
            title: 'Price',
            render: (record: Combo) => (
                <div>
                    {record.price} {currencyUnit}
                </div>
            )

        },
        {
            title: 'Discount',
            render: (record: Combo) => (
                <div>
                    {record.discount}%
                </div>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Action',
            render: (record: Combo) => (
                <>
                    <EditOutlined onClick={() => showModal(record)} className="m-2 text-blue-500" />
                    {/* <DeleteOutlined onClick={() => showModalDelete(record)} className="m-2 text-red-500" /> */}
                </>
            )
        },
    ];
    const validateImageLink = (_, value) => {
        const base64Pattern = /^data:image\/(png|jpg|jpeg|webp);base64,/;
        if (!value) {
            return Promise.reject(new Error('Please provide an image link'));
        }
        if (!base64Pattern.test(value)) {
            return Promise.reject(new Error('Invalid base64 image link'));
        }
        return Promise.resolve();
    };
    return (
        <div className='container mx-auto mt-3'>
            <ModalKitDetail
                kit={kitDetail}
                handleCancel={handleCancel}
                handleOk={handleOk}
                isModalOpen={isModalKitDetailOpen}
            />
            <ModalLabDetail
                lab={labDetail}
                handleCancel={handleCancel}
                handleOk={handleOk}
                isModalOpen={isModalLabDetailOpen}
            />
            <Modal footer="" title={comboIdEdit ? "Edit Combo" : "Create Combo"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Combo name"
                        name="name"
                        rules={[{ required: true, message: "Please input combo's name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                            name="image_url"
                            label="Image URL"
                            rules={[{ validator: validateImageLink }]}
                        >
                            <Input placeholder="Paste your base64 image link here" />
                        </Form.Item>
                    <Form.Item<FieldType>
                        label="KIT name"
                        name="kitId"
                        rules={[{ required: true, message: "Please input combo's kit name!" }]}
                    >
                        <Select
                            defaultValue="Please select KIT's name"
                            style={{ width: 310 }}
                            onChange={handleChangeKITname}
                            options={kits.map(item => ({
                                value: item._id, label: item.name
                            }))}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="LAB name"
                        name="labId"
                        rules={[{ required: true, message: "Please input combo's lab name!" }]}
                    >
                        <Select
                            defaultValue="Please select LAB's name"
                            style={{ width: 310 }}
                            onChange={handleChangeLABname}
                            options={labs.map(item => ({
                                value: item._id, label: item.name
                            }))}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Category name"
                        name="category_id"
                        rules={[{ required: true, message: "Please input combo's category name!" }]}
                    >
                        <Select
                            defaultValue="Please select Catefory's name"
                            style={{ width: 310 }}
                            onChange={handleChangeKITname}
                            options={cates.map(item => ({
                                value: item._id, label: item.name
                            }))}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: "Please input combo's quantity!" }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    <Form.Item<FieldType>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input combo's price!" }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: "Please input combo's discount!" }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input combo's description!" },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Title level={1} className='text-center'>Manage Combo</Title>
            <Button onClick={() => showModal()} className='float-right mb-3' type='primary'>Add new</Button>
            <Table dataSource={combos} columns={columns} />
        </div>
    )
}

export default ManagerManageCombo
