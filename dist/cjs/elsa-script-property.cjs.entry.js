'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const elsaClient = require('./elsa-client-90ac335e.js');
const workflowEditor = require('./workflow-editor-fdda4c4b.js');
require('./collection-542fafac.js');
require('./_commonjsHelpers-206db00d.js');
require('./domain-ec2ef82c.js');
require('./state-tunnel-786a62ce.js');

const ElsaScriptProperty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editorHeight = '6em';
    this.singleLineMode = false;
  }
  async componentWillLoad() {
    this.currentValue = this.propertyModel.expressions['Literal'];
  }
  async componentDidLoad() {
    const elsaClient$1 = elsaClient.createElsaClient(this.serverUrl);
    const libSource = await elsaClient$1.scriptingApi.getJavaScriptTypeDefinitions(this.workflowDefinitionId, this.context);
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
    return index.h("div", null, index.h("div", { class: "elsa-flex" }, index.h("div", { class: "" }, index.h("label", { htmlFor: fieldId, class: "elsa-block elsa-text-sm elsa-font-medium elsa-text-gray-700" }, fieldLabel)), index.h("div", { class: "elsa-flex-1" }, index.h("div", null, index.h("div", { class: "hidden sm:elsa-block" }, index.h("nav", { class: "elsa-flex elsa-flex-row-reverse", "aria-label": "Tabs" }, index.h("span", { class: "elsa-bg-blue-100 elsa-text-blue-700 elsa-px-3 elsa-py-2 elsa-font-medium elsa-text-sm elsa-rounded-md" }, syntax)))))), index.h("div", { class: "elsa-mt-1" }, index.h("elsa-monaco", { value: value, language: monacoLanguage, "editor-height": this.editorHeight, "single-line": this.singleLineMode, onValueChanged: e => this.onMonacoValueChanged(e.detail), ref: el => this.monacoEditor = el })), fieldHint ? index.h("p", { class: "elsa-mt-2 elsa-text-sm elsa-text-gray-500" }, fieldHint) : undefined, index.h("input", { type: "hidden", name: fieldName, value: value }));
  }
};
workflowEditor.Tunnel.injectProps(ElsaScriptProperty, ['serverUrl', 'workflowDefinitionId']);

exports.elsa_script_property = ElsaScriptProperty;
