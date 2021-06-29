import { PagedList, WorkflowDefinitionSummary } from "../../../../models";
import { RouterHistory } from "@stencil/router";
export declare class ElsaWorkflowDefinitionsListScreen {
  history?: RouterHistory;
  serverUrl: string;
  workflowDefinitions: PagedList<WorkflowDefinitionSummary>;
  confirmDialog: HTMLElsaConfirmDialogElement;
  componentWillLoad(): Promise<void>;
  onDeleteClick(e: Event, workflowDefinition: WorkflowDefinitionSummary): Promise<void>;
  loadWorkflowDefinitions(): Promise<void>;
  createClient(): import("../../../../services/elsa-client").ElsaClient;
  render(): any;
}
