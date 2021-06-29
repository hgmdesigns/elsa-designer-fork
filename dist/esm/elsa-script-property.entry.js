import { r as registerInstance, h } from './index-efd13af9.js';
import { c as createElsaClient } from './elsa-client-e01ed0bb.js';
import { T as Tunnel } from './workflow-editor-0395e413.js';
import './collection-ba33bbb1.js';
import './_commonjsHelpers-63c253cd.js';
import './domain-b51fc213.js';
import './state-tunnel-04c0b67a.js';

const ElsaScriptProperty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.editorHeight = '6em';
    this.singleLineMode = false;
  }
  async componentWillLoad() {
    this.currentValue = this.propertyModel.expressions['Literal'];
  }
  async componentDidLoad() {
    const elsaClient = createElsaClient(this.serverUrl);
    const libSource = await elsaClient.scriptingApi.getJavaScriptTypeDefinitions(this.workflowDefinitionId, this.context);
    const libUri = 'defaultLib:lib.es6.d.ts';
    await this.monacoEditor.addJavaScriptLib(libSource, libUri);
  }
  mapSyntaxToLanguage(syntax) {
    switch (syntax) {
      case 'JavaScript':
        return 'javascript';
      case 'Liquid':
        return 'handlebars';
      case 'Literal':
      default:
        return 'plaintext';
    }
  }
  onMonacoValueChanged(e) {
    this.currentValue = e.value;
  }
  render() {
    const propertyDescriptor = this.propertyDescriptor;
    const syntax = this.syntax;
    const monacoLanguage = this.mapSyntaxToLanguage(syntax);
    const propertyName = propertyDescriptor.name;
    const fieldId = propertyName;
    const fieldName = propertyName;
    const fieldLabel = propertyDescriptor.label || propertyName;
    const fieldHint = propertyDescriptor.hint;
    const value = this.currentValue;
    return h("div", null, h("div", { class: "elsa-flex" }, h("div", { class: "" }, h("label", { htmlFor: fieldId, class: "elsa-block elsa-text-sm elsa-font-medium elsa-text-gray-700" }, fieldLabel)), h("div", { class: "elsa-flex-1" }, h("div", null, h("div", { class: "hidden sm:elsa-block" }, h("nav", { class: "elsa-flex elsa-flex-row-reverse", "aria-label": "Tabs" }, h("span", { class: "elsa-bg-blue-100 elsa-text-blue-700 elsa-px-3 elsa-py-2 elsa-font-medium elsa-text-sm elsa-rounded-md" }, syntax)))))), h("div", { class: "elsa-mt-1" }, h("elsa-monaco", { value: value, language: monacoLanguage, "editor-height": this.editorHeight, "single-line": this.singleLineMode, onValueChanged: e => this.onMonacoValueChanged(e.detail), ref: el => this.monacoEditor = el })), fieldHint ? h("p", { class: "elsa-mt-2 elsa-text-sm elsa-text-gray-500" }, fieldHint) : undefined, h("input", { type: "hidden", name: fieldName, value: value }));
  }
};
Tunnel.injectProps(ElsaScriptProperty, ['serverUrl', 'workflowDefinitionId']);

export { ElsaScriptProperty as elsa_script_property };
