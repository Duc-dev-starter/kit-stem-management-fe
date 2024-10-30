import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

interface iBlogCard {
  title: string;
  image: string;
  _id: string
}

const BlogCard = ({ title, image, _id }: iBlogCard) => {
  return (
    <Link to={`/blog/${_id}`}>
      <Card
        hoverable
        className="p-3 mb-3"
        style={{ width: 300 }}
        cover={
          <div style={{ height: 200, overflow: 'hidden' }}>
            <img
              alt="example"
              src={image}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        }
      >
        <Meta title={<div className="text-red-500">{title}</div>} description="www.instagram.com" />
      </Card>
    </Link>
  );
};

export default BlogCard;
