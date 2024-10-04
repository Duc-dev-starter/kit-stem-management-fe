
import { Button, Form, FormProps, Input, InputNumber, message, Modal, Select } from 'antd';
import { Category } from '../../../../models';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../../services';
import { Lab } from '../../../../models/Kit';
import { createLab, updateLab } from '../../../../services/lab.services';
export interface iModalCreateUpdate {
    isModalOpen: boolean,
    handleOk: () => void;
    handleCancel: () => void;
    labEdit?: Lab
}
const ModalCreateUpdate = (props: iModalCreateUpdate) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<Category[]>([])
    const { labEdit } = props
    useEffect(() => {
        getAllCategories();
        if (props.labEdit) {
            form.setFieldsValue({
                name: props.labEdit.name,
                category_id: props.labEdit.category_id,
                description: props.labEdit.description,
                content: props.labEdit.content,
                lab_url: props.labEdit.lab_url,
                price: props.labEdit.price,
                discount: props.labEdit.discount,
            });
        } else {
            form.resetFields();
        }
    }, [props.labEdit, form])

    const onFinish: FormProps['onFinish'] = async (values: Lab) => {
        console.log("values: ", values)
        if (labEdit?._id) {
            const res = await updateLab(labEdit._id, values);
            if (res) {
                console.log("res: ", res);
                message.success("Update Lab Successfully!")
                props.handleCancel()
            }
        } else {
            const res = await createLab(values);
            if (res) {
                console.log("res: ", res);
                message.success("Create Lab Successfully!")
                props.handleCancel()
            }
        }
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
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
            <Modal
                footer=""
                title="Basic Modal" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
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
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
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
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input your content!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lab URL"
                        name="lab_url"
                        rules={[{ required: true, message: 'Please input your lab_url!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
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
                        ]}
                    >
                        <InputNumber type="number" min={0.1} max={1} step={0.1} />
                    </Form.Item>
                    {
                        !labEdit?._id && <Form.Item
                            label="Max support count"
                            name="max_support_count"
                            rules={[
                                { required: true, message: 'Please input your discount must be between 0.1 and 1!' },
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 5,
                                    message: 'Discount must be between 0 and 5',
                                },
                            ]}
                        >
                            <InputNumber type="number" min={0} max={5} step={1} />
                        </Form.Item>
                    }

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalCreateUpdate;