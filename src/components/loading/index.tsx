import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const LoadingComponent = () => {
    return (
        <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
    )
}
export default LoadingComponent;