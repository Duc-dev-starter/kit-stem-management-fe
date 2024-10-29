

import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, Table, message } from 'antd';
import type { FormProps } from 'antd';
import { Category, Kit } from '../../../models';
import { Lab } from '../../../models/Kit';
import { getCategories, getKits, getLabs } from '../../../services';
import Title from 'antd/es/typography/Title';
import { createComboService, getCombosByClientService } from '../../../services/combo.services';
import { Combo } from '../../../models/Combo.model';
import ModalKitDetail from './modal-kit-detail';
const ManagerManageCombo = () => {
    const [kits, setKits] = useState<Kit[]>([])
    const [kitDetail, setKitDetail] = useState<Kit>()
    const [labs, setLabs] = useState<Lab[]>([])
    const [cates, setCates] = useState<Category[]>([])
    const [combos, setCombos] = useState<Combo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalKitDetailOpen, setIsModalKitDetailOpen] = useState(false);
    useEffect(() => {
        getKitsFromManager()
        getLabsFromManager()
        getCategoriesFromManager()
        getCombosByCLient()
    }, [])


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
        description:string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
        console.log('Success:', values);
        const response = await createComboService(values)
        if(response){
            message.success("Create Combo Successfully!")
            setIsModalOpen(false);
            getCombosByCLient()
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalKitDetailOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalKitDetailOpen(false);
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kit',
            render: (record: Combo) => (
                <div className='text-blue-500 cursor-pointer' onClick={()=>showModalKitDetail(record?.items[0].details)}>
                    {record?.items[0].details.name}
                </div>
            )
        },
        {
            title: 'Lab',
            render: (record: Combo) => (
                <>
                    {record?.items[1].details.name}
                </>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'Price',
        },
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Action',
            render: () => {

            }
        },
    ];

    return (
        <div className='container mx-auto mt-3'>
            <ModalKitDetail
            kit={kitDetail}
            handleCancel={handleCancel}
            handleOk={handleOk}
            isModalOpen={isModalKitDetailOpen}
            />
            <Modal footer="" title="Create Combo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
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
                        rules={[{ required: true, message: "Please input combo's name!" },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Combo name cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input />
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
                        rules={[{ required: true, message: "Please input combo's quantity!" },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Quantity cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input combo's price!" },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Price cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: "Please input combo's discount!" },
                        {
                            validator: (_, value) => {
                                if (!value || value.trim() === "") {
                                    return Promise.reject(new Error('Discount cannot be just spaces!'));
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input type='number'/>
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
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Title level={1} className='text-center'>Manage Combo</Title>
            <Button onClick={showModal} className='float-right mb-3' type='primary'>Add new</Button>
            <Table dataSource={combos} columns={columns} />
        </div>
    )
}

export default ManagerManageCombo
