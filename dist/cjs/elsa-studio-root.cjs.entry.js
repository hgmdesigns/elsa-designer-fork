'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioRoot = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const serverUrl = this.serverUrl;
    const monacoLibPath = this.monacoLibPath;
    const logoPath = index.getAssetPath('./assets/logo.png');
    // TODO: Tunneling doesn't appear to be working in combination with the router.
    // const tunnelState: DashboardState = {
    //   serverUrl: serverUrl,
    // };
    return (index.h("div", { class: "elsa-h-screen elsa-bg-gray-100" }, index.h("nav", { class: "elsa-bg-gray-800" }, index.h("div", { class: "elsa-px-4 sm:elsa-px-6 lg:elsa-px-8" }, index.h("div", { class: "elsa-flex elsa-items-center elsa-justify-between elsa-h-16" }, index.h("div", { class: "elsa-flex elsa-items-center" }, index.h("div", { class: "elsa-flex-shrink-0" }, index.h("img", { class: "elsa-h-8 elsa-w-8", src: logoPath, alt: "Workflow" })), index.h("div", { class: "hidden md:elsa-block" }, index.h("div", { class: "elsa-ml-10 elsa-flex elsa-items-baseline elsa-space-x-4" }, index.h("stencil-route-link", { url: "/workflow-definitions", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Definitions"), index.h("stencil-route-link", { url: "/workflow-instances", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Instances"), index.h("stencil-route-link", { url: "/workflow-registry", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Workflow Registry"), index.h("stencil-route-link", { url: "/webhook-definitions", anchorClass: "elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium", activeClass: "elsa-text-white elsa-bg-gray-900" }, "Webhook Definitions"))))))), index.h("main", null, index.h("stencil-router", null, index.h("stencil-route-switch", { scrollTopOffset: 0 }, index.h("stencil-route", { url: "/", component: "elsa-studio-home", exact: true }), index.h("stencil-route", { url: "/workflow-registry", component: "elsa-studio-workflow-registry", componentProps: { 'serverUrl': serverUrl }, exact: true }), index.h("stencil-route", { url: "/workflow-registry/:id", component: "elsa-studio-workflow-blueprint-view", componentProps: { 'serverUrl': serverUrl } }), index.h("stencil-route", { url: "/workflow-definitions", component: "elsa-studio-workflow-definitions-list", componentProps: { 'serverUrl': serverUrl }, exact: true }), index.h("stencil-route", { url: "/workflow-definitions/:id", component: "elsa-studio-workflow-definitions-edit", componentProps: { 'serverUrl': serverUrl, 'monacoLibPath': monacoLibPath } }), index.h("stencil-route", { url: "/workflow-instances", component: "elsa-studio-workflow-instances-list", componentProps: { 'serverUrl': serverUrl }, exact: true }), index.h("stencil-route", { url: "/workflow-instances/:id", component: "elsa-studio-workflow-instances-view", componentProps: { 'serverUrl': serverUrl } }), index.h("stencil-route", { url: "/webhook-definitions", component: "elsa-studio-webhook-definitions-list", componentProps: { 'serverUrl': serverUrl }, exact: true }), index.h("stencil-route", { url: "/webhook-definitions/:id", component: "elsa-studio-webhook-definitions-edit", componentProps: { 'serverUrl': serverUrl } }))))));
  }
  static get assetsDirs() { return ["assets"]; }
};

exports.elsa_studio_root = ElsaStudioRoot;
