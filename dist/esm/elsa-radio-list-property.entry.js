import { r as registerInstance, h } from './index-efd13af9.js';
import { S as SyntaxNames } from './domain-b51fc213.js';
import { g as getSelectListItems } from './select-list-items-1d9d898d.js';
import { T as Tunnel } from './workflow-editor-0395e413.js';
import './elsa-client-e01ed0bb.js';
import './collection-ba33bbb1.js';
import './_commonjsHelpers-63c253cd.js';
import './state-tunnel-04c0b67a.js';

const ElsaRadioListProperty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || null;
  }
  onCheckChanged(e) {
    const radio = e.target;
    const checked = radio.checked;
    if (checked)
      this.currentValue = radio.value;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.currentValue;
  }
  onDefaultSyntaxValueChanged(e) {
    this.currentValue = e.detail;
  }
  async componentWillRender() {
    this.items = await getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const fieldId = propertyDescriptor.name;
    const items = this.items;
    const currentValue = this.currentValue;
    return (h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, h("div", { class: "elsa-max-w-lg elsa-space-y-3 elsa-my-4" }, items.map((item, index) => {
      const inputId = `${fieldId}_${index}`;
      const optionIsString = typeof (item) == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = currentValue == value;
      return (h("div", { class: "elsa-relative elsa-flex elsa-items-start" }, h("div", { class: "elsa-flex elsa-items-center elsa-h-5" }, h("input", { id: inputId, type: "radio", radioGroup: fieldId, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "elsa-focus:ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300" })), h("div", { class: "elsa-ml-3 elsa-mt-1 elsa-text-sm" }, h("label", { htmlFor: inputId, class: "elsa-font-medium elsa-text-gray-700" }, text))));
    }))));
  }
};
Tunnel.injectProps(ElsaRadioListProperty, ['serverUrl']);

export { ElsaRadioListProperty as elsa_radio_list_property };
