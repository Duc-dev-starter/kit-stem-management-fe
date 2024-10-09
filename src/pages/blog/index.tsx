import Title from "antd/es/typography/Title"
import BlogCard from "./blog-card"
import { useEffect, useState } from "react"
import { Blog } from "../../models"
import { getBlogsByClient } from "../../services/client.services"
import { Card, Col, Row } from "antd"


const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogFromClient();
    }, [])

    const getBlogFromClient = async () => {
        const res = await getBlogsByClient("", 1, 100);
        console.log("res: ", res)
        if (res) {
            setBlogs(res.data.pageData);
            setRecentBlogs(res.data.pageData.sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3));
        }
    }

    return (
        <div className="container mx-auto mt-5">
            <Title className="text-center" level={1}>The CrunchBlog</Title>
            <Row>
                <Col span={18} className="mt-5 grid grid-cols-3">
                    {
                        blogs.map(item => (
                            <>
                                <BlogCard title={item.title} />
                            </>
                        ))
                    }
                </Col>
                <Col className="mt-12" span={6}>
                    <Card title="Recent Posts"  style={{ width: "100%" }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BlogPage
