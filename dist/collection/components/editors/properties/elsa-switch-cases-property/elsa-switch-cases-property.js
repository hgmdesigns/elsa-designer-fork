import { Component, h, Prop, State } from '@stencil/core';
import { SyntaxNames } from "../../../../models";
import { mapSyntaxToLanguage, parseJson } from "../../../../utils/utils";
export class ElsaSwitchCasesProperty {
  constructor() {
    this.cases = [];
    this.supportedSyntaxes = [SyntaxNames.JavaScript, SyntaxNames.Liquid];
    this.syntaxSwitchCount = 0;
  }
  async componentWillLoad() {
    const propertyModel = this.propertyModel;
    const casesJson = propertyModel.expressions['Switch'];
    this.cases = parseJson(casesJson) || [];
  }
  updatePropertyModel() {
    this.propertyModel.expressions['Switch'] = JSON.stringify(this.cases);
    this.multiExpressionEditor.expressions[SyntaxNames.Json] = JSON.stringify(this.cases, null, 2);
  }
  onDefaultSyntaxValueChanged(e) {
    this.cases = e.detail;
  }
  onAddCaseClick() {
    const caseName = `Case ${this.cases.length + 1}`;
    const newCase = { name: caseName, syntax: SyntaxNames.JavaScript, expressions: { [SyntaxNames.JavaScript]: '' } };
    this.cases = [...this.cases, newCase];
    this.updatePropertyModel();
  }
  onDeleteCaseClick(switchCase) {
    this.cases = this.cases.filter(x => x != switchCase);
    this.updatePropertyModel();
  }
  onCaseNameChanged(e, switchCase) {
    switchCase.name = e.currentTarget.value.trim();
    this.updatePropertyModel();
  }
  onCaseExpressionChanged(e, switchCase) {
    switchCase.expressions[switchCase.syntax] = e.detail;
    this.updatePropertyModel();
  }
  onCaseSyntaxChanged(e, switchCase, expressionEditor) {
    const select = e.currentTarget;
    switchCase.syntax = select.value;
    expressionEditor.language = mapSyntaxToLanguage(switchCase.syntax);
    this.updatePropertyModel();
  }
  onMultiExpressionEditorValueChanged(e) {
    const json = e.detail;
    const parsed = parseJson(json);
    if (!parsed)
      return;
    if (!Array.isArray(parsed))
      return;
    this.propertyModel.expressions['Switch'] = json;
    this.cases = parsed;
  }
  onMultiExpressionEditorSyntaxChanged(e) {
    this.syntaxSwitchCount++;
  }
  render() {
    const cases = this.cases;
    const supportedSyntaxes = this.supportedSyntaxes;
    const json = JSON.stringify(cases, null, 2);
    const renderCaseEditor = (switchCase, index) => {
      const expression = switchCase.expressions[switchCase.syntax];
      const syntax = switchCase.syntax;
      const monacoLanguage = mapSyntaxToLanguage(syntax);
      let expressionEditor = null;
      return (h("tr", { key: `case-${index}` },
        h("td", { class: "elsa-py-2 elsa-pr-5" },
          h("input", { type: "text", value: switchCase.name, onChange: e => this.onCaseNameChanged(e, switchCase), class: "focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300" })),
        h("td", { class: "elsa-py-2 pl-5" },
          h("div", { class: "elsa-mt-1 elsa-relative elsa-rounded-md elsa-shadow-sm" },
            h("elsa-expression-editor", { key: `expression-editor-${index}-${this.syntaxSwitchCount}`, ref: el => expressionEditor = el, expression: expression, language: monacoLanguage, "single-line": true, padding: "elsa-pt-1.5 elsa-pl-1 elsa-pr-28", onExpressionChanged: e => this.onCaseExpressionChanged(e, switchCase) }),
            h("div", { class: "elsa-absolute elsa-inset-y-0 elsa-right-0 elsa-flex elsa-items-center" },
              h("select", { onChange: e => this.onCaseSyntaxChanged(e, switchCase, expressionEditor), class: "focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-h-full elsa-py-0 elsa-pl-2 elsa-pr-7 elsa-border-transparent elsa-bg-transparent elsa-text-gray-500 sm:elsa-text-sm elsa-rounded-md" }, supportedSyntaxes.map(supportedSyntax => {
                const selected = supportedSyntax == syntax;
                return h("option", { selected: selected }, supportedSyntax);
              }))))),
        h("td", { class: "elsa-pt-1 elsa-pr-2 elsa-text-right" },
          h("button", { type: "button", onClick: () => this.onDeleteCaseClick(switchCase), class: "elsa-h-5 elsa-w-5 elsa-mx-auto elsa-outline-none focus:elsa-outline-none" },
            h("svg", { class: "elsa-h-5 elsa-w-5 elsa-text-gray-500", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
              h("polyline", { points: "3 6 5 6 21 6" }),
              h("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
              h("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
              h("line", { x1: "14", y1: "11", x2: "14", y2: "17" }))))));
    };
    return (h("div", null,
      h("elsa-multi-expression-editor", { ref: el => this.multiExpressionEditor = el, label: this.propertyDescriptor.label, defaultSyntax: SyntaxNames.Json, supportedSyntaxes: [SyntaxNames.Json], expressions: { 'Json': json }, "editor-height": "20rem", onExpressionChanged: e => this.onMultiExpressionEditorValueChanged(e), onSyntaxChanged: e => this.onMultiExpressionEditorSyntaxChanged(e) },
        h("table", { class: "elsa-min-w-full elsa-divide-y elsa-divide-gray-200" },
          h("thead", { class: "elsa-bg-gray-50" },
            h("tr", null,
              h("th", { class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider elsa-w-3/12" }, "Name"),
              h("th", { class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider elsa-w-8/12" }, "Expression"),
              h("th", { class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider elsa-w-1/12" }, "\u00A0"))),
          h("tbody", null, cases.map(renderCaseEditor))),
        h("button", { type: "button", onClick: () => this.onAddCaseClick(), class: "elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-transparent elsa-shadow-sm elsa-text-sm elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-blue-600 hover:elsa-bg-blue-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 elsa-mt-2" },
          h("svg", { class: "-elsa-ml-1 elsa-mr-2 elsa-h-5 elsa-w-5", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
            h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
            h("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
            h("line", { x1: "5", y1: "12", x2: "19", y2: "12" })),
          "Add Case"))));
  }
  static get is() { return "elsa-switch-cases-property"; }
  static get properties() { return {
    "propertyDescriptor": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ActivityPropertyDescriptor",
        "resolved": "ActivityPropertyDescriptor",
        "references": {
          "ActivityPropertyDescriptor": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "propertyModel": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ActivityDefinitionProperty",
        "resolved": "ActivityDefinitionProperty",
        "references": {
          "ActivityDefinitionProperty": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    }
  }; }
  static get states() { return {
    "cases": {}
  }; }
}
