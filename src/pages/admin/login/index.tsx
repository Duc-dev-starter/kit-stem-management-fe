import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import Login from "../../../assets/Login4.jpg";
import {
  ButtonFormItem,
  EmailFormItem,
  PasswordFormItem,
} from "../../../components";
import { FormProps } from "antd/lib";
import { handleNavigateRole, login } from "../../../services";
import { LoginFieldType } from "../../../models";
const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const authResult = await login(email, password);
      if (authResult && "token" in authResult) {
        handleNavigateRole(authResult.token, navigate);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#ccffaa] to-[#bfffc7]">
      <div className="flex w-10/12 max-w-5xl rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-4/10 flex flex-col justify-center bg-white p-8 md:p-16">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome back, Admin!
            </h1>
          </div>
          <span className="flex justify-center mb-4">
            Log in to CRUNCHLABS
          </span>
          <Form
            name="basic"
            className="space-y-4 w-full"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <EmailFormItem />
            <PasswordFormItem />
            <ButtonFormItem loading={loading} buttonText="Login" htmlType="submit" />
          </Form>
        </div>
        <div
          className="hidden md:flex w-6/10 items-center justify-center bg-gradient-to-r from-[#a7e05f] to-[#12ab97]"
          style={{ width: "100%", height: "560px" }}
        >
          <img
            className="w-full h-full object-cover"
            src={Login}
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
