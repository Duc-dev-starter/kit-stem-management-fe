import { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Select, Tag } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { getUsers, updatePurchase } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "../../../hooks";
import { formatDate, getUserFromLocalStorage } from "../../../utils";
import { LoadingOverlay, CustomBreadcrumb } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { managerGetPurchase } from "../../../services/purchase.service";
import { Purchase } from "../../../models/Purchase.model";
import { Checkbox } from 'antd';
import type { CheckboxProps, FormProps } from 'antd';
import { User } from "../../../models";
import { purchaseStatusColor } from "../../../consts";
const ManagerManagePurchase: React.FC = () => {
    const [dataPurchase, setDataPurchase] = useState<[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [formData, setFormData] = useState<Purchase>();
    const [statusFilter, setStatusFilter] = useState<string>(""); // New status filter state
    const [form] = Form.useForm();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const user = getUserFromLocalStorage();
    const userId = user._id;
    const [purchaseIds, setPurchasesIds] = useState<string[]>([])
    const [selectAll, setSelectAll] = useState<boolean>(false)
    const [staffs, setStaffs] = useState<User[]>([])
    const debouncedSearchTerm = useDebounce(searchText, 500);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        fetchPurchases();
        getStaff();
    }, [debouncedSearchTerm, pagination.current, pagination.pageSize, statusFilter]);
    useEffect(() => {
        if (purchaseIds) {
            console.log("purchaseIds: ", purchaseIds)
        }
    }, [purchaseIds]);

    const fetchPurchases = useCallback(async () => {
        try {
            const response = await managerGetPurchase(
                debouncedSearchTerm,
                "",
                "",
                "",
                statusFilter || "", // Use status filter here
                false
            );
            console.log("res: ", response)
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

    const getStaff = async () => {
        const response = await getUsers("", "staff")
        if (response) {
            setStaffs(response.data.pageData || response.data)
        }
    }
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
    const onChangeSelectAll: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if (selectAll === false) {
            setSelectAll(true)
            const ids = dataPurchase.map((item: Purchase) => item._id)
            setPurchasesIds(ids)
        } else {
            setSelectAll(false)
            setPurchasesIds([])
        }
    };
    const onChange = (record: Purchase) => {
        if (purchaseIds.includes(record._id)) {
            setPurchasesIds(purchaseIds.filter(item => item != record._id))
        } else {
            setPurchasesIds([...purchaseIds, record._id])
        }
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
            render: (status: string) => (
                <Tag color={purchaseStatusColor(status)}>
                    {status}
                </Tag>
            )
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
            render: (record: Purchase) => (
                <div>
                    {record.status === "new" && (
                       <Checkbox checked={purchaseIds.includes(record._id) === true ? true : false} className="ml-2" onClick={() => onChange(record)}></Checkbox>
                    )}
                    
                </div>
            ),
        }

    ];
    const onFinish: FormProps['onFinish'] = async(values) => {
      const response = await  updatePurchase(purchaseIds, values.status, values.staff_id)
      if(response){
        setIsModalVisible(false)
        fetchPurchases()
      }
      };
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
            <Checkbox className="ml-2 " checked={selectAll} onChange={onChangeSelectAll}>Select All</Checkbox>
            <Button onClick={() => {
                setIsModalVisible(true);
            }}
                type="primary">Update Status</Button>
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
                }}
                footer={null}
            >
                <Form
                    form={form}
                    labelCol={{ span: 24 }}
                    onFinish={onFinish }
                >
                    <Form.Item label="Status" name="status">
                        <Select  placeholder="Select Status">
                            <Select.Option value="processing">Processing</Select.Option>
                            <Select.Option value="delivering">Delivering</Select.Option>
                            <Select.Option value="delivered">Delivered</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Staff" name="staff_id">
                        <Select
                            defaultValue="Please select staff"
                            style={{ width: 310 }}
                            // onChange={handleChangeKITname}
                            options={staffs.map(item => ({
                                value: item._id, label: item.name
                            }))}
                        />
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

export default ManagerManagePurchase;
