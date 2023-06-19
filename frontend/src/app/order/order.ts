import { Cart } from '../cart/cart';
import { DeliveryData } from '../delivery-data/delivery-data';

export interface Order {
    delivery_data_id: string,
    delivery_details: DeliveryData[],
    order_id: string,
    payment_status: string,
    price: string,
    products: Cart[],
    user_id: string
  }