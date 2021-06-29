'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const eventBus = require('./event-bus-468c034a.js');
const events = require('./events-ac7f3da4.js');
require('./_commonjsHelpers-206db00d.js');

const ElsaWebhookEditorNotifications = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onWebhookSaved = async (webhookDefinition) => await this.toastNotificationElement.show({
      autoCloseIn: 1500,
      title: 'Webhook Saved',
      message: `Webhook successfully saved with name ${webhookDefinition.name}.`
    });
  }
  connectedCallback() {
    eventBus.eventBus.on(events.EventTypes.WebhookSaved, this.onWebhookSaved);
  }
  disconnectedCallback() {
    eventBus.eventBus.off(events.EventTypes.WebhookSaved, this.onWebhookSaved);
  }
  render() {
    return (index.h(index.Host, { class: "elsa-block" }, index.h("elsa-toast-notification", { ref: el => this.toastNotificationElement = el })));
  }
};

exports.elsa_webhook_definition_editor_notifications = ElsaWebhookEditorNotifications;
