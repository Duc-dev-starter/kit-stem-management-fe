

import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, Table } from 'antd';
import type { FormProps } from 'antd';
import { Kit } from '../../../models';
import { Lab } from '../../../models/Kit';
import { getKits, getLabs } from '../../../services';
import Title from 'antd/es/typography/Title';
const ManagerManageCombo = () => {
    const [kits, setKits] = useState<Kit[]>([])
    const [labs, setLabs] = useState<Lab[]>([])

    useEffect(() => {
        getKtsFromClient()
        getLabsFromCLient()
    }, [])

    const getKtsFromClient = async () => {
        const response = await getKits("", "", "", false, 1, 100);
        if (response) {
            console.log("getKtsFromClient: ",response)
            setKits(response.data.pageData)
        }
    }

    const getLabsFromCLient = async () => {
        const response = await getLabs("", "", "", false, 1, 100);
        if (response) {
            console.log("getLabsFromCLient: ",response)
            setLabs(response.data.pageData)
        }
    }
    type FieldType = {
        comboName: string;
        image: string;
        kitId: string;
        labId: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeKITname = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangeLABname = (value: string) => {
        console.log(`selected ${value}`);
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
      ];

    return (
        <div className='container mx-auto mt-3'>
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
                        name="comboName"
                        rules={[{ required: true, message: "Please input combo's  name!" }]}
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
                            options={kits.map(item=>({
                                value:item._id, label: item.name
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
                            options={labs.map(item=>({
                                value:item._id, label: item.name
                            }))}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: "Please input combo's iamge!" }]}
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
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ManagerManageCombo
