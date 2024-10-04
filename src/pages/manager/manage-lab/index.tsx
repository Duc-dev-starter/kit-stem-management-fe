import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Pagination, Table, TablePaginationConfig, Tag } from "antd";
import { useEffect, useState } from "react";
import { Lab } from "../../../models/Kit";
import { getLabs } from "../../../services";
import { labStatus, labStatusColor } from "../../../consts";
import Title from "antd/es/typography/Title";
import ModalCreateUpdate from "./modal-create-update-lab";
import ModalDeleteLab from "./modal-delete-lab";
import { deleteLab } from "../../../services/lab.services";

const ManageLab = () => {
    const [dataLabs, setDataLabs] = useState<Lab[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [isOpenModalCreateUpdate, setIsOpenModalCreateUpdate] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [labEdit, setlabEdit] = useState<Lab>();
    const [labDelete, setLabDelete] = useState<Lab>();
    useEffect(() => {
        fetchLabs();
    }, [])

    const handleOkDelete = async () => {
        setIsOpenModalDelete(false);
        const res = await deleteLab(labDelete?._id || "")
        if (res) {
            console.log("res")
            message.success("Delete " + labDelete?.name + " Successfully")
            fetchLabs();
        }
    };

    const handleCancelDelete = () => {
        setIsOpenModalDelete(false);
    };

    const showModalDelete = (record?: Lab) => {
        if (record) {
            setLabDelete(record)
        }
        setIsOpenModalDelete(true)
    }
    const handleOk = () => {
        setIsOpenModalCreateUpdate(false);
    };

    const handleCancel = () => {
        setIsOpenModalCreateUpdate(false);
    };

    const showModalCreateUpdateLab = (record?: Lab) => {
        setIsOpenModalCreateUpdate(true)
        if (record) {
            setlabEdit(record)
        } else {
            setlabEdit(undefined)
        }
    }

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
            render: (name: string) => (
                <div className="text-blue-500 cursor-pointer">
                    {name}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={labStatusColor(status)} className="cursor-pointer" >
                    {labStatus(status)}
                </Tag>
            )
        },
        {
            title: 'LAB Video',
            dataIndex: 'lab_url',
            key: 'lab_url',
            render: (lab_url: string) => (
                <div>
                    <iframe src={lab_url}></iframe>
                </div>
            )
        },
        {
            title: 'Action',
            render: (record: Lab) => (
                <>
                    <EditOutlined onClick={() => showModalCreateUpdateLab(record)} className="m-2 text-blue-500" />
                    <DeleteOutlined onClick={() => showModalDelete(record)} className="m-2 text-red-500" />
                </>
            )
        },
    ];

    return (
        <>
            <ModalDeleteLab
                record={labDelete}
                handleCancel={handleCancelDelete}
                handleOk={handleOkDelete}
                isModalOpen={isOpenModalDelete}
            />
            <ModalCreateUpdate
                isModalOpen={isOpenModalCreateUpdate}
                handleOk={handleOk}
                handleCancel={handleCancel}
                labEdit={labEdit}
            />
            <Title level={1}
                className="text-center font-bold my-5"
            >Manage LAB
            </Title>
            <Button onClick={() => showModalCreateUpdateLab()} type="primary" className="my-5 float-right">Add new</Button>
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