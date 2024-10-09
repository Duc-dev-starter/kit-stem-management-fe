import { Card } from "antd";
const { Meta } = Card;
interface iBlogCard{
    title: string;
}
const BlogCard = ({title}: iBlogCard) => {
    return (
        <Card
            hoverable
            className="p-3 mb-3"
            style={{ width: 300 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title={title} description="www.instagram.com" />
        </Card>
    )
}

export default BlogCard;