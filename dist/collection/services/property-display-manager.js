import { NullPropertyDriver } from "../drivers";
export class PropertyDisplayManager {
  constructor() {
    this.drivers = {};
  }
  addDriver(controlType, driver) {
    this.drivers[controlType] = () => driver;
  }
  display(activity, property) {
    const driver = this.getDriver(property.uiHint);
    return driver.display(activity, property);
  }
  update(activity, property, form) {
    const driver = this.getDriver(property.uiHint);
    return driver.update(activity, property, form);
  }
  getDriver(type) {
    const driverFactory = this.drivers[type] || (() => new NullPropertyDriver());
    return driverFactory();
  }
}
export const propertyDisplayManager = new PropertyDisplayManager();
