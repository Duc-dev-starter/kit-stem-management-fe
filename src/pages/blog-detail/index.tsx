import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Skeleton } from 'antd';
import styles from "./blogDetail.module.css"
import { ShareAltOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';
import { Blog } from '../../models';
import { clientGetBlog } from '../../services';
import { CustomBreadcrumb } from '../../components';
import { PATH } from '../../consts';
import { formatDate } from '../../utils';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchBlog = async () => {
        const response = await clientGetBlog(id)
        setBlog(response.data);
        setLoading(false);
    };


    useEffect(() => {
        fetchBlog();
    }, []);


    if (loading) {
        return (
            <>
                <Skeleton active />
            </>
        );
    }


    if (!blog) {
        return (
            <div className="container mx-auto mt-10">
                <Alert message="No blog found" type="warning" showIcon />
            </div>
        );
    }

    return (
        <div className={`${styles.blogDetailContainer}`}>
            <div className='container mx-auto'>
                <CustomBreadcrumb />
            </div>
            <div className='px-0 w-full mx-auto'>
                <div className='bg-white-transparent py-11 px-3 w-full relative'>
                    <div className='max-w-[810px] px-7 mx-auto relative'>
                        <div>
                            <div>
                                <div className={styles.article_category}>{blog.category_name}</div>
                                <h1 className={styles.article_title}>{blog.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.meta_section_border}>
                <div className={styles.meta_section}>
                    <div className={styles.author_col}>
                        <div className='pr-3'>
                            <div className={styles.author_name}>{blog.user_name}</div>
                            <div className=''>Crunchlabs</div>
                        </div>
                    </div>
                    <div className={styles.share_col}>
                        <Link to={PATH.HOME} className={styles.share_article_button}>Share this article
                            <span className='mt-2'>
                                <ShareAltOutlined className='ml-2' />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.main_article}>
                <img className={styles.image_url} src={blog.image_url} alt={blog.title} />
                <h2 className='main_h2 mt-5'>{blog.description}</h2>
                <p className='mt-0 mb-4 text-lg'>{parse(blog.content)}</p>
                <footer className='mb-6'>
                    <p className='mt-0 mb-4'>
                        <em>Page Last Updated: </em>
                        <span className='font-normal'> {formatDate(blog.updated_at)}</span>
                    </p>
                </footer>
            </div>

        </div>
    );
};

export default BlogDetail;
