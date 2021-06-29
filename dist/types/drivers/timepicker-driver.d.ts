import { PropertyDisplayDriver } from "../services/property-display-driver";
import { ActivityModel, ActivityPropertyDescriptor } from "../models";
export declare class TimepickerDriver implements PropertyDisplayDriver {
  display(activity: ActivityModel, property: ActivityPropertyDescriptor): void;
  update(activity: ActivityModel, property: ActivityPropertyDescriptor, form: FormData): void;
}
