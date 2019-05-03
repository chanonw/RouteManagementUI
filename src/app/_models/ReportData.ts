import { Truck } from './Truck';
import { Delivery } from './Delivery';
import { Customer } from './Customer';

export interface ReportData {
    truck: Truck;
    firstTrip: Delivery[];
    secondTrip: Delivery[];
    totalFirstQuantity: number;
    totalSecondQuantity: number;
    distanceFirst: number;
    distanceSecond: number;
}
