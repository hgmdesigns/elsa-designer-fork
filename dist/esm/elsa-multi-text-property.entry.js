import { r as registerInstance, h } from './index-efd13af9.js';
import { S as SyntaxNames } from './domain-b51fc213.js';
import { p as parseJson } from './utils-2841e02a.js';
import { T as Tunnel } from './workflow-editor-0395e413.js';
import { g as getSelectListItems } from './select-list-items-1d9d898d.js';
import './collection-ba33bbb1.js';
import './_commonjsHelpers-63c253cd.js';
import './state-tunnel-04c0b67a.js';
import './elsa-client-e01ed0bb.js';

const ElsaMultiTextProperty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    this.currentValue = this.propertyModel.expressions[SyntaxNames.Json] || '[]';
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
    this.propertyModel.expressions[SyntaxNames.Json] = this.currentValue;
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
    this.items = await getSelectListItems(this.serverUrl, this.propertyDescriptor);
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    const values = parseJson(this.currentValue);
    const items = this.items;
    const useDropdown = !!propertyDescriptor.options && propertyDescriptor.options.length > 0;
    const propertyOptions = this.createKeyValueOptions(items);
    const elsaInputTags = useDropdown ?
      h("elsa-input-tags-dropdown", { dropdownValues: propertyOptions, values: values, fieldId: fieldId, fieldName: fieldName, onValueChanged: e => this.onValueChanged(e.detail) }) :
      h("elsa-input-tags", { values: values, fieldId: fieldId, fieldName: fieldName, onValueChanged: e => this.onValueChanged(e.detail) });
    return (h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true }, elsaInputTags));
  }
};
Tunnel.injectProps(ElsaMultiTextProperty, ['serverUrl']);

export { ElsaMultiTextProperty as elsa_multi_text_property };
