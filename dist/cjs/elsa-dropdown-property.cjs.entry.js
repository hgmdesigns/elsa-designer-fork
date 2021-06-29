'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const domain = require('./domain-ec2ef82c.js');
const workflowEditor = require('./workflow-editor-fdda4c4b.js');
const selectListItems = require('./select-list-items-758229c1.js');
require('./state-tunnel-786a62ce.js');
require('./elsa-client-90ac335e.js');
require('./collection-542fafac.js');
require('./_commonjsHelpers-206db00d.js');

const ElsaDropdownProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || undefined;
    this.items = await selectListItems.getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  onChange(e) {
    const select = e.target;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
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
    return (index.h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e), class: "elsa-mt-1 elsa-block focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-w-full elsa-shadow-sm sm:elsa-max-w-xs sm:elsa-text-sm elsa-border-gray-300 elsa-rounded-md" }, items.map(item => {
      const optionIsObject = typeof (item) == 'object';
      const value = optionIsObject ? item.value : item.toString();
      const text = optionIsObject ? item.text : item.toString();
      return index.h("option", { value: value, selected: value === currentValue }, text);
    }))));
  }
};
workflowEditor.Tunnel.injectProps(ElsaDropdownProperty, ['serverUrl']);

exports.elsa_dropdown_property = ElsaDropdownProperty;
