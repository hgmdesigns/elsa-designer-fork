import { Component, h, Prop, State } from '@stencil/core';
import { SyntaxNames } from "../../../../models";
import { parseJson } from "../../../../utils/utils";
import { getSelectListItems } from "../../../../utils/select-list-items";
import Tunnel from "../../../../data/workflow-editor";
export class ElsaCheckListProperty {
  async componentWillLoad() {
    if (this.propertyModel.expressions[SyntaxNames.Json] == undefined)
      this.propertyModel.expressions[SyntaxNames.Json] = JSON.stringify(this.propertyDescriptor.defaultValue);
    this.currentValue = this.propertyModel.expressions[SyntaxNames.Json] || '[]';
  }
  onCheckChanged(e) {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const value = checkbox.value;
    let newValue = parseJson(this.currentValue);
    if (checked)
      newValue = [...newValue, value].distinct();
    else
      newValue = newValue.filter(x => x !== value);
    this.currentValue = JSON.stringify(newValue);
    this.propertyModel.expressions[SyntaxNames.Json] = this.currentValue;
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
    const values = parseJson(this.currentValue) || [];
    return (h("elsa-property-editor", { propertyDescriptor: propertyDescriptor, propertyModel: propertyModel, onDefaultSyntaxValueChanged: e => this.onDefaultSyntaxValueChanged(e), "single-line": true },
      h("div", { class: "elsa-max-w-lg elsa-space-y-3 elsa-my-4" }, items.map((item, index) => {
        const inputId = `${fieldId}_${index}`;
        const optionIsString = typeof (item) == 'string';
        const value = optionIsString ? item : item.value;
        const text = optionIsString ? item : item.text;
        const isSelected = values.findIndex(x => x == value) >= 0;
        return (h("div", { class: "elsa-relative elsa-flex elsa-items-start" },
          h("div", { class: "elsa-flex elsa-items-center elsa-h-5" },
            h("input", { id: inputId, type: "checkbox", checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:elsa-ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300 elsa-rounded" })),
          h("div", { class: "elsa-ml-3 elsa-mt-1 elsa-text-sm" },
            h("label", { htmlFor: inputId, class: "elsa-font-medium elsa-text-gray-700" }, text))));
      }))));
  }
  static get is() { return "elsa-check-list-property"; }
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
    },
    "serverUrl": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "server-url",
      "reflect": false
    }
  }; }
  static get states() { return {
    "currentValue": {}
  }; }
}
Tunnel.injectProps(ElsaCheckListProperty, ['serverUrl']);
