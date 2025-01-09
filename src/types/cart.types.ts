import type { ProductType } from "./database.type";

export interface basketType {
    list : cartListItem[];
    totalDiscount : number;
    totalPrice : number;
    _id? : string;
}

export interface cartListItem {
    count: number;
    discount: number;
    price: number;
    productId: ProductType;
    variantId: String;
    _id: string;
}

export interface addCartType {
    list : addCartList;
}

export interface addCartList {
    productId: string;
    variantId: string;
    count: number;
}