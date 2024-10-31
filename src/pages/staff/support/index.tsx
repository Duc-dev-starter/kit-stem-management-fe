import { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Select } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { BaseService, getSupportHistory, staffGetPurchase, updatePurchase } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
import { useDebounce } from "../../../hooks";
import { formatDate, getUserFromLocalStorage } from "../../../utils";
import { LoadingOverlay, CustomBreadcrumb } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import axios from "axios";

interface LabSupportHistory {
    _id: string;
    content: string;
    reply_content: string;
    created_at: string;
    reply_at: string | null;
}

interface LabData {
    _id: string;
    name: string;
    created_at: string;
    support_histories: LabSupportHistory[];
}

const StaffSupport: React.FC = () => {
    const [dataPurchase, setDataPurchase] = useState<LabData[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
    const [selectedLab, setSelectedLab] = useState<LabData | null>(null);
    const [selectedSupportItem, setSelectedSupportItem] = useState<LabSupportHistory | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const debouncedSearchTerm = useDebounce(searchText, 500);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const user = getUserFromLocalStorage();
    useEffect(() => {
        fetchLabs();
    }, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

    const fetchLabs = useCallback(async () => {
        try {
            const response = await getSupportHistory(debouncedSearchTerm);
            console.log(response);
            const labs = response.data.pageData || response.data;
            setDataPurchase(labs);
            setPagination((prev) => ({
                ...prev,
                total: labs.length,
            }));
        } catch (error) {
            console.log(error);
        }
    }, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination);
    };

    const handleSearch = useCallback(() => {
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    }, []);

    const openSupportHistoryModal = (lab: LabData) => {
        setSelectedLab(lab);
        setIsModalVisible(true);
    };

    const openReplyModal = (supportItem: LabSupportHistory) => {
        setSelectedSupportItem(supportItem);
        setReplyContent(""); // Clear the reply content for new replies
        setIsReplyModalVisible(true);
    };

    const handleReplySubmit = async () => {
        if (!selectedSupportItem) return;
        try {
            await BaseService.post({
                url: '/api/support/reply', payload: {
                    supportId: selectedSupportItem._id,
                    replyContent: replyContent,
                    staffId: user._id
                }
            })
            // Update the local state to show the reply was added
            fetchLabs(); // Refresh the labs data
            setIsReplyModalVisible(false); // Close reply modal
        } catch (error) {
            console.error("Failed to reply to support item:", error);
        }
    };

    const columns: ColumnType<LabData>[] = [
        {
            title: "Lab Name",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: LabData) => (
                <a onClick={() => openSupportHistoryModal(record)}>{name}</a>
            ),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at: string) => formatDate(created_at),
        },
    ];

    const supportHistoryColumns: ColumnType<LabSupportHistory>[] = [
        {
            title: "Question",
            dataIndex: "content",
            key: "content",
            width: '30%'
        },
        {
            title: "Reply",
            dataIndex: "reply_content",
            key: "reply_content",
            width: '30%'

        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at: string) => formatDate(created_at),
        },
        {
            title: "Replied At",
            dataIndex: "reply_at",
            key: "reply_at",
            render: (reply_at: string | null) => (reply_at ? formatDate(reply_at) : "N/A"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) =>
                record.reply_content ? null : (
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openReplyModal(record)}
                    >
                        Reply
                    </Button>
                ),
        },
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
                title={`Support History for ${selectedLab?.name}`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                {selectedLab && (
                    <Table
                        dataSource={selectedLab.support_histories}
                        columns={supportHistoryColumns}
                        pagination={false}
                        rowKey={(record) => record._id}
                    />
                )}
            </Modal>

            {/* Reply Modal */}
            <Modal
                title="Reply to Support Item"
                visible={isReplyModalVisible}
                onCancel={() => setIsReplyModalVisible(false)}
                onOk={handleReplySubmit}
            >
                <Form.Item label="Reply Content">
                    <Input.TextArea
                        rows={4}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                    />
                </Form.Item>
            </Modal>
        </div>
    );
};

export default StaffSupport;
