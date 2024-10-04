import { Modal } from "antd";
import { Lab } from "../../../../models/Kit";

export interface DeleteLab {
    record?: Lab;
    handleOk: () => void;
    handleCancel: () => void;
    isModalOpen: boolean
}

const ModalDeleteLab = ({ record, handleOk, handleCancel, isModalOpen }: DeleteLab) => {
    return (
        <>
            <Modal title="Delete lab" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
               <p>Do you want to delete "<span className="font-bold">{record?.name}</span>"</p>
            </Modal>
        </>
    )
}

export default ModalDeleteLab;