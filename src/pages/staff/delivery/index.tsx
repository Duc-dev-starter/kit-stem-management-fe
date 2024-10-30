import { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Select } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { staffGetPurchase, updatePurchase } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "../../../hooks";
import { formatDate, getUserFromLocalStorage } from "../../../utils";
import { LoadingOverlay, NameFormItem, CustomBreadcrumb } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const StaffDelivery: React.FC = () => {
  const [dataPurchase, setDataPurchase] = useState<[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [validateOnOpen, setValidateOnOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(""); // New status filter state
  const [form] = Form.useForm();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const user = getUserFromLocalStorage();
  const userId = user._id;

  const debouncedSearchTerm = useDebounce(searchText, 500);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchPurchases();
  }, [debouncedSearchTerm, pagination.current, pagination.pageSize, statusFilter]);

  const fetchPurchases = useCallback(async () => {
    try {
      const response = await staffGetPurchase(
        debouncedSearchTerm,
        "",
        "",
        "",
        statusFilter || "processing", // Use status filter here
        userId,
        false
      );
      const purchases = response.data.pageData || response.data;
      setDataPurchase(purchases);
      setPagination((prev) => ({
        ...prev,
        total: purchases.length,
        current: response.data.pageInfo?.pageNum || 1,
        pageSize: response.data.pageInfo?.pageSize || prev.pageSize,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearchTerm, pagination.current, pagination.pageSize, statusFilter]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleSearch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, [fetchPurchases]);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value); // Update status filter state
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset pagination
  };

  const columns: ColumnType[] = [
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
    },
    {
      title: "Customer Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
    },
    {
      title: "Create Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => formatDate(created_at),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record) => (
        <div>
          {record.status === "processing" && (
            <EditOutlined
              className="text-blue-500"
              onClick={() => {
                setFormData(record);
                form.setFieldsValue({ ...record });
                setIsModalVisible(true);
              }}
            />
          )}
        </div>
      ),
    }

  ];

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <CustomBreadcrumb />
      <Space>
        <Input.Search
          placeholder="Search By Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 200 }}
          enterButton={<SearchOutlined />}
        />
        <Select
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ width: 200 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="delivering">Delivering</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
      </Space>
      <Table
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => setPagination({ ...pagination, current: page, pageSize }),
        }}
        onChange={handleTableChange}
        dataSource={dataPurchase}
        columns={columns}
        rowKey={(record) => record._id}
      />
      <Modal
        title="Update Purchase Status"
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
          labelCol={{ span: 24 }}
          onFinish={(values) => updatePurchase(formData.purchase_ids, values.status, userId)}
        >
          <Form.Item label="Status" name="status">
            <Select placeholder="Select Status">
              <Select.Option value="processing">Processing</Select.Option>
              <Select.Option value="delivering">Delivering</Select.Option>
              <Select.Option value="delivered">Delivered</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffDelivery;
