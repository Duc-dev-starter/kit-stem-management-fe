export { API } from './api';
export { PATH } from './path'
export { avatarUrlRules, commentRules, contentRules, descriptionRules, emailRules, nameRules, passwordRules, phoneNumberRules, ratingRules, rejectRules, roleRules, titleRules, videoRules } from './formItem.ts'
import { PATH } from './path.ts'
export { getRoleColor } from './getColor.ts'
export { getRoleLabel } from './getLabel.ts'
export { avatarReplace } from './others.ts'

export const statusOfKit = {
  NEW: "new",
  IN_WAREHOUSE: "in_warehouse",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CONFIRMED_DELIVERED: "confirmed_delivered",
  ACTIVE: "active", // Kit sẵn sàng sử dụng khi đã được giao nhận thành công
  SOLD_OUT: "sold_out",
  POPULAR: "popular",
  INACTIVE: "inactive",
  RETURNED: "returned"
};

export const priceDiscounted = (price: number, discount: number) => {
  return (price - (price * discount / 100)).toLocaleString("vi-VN");
}

export const calculatePriceDiscounted = (price: number, discount: number) => {
  return (price - (price * discount / 100))
}
export const reloadApp = () => {
  window.location.reload();
};
export const CartStatusEnum = {
  NEW: 'new',
  WAITING_PAID: 'waiting_paid',
  CANCEL: 'cancel',
  COMPLETED: 'completed',
};

export const PurchaseStatusEnum = {
  NEW: 'new',
  PROCESSING: 'processing',
  DELIVERING: 'delivering',
  DELIVERED: 'delivered'
};

export const purchaseStatusColor = (status: string) => {
  switch (status) {
    case PurchaseStatusEnum.NEW:
      return "purple";
    case PurchaseStatusEnum.PROCESSING:
      return "red";
    case PurchaseStatusEnum.DELIVERING:
      return "gold";
    case PurchaseStatusEnum.DELIVERED:
      return "green";
  }
};


export const currencyUnit = "$"

export const kitStatus = (status: string) => {
  switch (status) {
    case statusOfKit.IN_WAREHOUSE:
      return "In Warehouse";
    case statusOfKit.NEW:
      return "New";
    case statusOfKit.SHIPPED:
      return "Shipped";
    case statusOfKit.DELIVERED:
      return "Delivered";
    case statusOfKit.CONFIRMED_DELIVERED:
      return "Confirmed Delivered";
    case statusOfKit.ACTIVE:
      return "Active";
    case statusOfKit.SOLD_OUT:
      return "Sold Out";
    case statusOfKit.POPULAR:
      return "Popular";
    case statusOfKit.INACTIVE:
      return "Inactive";
    case statusOfKit.RETURNED:
      return "Returned";
    default:
      return "Unknown Status"; // Trả về giá trị mặc định nếu không khớp status
  }
};

export const kitStatusColor = (status: string) => {
  switch (status) {
    case statusOfKit.IN_WAREHOUSE:
      return "red";
    case statusOfKit.NEW:
      return "purple";
    case statusOfKit.SHIPPED:
      return "orange";
    case statusOfKit.DELIVERED:
      return "green";
    case statusOfKit.CONFIRMED_DELIVERED:
      return "blue";
    case statusOfKit.ACTIVE:
      return "teal";
    case statusOfKit.SOLD_OUT:
      return "gray";
    case statusOfKit.POPULAR:
      return "gold";
    case statusOfKit.INACTIVE:
      return "darkgray";
    case statusOfKit.RETURNED:
      return "brown";
    default:
      return "black"; // Màu mặc định nếu không khớp status
  }
};
export const labStatus = (status: string) => {
  switch (status) {
    case statusOfLab.NEW:
      return "New";
    case statusOfLab.ACTIVE:
      return "Active";
    case statusOfLab.POPULAR:
      return "Popular";
    case statusOfLab.INACTIVE:
      return "Inactive";
    case statusOfLab.RETURNED:
      return "Returned";
    case statusOfLab.WAITING_APPROVE:
      return "Waiting for Approval";
    case statusOfLab.APPROVE:
      return "Approved";
    default:
      return "Unknown Status"; // Trả về giá trị mặc định nếu không khớp status
  }
};

export const labStatusColor = (status: string) => {
  switch (status) {
    case statusOfLab.NEW:
      return "purple";
    case statusOfLab.ACTIVE:
      return "teal";
    case statusOfLab.POPULAR:
      return "gold";
    case statusOfLab.INACTIVE:
      return "darkgray";
    case statusOfLab.RETURNED:
      return "brown";
    case statusOfLab.WAITING_APPROVE:
      return "orange";
    case statusOfLab.APPROVE:
      return "green";
    default:
      return "black"; // Màu mặc định nếu không khớp status
  }
};

export const statusOfLab = {
  NEW: "new",
  ACTIVE: "active",
  POPULAR: "popular",
  INACTIVE: "inactive",
  RETURNED: "returned",
  WAITING_APPROVE: 'waiting_approve',
  APPROVE: 'approve'
};
// Define the structure of the submenu
interface categoryCourse {
  [key: string]: string[];
}

// Example data
export const categoryFilters = [
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Entrepreneurship",
  "Business Analytics & Intelligence",
  "Finance",
  "IT Certifications",
  "Personal Transformation",
  "Graphic Design & Illustration",
  "Digital Marketing",
  // Add other categories as needed
];

export const categoryCourse: categoryCourse = {
  "Web Development": [
    "JavaScript",
    "React JS",
    "Angular",
    "Next.js",
    "CSS",
    "HTML",
    "ASP.NET Core",
    "Node.Js",
    "Microservices",
  ],
  "Mobile Development": ["iOS", "Android", "Flutter", "React Native"],
  "Game Development": ["Unity", "Unreal Engine", "Godot"],
  Entrepreneurship: ["Startup", "Business Planning", "Marketing"],
  "Business Analytics & Intelligence": [
    "Data Analysis",
    "Power BI",
    "Data Science",
    "Data Visualization",
  ],
  Finance: ["Investing", "Trading", "Accounting", "Cryptocurrency"],
  "IT Certifications": ["AWS", "CompTIA", "Cisco", "Microsoft"],
  "Personal Transformation": [
    "Leadership",
    "Personal Productivity",
    "Communication Skills",
    "Confidence",
  ],
  "Graphic Design & Illustration": [
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Drawing",
  ],
  "Digital Marketing": [
    "SEO",
    "Social Media Marketing",
    "Google Analytics",
    "Content Marketing",
  ],
  // Add other subcategories as needed
};

/* SUB CATEGORIES */
export const categorySubmenu = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots",
];

export const teacherCategories = [
  "Mr. Johnson",
  "Ms. Rodriguez",
  "Mr. Thompson",
  "Mrs. Smith",
  "Ms. Garcia",
  "Mr. Davis",
  "Mrs. Martinez",
  "Mr. Wilson",
  "Mrs. Anderson",
  "Mr. Taylor",
  "Ms. Thomas",
  "Mrs. Clark",
  "Mr. Lewis",
];

/* SIDEBAR POLICES */
export const sidebarPolicies = [
  { id: 1, name: "Terms of Use", link: "/terms" },
  { id: 2, name: "Privacy Policy", link: "/terms/policy" },
  { id: 3, name: "Rules and Guidelines", link: "/terms/guidelines" },
  { id: 4, name: "Intellectual Property Policy", link: "/terms/intellectual" },
  { id: 5, name: "Master Services Agreement", link: "/terms/agreement" },
  { id: 6, name: "Launch Services", link: "/terms/launch" },
  { id: 7, name: "Help & Support", link: "/support" },
];

/* POLICES */
export const policies = [
  { id: 1, name: "1. What Data We Get", link: "#section1" },
  { id: 2, name: "2. How We Get Data About You", link: "#section2" },
  { id: 3, name: "3. What We Use Your Data For", link: "#section3" },
  { id: 4, name: "4. Who We Share Your Data With", link: "#section4" },
  { id: 5, name: "5. Security", link: "#section5" },
  { id: 6, name: "6. Your Rights", link: "#section6" },
  { id: 7, name: "7. Jurisdiction-Specific Rules", link: "#section7" },
  { id: 8, name: "8. Updates & Contact Info", link: "#section8" },
];

/* TERMS */
export const terms = [
  { id: 1, name: "1. Account", link: "#section1" },
  {
    id: 2,
    name: "2. Content Subscription and Lifetime Access",
    link: "#section2",
  },
  { id: 3, name: "3. Payments, Offers and Refunds", link: "#section3" },
  { id: 4, name: "4. Content and behavior rules", link: "#section4" },
  {
    id: 5,
    name: "5. CrunchLabs's rights to the content you post",
    link: "#section5",
  },
  { id: 6, name: "6. Use CrunchLabs at your own risk", link: "#section6" },
  { id: 7, name: "7. CrunchLabs Permissions", link: "#section7" },
  { id: 8, name: "8. Subscription package terms", link: "#section8" },
  { id: 9, name: "9. Other legal terms", link: "#section9" },
  { id: 10, name: "10. Dispute resolution", link: "#section10" },
  { id: 11, name: "11. Update these terms", link: "#section11" },
  { id: 12, name: "12. How to contact us", link: "#section12" },
];

/* STUDENT FAQ */
export const faq_student = [
  { id: 1, name: "Refund Status: Common Questions", link: "#section1" },
  { id: 2, name: "Payment Methods on CrunchLabs", link: "#section2" },
  { id: 3, name: "Lifetime Access", link: "#section3" },
  { id: 4, name: "How to Find Your Missing Course", link: "#section4" },
  {
    id: 5,
    name: "How to Download Your Certificate of Completion",
    link: "#section5",
  },
  { id: 6, name: "How to Refund a Course", link: "#section6" },
  { id: 7, name: "Downloading Course Resources", link: "#section7" },
  {
    id: 8,
    name: "Learning With CrunchLabs: Frequently Asked Questions",
    link: "#section8",
  },
  { id: 9, name: "Troubleshooting Payment Failures", link: "#section9" },
];

/* INSTRUCTOR FAQ */
export const faq_instructor = [
  { id: 1, name: "CrunchLabs Course Quality Checklist", link: "#section1" },
  { id: 2, name: "How to Become a Premium Instructor", link: "#section2" },
  {
    id: 3,
    name: "Promote Your Course With Coupons and Referral Links",
    link: "#section3",
  },
  { id: 4, name: "Instructor Revenue Share", link: "#section4" },
  {
    id: 5,
    name: "Instructor Promotional Agreements and CrunchLabs Deals",
    link: "#section5",
  },
  {
    id: 6,
    name: "Teaching on CrunchLabs: Frequently Asked Questions",
    link: "#section6",
  },
];

/* STUDENT TOPIC SUPPORT*/
export const topic_student = [
  {
    id: 1,
    name: "Account/Profile",
    description: "Manage your account settings.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FJ75XEBMHTVM355A2ATG",
    link: "#section1",
  },
  {
    id: 2,
    name: "Troubleshooting",
    description: "Experiencing a technical issue? Check here.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FM9JPEPTW2N7HD3XSSST",
    link: "#section1",
  },
  {
    id: 3,
    name: "Learning Experience",
    description: "Everything about the CrunchLabs learning",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FDKGE7PT2EXYKDQZ8BD6",
    link: "#section1",
  },
  {
    id: 4,
    name: "Purchase/Refunds",
    description:
      "Learn about purchasing courses, how to send gifts, and refunds",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FJB5Y47293NZF0220ZKY",
    link: "#section1",
  },
  {
    id: 5,
    name: "Mobile",
    description: "On the go? Learn about our mobile app",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FGTNPB2Z3MC5WWRWTSAZ",
    link: "#section1",
  },
  {
    id: 6,
    name: "Trust & Safety",
    description: "Trust & Safety information and reporting",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FMD53E72SM31SP8RT0MM",
    link: "#section1",
  },
];

/* INSTRUCTOR TOPIC SUPPORT*/
export const topic_instructor = [
  {
    id: 1,
    name: "Instructor Payments",
    description: "Understand the revenue share and how to receive payments.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FJ3P0VC64QMBMBXKSDMQ",
    link: "#section1",
  },
  {
    id: 2,
    name: "Selling & Promotion",
    description: "Learn about the announcement.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FKSFR8QFBH1N595WYPTM",
    link: "#section1",
  },
  {
    id: 3,
    name: "Course Building",
    description: "Build your course curriculum and landing page.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FDKGE7PT2EXYKDQZ8BD6",
    link: "#section1",
  },
  {
    id: 4,
    name: "Course Management",
    description: "Maintain your course and engage with students.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FM2TN5216VEXR1GY2RMS",
    link: "#section1",
  },
  {
    id: 5,
    name: "Trust & Safety",
    description: "Policy and copyright questions and guidance.",
    img: "https://support.udemy.com/hc/theming_assets/01HZP8FMD53E72SM31SP8RT0MM",
    link: "#section1",
  },
];

/* FOOTER LINKS */
export const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About us", url: "/about" },
      { name: "Contact us", url: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Teach on CrunchLabs", url: "/teaching" },
      { name: "Blog", url: "/blogs" },
      { name: "Help and Supports", url: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", url: "/terms" },
      // { name: "Private policy", url: "/terms/policy" },
      { name: "Private policy", url: `${PATH.POLICY}` },
      { name: "Guide lindes", url: `${PATH.GUIDELINES}` },
      { name: "Sitemap", url: "/sitemap" },
    ],
  },
];

export const imgCourse = "data:image/png;base64,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"
