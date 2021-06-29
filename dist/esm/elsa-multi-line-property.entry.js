import { r as registerInstance, h } from './index-efd13af9.js';
import { S as SyntaxNames } from './domain-b51fc213.js';

const ElsaMultiLineProperty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || undefined;
  }
  getEditorHeight(options) {
    const editorHeightName = options.editorHeight || 'Default';
    switch (editorHeightName) {
      case 'Large':
        return { propertyEditor: '20em', textArea: 6 };
      case 'Default':
      default:
        return { propertyEditor: '15em', textArea: 3 };
    }
  }
  onChange(e) {
    const input = e.currentTarget;
    this.propertyModel.expressions['Literal'] = this.currentValue = input.value;
  }
  onDefaultSyntaxValueChanged(e) {
    this.currentValue = e.detail;
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const options = propertyDescriptor.options || {};
    const editorHeight = this.getEditorHeight(options);
    const context = options.context;
    const fieldId = propertyName;
    const fieldName = propertyName;
    let value = this.currentValue;
    if (value == undefined) {
      const defaultValue = this.propertyDescriptor.defaultValue;
      value = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "editor-height": editorHeight.propertyEditor, context: context }, h("textarea", { id: fieldId, name: fieldName, value: value, onChange: e => this.onChange(e), class: "focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300", rows: editorHeight.textArea })));
  }
};

export { ElsaMultiLineProperty as elsa_multi_line_property };