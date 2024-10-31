import { Button, message, Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { Purchase } from '../../../models/Purchase.model';
import { getPurchasesByCustomer, updatePurchase } from '../../../services/purchase.service';
import { currencyUnit, priceDiscounted, purchaseStatusColor, PurchaseStatusEnum } from '../../../consts';
import Title from 'antd/es/typography/Title';
import { formatDate } from '../../../utils';
import { ArrowDownOutlined } from '@ant-design/icons';
import { downloadPDF } from '../../../services/lab.services';

const CustomerPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [ids, setIds] = useState<string[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
    useEffect(() => {
        getPurchases();
    }, [])

    const handleOpenModal = (purchase: Purchase) => {
        setSelectedPurchase(purchase);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedPurchase(null);
    };

    useEffect(() => {
        if (ids.length > 0) {
            handleUpdateStatus(ids)
            setIds([])
        }
    }, [ids])

    const getPurchases = async () => {
        const response = await getPurchasesByCustomer("", "", "", "")
        if (response) {
            setPurchases(response.data.pageData)
        }
    }
    const columns = [
        {
            title: 'Purchase No',
            dataIndex: 'purchase_no',
            key: 'purchase_no',
            render: (text: string, record: Purchase) => (
                <Button type="link" onClick={() => handleOpenModal(record)}>
                    {text}
                </Button>
            )
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Shipper Name',
            dataIndex: 'staff_name',
            key: 'staff_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={purchaseStatusColor(status)}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Price Discounted',
            render: (record: Purchase) => (
                <>
                    {priceDiscounted(record.price, record.discount)} {currencyUnit}
                </>
            )
        },
        {
            title: 'Price',
            render: (record: Purchase) => (
                <>
                    {record.price.toLocaleString("vi-VN")} {currencyUnit}
                </>
            )
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount: number) => (
                <>
                    {discount}%
                </>
            )
        },
        {
            title: 'Type',
            dataIndex: 'product_type',
            key: 'product_type',
        },
        {
            title: 'Created At',
            render: (record: Purchase) => (
                <>
                    {formatDate(record.created_at)}
                </>
            )
        },
        {
            title: 'Action',
            render: (record: Purchase) => (
                <div className='text-center'>
                    {
                        record.status === PurchaseStatusEnum.DELIVERING &&
                        <Button onClick={() => handleSetIds(record._id)} type='primary'>
                            Lab delivered
                        </Button>
                    }
                    {
                        (record.status === PurchaseStatusEnum.DELIVERED && record.product_type === "lab") &&
                        <ArrowDownOutlined onClick={() => handleDownloadPdf(record.product_id)} className='text-blue-500 cursor-pointer' />
                    }
                </div>
            )
        },
    ];

    const handleDownloadPdf = async (id: string) => {
        const res = await downloadPDF(id)
        if (res) {
            message.success("Downloading...")
            console.log("handleDownloadPdf: ", res)
        }
    }
    const handleSetIds = (id: string) => {
        setIds([...ids, id]);
    }
    const handleUpdateStatus = async (ids: string[]) => {
        const response = await updatePurchase(ids, PurchaseStatusEnum.DELIVERED)
        if (response) {
            getPurchases();
        }
    }

    return (
        <div className='mt-2 container mx-auto'>
            <Title className='text-center' level={1}>Purchased</Title>
            <Table dataSource={purchases} columns={columns} />;

            <Modal
                title="Purchase Details"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                {selectedPurchase && (
                    <div>
                        <p><strong>Purchase No:</strong> {selectedPurchase.purchase_no}</p>
                        <p><strong>Product Name:</strong> {selectedPurchase.product_name}</p>
                        <p><strong>Shipper Name:</strong> {selectedPurchase.staff_name}</p>
                        <p><strong>Status:</strong> {selectedPurchase.status}</p>
                        <p><strong>Price:</strong> {selectedPurchase.price} {currencyUnit}</p>
                        <p><strong>Discount:</strong> {selectedPurchase.discount}%</p>
                        <p><strong>Type:</strong> {selectedPurchase.product_type}</p>
                        <p><strong>Created At:</strong> {formatDate(selectedPurchase.created_at)}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default CustomerPurchase
