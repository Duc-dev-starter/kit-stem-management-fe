import { useState, useRef } from "react";
import { Form, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Login4 from "../../assets/Login4.jpg";
import { PATH } from "../../consts";
import {
  login,
  handleNavigateRole,
  loginWithGoogle,

  // loginWithGoogle,
  // registerWithGoogle,
} from "../../services";
import type { FormInstance } from "antd";
import {
  BackButton,
  ButtonFormItem,
  EmailFormItem,
  PasswordFormItem,
} from "../../components";
import { LoginFieldType } from "../../models/Auth";
import { GoogleLogin } from '@react-oauth/google';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const formRef = useRef<FormInstance>(null);

  const onFinish = async (values: LoginFieldType) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const authResult = await login(email, password);
      if (authResult && "token" in authResult) {
        await handleNavigateRole(authResult.token, navigate);
      }
      setLoading(false)
    } catch (error) {
      console.log("login error: ", error)
    }
  };


  //   try {
  //     await modalFormRef.current?.validateFields();
  //     const googleId = localStorage.getItem("token");
  //     if (googleId) {
  //       await registerWithGoogle(googleId, role, additionalFields, navigate);
  //       setIsModalVisible(false);
  //       localStorage.removeItem("token");
  //       formRef.current?.resetFields();
  //       setFileList([]);
  //       setAdditionalFields({
  //         description: "",
  //         phone_number: "",
  //         video: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Validation failed:", error);
  //   }
  // };


  const renderGoogleLogin = () => (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        loginWithGoogle(
          credentialResponse.credential as string,
          navigate,
        );
      }}
    />
  );



  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#fffcce] to-[#1e5b53] relative">
      <BackButton path={PATH.HOME} />
      <div className="w-full md:w-1/2 flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[500px] mb-[30px]">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={Login4}
            alt="Vector"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-4 md:p-8 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-4">
            <h1 className="mb-2 text-2xl md:text-3xl font-bold text-center">
              Welcome
            </h1>
            <span className="text-sm md:text-base text-center">
              Log in to become a part of CrunchLabs
            </span>
          </div>
          <Form
            ref={formRef}
            name="basic"
            className="space-y-4 w-full"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <EmailFormItem />
            <PasswordFormItem />
            <div className="flex justify-center">
              <Link
                className="hover:text-blue-600 mt-2"
                to={PATH.FORGOT_PASSWORD}
              >
                Forgot Password
              </Link>
            </div>
            <ButtonFormItem
              loading={loading}
              buttonText="Login"
              htmlType="submit"
            />
          </Form>
          <span className="mt-4 block text-center">
            Don't have an account yet?{" "}
            <strong>
              <Link
                to={PATH.REGISTER}
                className="hover:cursor-pointer hover:text-blue-600"
              >
                Sign up here!
              </Link>
            </strong>
          </span>
          <div className="flex justify-center items-center mt-6">
            <hr className="border-gray-300 w-1/3" />
            <span className="text-center mx-2">or</span>
            <hr className="border-gray-300 w-1/3" />
          </div>
          <div className="flex justify-center mt-6">{renderGoogleLogin()}</div>
        </div>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default LoginPage;
