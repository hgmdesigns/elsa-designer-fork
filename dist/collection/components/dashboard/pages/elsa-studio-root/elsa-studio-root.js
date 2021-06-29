import { Component, h, Prop, getAssetPath } from '@stencil/core';
export class ElsaStudioRoot {
  render() {
    const serverUrl = this.serverUrl;
    const monacoLibPath = this.monacoLibPath;
    const logoPath = getAssetPath('./assets/logo.png');
    // TODO: Tunneling doesn't appear to be working in combination with the router.
    // const tunnelState: DashboardState = {
    //   serverUrl: serverUrl,
    // };
    return (h("div", { class: "elsa-h-screen elsa-bg-gray-100" },
      h("nav", { class: "elsa-bg-gray-800" },
        h("div", { class: "elsa-px-4 sm:elsa-px-6 lg:elsa-px-8" },
          h("div", { class: "elsa-flex elsa-items-center elsa-justify-between elsa-h-16" },
            h("div", { class: "elsa-flex elsa-items-center" },
              h("div", { class: "elsa-flex-shrink-0" },
                h("img", { class: "elsa-h-8 elsa-w-8", src: logoPath, alt: "Workflow" })),
              h("div", { class: "hidden md:elsa-block" },
                h("div", { class: "elsa-ml-10 elsa-flex elsa-items-baseline elsa-space-x-4" },
                  h("stencil-route-link", { url: "/workflow-definitions", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Definitions"),
                  h("stencil-route-link", { url: "/workflow-instances", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Instances"),
                  h("stencil-route-link", { url: "/workflow-registry", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Registry"),
                  h("stencil-route-link", { url: "/webhook-definitions", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Webhook Definitions"))))))),
      h("main", null,
        h("stencil-router", null,
          h("stencil-route-switch", { scrollTopOffset: 0 },
            h("stencil-route", { url: "/", component: "elsa-studio-home", exact: true }),
            h("stencil-route", { url: "/workflow-registry", component: "elsa-studio-workflow-registry", componentProps: { 'serverUrl': serverUrl }, exact: true }),
            h("stencil-route", { url: "/workflow-registry/:id", component: "elsa-studio-workflow-blueprint-view", componentProps: { 'serverUrl': serverUrl } }),
            h("stencil-route", { url: "/workflow-definitions", component: "elsa-studio-workflow-definitions-list", componentProps: { 'serverUrl': serverUrl }, exact: true }),
            h("stencil-route", { url: "/workflow-definitions/:id", component: "elsa-studio-workflow-definitions-edit", componentProps: { 'serverUrl': serverUrl, 'monacoLibPath': monacoLibPath } }),
            h("stencil-route", { url: "/workflow-instances", component: "elsa-studio-workflow-instances-list", componentProps: { 'serverUrl': serverUrl }, exact: true }),
            h("stencil-route", { url: "/workflow-instances/:id", component: "elsa-studio-workflow-instances-view", componentProps: { 'serverUrl': serverUrl } }),
            h("stencil-route", { url: "/webhook-definitions", component: "elsa-studio-webhook-definitions-list", componentProps: { 'serverUrl': serverUrl }, exact: true }),
            h("stencil-route", { url: "/webhook-definitions/:id", component: "elsa-studio-webhook-definitions-edit", componentProps: { 'serverUrl': serverUrl } }))))));
  }
  static get is() { return "elsa-studio-root"; }
  static get assetsDirs() { return ["assets"]; }
  static get properties() { return {
    "serverUrl": {
      "type": "string",
      "mutable": false,
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
      "reflect": true
    },
    "monacoLibPath": {
      "type": "string",
      "mutable": false,
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
      "attribute": "monaco-lib-path",
      "reflect": true
    }
  }; }
}
