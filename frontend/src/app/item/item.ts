export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    characteristics: {
        color: string;
    };
    brand: string;
    category: string;
    prod_images: string[];
    sizes_and_amounts: {
        size: string;
        amount: number;
    }[];
}