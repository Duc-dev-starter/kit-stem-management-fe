import Title from "antd/es/typography/Title";
import { getUserFromLocalStorage } from "../../../utils";
import { useEffect, useState } from "react";
import { User } from "../../../models";
import { Avatar, Button, Col, Descriptions, Row, Tabs } from "antd";
import type { TabsProps } from 'antd';
import { useNavigate } from "react-router-dom";
const CustomerProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [initials, setInitials] = useState<string>("");
    const [key, setKey] = useState<string>('')
    const navigate = useNavigate();
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        const userData = getUserFromLocalStorage();
        if (userData) {
            const nameParts = userData?.name.split(" ");
            const userInitials = nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
            setInitials(userInitials);  // Cập nhật state initials
            console.log("initials:", userInitials);
            console.log(user);

        }
        setUser(userData);
    };

    const onChange = (key: string) => {
        setKey(key)
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Manage Subscriptions',
        },
        {
            key: '2',
            label: 'Order History',
        },
        {
            key: '3',
            label: 'Profile',
        },
    ];

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="mt-100 container mx-auto">
            <div className="text-center">
                <Title className="py-3" level={1}>
                    Hi, {user?.name}
                </Title>
            </div>
            <Row justify={"center"}>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Col>
            </Row>
            <Row className="mt-5">
                {/* <Col span={6}>
                    <Avatar className="font-bold" style={{ backgroundColor: '#FED103', color: '#575757' }}>{initials}</Avatar>
                    <span className="font-bold ml-2">{user?.name}</span>
                    <p className="mt-3"><span className="font-bold">Email: </span></p>
                    <p className="mt-2">{user?.email}</p>
                </Col> */}
                <Col span={18}>
                    {
                        key === "1" && <>
                            1
                        </>
                    }
                    {
                        key === "3" && (
                            <>
                                <Descriptions title="Profile Details" bordered>
                                    <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                                    <Descriptions.Item label="Date of Birth">{formatDate(user?.dob)}</Descriptions.Item>
                                    <Descriptions.Item label="Account Created">
                                        {formatDate(user?.created_at)}
                                    </Descriptions.Item>
                                </Descriptions>

                                <Button type="primary" onClick={() => navigate('/change-password')}>
                                    Change Password
                                </Button>
                            </>

                        )
                    }
                </Col>
            </Row>
        </div>
    );
};

export default CustomerProfilePage;
