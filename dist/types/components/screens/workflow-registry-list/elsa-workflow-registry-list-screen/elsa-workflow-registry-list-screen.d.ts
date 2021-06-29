import { PagedList, WorkflowBlueprintSummary } from "../../../../models";
import { RouterHistory } from "@stencil/router";
export declare class ElsaWorkflowRegistryListScreen {
  history?: RouterHistory;
  serverUrl: string;
  workflowBlueprints: PagedList<WorkflowBlueprintSummary>;
  componentWillLoad(): Promise<void>;
  loadWorkflowBlueprints(): Promise<void>;
  createClient(): import("../../../../services/elsa-client").ElsaClient;
  render(): any;
}
