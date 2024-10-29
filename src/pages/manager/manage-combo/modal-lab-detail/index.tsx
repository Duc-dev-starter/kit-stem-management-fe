import { Modal } from "antd";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { formatDate } from "../../../../utils";
import { Lab } from "../../../../models/Kit";
import TextArea from "antd/es/input/TextArea";

export interface iModalLabDetail {
    isModalOpen: boolean,
    handleOk: () => void;
    handleCancel: () => void;
    lab: Lab;
}

type FieldType = {
    name: string;
    category_id: string;
    user_id: string;
    status: string;
    lab_url: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    user_name: string;
    category_name: string;
    description: string;
    content: string;
    max_support_count?: number
};

const ModalLabDetail = ({ handleOk, handleCancel, isModalOpen, lab }: iModalLabDetail) => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <Modal title="Lab Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        name: lab?.name,
                        description: lab?.description,
                        status: lab?.status,
                        price: lab?.price,
                        discount: lab?.discount,
                        content: lab?.content,
                        lab_url: lab?.lab_url,
                        created_at: formatDate(lab?.created_at),
                        updated_at: formatDate(lab?.updated_at),
                        max_support_count: lab?.max_support_count,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input status!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input discount!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input content!' }]}
                    >
                        <TextArea disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Lab URL"
                        name="lab_url"
                        rules={[{ required: true, message: 'Please input lab URL!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Max Support Count"
                        name="max_support_count"
                        rules={[{ required: true, message: 'Please input max support count!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Created at"
                        name="created_at"
                        rules={[{ required: true, message: 'Please input created date!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Updated at"
                        name="updated_at"
                        rules={[{ required: true, message: 'Please input updated date!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Form>


            </Modal>
        </div>
    )
}

export default ModalLabDetail
