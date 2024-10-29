import { Supporter } from "./supporter.model";

export type Combo = {
    _id: string;
    name: string;
    items: Item[];
    category_id: string;
    description: string;
    price: number;
    discount: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
    category_name: string;
  };
  
  export type Item = {
    itemType: string;
    itemId: string;
    _id: string;
    details: ItemDetails;
  };
  
  export type ItemDetails = {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    status: string;
    image_url?: string;
    price: number;
    discount: number;
    quantity?: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    __v: number;
    lab_url?: string;
    supporters?: Supporter[];
    max_support_count?: number;
    support_histories?: any[];
    content?: string;
  };
  