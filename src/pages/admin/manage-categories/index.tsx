import { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Select, message } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Category } from "../../../models";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "../../../hooks";
import { formatDate } from "../../../utils";
import { LoadingOverlay, NameFormItem, CustomBreadcrumb, CustomDeletePopconfirm } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
const AdminManageCategories: React.FC = () => {
  const [dataCategories, setDataCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validateOnOpen, setValidateOnOpen] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

  const fetchCategories = useCallback(async () => {
    try {
      const responseCategories = await getCategories(debouncedSearchTerm, pagination.current, pagination.pageSize);
      setDataCategories(responseCategories.data.pageData || responseCategories.data);
      setPagination((prev) => ({
        ...prev,
        total: responseCategories.data.pageInfo?.totalItems || responseCategories.data.length,
        current: responseCategories.data.pageInfo?.pageNum || 1,
        pageSize: responseCategories.data.pageInfo?.pageSize || prev.pageSize,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [pagination.current, pagination.pageSize, searchText, debouncedSearchTerm]);




  const openModal = useCallback((mode: "Add" | "Edit", category?: Category) => {
    setModalMode(mode);
    form.resetFields();
    setIsModalVisible(true);
    setValidateOnOpen(true);

    if (mode === "Edit" && category) {


      form.setFieldsValue({
        ...category,
      });
    }
  }, [form]);

  const handleDeleteCategory = (id: string, name: string) => {
    deleteCategory(id, name, dataCategories, fetchCategories);
  };


  const onFinish = useCallback(
    async (values: Category) => {
      const cleanedName = values.name.trim().replace(/\s+/g, " "); // Remove extra spaces

      try {
        if (modalMode === 'Add') {
          const response = await createCategory({ ...values, name: cleanedName });
          if (response.success) {
            fetchCategories(); // Refresh the table data
            form.resetFields();
            message.success(`Category ${cleanedName} created successfully.`);
            setIsModalVisible(false);
          }
        } else if (modalMode === 'Edit') {
          const updatedCategory: Category = {
            ...values,
            name: cleanedName,
            updated_at: new Date().toISOString(),
          };

          const response = await updateCategory(formData._id, cleanedName, updatedCategory);
          if (response.success) {
            setDataCategories((prevData) =>
              prevData.map((category) =>
                category._id === formData._id ? { ...category, ...response.data } : category
              )
            );
            setIsModalVisible(false);
            form.resetFields();
            setFormData({});
            fetchCategories();
            message.success(`Category ${cleanedName} updated successfully.`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [modalMode, formData, form, fetchCategories]
  );




  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || 10,
    }));
  };
  const handleSearch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, [fetchCategories]);


  const columns: ColumnType<Category>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Updated Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: Date) => formatDate(updated_at),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: unknown, record: Category) => (
        <div>
          <EditOutlined
            className="text-blue-500"
            style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
            onClick={() => {
              openModal("Edit", record)
              setFormData(record);


              form.setFieldsValue({
                ...record,
              });
              // form.setFieldsValue(record);
            }}
          />
          <CustomDeletePopconfirm
            title="Delete the Category"
            description="Are you sure to delete this Category?"
            onConfirm={() => handleDeleteCategory(record._id, record.name)} />
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
      <div className="flex justify-between items-center ">
        <CustomBreadcrumb />

        <Button className="top-14" type="primary" onClick={() => openModal("Add")}>
          Add New Category
        </Button>
      </div>
      <Space>
        <Input.Search
          className="my-4"
          placeholder="Search By Name"
          value={searchText}
          onChange={handleSearchText}
          onSearch={handleSearch}
          style={{ width: 200 }}
          enterButton={<SearchOutlined className="text-white" />}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={dataCategories}
        rowKey={(record: Category) => record?._id || "unknown"}
        pagination={false}
        onChange={handleTableChange}
        className="overflow-auto"
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
        title={modalMode === "Add" ? "Add New Category" : "Edit Category"}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setValidateOnOpen(false);
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
        >
          <NameFormItem />

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              {modalMode === "Add" ? 'Add' : 'Edit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategories;
