import { ActivityModel, ActivityPropertyDescriptor } from "../models/";
import { PropertyDisplayDriver } from "./property-display-driver";
import { Map } from '../utils/utils';
export declare type PropertyDisplayDriverMap = Map<() => PropertyDisplayDriver>;
export declare class PropertyDisplayManager {
  drivers: PropertyDisplayDriverMap;
  addDriver<T extends PropertyDisplayDriver>(controlType: string, driver: T): void;
  display(activity: ActivityModel, property: ActivityPropertyDescriptor): any;
  update(activity: ActivityModel, property: ActivityPropertyDescriptor, form: FormData): any;
  getDriver(type: string): PropertyDisplayDriver;
}
export declare const propertyDisplayManager: PropertyDisplayManager;
