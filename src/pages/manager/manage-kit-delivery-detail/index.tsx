import { Col,  Row, Timeline } from "antd";

const ManageKitDeliveryDetail = () => {
    // const [mode, setMode] = useState<'left' | 'alternate' | 'right'>('left');
    return (
        <>
            <h1 className="text-center font-bold">Manage Kit Delivery Detail</h1>
            <Row>
                <Col span={12}>
                    <p className="font-bold my-5"> Delivery Address</p>
                    <div >
                        <p><span className="font-bold">Shipping unit:</span> <span>Hello world</span></p>
                    </div>
                </Col>
                <Col span={12}>
                    <p className="font-bold my-5">Timeline</p>
                    <div className="float-left">
                        <Timeline
                            mode={"left"}
                            items={[
                                {
                                    label: '2015-09-01',
                                    children: 'Create a services',
                                },
                                {
                                    label: '2015-09-01 09:12:11',
                                    children: 'Solve initial network problems',
                                },
                                {
                                    children: 'Technical testing',
                                },
                                {
                                    label: '2015-09-01 09:12:11',
                                    children: 'Network problems being solved',
                                },
                            ]}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default ManageKitDeliveryDetail;