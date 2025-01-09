export interface ProductType {
    _id?: string;
    title: string;
    slug?: string;
    categories: category[];
    description: string;
    details: string[];
    tags: tag[];
    specs: productSpec[];
    variants: ProductVariant[];
}

export interface postProduct {
    title: string;
    categories: string[];
    description: string;
    details: string[];
    tags: string[];
    specs: productSpec[];
}

export interface category {
    _id?: string;
    name: string;
    slug: string;
    parentId: string | null;
    order: number;
    children?: category[];
}

export interface updateCategoryType {
    name? : string;
    order?  : number;
}

export interface postCategory {
    name: string;
    order: number;
    parentId: string | undefined;
}

export interface tag {
    _id?: string;
    name: string;
    slug: string;
}

export interface postTag {
    name: string;
}

export interface productSpec {
    _id?: string;
    key: string;
    name: string;
    values: specValue[]
}

export interface specValue {
    _id?: string;
    key: string;
    value: string;
}

export interface ProductVariant {
    specs: Record<string, string>;
    price: number;
    discount: number;
    discountType: "percentage" | "value";
    stock: number;
    slug?: string;
    images: Image[] | string[];
    _id?: string;
    product_slug?: string;
}

export interface Image {
    _id: string;
    url: string;
}