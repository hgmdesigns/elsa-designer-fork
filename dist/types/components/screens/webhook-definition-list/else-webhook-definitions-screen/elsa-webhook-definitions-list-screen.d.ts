import { PagedList } from "../../../../models";
import { WebhookDefinitionSummary } from "../../../../models/webhook";
import { RouterHistory } from "@stencil/router";
export declare class ElsaWebhookDefinitionsListScreen {
  history?: RouterHistory;
  serverUrl: string;
  webhookDefinitions: PagedList<WebhookDefinitionSummary>;
  confirmDialog: HTMLElsaConfirmDialogElement;
  componentWillLoad(): Promise<void>;
  onDeleteClick(e: Event, webhookDefinition: WebhookDefinitionSummary): Promise<void>;
  loadWebhookDefinitions(): Promise<void>;
  createClient(): import("../../../../services/elsa-client").ElsaClient;
  render(): any;
}
