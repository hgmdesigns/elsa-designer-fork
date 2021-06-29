import { h } from "@stencil/core";
import { getOrCreateProperty } from "../utils/utils";
export class DropdownDriver {
  display(activity, property) {
    const prop = getOrCreateProperty(activity, property.name);
    return h("elsa-dropdown-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}
