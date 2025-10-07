export interface Product {
    id: number;
    title: string;
    price: number;
    stock_status: "instock" | "outofstock";
    category?: string;
    on_sale: boolean;
    stock_quantity?: number;
    created_at: string;
    tags?: string[];
}
