export interface Purchase {
    _id: string;
    purchase_no: string;
    status: "new" | "processing" | "delivering" | "delivered"; // Chỉnh lại nếu có nhiều trạng thái khác
    price_paid: number;
    price: number;
    discount: number; // Discount được tính theo phần trăm
    cart_id: string;
    product_id: string;
    product_type: 'kit' | 'lab' | "combo"; // Chỉnh lại nếu có nhiều loại sản phẩm khác
    user_id: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    user_name: string;
    product_name: string;
  }
  