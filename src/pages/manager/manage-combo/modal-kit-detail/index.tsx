import { Modal } from "antd";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { Kit } from "../../../../models";
import { formatDate } from "../../../../utils";

export interface iModalUser {
    isModalOpen: boolean,
    handleOk: () => void;
    handleCancel: () => void;
    kit: Kit;
}

type FieldType = {
    name: string;
    category_id: string;
    user_id: string;
    status: string;
    image_url: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    user_name: string;
    category_name: string;
    description: string;
    video_url: string;
    quantity?: number
};

const ModalKitDetail = ({ handleOk, handleCancel, isModalOpen, kit }: iModalUser) => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <Modal title="Kit Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        name: kit?.name,
                        description: kit?.description,
                        status: kit?.status,
                        price: kit?.price,
                        discount: kit?.discount,
                        quantity: kit?.quantity,
                        created_at: formatDate(kit?.created_at),
                        updated_at: formatDate(kit?.updated_at),
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
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input quantity!' }]}
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

export default ModalKitDetail
