import { Truck } from './Truck';
import { Delivery } from './Delivery';

export interface ReportData {
    truck: Truck;
    firstTrip: Delivery[];
    secondTrip: Delivery[];
}
