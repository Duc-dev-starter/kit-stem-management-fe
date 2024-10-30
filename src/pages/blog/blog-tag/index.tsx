import { Category } from "../../../models";

interface iBlogTag {
    item: Category;
    selectedId: string; // Currently selected ID
    onSelect: (id: string) => void; // Function called on tag selection
}

const BlogTag = ({ item, selectedId, onSelect }: iBlogTag) => {
    return (
        <div
            onClick={() => onSelect(item._id)} // Calls onSelect with the tag ID
            className="cursor-pointer"
        >
            <p className={selectedId === item._id ? "bg-black text-white font-bold" : "text-red-500 hover:text-blue-950 font-bold"}>
                {item.name}
            </p>
        </div>
    );
};

export default BlogTag;
