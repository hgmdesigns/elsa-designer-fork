'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const domain = require('./domain-ec2ef82c.js');
const selectListItems = require('./select-list-items-758229c1.js');
const workflowEditor = require('./workflow-editor-fdda4c4b.js');
require('./elsa-client-90ac335e.js');
require('./collection-542fafac.js');
require('./_commonjsHelpers-206db00d.js');
require('./state-tunnel-786a62ce.js');

const ElsaRadioListProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || null;
  }
  onCheckChanged(e) {
    const radio = e.target;
    const checked = radio.checked;
    if (checked)
      this.currentValue = radio.value;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.currentValue;
  }
  onDefaultSyntaxValueChanged(e) {
    this.currentValue = e.detail;
  }
  async componentWillRender() {
    this.items = await selectListItems.getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const fieldId = propertyDescriptor.name;
    const items = this.items;
    const currentValue = this.currentValue;
    return (index.h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, index.h("div", { class: "elsa-max-w-lg elsa-space-y-3 elsa-my-4" }, items.map((item, index$1) => {
      const inputId = `${fieldId}_${index$1}`;
      const optionIsString = typeof (item) == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = currentValue == value;
      return (index.h("div", { class: "elsa-relative elsa-flex elsa-items-start" }, index.h("div", { class: "elsa-flex elsa-items-center elsa-h-5" }, index.h("input", { id: inputId, type: "radio", radioGroup: fieldId, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "elsa-focus:ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300" })), index.h("div", { class: "elsa-ml-3 elsa-mt-1 elsa-text-sm" }, index.h("label", { htmlFor: inputId, class: "elsa-font-medium elsa-text-gray-700" }, text))));
    }))));
  }
};
workflowEditor.Tunnel.injectProps(ElsaRadioListProperty, ['serverUrl']);

exports.elsa_radio_list_property = ElsaRadioListProperty;
