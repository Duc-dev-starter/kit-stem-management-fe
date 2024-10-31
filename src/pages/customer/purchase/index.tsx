import { Button, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { Purchase } from '../../../models/Purchase.model';
import { getPurchasesByCustomer, updatePurchase } from '../../../services/purchase.service';
import { currencyUnit, priceDiscounted, purchaseStatusColor, PurchaseStatusEnum } from '../../../consts';
import Title from 'antd/es/typography/Title';
import { formatDate } from '../../../utils';

const CustomerPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [ids, setIds] = useState<string[]>([])
    useEffect(() => {
        getPurchases();
    }, [])

    useEffect(() => {
        if(ids.length > 0){
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
                record.status === PurchaseStatusEnum.DELIVERING &&
                <Button onClick={()=>handleSetIds(record._id)} type='primary'>
                    Lab delivered
                </Button>
            )
        },
    ];

    const handleSetIds = (id: string)=>{
        setIds([...ids, id]);
    }
    const handleUpdateStatus = async (ids: string[]) => {
        const response = await updatePurchase(ids, PurchaseStatusEnum.DELIVERED)
        if(response){
            getPurchases();
        }
    }

    return (
        <div className='mt-2 container mx-auto'>
            <Title className='text-center' level={1}>Purchased</Title>
            <Table dataSource={purchases} columns={columns} />;
        </div>
    )
}

export default CustomerPurchase
