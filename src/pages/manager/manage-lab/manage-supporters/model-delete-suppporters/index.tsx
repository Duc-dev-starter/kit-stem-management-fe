import { Modal } from "antd";

export interface DeleteSupporter {
    supportersId: string[];
    handleOk: () => void;
    handleCancel: () => void;
    isModalOpen: boolean;

}

const ModalDeleteSupporters = ({  handleOk, handleCancel, isModalOpen, supportersId }: DeleteSupporter) => {

    return (
        <>
            <Modal title="Delete lab" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
               <p>Do you want to remove <span className="font-bold"> {supportersId.length}</span> {supportersId.length >= 2 ? "supporters": "supporter"}  in this lab ?</p>
            </Modal>
        </>
    )
}

export default ModalDeleteSupporters;