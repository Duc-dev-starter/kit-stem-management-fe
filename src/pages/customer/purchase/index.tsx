import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Purchase } from '../../../models/Purchase.model';
import { getPurchasesByCustomer } from '../../../services/purchase.service';
import { currencyUnit, priceDiscounted } from '../../../consts';
import Title from 'antd/es/typography/Title';
import { formatDate } from '../../../utils';

const CustomerPurchase = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([])

    useEffect(() => {
        getPurchases();
    }, [])
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render:(discount: number)=>(
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
            render:(record: Purchase)=>(
                <>
                {formatDate(record.created_at)}
                </>
            )
        },
    ];
    return (
        <div className='mt-2 container mx-auto'>
            <Title className='text-center' level={1}>Purchased</Title>
            <Table dataSource={purchases} columns={columns} />;
        </div>
    )
}

export default CustomerPurchase
