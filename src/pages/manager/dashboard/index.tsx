import { FileDoneOutlined, PlaySquareOutlined, TeamOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Image, Rate, Row, Skeleton } from "antd";

// import { CustomBreadcrumb } from "../../../components";
// import { fetchCoursesByClient, getBlogs, getCourses, getUsers } from "../../../services";
import { Link } from "react-router-dom";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { RevenueChart } from "../../admin/chart/revenuechart";
import { UserChart } from "../../admin/chart/userChart";


interface Course {
	id: string;
	name: string;
	instructor_name: string;
	price: number;
	category_name: string;
	totalSold: number;
	image_url: string;
	average_rating: number;
	price_paid: number;
	discount: number;
}

const AdminDashboard: React.FC = () => {
	// const [topCourses, setTopCourses] = useState<Course[]>([]);
	// const [numBlogs, setNumBlogs] = useState(0);
	// const [numCourses, setNumCourses] = useState(0);
	// const [numStudents, setNumStudents] = useState(0);
	// const [numInstructors, setNumInstructors] = useState(0);
	// const [loading, setLoading] = useState(true);

	// const fetchData = useCallback(async () => {
	// 	setLoading(true);
	// 	try {
	// 		const blogs = await getBlogs();
	// 		const courses = await getCourses();
	// 		const students = await getUsers("", "student");
	// 		const instructors = await getUsers("", "instructor");
	// 		const totalBlogs = blogs.data.pageInfo.totalItems;
	// 		const totalCourses = courses.data.pageInfo.totalItems;
	// 		const totalStudents = students.data.pageInfo.totalItems;
	// 		const totalInstructors = instructors.data.pageInfo.totalItems;

	// 		setNumBlogs(totalBlogs);
	// 		setNumCourses(totalCourses);
	// 		setNumStudents(totalStudents);
	// 		setNumInstructors(totalInstructors);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, []);
	//goi top course
	// const fetchTopCourses = useCallback(async () => {
	// 	try {
	// 		const res = await fetchCoursesByClient();
	// 		const sortedCourses = res.sort((a: Course, b: Course) => b.average_rating - a.average_rating);
	// 		setTopCourses(sortedCourses.slice(0, 3));
	// 	} catch (error) {
	// 		console.error("Failed to fetch courses:", error);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	fetchData();
	// 	fetchTopCourses();
	// }, [fetchData, fetchTopCourses]);

	const topCourses: Course[] = [
		{
			id: "1",
			name: "Course 1",
			instructor_name: "Instructor A",
			price: 200000,
			category_name: "Category 1",
			totalSold: 150,
			image_url: "https://via.placeholder.com/150",
			average_rating: 4.5,
			price_paid: 180000,
			discount: 10,
		},
		{
			id: "2",
			name: "Course 2",
			instructor_name: "Instructor B",
			price: 300000,
			category_name: "Category 2",
			totalSold: 200,
			image_url: "https://via.placeholder.com/150",
			average_rating: 4.8,
			price_paid: 270000,
			discount: 10,
		},
		{
			id: "3",
			name: "Course 3",
			instructor_name: "Instructor C",
			price: 250000,
			category_name: "Category 3",
			totalSold: 100,
			image_url: "https://via.placeholder.com/150",
			average_rating: 4.2,
			price_paid: 225000,
			discount: 10,
		},
	];

	const numBlogs = 10; // Hard-coded number of blogs
	const numCourses = topCourses.length; // Total number of courses based on the hard-coded data
	const numStudents = 500; // Hard-coded number of students
	const numInstructors = 20; // Hard-coded number of instructors

	const loading = false; // Set loading to false since we are using hard-coded data

	return (
		<>
			<CustomBreadcrumb />
			{loading ? (
				<div className="flex flex-col items-center mt-10">
					<Skeleton active paragraph={{ rows: 4 }} />
					<Skeleton.Image style={{ width: '100%', height: 150, marginBottom: 20 }} />
					<Skeleton active paragraph={{ rows: 1 }} />
					<Skeleton.Image style={{ width: '100%', height: 100, marginBottom: 20 }} />
				</div>
			) : (
				<>
					<div className="flex justify-between drop-shadow-xl gap-4">
						<Badge.Ribbon text="CrunchLabs" color="blue">
							<Card title="Total courses in the system" bordered={false} style={{ width: 300 }}>
								<div className="flex justify-center gap-2">
									<h1>{numCourses}</h1>
									<PlaySquareOutlined style={{ fontSize: "20px", color: "red" }} />
								</div>
							</Card>
						</Badge.Ribbon>

						<Badge.Ribbon text="CrunchLabs" color="orange">
							<Card title="Total Student in the system" bordered={false} style={{ width: 300 }}>
								<div className="flex justify-center gap-2">
									<h1>{numStudents}</h1>
									<TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
								</div>
							</Card>
						</Badge.Ribbon>

						<Badge.Ribbon text="CrunchLabs" color="green">
							<Card title="Total Instructor in the system" bordered={false} style={{ width: 300 }}>
								<div className="flex justify-center gap-2">
									<h1>{numInstructors}</h1>
									<TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
								</div>
							</Card>
						</Badge.Ribbon>

						<Badge.Ribbon text="CrunchLabs" color="red">
							<Card title="Total Blogs in the system" bordered={false} style={{ width: 300 }}>
								<div className="flex justify-center gap-2">
									<h1>{numBlogs}</h1>
									<FileDoneOutlined style={{ fontSize: "20px", color: "blue" }} />
								</div>
							</Card>
						</Badge.Ribbon>
					</div>
					<div className="mt-9 drop-shadow-xl">
						<Row gutter={24}>
							<Col span={12}>
								<Card bordered={false}>
									<UserChart />
								</Card>
							</Col>
							<Col span={12}>
								<Card bordered={false}>
									<RevenueChart />
								</Card>
							</Col>
						</Row>
					</div>
					<div className="mt-6 drop-shadow-xl">
						<span className="font-bold text-lg text-rose-400">Top 3 highest Average Rating courses in the system</span>
						<Row gutter={24} className="mt-2">
							{topCourses.map((course) => (
								<Col span={8} key={course.id}>
									<Card bordered={false} className="hover:cursor-pointer h-64">
										<div style={{ display: "flex", alignItems: "center" }} className="justify-between">
											<span className="font-bold" style={{ marginLeft: 10 }}>
												{course.name}
											</span>
										</div>
										<div className="flex gap-5 items-center">
											<Image src={course.image_url} width={150} height={100} />
											<div className="gap-7">
												<p className="text-gray-700">
													<span className="font-bold">Instructor:</span> <Link to="">{course.instructor_name}</Link>
												</p>
												<p className="text-gray-700">
													<span className="font-bold">Category:</span> <Link to="">{course.category_name}</Link>
												</p>
												<div className="flex gap-2">
													<span className="font-bold">Price:</span>
													<p className="text-gray-700 line-through">
														{course.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
													</p>
												</div>
												<p className="text-gray-700">
													<span className="font-bold">Discount:</span> {course.discount}%
												</p>
												<p className="text-gray-700">
													<span className="font-bold">Price Paid:</span>{" "}
													{course.price_paid.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
												</p>
											</div>
										</div>
										<div className="flex flex-col mt-auto">
											<Rate allowHalf defaultValue={course.average_rating} className="mt-3 ml-3" />
											<div className="py-2 flex justify-end"></div>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					</div>
				</>
			)}
		</>
	);
};

export default AdminDashboard;
