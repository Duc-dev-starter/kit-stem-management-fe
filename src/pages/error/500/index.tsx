import { Button, Result } from 'antd'
import React from 'react'
import { PATH } from '../../../consts'
import { Link } from 'react-router-dom'

const InternalServerError = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to={PATH.HOME}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    )
}

export default InternalServerError