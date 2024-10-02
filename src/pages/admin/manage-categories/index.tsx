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
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = useCallback(async () => {
    try {
      const responseCategories = await getCategories(debouncedSearchTerm, false, pagination.current, pagination.pageSize);
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, searchText]);

  const fetchParentCategories = useCallback(async () => {
    const responseParentCategories = await getCategories("", false);
    setParentCategories(responseParentCategories.data.pageData || responseParentCategories.data);
  }, []);

  useEffect(() => {
    fetchParentCategories();
  }, [fetchParentCategories]);

  const openModal = useCallback((mode: "Add" | "Edit", category?: Category) => {
    setModalMode(mode);
    form.resetFields();
    setIsModalVisible(true);
    setValidateOnOpen(true);

    if (mode === "Edit" && category) {
      const parentCategory = parentCategories.find(
        (cat) => cat._id === category.parent_category_id
      );

      form.setFieldsValue({
        ...category,
        parent_category_id: parentCategory ? parentCategory._id : "none", // Sử dụng ID thay vì tên
      });
    }
  }, [form, parentCategories]);

  const handleDeleteCategory = (id: string, name: string) => {
    deleteCategory(id, name, dataCategories, fetchCategories);
    setParentCategories(dataCategories)
    fetchParentCategories();
  };


  const onFinish = useCallback(
    async (values: Category) => {
      console.log(values)
      let parentCategoryId = null;
      if (values.parent_category_id && values.parent_category_id !== "none") {
        parentCategoryId = values.parent_category_id;
      }

      try {
        if (modalMode === 'Add') {
          const response = await createCategory({ ...values, parent_category_id: parentCategoryId });
          console.log(values._id);

          if (response.success) {
            setDataCategories((prevData) => [...prevData, response.data]);
            form.resetFields();

            message.success(`Category ${values.name} created successfully.`);
            setIsModalVisible(false);
          }
        } else if (modalMode === 'Edit') {
          const updatedCategory: Category = {
            ...values,
            parent_category_id: parentCategoryId,
            updated_at: new Date().toISOString(),
          };

          const response = await updateCategory(formData._id, values.name || '', updatedCategory);
          if (response.success) {
            setDataCategories((prevData) =>
              prevData.map((category) =>
                category._id === values._id ? { ...category, ...response.data } : category
              )
            );
            setIsModalVisible(false);
            form.resetFields();
            setFormData({});
            fetchCategories();
            fetchParentCategories();
            message.success(`Category ${values.name} updated successfully.`);
          }
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong!");
      }
    },
    [modalMode, dataCategories, form, fetchCategories, fetchParentCategories]
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
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parent_category_id: string) => {
        const category = dataCategories.find(
          (category) => category._id === parent_category_id
        );
        return category ? category.name : "None";
      },
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

              const parentCategory = parentCategories.find(
                (category) => category._id === record.parent_category_id
              );

              form.setFieldsValue({
                ...record,
                parent_category_id: parentCategory ? parentCategory.name : "none", // Set name instead of ID
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

          <Form.Item label="Parent Category" name="parent_category_id" rules={[{ required: false }]}>
            <Select placeholder="Select parent category">
              {parentCategories
                .filter(parentCategory =>
                  !dataCategories.some(cate => cate.parent_category_id === parentCategory._id)
                )
                .map((category) => (
                  <Select.Option key={category._id} value={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
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
