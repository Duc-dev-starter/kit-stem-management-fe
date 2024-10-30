import Title from "antd/es/typography/Title";
import BlogCard from "./blog-card";
import { useEffect, useState } from "react";
import { Blog, Category } from "../../models";
import { getBlogsByClient, getCategoriesByClient } from "../../services/client.services";
import { Card, Col, Row, Pagination } from "antd";
import RecentBlogCart from "./recent-blog-card";
import BlogTag from "./blog-tag";
import { Link } from "react-router-dom";

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [cates, setCates] = useState<Category[]>([]);
    const [cateToFilterBlog, setCateToFilterBlog] = useState<Category>();
    const [selectedId, setSelectedId] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(9); // Set page size (10, for example)
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        getBlogFromClient();
        getCategoriesFromClient();
    }, [currentPage, cateToFilterBlog]); // Re-fetch when currentPage or category changes

    const getBlogFromClient = async (cateId?: string) => {
        const res = await getBlogsByClient(cateId || "", currentPage, pageSize);
        if (res) {
            setBlogs(res.data.pageData);
            setTotalItems(res.data.pageInfo.totalItems); // Update total items for pagination
            setRecentBlogs(
                res.data.pageData
                    .sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 3)
            );
        }
    };

    const getCategoriesFromClient = async () => {
        const res = await getCategoriesByClient("", 1, 100);
        if (res) {
            setCates(res.data.pageData);
        }
    };

    const handleSelectedCateToFilterBlogs = (cate: Category) => {
        setCateToFilterBlog(cate);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    const handleSelectedTag = (id: string) => {
        setSelectedId(id);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto mt-3">
            <Title className="text-center" level={1}>The CrunchBlog</Title>

            <Row>
                <Col span={18} className="mt-3 grid grid-cols-3">
                    {blogs.map((item) => (
                        <BlogCard key={item._id} image={item.image_url} title={item.title} _id={item._id} description={item.description} />
                    ))}
                </Col>

                <Col className="mt-3" span={6}>
                    <Card title="Recent Posts" style={{ width: "100%" }}>
                        {recentBlogs.map((item: Blog) => (
                            <Link to={`/blog/${item._id}`} className="cursor-pointer">
                                <RecentBlogCart key={item._id} item={item} />
                            </Link>
                        ))}
                    </Card>

                    <Card title="Tags" className="mt-3" style={{ width: "100%" }}>
                        <div className="grid grid-cols-3 gap-3 text-center" style={{ fontSize: 11 }}>
                            {cates.map((item: Category) => (
                                <div key={item._id} onClick={() => handleSelectedCateToFilterBlogs(item)}>
                                    <BlogTag
                                        item={item}
                                        selectedId={selectedId}
                                        onSelect={handleSelectedTag}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Pagination Component */}
            <Row justify="center" className="mt-5">
                <Pagination
                    className="mb-10"
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false} // Remove if you want to allow changing pageSize
                />
            </Row>
        </div>
    );
};

export default BlogPage;
