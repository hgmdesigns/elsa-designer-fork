import { getOrCreateProperty } from "../utils/utils";
export class TimepickerDriver {
  display(activity, property) {
    const prop = getOrCreateProperty(activity, property.name);
    // return <elsa-timepicker-property propertyDescriptor={property} propertyModel={prop}/>;
  }
  update(activity, property, form) {
  }
}
