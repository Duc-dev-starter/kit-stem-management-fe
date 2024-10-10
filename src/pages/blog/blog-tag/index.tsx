import { Category } from "../../../models";

interface iBlogTag {
    item: Category;
    selectedId: string; // Trạng thái ID được chọn
    onSelect: (id: string) => void; // Hàm gọi khi chọn tag
}

const BlogTag = ({ item, selectedId, onSelect }: iBlogTag) => {
    return (
        <div
            onClick={() => onSelect(item._id)} // Gọi hàm onSelect với ID của tag hiện tại
        >
            <p className={selectedId === item._id ? "bg-black text-white font-bold" :"text-red-500 hover:text-blue-950 font-bold"}>{item.name}</p>
        </div>
    );
};

export default BlogTag;
