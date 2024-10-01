import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Table, TablePaginationConfig, Tag } from "antd";
import { useEffect, useState } from "react";
import { Lab } from "../../../models/Kit";
import { getLabs } from "../../../services";

const ManageLab = () => {
    const [dataLabs, setDataLabs] = useState<Lab[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

    useEffect(() => {
        fetchLabs();
    }, [])

    const fetchLabs = async () => {
        const responseLabs = await getLabs();
        setDataLabs(responseLabs.data.pageData);
        setPagination({
            ...pagination,
            total: responseLabs.data.pageInfo.totalItems,
            current: responseLabs.data.pageInfo.pageNum,
            pageSize: responseLabs.data.pageInfo.pageSize,
        });
    }

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag className="cursor-pointer" >
                    {status}
                </Tag>
            )
        },
        {
            title: 'Action',
            render: () => (
                <>
                    <EditOutlined className="m-2 text-blue-500" />
                    <DeleteOutlined className="m-2 text-red-500" />
                </>
            )
        },
    ];

    return (
        <>
            <h1
                className="text-center font-bold my-5"
            >Manage LAB</h1>
            <Button type="primary" className="my-5 float-right">Add new</Button>
            <Table
                columns={columns}
                dataSource={dataLabs}
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
        </>
    )
}

export default ManageLab;