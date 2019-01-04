import { Customer } from './Customer';

export interface Delivery {
    deliveryId: string;
    transDate: string;
    quantity: number;
    status: string;
    cusCode: string;
    carCode: string;
    deliveryOrder: string;
    trip: string;
    customer: Customer;
    reason: string;
}
