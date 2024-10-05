import { Button, Table, TablePaginationConfig } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLabDetail } from "../../../../services/lab.services";
import { Supporter } from "../../../../models/supporter.model";
import ModalAddAndRemoveSupporters from "./modal-add-supporters";
import { User } from "../../../../models";
import { getUsers } from "../../../../services";
import { roles } from "../../../../enum";
import { useDebounce } from "../../../../hooks";

const ManageSupporters = () => {
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 100, total: 0 });
    const { _id } = useParams();
    const [supporters, setSupporters] = useState<Supporter[]>([]);
    const [isOpenModalAddAndRemoveSupporters, setIsOpenModalAddAndRemoveSupporters] = useState<boolean>(false);
    const [staffs, setStaffs] = useState<User[]>([])
    const debouncedSearch = useDebounce("", 500);
    useEffect(() => {
        if (_id) {
            getLabDetailFromManageSupporters();
        }
        getAllStaff()
    }, [_id]);

    const getAllStaff = useCallback(async () => {
        try {
            const responseUsers = await getUsers(
                debouncedSearch,
                "",
                true,
                false,
                pagination.current,
                pagination.pageSize
            );
            const sortedUsers = responseUsers.data.pageData.sort((a: User, b: User) => {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return dateB - dateA;
            });


            setStaffs(sortedUsers.filter((item: User) =>item.role === roles.STAFF));
            setPagination({
                ...pagination,
                total: responseUsers.data.pageInfo.totalItems,
                current: responseUsers.data.pageInfo.pageNum,
                pageSize: responseUsers.data.pageInfo.pageSize,
            });
        } catch (error) {
            console.log(error);
        }
    }, [pagination.current, pagination.pageSize, debouncedSearch]);

    const handleCancelModalAddAndRemove = () => {
        setIsOpenModalAddAndRemoveSupporters(false)
    }
    const getLabDetailFromManageSupporters = async () => {
        if (_id) {
            const res = await getLabDetail(_id);
            console.log("res: ", res.data.supporterDetails)
            if (res && res.data) {
                setSupporters(res.data.supporterDetails)
            }
        }
    };

    const showModalAddAndRemoveSupporters = () => {
        setIsOpenModalAddAndRemoveSupporters(true)
    }

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
        // {
        //     title: 'Action',
        //     dataIndex: '_id',
        //     key: '_id',
        //     render: (record: Supporter) => (
        //         <>
        //             <DeleteOutlined className="text-red-500" onClick={() => showModalAddAndRemoveSupporters(record)} />
        //         </>
        //     )
        // },
    ];

    return (
        <>
            <ModalAddAndRemoveSupporters
                labId={_id + ""}
                staffs={staffs}
                isModalOpen={isOpenModalAddAndRemoveSupporters}
                handleCancel={handleCancelModalAddAndRemove}
            />
            <Title className="text-center py-5" level={1}>Manage Supporters</Title>
            <Button onClick={showModalAddAndRemoveSupporters} type="primary" className="mb-5 float-right">Add new</Button>
            <Table
                columns={columns}
                dataSource={supporters}
                rowKey="_id"
            />
        </>
    );
};

export default ManageSupporters;
