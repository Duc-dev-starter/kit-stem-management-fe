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
  Radio,
  Select,
  Avatar,
  message,
} from "antd";
import { EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { GetProp, RadioChangeEvent, TableColumnsType, TablePaginationConfig, UploadFile, UploadProps } from "antd";
import { User, UserRole } from "../../../models/User.ts";

import { getRoleColor, getRoleLabel, roleRules, roles } from "../../../consts";
import { useDebounce } from "../../../hooks/index.ts";
import {
  CustomDeletePopconfirm,
  CustomSelect,
  // CustomBreadcrumb,
  DescriptionFormItem,
  EmailFormItem,
  LoadingOverlay,
  NameFormItem,
  PasswordFormItem,
  PhoneNumberFormItem,
  UploadButton,
} from "../../../components";
import { formatDate, getBase64, uploadFile } from "../../../utils";
import CustomBreadcrumb from "../../../components/breadcrumb/index.tsx";
import { deleteUser, getUsers, updateUser } from '../../../services';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AdminManageUsers: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>(roles.CUSTOMER);

  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

  const [formData, setFormData] = useState<Partial<User>>({});

  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("true");
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, selectedRole, selectedStatus, debouncedSearch]);

  const fetchUsers = useCallback(async () => {
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
    } catch (error) {
      console.log(error);
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

  const handleUpdateUser = async (values: User) => {
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
      await updateUser(values._id, updatedUser);
      setDataUsers((prev) =>
        prev.map((user) => (user._id === values._id ? { ...user, ...updatedUser } : user))
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to update user");
    } finally {
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
      render: (role: UserRole) => (
        <CustomSelect
          value={role}
          options={[roles.ADMIN, roles.CUSTOMER, roles.MANAGER, roles.STAFF]}
          getColor={getRoleColor}
          getLabel={getRoleLabel}
        />
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
          <CustomDeletePopconfirm
            title="Delete the User"
            description="Are you sure to delete this User?"
            onConfirm={() => deleteUser(record._id, record.name, fetchUsers)}
          />
        </div>
      ),
    },
  ];

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div className="flex flex-row md:flex-row justify-between items-center mb-4">
        <div className="flex flex-row justify-between w-full mt-3 md:mt-0">
          <CustomBreadcrumb />
          <Button type="primary" className="py-2" onClick={handleAddClick}>
            <UserAddOutlined /> Add New User
          </Button>
        </div>
      </div>

      <Space className="pb-3 flex flex-wrap">
        <Input.Search
          placeholder="Search By Name and Email"
          value={searchText}
          onChange={handleSearchText}
          className="w-full md:w-64"
          enterButton={<SearchOutlined className="text-white" />}
        />

        <CustomSelect
          className="w-full mt-2 mb-2 md:w-32 md:mt-0 md:ml-2"
          value={selectedRole}
          options={[roles.ADMIN, roles.CUSTOMER, roles.MANAGER, roles.STAFF, 'all']}
          getColor={getRoleColor}
          getLabel={getRoleLabel}
        />

        <Select value={selectedStatus} className="w-full mt-2 mb-2 md:w-32 md:mt-0 md:ml-2">
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>

      </Space>

      <Table
        columns={columns}
        dataSource={dataUsers}
        pagination={false}
        onChange={handleTableChange}
        rowKey="_id"
      />

      <div className="flex justify-end py-8">
        <Pagination
          total={pagination.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>

      <Modal
        title={modalMode === "Edit" ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={modalMode === "Edit" ? handleUpdateUser : () => { }}
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {modalMode === "Edit" ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageUsers;
