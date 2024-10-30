import { Avatar, Col, Dropdown, MenuProps, Row, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { avatarReplace, PATH } from '../../consts';
import { logout, user } from '../../services';
import { HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { BiHelpCircle } from 'react-icons/bi';
import { RiFeedbackLine, RiLockPasswordLine } from 'react-icons/ri';
import { roles } from '../../enum';
import { DropdownAvatarProps } from '../../interfaces';
import { IoSettingsOutline } from 'react-icons/io5';


const DropdownAvatar: React.FC<DropdownAvatarProps> = ({ dataUser }) => {
    const navigate = useNavigate();
  const   name = dataUser.name?.split(" ")
    const items: MenuProps['items'] = dataUser.role === roles.MANAGER
        ? [
            {
                label: (
                    <Link to={PATH.USER_PROFILE}>
                        <div className="text-[0.7rem] leading-[0.5rem]">
                            <Row>
                                <Col span={6} className="pt-2 pb-2">
                                    <Avatar
                                        src={dataUser.avatar ? dataUser.avatar : avatarReplace}
                                        className="hover:cursor-pointer mt-1 border border-black"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                </Col>
                                <Col span={16} className="pt-3 pr-4 pl-1">
                                    <Row>
                                        <p className="text-[1.2rem] font-bold">{dataUser.name}</p>
                                    </Row>
                                    <div>
                                        <p className="text-[0.875rem] mt-[0.8rem]">{dataUser.email}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Link>
                ),
                key: '1',
            },
            { type: 'divider' },
            {
                label: (
                    <Link className="text-lg" to="">
                        <HistoryOutlined className="text-[1.3rem] mr-3" />
                        View Purchase
                    </Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link className="text-lg mb-0" to={PATH.CHANGE_PASSWORD}>
                        <div className="flex items-center">
                            <RiLockPasswordLine className="text-center text-[1.5rem] mr-3 ml-[-3px]" />
                            Change Password
                        </div>
                    </Link>
                ),
                key: '4',
            },
            {
                label: (
                    <div>
                        <p
                            onClick={() => logout(navigate)}
                            className="text-lg hover:cursor-pointer mb-0"
                        >
                            <LogoutOutlined className="mr-4" />
                            Sign out
                        </p>
                    </div>
                ),
                key: '5',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/settings" className="text-lg mb-0 flex">
                        <IoSettingsOutline className="text-center mr-4 text-[1.3rem] mt-1" />
                        Settings
                    </Link>
                ),
                key: '6',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/help" className="text-lg mb-0">
                        <div className="flex items-center">
                            <BiHelpCircle className="text-center text-[1.5rem] mr-4 mt-[0.1rem]" />
                            Help
                        </div>
                    </Link>
                ),
                key: '7',
            },
            {
                label: (
                    <Link to="/feedback" className="text-lg mb-0">
                        <div className="flex items-center">
                            <RiFeedbackLine className="text-center text-[1.5rem] mr-4 mt-1" />
                            Feedback
                        </div>
                    </Link>
                ),
                key: '8',
            },
        ]
        : [
            {
                label: (
                    <Link to={PATH.USER_PROFILE}>
                        <div className="text-[0.7rem] leading-[0.5rem]">
                            <Row>
                                <Col span={6} className="pt-2 pb-2">
                                    <Avatar
                                        src={dataUser.avatar ? dataUser.avatar : avatarReplace}
                                        className="hover:cursor-pointer mt-1 border border-black"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                </Col>
                                <Col span={16} className="pt-3 pr-4 pl-1">
                                    <Row>
                                        <p className="text-[1.2rem] font-bold">{dataUser.name}</p>
                                    </Row>
                                    <div>
                                        <p className="text-[0.875rem] mt-[0.8rem]">{dataUser.email}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Link>
                ),
                key: '1',
            },
            { type: 'divider' },
            {
                label: (
                    <Link className="text-lg" to="/purchase">
                        <HistoryOutlined className="text-[1.3rem] mr-3" />
                        View Purchase
                    </Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link className="text-lg mb-0" to={PATH.CHANGE_PASSWORD}>
                        <div className="flex items-center">
                            <RiLockPasswordLine className="text-center text-[1.5rem] mr-3 ml-[-3px]" />
                            Change Password
                        </div>
                    </Link>
                ),
                key: '4',
            },
            {
                label: (
                    <div>
                        <p
                            onClick={() => logout(navigate)}
                            className="text-lg hover:cursor-pointer mb-0"
                        >
                            <LogoutOutlined className="mr-4" />
                            Sign out
                        </p>
                    </div>
                ),
                key: '5',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/settings" className="text-lg mb-0 flex">
                        <IoSettingsOutline className="text-center mr-4 text-[1.3rem] mt-1" />
                        Settings
                    </Link>
                ),
                key: '6',
            },
            { type: 'divider' },
            {
                label: (
                    <Link to="/help" className="text-lg mb-0">
                        <div className="flex items-center">
                            <BiHelpCircle className="text-center text-[1.5rem] mr-4 mt-[0.1rem]" />
                            Help
                        </div>
                    </Link>
                ),
                key: '7',
            },
            {
                label: (
                    <Link to="/feedback" className="text-lg mb-0">
                        <div className="flex items-center">
                            <RiFeedbackLine className="text-center text-[1.5rem] mr-4 mt-1" />
                            Feedback
                        </div>
                    </Link>
                ),
                key: '8',
            },
        ]

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar
                        src={
                            typeof user.avatar === "string"
                                ? user.avatar
                                : undefined
                        }
                        className="hover:cursor-pointer border border-black"
                        size={40}
                        icon={<UserOutlined />}
                    />
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownAvatar;
