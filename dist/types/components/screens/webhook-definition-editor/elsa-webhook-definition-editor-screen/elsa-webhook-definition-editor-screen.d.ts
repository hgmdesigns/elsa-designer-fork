import { WebhookDefinition } from "../../../../models/webhook";
import { RouterHistory } from '@stencil/router';
import { FormContext } from "../../../../utils/forms";
export declare class ElsaWebhookDefinitionEditorScreen {
  webhookDefinition: WebhookDefinition;
  webhookId: string;
  serverUrl: string;
  history?: RouterHistory;
  webhookDefinitionInternal: WebhookDefinition;
  saving: boolean;
  saved: boolean;
  networkError: string;
  formContext: FormContext;
  el: HTMLElement;
  getServerUrl(): Promise<string>;
  getWebhookId(): Promise<string>;
  webhookDefinitionChangedHandler(newValue: WebhookDefinition): Promise<void>;
  webhookIdChangedHandler(newValue: string): Promise<void>;
  serverUrlChangedHandler(newValue: string): Promise<void>;
  componentWillLoad(): Promise<void>;
  saveWebhook(): Promise<void>;
  updateWebhookDefinition(value: WebhookDefinition): void;
  sleep(ms: any): Promise<unknown>;
  onSaveClicked(e: Event): Promise<void>;
  render(): any;
  renderWebhookFields(): any;
  renderCanvas(): any;
  renderSavingIndicator(): any;
  renderNetworkError(): any;
  private static createWebhookDefinition;
}