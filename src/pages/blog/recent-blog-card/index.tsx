import { Col, Row } from "antd";
import { Blog } from "../../../models";

interface RecentBlogCartProps {
    item: Blog; // Accept item as a prop
}

const RecentBlogCart = ({ item }: RecentBlogCartProps) => {
    return (
        <Row gutter={5} className="cursor-pointer">
            <Col span={6} className="cursor-pointer">
                <img
                    className="cursor-pointer"
                    src="https://www.crunchlabs.com/cdn/shop/articles/CLBlog_Illustrations-7_1_7638b573-4dd3-4112-99eb-ae73fc15fd1f.png?v=1723840302"
                    alt=""
                />
            </Col>
            <Col span={18} className="items-center cursor-pointer">
                <p className="text-red-500 font-bold line-clamp-3">{item.title}</p>
                <p className="truncate font-bold">{item.description}</p>
            </Col>
        </Row>
    );
}

export default RecentBlogCart;
