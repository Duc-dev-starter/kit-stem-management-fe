import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Image,
  Input,
  Space,
  Switch,
  Table,
  Modal,
  Form,
  Pagination,
  Upload,
  Popconfirm,
  Radio,
  Select,
  Avatar,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { GetProp, RadioChangeEvent, TableColumnsType, TablePaginationConfig, UploadFile, UploadProps } from "antd";
import { User, UserRole } from "../../../models/User.ts";

import { roleRules, roles } from "../../../consts/index.ts";
import { useDebounce } from "../../../hooks/index.ts";
import {
  // CustomBreadcrumb,
  DescriptionFormItem,
  EmailFormItem,
  NameFormItem,
  PasswordFormItem,
  PhoneNumberFormItem,
  UploadButton,
  VideoFormItem,
} from "../../../components";
import { axiosInstance } from "../../../services/axiosInstance.ts";
import { formatDate, getBase64, uploadFile } from "../../../utils/index.ts";
import LoadingComponent from "../../../components/loading/index.tsx";
import CustomBreadcrumb from "../../../components/breadcrumb/index.tsx";
import { getUsers } from '../../../services';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AdminManageUsers: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>(roles.CUSTOMER);

  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

  const [formData, setFormData] = useState<Partial<User>>({});

  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("true");

  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, debouncedSearch]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let statusValue: boolean | undefined = false;
      if (selectedStatus === "true") {
        statusValue = true;
      }
      const responseUsers = await getUsers(
        debouncedSearch,
        selectedRole === "All" ? undefined : selectedRole.toLowerCase(),
        statusValue,
        false,
        pagination.current,
        pagination.pageSize
      );
      const sortedUsers = responseUsers.data.pageData.sort((a: User, b: User) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });


      setDataUsers(sortedUsers);
      setPagination({
        ...pagination,
        total: responseUsers.data.pageInfo.totalItems,
        current: responseUsers.data.pageInfo.pageNum,
        pageSize: responseUsers.data.pageInfo.pageSize,
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, searchText, debouncedSearch]);

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleAddClick = () => {
    setModalMode("Add");
    setIsModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEditUser = async (values: User) => {
    setLoading(true);
    let avatarUrl = values.avatar;

    if (values.avatar && typeof values.avatar !== "string" && values.avatar.file?.originFileObj) {
      avatarUrl = await uploadFile(values.avatar.file.originFileObj);
    }

    const updatedUser = {
      ...values,
      avatar: avatarUrl,
      email: values.email,
    };

    // Logic to handle the API call or further processing for updating the user
    try {
      await axiosInstance.put(`/users/${values._id}`, updatedUser);
      message.success("User updated successfully");
      setDataUsers((prev) =>
        prev.map((user) => (user._id === values._id ? { ...user, ...updatedUser } : user))
      );
    } catch (error) {
      message.error("Failed to update user");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const columns: TableColumnsType<User> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <Avatar
          size={50}
          src={
            avatar
              ? avatar
              : "https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-8/32/user--avatar--filled-256.png"
          }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      render: (role: UserRole, record: User) => (
        <Select defaultValue={role}>
          <Select.Option className="text-red-700" value="student">
            <span className="text-blue-800">Student</span>
          </Select.Option>
          <Select.Option value="instructor">
            <span className="text-green-700">Instructor</span>
          </Select.Option>
          <Select.Option value="admin">
            <span className="text-violet-500">Admin</span>
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
      width: "10%",
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
      width: "10%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean, record: User) => <Switch defaultChecked={status} />,
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_: unknown, record: User) => (
        <div>
          <EditOutlined
            className="hover:cursor-pointer text-blue-400 hover:opacity-60"
            style={{ fontSize: "20px" }}
            onClick={() => {
              setModalMode("Edit");
              setIsModalVisible(true);
              form.setFieldsValue(record);
              setFormData(record);

              const avatarUrl = typeof record.avatar === "string" ? record.avatar : "";

              setFileList(
                avatarUrl
                  ? [
                    {
                      uid: "-1",
                      name: "avatar.png",
                      status: "done",
                      url: avatarUrl,
                    } as UploadFile<any>,
                  ]
                  : []
              );
            }}
          />
          <Popconfirm title="Delete the User" okText="Yes" cancelText="No">
            <DeleteOutlined className="ml-5 text-red-500 hover:cursor-pointer hover:opacity-60" style={{ fontSize: "20px" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <CustomBreadcrumb />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="mt-3 md:mt-0">
          <Button type="primary" className="py-2" onClick={handleAddClick}>
            <UserAddOutlined /> Add New User
          </Button>
        </div>
      </div>

      <Space className="mb-2 flex flex-wrap">
        <Input.Search
          placeholder="Search By Name and Email"
          value={searchText}
          onChange={handleSearchText}
          className="w-full md:w-64"
          enterButton={<SearchOutlined className="text-white" />}
        />

        <Select value={selectedRole} className="w-full md:w-32 mt-2 md:mt-0 md:ml-2">
          <Select.Option value="All">All Roles</Select.Option>
          <Select.Option value="Admin">
            <span className="text-violet-500">Admin</span>
          </Select.Option>
          <Select.Option value="Manager">
            <span className="text-blue-800">Manager</span>
          </Select.Option>
          <Select.Option value="Member">
            <span className="text-green-700">Member</span>
          </Select.Option>
        </Select>

        <Select value={selectedStatus} className="w-full md:w-32 mt-2 md:mt-0 md:ml-2">
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>

      </Space>

      <Table
        columns={columns}
        dataSource={dataUsers}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handlePaginationChange,
        }}
        onChange={handleTableChange}
        rowKey="_id"
      />

      <Modal
        title={modalMode === "Edit" ? "Edit User" : "Add New User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={modalMode === "Edit" ? handleEditUser : () => { }}
          initialValues={formData}
        >
          <NameFormItem />
          <EmailFormItem />
          <PasswordFormItem />
          <PhoneNumberFormItem />

          <Form.Item label="Avatar">
            <Upload
              name="avatar"
              listType="picture-card"
              fileList={fileList}
              onPreview={() => setPreviewOpen(true)}
              beforeUpload={(file: FileType) => {
                setFileList([file]);
                return false;
              }}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              {fileList.length >= 1 ? null : <UploadButton />}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {modalMode === "Edit" ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageUsers;
