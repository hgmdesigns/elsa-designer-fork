import { propertyDisplayManager } from '../services/property-display-manager';
import { CheckboxDriver, CheckListDriver, CodeEditorDriver, DropdownDriver, MultilineDriver, MultiTextDriver, SingleLineDriver, SwitchCaseBuilderDriver, TimepickerDriver } from "../drivers";
import { RadioListDriver } from "../drivers/radio-list-driver";
export class DefaultDriversPlugin {
  constructor() {
    this.addDriver('single-line', SingleLineDriver);
    this.addDriver('multi-line', MultilineDriver);
    this.addDriver('check-list', CheckListDriver);
    this.addDriver('radio-list', RadioListDriver);
    this.addDriver('checkbox', CheckboxDriver);
    this.addDriver('dropdown', DropdownDriver);
    this.addDriver('multi-text', MultiTextDriver);
    this.addDriver('code-editor', CodeEditorDriver);
    this.addDriver('switch-case-builder', SwitchCaseBuilderDriver);
    this.addDriver('timepicker', TimepickerDriver);
  }
  addDriver(controlType, c) {
    propertyDisplayManager.addDriver(controlType, new c());
  }
}
