'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioWebhookDefinitionsList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", null, index.h("div", { class: "elsa-border-b elsa-border-gray-200 elsa-px-4 elsa-py-4 sm:elsa-flex sm:elsa-items-center sm:elsa-justify-between sm:elsa-px-6 lg:elsa-px-8 elsa-bg-white" }, index.h("div", { class: "elsa-flex-1 elsa-min-w-0" }, index.h("h1", { class: "elsa-text-lg elsa-font-medium elsa-leading-6 elsa-text-gray-900 sm:elsa-truncate" }, "Webhook Definitions")), index.h("div", { class: "elsa-mt-4 elsa-flex sm:elsa-mt-0 sm:elsa-ml-4" }, index.h("stencil-route-link", { url: "/webhook-definitions/new", class: "elsa-order-0 elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-transparent elsa-shadow-sm elsa-text-sm elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-blue-600 hover:elsa-bg-blue-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 sm:elsa-order-1 sm:elsa-ml-3" }, "Create Webhook"))), index.h("elsa-webhook-definitions-list-screen", { history: this.history, serverUrl: this.serverUrl })));
  }
};

exports.elsa_studio_webhook_definitions_list = ElsaStudioWebhookDefinitionsList;
