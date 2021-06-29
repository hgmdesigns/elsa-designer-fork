'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const domain = require('./domain-ec2ef82c.js');

const ElsaCheckBoxProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    this.isChecked = (this.propertyModel.expressions[domain.SyntaxNames.Literal] || '').toLowerCase() == 'true';
  }
  onCheckChanged(e) {
    const checkbox = e.target;
    this.isChecked = checkbox.checked;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.isChecked.toString();
  }
  onDefaultSyntaxValueChanged(e) {
    this.isChecked = (e.detail || '').toLowerCase() == 'true';
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    const fieldLabel = propertyDescriptor.label || propertyName;
    let isChecked = this.isChecked;
    return (index.h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true, showLabel: false }, index.h("div", { class: "elsa-max-w-lg" }, index.h("div", { class: "elsa-relative elsa-flex elsa-items-start" }, index.h("div", { class: "elsa-flex elsa-items-center elsa-h-5" }, index.h("input", { id: fieldId, name: fieldName, type: "checkbox", checked: isChecked, value: 'true', onChange: e => this.onCheckChanged(e), class: "focus:elsa-ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300 elsa-rounded" })), index.h("div", { class: "elsa-ml-3 elsa-text-sm" }, index.h("label", { htmlFor: fieldId, class: "elsa-font-medium elsa-text-gray-700" }, fieldLabel))))));
  }
};

exports.elsa_checkbox_property = ElsaCheckBoxProperty;
