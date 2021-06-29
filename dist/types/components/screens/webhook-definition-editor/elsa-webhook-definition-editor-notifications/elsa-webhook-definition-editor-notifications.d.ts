import { WebhookDefinition } from "../../../../models/webhook";
export declare class ElsaWebhookEditorNotifications {
  toastNotificationElement: HTMLElsaToastNotificationElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  onWebhookSaved: (webhookDefinition: WebhookDefinition) => Promise<void>;
  render(): any;
}
