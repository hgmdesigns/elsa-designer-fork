import { ActivityDefinition, ActivityDescriptor, ConnectionDefinition, OrderBy, PagedList, SelectListItem, Variables, VersionOptions, WorkflowBlueprint, WorkflowBlueprintSummary, WorkflowContextOptions, WorkflowDefinition, WorkflowDefinitionSummary, WorkflowExecutionLogRecord, WorkflowInstance, WorkflowInstanceSummary, WorkflowPersistenceBehavior, WorkflowStatus, WorkflowStorageDescriptor } from "../models";
import { WebhookDefinition, WebhookDefinitionSummary } from "../models/webhook";
export declare const createElsaClient: (serverUrl: string) => ElsaClient;
export interface ElsaClient {
  activitiesApi: ActivitiesApi;
  workflowDefinitionsApi: WorkflowDefinitionsApi;
  workflowRegistryApi: WorkflowRegistryApi;
  workflowInstancesApi: WorkflowInstancesApi;
  workflowExecutionLogApi: WorkflowExecutionLogApi;
  scriptingApi: ScriptingApi;
  designerApi: DesignerApi;
  activityStatsApi: ActivityStatsApi;
  workflowStorageProvidersApi: WorkflowStorageProvidersApi;
  webhookDefinitionsApi: WebhookDefinitionsApi;
}
export interface ActivitiesApi {
  list(workflowDefinitionId: string): Promise<Array<ActivityDescriptor>>;
}
export interface WorkflowDefinitionsApi {
  list(page?: number, pageSize?: number, versionOptions?: VersionOptions): Promise<PagedList<WorkflowDefinitionSummary>>;
  getByDefinitionAndVersion(definitionId: string, versionOptions: VersionOptions): Promise<WorkflowDefinition>;
  save(request: SaveWorkflowDefinitionRequest): Promise<WorkflowDefinition>;
  delete(definitionId: string): Promise<void>;
  retract(workflowDefinitionId: string): Promise<WorkflowDefinition>;
  export(workflowDefinitionId: string, versionOptions: VersionOptions): Promise<ExportWorkflowResponse>;
  import(workflowDefinitionId: string, file: File): Promise<WorkflowDefinition>;
}
export interface WebhookDefinitionsApi {
  list(page?: number, pageSize?: number): Promise<PagedList<WebhookDefinitionSummary>>;
  getByWebhookId(webhookId: string): Promise<WebhookDefinition>;
  save(request: SaveWebhookDefinitionRequest): Promise<WebhookDefinition>;
  update(request: SaveWebhookDefinitionRequest): Promise<WebhookDefinition>;
  delete(webhookId: string): Promise<void>;
}
export interface WorkflowRegistryApi {
  list(page?: number, pageSize?: number, versionOptions?: VersionOptions): Promise<PagedList<WorkflowBlueprintSummary>>;
  get(id: string, versionOptions: VersionOptions): Promise<WorkflowBlueprint>;
}
export interface WorkflowInstancesApi {
  list(page?: number, pageSize?: number, workflowDefinitionId?: string, workflowStatus?: WorkflowStatus, orderBy?: OrderBy, searchTerm?: string): Promise<PagedList<WorkflowInstanceSummary>>;
  get(id: string): Promise<WorkflowInstance>;
  delete(id: string): Promise<void>;
  bulkDelete(request: BulkDeleteWorkflowsRequest): Promise<BulkDeleteWorkflowsResponse>;
}
export interface WorkflowExecutionLogApi {
  get(workflowInstanceId: string, page?: number, pageSize?: number): Promise<PagedList<WorkflowExecutionLogRecord>>;
}
export interface BulkDeleteWorkflowsRequest {
  workflowInstanceIds: Array<string>;
}
export interface BulkDeleteWorkflowsResponse {
  deletedWorkflowCount: number;
}
export interface ScriptingApi {
  getJavaScriptTypeDefinitions(workflowDefinitionId: string, context?: string): Promise<string>;
}
export interface DesignerApi {
  runtimeSelectItemsApi: RuntimeSelectItemsApi;
}
export interface RuntimeSelectItemsApi {
  get(providerTypeName: string, context?: any): Promise<Array<SelectListItem>>;
}
export interface ActivityStatsApi {
  get(workflowInstanceId: string, activityId: string): Promise<ActivityStats>;
}
export interface WorkflowStorageProvidersApi {
  list(): Promise<Array<WorkflowStorageDescriptor>>;
}
export interface SaveWorkflowDefinitionRequest {
  workflowDefinitionId?: string;
  name?: string;
  displayName?: string;
  description?: string;
  tag?: string;
  variables?: Variables;
  contextOptions?: WorkflowContextOptions;
  isSingleton?: boolean;
  persistenceBehavior?: WorkflowPersistenceBehavior;
  deleteCompletedInstances?: boolean;
  publish?: boolean;
  activities: Array<ActivityDefinition>;
  connections: Array<ConnectionDefinition>;
}
export interface SaveWebhookDefinitionRequest {
  id?: string;
  name?: string;
  path?: string;
  description?: string;
  payloadTypeName?: string;
  isEnabled?: boolean;
}
export interface ExportWorkflowResponse {
  fileName: string;
  data: Blob;
}
export interface ActivityStats {
  fault?: ActivityFault;
  averageExecutionTime: string;
  fastestExecutionTime: string;
  slowestExecutionTime: string;
  lastExecutedAt: Date;
  eventCounts: Array<ActivityEventCount>;
}
interface ActivityEventCount {
  eventName: string;
  count: number;
}
interface ActivityFault {
  message: string;
}
export {};
