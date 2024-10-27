import { useState, useEffect, useCallback } from "react";
import {
  Image,
  Input,
  Space,
  Switch,
  Table,
  Pagination,
  Select,
  Avatar,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type {  TableColumnsType, TablePaginationConfig } from "antd";
import { User, UserRole } from "../../../models/User.ts";
import { getRoleColor, getRoleLabel } from "../../../consts";
import { useDebounce } from "../../../hooks";
import {
  CustomSelect,
  LoadingOverlay,
  CustomBreadcrumb
} from "../../../components";
import { formatDate } from "../../../utils";
import { changeStatusUser, changeUserRole, getUsers } from '../../../services';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { roles } from "../../../enum";


const ManagerManageUsers: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("true");
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

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


      setDataUsers(sortedUsers.filter((item: User) => item.role != "admin" && item.role != "manager"));
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
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const handleRoleChange = async (value: UserRole, userId: string) => {
    await changeUserRole(userId, value);
    setDataUsers((prevData: User[]) => prevData.map((user) => (user._id === userId ? { ...user, role: value } : user)));
  };
  ;

  const handleUserStatus = (userId: string, status: boolean) => {
    const updateData = dataUsers.map((user) => (user._id === userId ? { ...user, status: status } : user));
    setDataUsers(updateData);
  };

  const handleRolefilter = (value: string) => {
    setSelectedRole(value);

  };
  const handleStatus = (value: string) => {
    setSelectedStatus(value);
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
      render: (role: UserRole, record: User) => (
        <div  className="text-blue-500">
          {record.name}
        </div>
      ),
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
        <CustomSelect
          value={role}
          options={[roles.CUSTOMER, roles.STAFF]}
          getColor={getRoleColor}
          getLabel={getRoleLabel}
          onChange={(value) => handleRoleChange(value, record._id)}
          className="w-full"
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
      render: (status: boolean, record: User) =>
        <Switch defaultChecked={status}
          onChange={(checked) => changeStatusUser(checked, record._id, handleUserStatus)}
        />,
    },
  ]

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  return (
    <div>
       {/* <Modal title="User Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}
        
      {/* </Modal> */}
      {isLoading && <LoadingOverlay />}
      <div className="flex flex-row md:flex-row justify-between items-center mb-4">
        <div className="flex flex-row justify-between w-full mt-3 md:mt-0">
          <CustomBreadcrumb />
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
          options={[roles.CUSTOMER, roles.STAFF, 'all']}
          getColor={getRoleColor}
          getLabel={getRoleLabel}
          onChange={handleRolefilter}
        />

        <Select value={selectedStatus} onChange={handleStatus} className="w-full mt-2 mb-2 md:w-32 md:mt-0 md:ml-2">
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>

      </Space>

      <Table
        columns={columns}
        dataSource={dataUsers}
        pagination={false}
        onChange={handleTableChange}
        rowKey={(record: User) => record?._id || "unknown"}
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

      {/* <Modal
        title={modalMode === "Edit" ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={() => handleModalCancel()}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <NameFormItem />
          {modalMode === "Add" && <EmailFormItem />}
          {modalMode === "Add" && (
            <div className="mt-3">
              <PasswordFormItem name="password" label="Password" />
            </div>
          )}
          {modalMode === "Add" && (

            <Form.Item name="role" rules={roleRules} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="mb-3">
              <Radio.Group>
                <Radio value={roles.CUSTOMER}>Customer</Radio>
                <Radio value={roles.STAFF}>Staff</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          <Form.Item label="Avatar" name="avatar">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : <UploadButton />}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {modalMode === "Edit" ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
            mask: null
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ManagerManageUsers;
