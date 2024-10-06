import { Button, Checkbox, CheckboxProps, message, Table, TablePaginationConfig } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLabDetail, RemoveSupporters } from "../../../../services/lab.services";
import { Supporter } from "../../../../models/supporter.model";
import ModalAddAndRemoveSupporters from "./modal-add-supporters";
import { User } from "../../../../models";
import { getUsers } from "../../../../services";
import { roles } from "../../../../enum";
import { useDebounce } from "../../../../hooks";
import ModalDeleteSupporters from "./model-delete-suppporters";

const ManageSupporters = () => {
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 100, total: 0 });
    const { _id } = useParams();
    const [supporters, setSupporters] = useState<Supporter[]>([]);
    const [isOpenModalAddAndRemoveSupporters, setIsOpenModalAddAndRemoveSupporters] = useState<boolean>(false);
    const [staffs, setStaffs] = useState<User[]>([])
    const debouncedSearch = useDebounce("", 500);
    const [checkAllToDelete, setCheckAllToDelete] = useState<boolean>(false)
    const [listNeedToDelete, setListNeedToDelete] = useState<string[]>([])
    const [isOpenModalRemoveSuopprters, setIsOpenModalRemoveSupporters] = useState<boolean>(false);
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


            setStaffs(sortedUsers.filter((item: User) => item.role === roles.STAFF));
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

    const handleOkRemoveSupporters = () => {
        setIsOpenModalRemoveSupporters(false)
        RemoveSupportersWithLab()
        
    }

    const handleCancelRemoveSupporters = () => {
        setIsOpenModalRemoveSupporters(false)
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
        {
            title: 'Action',
            render: (record: Supporter) => (
                <>
                    <Checkbox onClick={() => onChangeSupporter(record)} checked={listNeedToDelete.includes(record._id) ? true : false} ></Checkbox>
                </>
            )
        },
    ];

    const onChangeSupporter = (record: Supporter) => {
        if (listNeedToDelete.includes(record._id)) {
            setListNeedToDelete(listNeedToDelete.filter((item: string) => item != record._id));
            setCheckAllToDelete(false);
        } else {
            setListNeedToDelete([...listNeedToDelete, record._id]);
        }
    };

    const onChange: CheckboxProps['onChange'] = () => {
        setCheckAllToDelete(!checkAllToDelete)
        if (checkAllToDelete === true) {
            setCheckAllToDelete(false)
            setListNeedToDelete([])
        } else {
            setCheckAllToDelete(true)
            setListNeedToDelete(supporters.map((item: Supporter) => item._id));
        }
    };

    const RemoveSupportersWithLab = async ()=>{
        const res = await RemoveSupporters(_id+"", listNeedToDelete)
        if(res){
            console.log("res",res)
            message.success(`Remove ${listNeedToDelete.length} ${listNeedToDelete.length >= 2 ?"Supporters": "Supporter"} Successfully`)
        }
        getLabDetailFromManageSupporters()
    }
    return (
        <>
            <ModalDeleteSupporters
                isModalOpen={isOpenModalRemoveSuopprters}
                handleCancel={handleCancelRemoveSupporters}
                handleOk={handleOkRemoveSupporters}
                supportersId={listNeedToDelete}
            />
            <ModalAddAndRemoveSupporters
                labId={_id + ""}
                staffs={staffs}
                isModalOpen={isOpenModalAddAndRemoveSupporters}
                handleCancel={handleCancelModalAddAndRemove}
            />
            <Title className="text-center py-5" level={1}>Manage Supporters</Title>
            <Button onClick={()=>setIsOpenModalRemoveSupporters(true)} className="bg-red-500">Delete</Button>
            <Checkbox className="pl-5" checked={checkAllToDelete} onChange={onChange}>Select to check all</Checkbox>
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
