import { ActivityModel, ActivityPropertyDescriptor } from "../models";
export interface PropertyDisplayDriver {
  display(activity: ActivityModel, property: ActivityPropertyDescriptor): any;
  update(activity: ActivityModel, property: ActivityPropertyDescriptor, form: FormData): any;
}
