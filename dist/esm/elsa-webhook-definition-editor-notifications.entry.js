import { r as registerInstance, h, H as Host } from './index-efd13af9.js';
import { e as eventBus } from './event-bus-4cad9569.js';
import { E as EventTypes } from './events-9ad27556.js';
import './_commonjsHelpers-63c253cd.js';

const ElsaWebhookEditorNotifications = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onWebhookSaved = async (webhookDefinition) => await this.toastNotificationElement.show({
      autoCloseIn: 1500,
      title: 'Webhook Saved',
      message: `Webhook successfully saved with name ${webhookDefinition.name}.`
    });
  }
  connectedCallback() {
    eventBus.on(EventTypes.WebhookSaved, this.onWebhookSaved);
  }
  disconnectedCallback() {
    eventBus.off(EventTypes.WebhookSaved, this.onWebhookSaved);
  }
  render() {
    return (h(Host, { class: "elsa-block" }, h("elsa-toast-notification", { ref: el => this.toastNotificationElement = el })));
  }
};

export { ElsaWebhookEditorNotifications as elsa_webhook_definition_editor_notifications };
