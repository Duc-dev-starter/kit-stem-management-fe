import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '../../../consts'

const NotFound: React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to={PATH.HOME}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    )
}

export default NotFound