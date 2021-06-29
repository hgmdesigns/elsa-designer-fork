'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const domain = require('./domain-ec2ef82c.js');
const utils = require('./utils-bb625a12.js');
const workflowEditor = require('./workflow-editor-fdda4c4b.js');
const selectListItems = require('./select-list-items-758229c1.js');
require('./collection-542fafac.js');
require('./_commonjsHelpers-206db00d.js');
require('./state-tunnel-786a62ce.js');
require('./elsa-client-90ac335e.js');

const ElsaMultiTextProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    this.currentValue = this.propertyModel.expressions[domain.SyntaxNames.Json] || '[]';
  }
  onValueChanged(newValue) {
    const newValues = newValue.map(item => {
      if (typeof item === 'string')
        return item;
      if (typeof item === 'number')
        return item.toString();
      if (typeof item === 'boolean')
        return item.toString();
      return item.value;
    });
    this.currentValue = JSON.stringify(newValues);
    this.propertyModel.expressions[domain.SyntaxNames.Json] = this.currentValue;
  }
  onDefaultSyntaxValueChanged(e) {
    this.currentValue = e.detail;
  }
  createKeyValueOptions(options) {
    if (options === null)
      return options;
    return options.map(option => typeof option === 'string' ? { text: option, value: option } : option);
  }
  async componentWillRender() {
    this.items = await selectListItems.getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    const values = utils.parseJson(this.currentValue);
    const items = this.items;
    const useDropdown = !!propertyDescriptor.options && propertyDescriptor.options.length > 0;
    const propertyOptions = this.createKeyValueOptions(items);
    const elsaInputTags = useDropdown ?
      index.h("elsa-input-tags-dropdown", { dropdownValues: propertyOptions, values: values, fieldId: fieldId, fieldName: fieldName, onValueChanged: e => this.onValueChanged(e.detail) }) :
      index.h("elsa-input-tags", { values: values, fieldId: fieldId, fieldName: fieldName, onValueChanged: e => this.onValueChanged(e.detail) });
    return (index.h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, elsaInputTags));
  }
};
workflowEditor.Tunnel.injectProps(ElsaMultiTextProperty, ['serverUrl']);

exports.elsa_multi_text_property = ElsaMultiTextProperty;
