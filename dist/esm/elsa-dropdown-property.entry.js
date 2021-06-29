import { r as registerInstance, h } from './index-efd13af9.js';
import { S as SyntaxNames } from './domain-b51fc213.js';
import { T as Tunnel } from './workflow-editor-0395e413.js';
import { g as getSelectListItems } from './select-list-items-1d9d898d.js';
import './state-tunnel-04c0b67a.js';
import './elsa-client-e01ed0bb.js';
import './collection-ba33bbb1.js';
import './_commonjsHelpers-63c253cd.js';

const ElsaDropdownProperty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || undefined;
    this.items = await getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  onChange(e) {
    const select = e.target;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.currentValue = select.value;
  }
  onDefaultSyntaxValueChanged(e) {
    this.currentValue = e.detail;
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    let currentValue = this.currentValue;
    const items = this.items;
    if (currentValue == undefined) {
      const defaultValue = this.propertyDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e), class: "elsa-mt-1 elsa-block focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-w-full elsa-shadow-sm sm:elsa-max-w-xs sm:elsa-text-sm elsa-border-gray-300 elsa-rounded-md" }, items.map(item => {
      const optionIsObject = typeof (item) == 'object';
      const value = optionIsObject ? item.value : item.toString();
      const text = optionIsObject ? item.text : item.toString();
      return h("option", { value: value, selected: value === currentValue }, text);
    }))));
  }
};
Tunnel.injectProps(ElsaDropdownProperty, ['serverUrl']);

export { ElsaDropdownProperty as elsa_dropdown_property };
