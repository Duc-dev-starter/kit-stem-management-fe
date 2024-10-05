import { Button, Form, FormProps, message, Modal, Select } from "antd";
import { User } from "../../../../../models";
import { AddSupporters } from "../../../../../services/lab.services";

export interface iModalAddAndRemoveSupporters {
    isModalOpen: boolean,
    handleCancel: () => void;
    labId: string
    staffs: User[]
}



const ModalAddSupporters = ({ isModalOpen, handleCancel, labId, staffs }: iModalAddAndRemoveSupporters) => {
    const [form] = Form.useForm();

    const onFinish: FormProps['onFinish'] = async (values) => {
        form.resetFields();
        const res = await AddSupporters(labId, values.ids)
        if (res) {
            message.success("Add Supporters Successfully!");
        }
    };

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} footer="" onCancel={handleCancel}>
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
                        label="Choose Supporter"
                        name="ids"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Choose at least 1 supporter"
                            options={staffs.map(item => (
                                { value: item._id, label: item.name }
                            ))}
                        />
                    </Form.Item>

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

export default ModalAddSupporters;