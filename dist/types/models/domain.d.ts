import { Map } from '../utils/utils';
export interface WorkflowDefinition {
  id?: string;
  definitionId?: string;
  tenantId?: string;
  name?: string;
  displayName?: string;
  description?: string;
  version: number;
  variables?: Variables;
  customAttributes?: Variables;
  contextOptions?: WorkflowContextOptions;
  isSingleton?: boolean;
  persistenceBehavior?: WorkflowPersistenceBehavior;
  deleteCompletedInstances?: boolean;
  isPublished?: boolean;
  isLatest?: boolean;
  activities: Array<ActivityDefinition>;
  connections: Array<ConnectionDefinition>;
  tag?: string;
}
export interface WorkflowDefinitionSummary {
  id?: string;
  definitionId?: string;
  tenantId?: string;
  name?: string;
  displayName?: string;
  description?: string;
  version: number;
  isSingleton?: boolean;
  persistenceBehavior?: WorkflowPersistenceBehavior;
  isPublished?: boolean;
  isLatest?: boolean;
  tag?: string;
}
export interface ActivityBlueprint {
  id: string;
  name?: string;
  displayName?: string;
  description?: string;
  activityType: string;
  type: string;
  subType: string;
  event?: string;
  action?: string;
  parentId?: string;
  persistWorkflow: boolean;
  loadWorkflowContext: boolean;
  saveWorkflowContext: boolean;
  source?: string;
  properties: Variables;
  propertyStorageProviders: Map<string>;
}
export interface Connection {
  sourceActivityId: string;
  targetActivityId: string;
  outcome: string;
}
export interface CompositeActivityBlueprint extends ActivityBlueprint {
  activities: Array<ActivityBlueprint>;
  connections: Array<Connection>;
}
export interface WorkflowBlueprint extends CompositeActivityBlueprint {
  version: number;
  tenantId?: string;
  isSingleton: boolean;
  isPublished: boolean;
  isLatest: boolean;
  tag?: string;
  contextOptions?: WorkflowContextOptions;
  variables: Variables;
  customAttributes: Variables;
  persistenceBehavior: WorkflowPersistenceBehavior;
}
export interface WorkflowBlueprintSummary {
  id: string;
  name?: string;
  displayName?: string;
  description?: string;
  version: number;
  tenantId?: string;
  isSingleton: boolean;
  isPublished: boolean;
  isLatest: boolean;
  tag?: string;
}
export interface WorkflowInstance {
  id: string;
  definitionId: string;
  tenantId?: string;
  version: number;
  workflowStatus: WorkflowStatus;
  correlationId?: string;
  contextType?: string;
  contextId?: string;
  name?: string;
  createdAt?: Date;
  lastExecutedAt?: Date;
  finishedAt?: Date;
  faultedAt?: Date;
  variables: Variables;
  output?: any;
  activityData?: Map<any>;
  activityOutput?: Map<any>;
  blockingActivities: Array<BlockingActivity>;
  fault?: WorkflowFault;
  scheduledActivities: Array<ScheduledActivity>;
  scopes: Array<ActivityScope>;
  currentActivity: ScheduledActivity;
}
export interface WorkflowInstanceSummary {
  id: string;
  definitionId: string;
  tenantId?: string;
  version: number;
  workflowStatus: WorkflowStatus;
  correlationId?: string;
  contextType?: string;
  contextId?: string;
  name?: string;
  createdAt?: Date;
  lastExecutedAt?: Date;
  finishedAt?: Date;
  cancelledAt?: Date;
  faultedAt?: Date;
}
export interface ActivityDefinition {
  activityId: string;
  activityType: string;
  type: string;
  subType: string;
  event?: string;
  action?: string;
  name: string;
  displayName: string;
  description: string;
  persistWorkflow: boolean;
  loadWorkflowContext: boolean;
  saveWorkflowContext: boolean;
  properties: Array<ActivityDefinitionProperty>;
  propertyStorageProviders: Map<string>;
}
export interface WorkflowExecutionLogRecord {
  id: string;
  workflowInstanceId: string;
  activityId: string;
  activityType: string;
  timestamp: Date;
  eventName: string;
  message?: string;
  source?: string;
  data?: any;
}
export interface ConnectionDefinition {
  sourceActivityId?: string;
  targetActivityId?: string;
  outcome?: string;
}
export interface ConnectionDefinitionMapped {
  sourceId: string;
  sourceActivityId: string;
  targetId: string;
  targetActivityId: string;
  outcome: string;
}
export interface ActivityDefinitionProperty {
  name: string;
  syntax?: string;
  expressions: Map<string>;
}
interface BlockingActivity {
  activityId: string;
  activityType: string;
  tag?: string;
}
interface ScheduledActivity {
  activityId: string;
  input?: any;
}
interface ActivityScope {
  activityId: string;
  variables: Variables;
}
export interface Variables {
  data: Map<any>;
}
export interface WorkflowContextOptions {
  contextType: string;
  contextFidelity: WorkflowContextFidelity;
}
export declare enum WorkflowContextFidelity {
  Burst = "Burst",
  Activity = "Activity"
}
export declare enum WorkflowPersistenceBehavior {
  Suspended = "Suspended",
  WorkflowBurst = " WorkflowBurst",
  WorkflowPassCompleted = "WorkflowPassCompleted",
  ActivityExecuted = "ActivityExecuted"
}
export interface VersionOptions {
  isLatest?: boolean;
  isLatestOrPublished?: boolean;
  isPublished?: boolean;
  isDraft?: boolean;
  allVersions?: boolean;
  version?: number;
}
export declare enum WorkflowStatus {
  Idle = "Idle",
  Running = "Running",
  Finished = "Finished",
  Suspended = "Suspended",
  Faulted = "Faulted",
  Cancelled = "Cancelled"
}
export declare enum OrderBy {
  Started = "Started",
  LastExecuted = "LastExecuted",
  Finished = "Finished"
}
export interface SimpleException {
  type: string;
  message: string;
  stackTrace: string;
  innerException?: SimpleException;
}
export interface WorkflowFault {
  exception?: SimpleException;
  message: string;
  faultedActivityId?: string;
  activityInput?: any;
  resuming: boolean;
}
export interface ActivityDescriptor {
  activityType: string;
  type: string;
  subType: string;
  event?: string;
  action?: string;
  displayName: string;
  description?: string;
  category: string;
  traits: ActivityTraits;
  outcomes: Array<string>;
  browsable: boolean;
  inputProperties: Array<ActivityPropertyDescriptor>;
  outputProperties: Array<ActivityPropertyDescriptor>;
}
export interface ActivityPropertyDescriptor {
  name: string;
  uiHint: string;
  label?: string;
  hint?: string;
  options?: any;
  category?: string;
  defaultValue?: any;
  defaultSyntax?: string;
  supportedSyntaxes: Array<string>;
  isDisabled?: boolean;
}
export interface WorkflowStorageDescriptor {
  name: string;
  displayName?: string;
}
export interface PagedList<T> {
  items: Array<T>;
  page?: number;
  pageSize?: number;
  totalCount: number;
}
export declare enum ActivityTraits {
  Action = 1,
  Trigger = 2,
  Job = 4
}
export interface SelectListItem {
  text: string;
  value: string;
}
export interface RuntimeSelectListItemsProviderSettings {
  runtimeSelectListItemsProviderType: string;
  context?: any;
}
export declare class SyntaxNames {
  static readonly Literal = "Literal";
  static readonly JavaScript = "JavaScript";
  static readonly Liquid = "Liquid";
  static readonly Json = "Json";
  static Variable: string;
  static Output: string;
}
export declare const getVersionOptionsString: (versionOptions?: VersionOptions) => string;
export {};
