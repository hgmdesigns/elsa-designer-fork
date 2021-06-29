import { Component, h, Prop, Event, State, Watch } from '@stencil/core';
export class ElsaInputTags {
  constructor() {
    this.placeHolder = 'Add tag';
    this.values = [];
    this.currentValues = [];
  }
  valuesChangedHandler(newValue) {
    this.currentValues = newValue || [];
  }
  componentWillLoad() {
    this.currentValues = this.values;
  }
  async addItem(item) {
    const values = [...this.currentValues];
    values.push(item);
    this.currentValues = values.distinct();
    await this.valueChanged.emit(values);
  }
  async onInputKeyDown(e) {
    if (e.key != "Enter")
      return;
    e.preventDefault();
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onInputBlur(e) {
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onDeleteTagClick(e, tag) {
    e.preventDefault();
    this.currentValues = this.currentValues.filter(x => x !== tag);
    await this.valueChanged.emit(this.currentValues);
  }
  render() {
    let values = this.currentValues || [];
    if (!Array.isArray(values))
      values = [];
    const valuesJson = JSON.stringify(values);
    return (h("div", { class: "elsa-py-2 elsa-px-3 elsa-bg-white elsa-shadow-sm elsa-border elsa-border-gray-300 elsa-rounded-md" },
      values.map(value => (h("a", { href: "#", onClick: e => this.onDeleteTagClick(e, value), class: "elsa-inline-block elsa-text-xs elsa-bg-blue-400 elsa-text-white elsa-py-2 elsa-px-3 elsa-mr-1 elsa-mb-1 elsa-rounded" },
        h("span", null, value),
        h("span", { class: "elsa-text-white hover:elsa-text-white elsa-ml-1" }, "\u00D7")))),
      h("input", { type: "text", id: this.fieldId, onKeyDown: e => this.onInputKeyDown(e), onBlur: e => this.onInputBlur(e), class: "elsa-tag-input elsa-inline-block elsa-text-sm elsa-outline-none focus:elsa-outline-none elsa-border-none shadow:none focus:elsa-border-none focus:elsa-border-transparent focus:shadow-none", placeholder: this.placeHolder }),
      h("input", { type: "hidden", name: this.fieldName, value: valuesJson })));
  }
  static get is() { return "elsa-input-tags"; }
  static get originalStyleUrls() { return {
    "$": ["elsa-input-tags.css"]
  }; }
  static get styleUrls() { return {
    "$": ["elsa-input-tags.css"]
  }; }
  static get properties() { return {
    "fieldName": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "field-name",
      "reflect": false
    },
    "fieldId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "field-id",
      "reflect": false
    },
    "placeHolder": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "place-holder",
      "reflect": false,
      "defaultValue": "'Add tag'"
    },
    "values": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Array<string>",
        "resolved": "string[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    }
  }; }
  static get states() { return {
    "currentValues": {}
  }; }
  static get events() { return [{
      "method": "valueChanged",
      "name": "valueChanged",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "Array<string>",
        "resolved": "string[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      }
    }]; }
  static get watchers() { return [{
      "propName": "values",
      "methodName": "valuesChangedHandler"
    }]; }
}
