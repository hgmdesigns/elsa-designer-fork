'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioWebhookDefinitionsEdit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    let id = this.match.params.id;
    if (!!id && id.toLowerCase() == 'new')
      id = null;
    this.id = id;
  }
  render() {
    const id = this.id;
    return (index.h("div", null, index.h("elsa-webhook-definition-editor-screen", { history: this.history, "server-url": this.serverUrl, "webhook-definition-id": id })));
  }
};

exports.elsa_studio_webhook_definitions_edit = ElsaStudioWebhookDefinitionsEdit;
