export interface Lab {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    content: string;
    status: string;
    lab_url: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    supporters: string[];
    max_support_count?: number;
    support_histories?: [];
  }
  
  export interface Kit {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    status: string;
    image_url: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    user_name: string;
    category_name: string;
    lab_count: number;
    labs: Lab[];
    description: string;
    video_url: string;
  }
  