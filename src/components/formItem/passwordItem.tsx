import { Form, Input } from "antd";
import { passwordRules } from "../../consts";
interface Password {
    name: string,
    label: string
}
const PasswordFormItem = ({ name, label }: Password) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={passwordRules}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input.Password
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mx-auto"
            />
        </Form.Item>
    );
};

export default PasswordFormItem;
