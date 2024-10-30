import Title from "antd/es/typography/Title"
import BlogCard from "./blog-card"
import { useEffect, useState } from "react"
import { Blog, Category } from "../../models"
import { getBlogsByClient, getCategoriesByClient } from "../../services/client.services"
import { Card, Col, Row } from "antd"
import RecentBlogCart from "./recent-blog-card"
import BlogTag from "./blog-tag"

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [cates, setCates] = useState<Category[]>([])
    const [cateToFilterBlog, setCateToFilterBlog] = useState<Category>()
    const [selectedId, setSelectedId] = useState<string>('');
    useEffect(() => {
        getBlogFromClient();
        getCategoriesFromClient();
    }, [])

    useEffect(() => {
        getBlogFromClient(cateToFilterBlog?._id);
    }, [cateToFilterBlog])

    const getBlogFromClient = async (cateId?: string) => {
        const res = await getBlogsByClient(cateId || "", 1, 100);
        console.log("res: ", res)
        if (res) {
            setBlogs(res.data.pageData);
            setRecentBlogs(res.data.pageData.sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 3));
        }
    }

    const getCategoriesFromClient = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
            setCates(res.data.pageData);
        }
    }

    const handleSelectedCateToFilterBlogs = (cate: Category) => {
        console.log("cate: ", cate)
        setCateToFilterBlog(cate)
    }

    const handleSelectedTag = (id: string) => {
        setSelectedId(id); // Cập nhật ID khi bấm vào một tag
    };
    return (
        <div className="container mx-auto mt-3">
            <Title className="text-center" level={1}>The CrunchBlog</Title>

            <Row>
                <Col span={18} className="mt-3 grid grid-cols-3">
                    {
                        blogs.map(item => (
                            <>
                                <BlogCard image={item.image_url} title={item.title} _id={item._id} />
                            </>
                        ))
                    }
                </Col>

                <Col className="mt-3" span={6}>
                    <Card title="Recent Posts" style={{ width: "100%" }}>
                        {
                            recentBlogs.map((item: Blog) => (
                                <>
                                    <RecentBlogCart item={item} />
                                </>
                            ))
                        }
                    </Card>

                    <Card title="Tags" className="mt-3" style={{ width: "100%" }}>
                        <div className="grid grid-cols-3 gap-3 text-center" style={{ fontSize: 11 }}>
                            {
                                cates.map((item: Category) => (
                                    <div onClick={() => handleSelectedCateToFilterBlogs(item)}>
                                        <BlogTag
                                            key={item._id}
                                            item={item}
                                            selectedId={selectedId}
                                            onSelect={handleSelectedTag}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BlogPage
