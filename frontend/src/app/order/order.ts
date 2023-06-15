import { Cart } from '../cart/cart';

export interface Order {
    delivery_data_id: string,
    order_id: string,
    payment_status: string,
    price: string,
    products: Cart[],
    user_id: string
  }