import {
  Form,
  FormProps,
  Image,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Register1 from "../../assets/Register1.jpg";
import { useForm } from "antd/es/form/Form";
import {
  roleRules,
} from "../../consts";
import {
  BackButton,
  ButtonFormItem,

  EmailFormItem,
  NameFormItem,
  PasswordFormItem,
  PhoneNumberFormItem,

} from "../../components";

import { roles } from "../../enum";
import { registerUser } from "../../services/user";


const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish: FormProps["onFinish"] = async (values) => {
    setLoading(true);

    if(values.password != values.confirmPassword){
      message.error("Password and Confirm Password are not the same!")
    }

    try {
     const res = await registerUser(values)
      message.success("Successfully registered. Please check your email to login");
      if (res) {
        console.log("res: ", res);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#fffcce] to-[#1e5b53] relative">
      <BackButton path={"/"} />
      <div className="w-full md:w-7/12 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[500px] mb-[30px] mt-[30px]">
        <div className="w-1/2 flex flex-col justify-center p-4 md:p-8 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              Register
            </h1>
          </div>

          <span className="text-center mb-3">
            Step into success with FLearn. Join us today!
          </span>

          <div className="mb-3">
            <div className="flex justify-center">
              <Form
                form={form}
                name="basic"
                className="flex flex-col gap-1"
                style={{ maxWidth: 600, overflow: "hidden" }}
                // initialValues={{ remember: true, role }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <EmailFormItem />
                <PhoneNumberFormItem />
                <NameFormItem />
                <PasswordFormItem label="Password" name="password"/>
                <PasswordFormItem label="Confirm Password" name="confirmPassword"/>
                <Form.Item
                  name="role"
                  rules={roleRules}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  className="mb-3"
                  initialValue={roles.CUSTOMER}
                >
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 24 }}
                  style={{ marginBottom: "0px" }}
                >
                  <ButtonFormItem loading={loading} buttonText="Register" htmlType="submit" />
                </Form.Item>
              </Form>
            </div>
            <span className="block text-center">
              Do you already have an account?
            </span>
            <span className="block text-center mt-1">
              <strong>
                <Link
                  to={"/login"}
                  className="hover:cursor-pointer hover:text-blue-400"
                >
                  Back to Sign In
                </Link>
              </strong>
            </span>
          </div>
        </div>

        <Image
            wrapperStyle={{ display: "none" }}
          />
        <div
          className="w-1/2 flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <img
            src={Register1}
            alt="Vector"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
