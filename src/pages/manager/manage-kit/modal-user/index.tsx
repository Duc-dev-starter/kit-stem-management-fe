import { Modal } from "antd";
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import { User } from "../../../../models";

export interface iModalUser {
    isModalOpen: boolean,
    handleOk: () => void;
    handleCancel: () => void;
    user: User;
}

type FieldType = {
    name?: string;
    email?: string;
    role?: string;
    dob?: string;
    phoneNumber?: string;
    createdAt?: string;
    updatedAt?: string;
};

const ModalUser = ({ handleOk, handleCancel, isModalOpen, user }: iModalUser) => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        name: user?.name,
                        email: user?.email,
                        phoneNumber:user?.phone_number,
                        role:user?.role,
                        dob:user?.dob,
                        createdAt:user?.created_at,
                        updatedAt:user?.updated_at,
                    }
                    }
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>

                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<FieldType>

                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Phone number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input disabled />
                    </Form.Item>


                    <Form.Item<FieldType>
                        label="Date of birth"
                        name="dob"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Created at"
                        name="createdAt"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Updated At"
                        name="dob"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalUser
