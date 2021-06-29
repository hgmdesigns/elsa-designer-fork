import { Component, h, Host, Method, State } from '@stencil/core';
export class ElsaConfirmDialog {
  async show(caption, message) {
    this.caption = caption;
    this.message = message;
    await this.dialog.show(true);
    return new Promise((fulfill, reject) => {
      this.fulFill = fulfill;
      this.reject = reject;
    });
  }
  async hide() {
    await this.dialog.hide(true);
  }
  async onDismissClick() {
    this.fulFill(false);
    await this.hide();
  }
  async onAcceptClick() {
    this.fulFill(true);
    this.fulFill = null;
    this.reject = null;
    await this.hide();
  }
  render() {
    return (h(Host, null,
      h("elsa-modal-dialog", { ref: el => this.dialog = el },
        h("div", { slot: "content", class: "elsa-py-8 elsa-px-4" },
          h("div", { class: "hidden sm:elsa-block elsa-absolute elsa-top-0 elsa-right-0 elsa-pt-4 elsa-pr-4" },
            h("button", { type: "button", onClick: () => this.onDismissClick(), class: "elsa-bg-white elsa-rounded-md elsa-text-gray-400 hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" },
              h("span", { class: "elsa-sr-only" }, "Close"),
              h("svg", { class: "elsa-h-6 elsa-w-6", "x-description": "Heroicon name: outline/x", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" },
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" })))),
          h("div", { class: "sm:elsa-flex sm:elsa-items-start" },
            h("div", { class: "elsa-mx-auto elsa-flex-shrink-0 elsa-flex elsa-items-center elsa-justify-center elsa-h-12 elsa-w-12 elsa-rounded-full elsa-bg-red-100 sm:elsa-mx-0 sm:elsa-h-10 sm:elsa-w-10" },
              h("svg", { class: "elsa-h-6 elsa-w-6 elsa-text-red-600", "x-description": "Heroicon name: outline/exclamation", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" },
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }))),
            h("div", { class: "elsa-mt-3 elsa-text-center sm:elsa-mt-0 sm:elsa-ml-4 sm:elsa-text-left" },
              h("h3", { class: "elsa-text-lg elsa-leading-6 elsa-font-medium elsa-text-gray-900", id: "modal-title" }, this.caption),
              h("div", { class: "elsa-mt-2" },
                h("p", { class: "elsa-text-sm elsa-text-gray-500" }, this.message))))),
        h("div", { slot: "buttons" },
          h("div", { class: "elsa-bg-gray-50 elsa-px-4 elsa-py-3 sm:elsa-px-6 sm:elsa-flex sm:elsa-flex-row-reverse" },
            h("button", { type: "button", onClick: () => this.onAcceptClick(), class: "elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-transparent elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-red-600 elsa-text-base elsa-font-medium elsa-text-white hover:elsa-bg-red-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-red-500 sm:elsa-ml-3 sm:elsa-w-auto sm:elsa-text-sm" }, "Yes"),
            h("button", { type: "button", onClick: () => this.onDismissClick(), class: "elsa-mt-3 elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-gray-300 elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-white elsa-text-base elsa-font-medium elsa-text-gray-700 hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:ring-indigo-500 sm:elsa-mt-0 sm:elsa-w-auto sm:elsa-text-sm" }, "No"))))));
  }
  static get is() { return "elsa-confirm-dialog"; }
  static get states() { return {
    "caption": {},
    "message": {}
  }; }
  static get methods() { return {
    "show": {
      "complexType": {
        "signature": "(caption: string, message: string) => Promise<boolean>",
        "parameters": [{
            "tags": [],
            "text": ""
          }, {
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "hide": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
}