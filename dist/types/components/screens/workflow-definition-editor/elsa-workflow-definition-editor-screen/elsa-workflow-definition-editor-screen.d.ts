import { EventEmitter } from '../../../../stencil-public-runtime';
import { ActivityDefinition, ActivityModel, ConnectionDefinition, ConnectionModel, WorkflowDefinition, WorkflowModel } from "../../../../models";
import { ActivityContextMenuState } from "../../../designers/tree/elsa-designer-tree/models";
export declare class ElsaWorkflowDefinitionEditorScreen {
  constructor();
  workflowSaved: EventEmitter<WorkflowDefinition>;
  workflowDefinitionId: string;
  serverUrl: string;
  monacoLibPath: string;
  workflowDefinition: WorkflowDefinition;
  workflowModel: WorkflowModel;
  publishing: boolean;
  unPublishing: boolean;
  unPublished: boolean;
  saving: boolean;
  saved: boolean;
  importing: boolean;
  imported: boolean;
  networkError: string;
  activityContextMenuState: ActivityContextMenuState;
  el: HTMLElement;
  designer: HTMLElsaDesignerTreeElement;
  getServerUrl(): Promise<string>;
  getWorkflowDefinitionId(): Promise<string>;
  exportWorkflow(): Promise<void>;
  importWorkflow(file: File): Promise<void>;
  workflowDefinitionIdChangedHandler(newValue: string): Promise<void>;
  serverUrlChangedHandler(newValue: string): Promise<void>;
  monacoLibPathChangedHandler(newValue: string): Promise<void>;
  workflowChangedHandler(event: CustomEvent<WorkflowModel>): Promise<void>;
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  loadActivityDescriptors(): Promise<void>;
  loadWorkflowStorageDescriptors(): Promise<void>;
  updateWorkflowDefinition(value: WorkflowDefinition): void;
  publishWorkflow(): Promise<void>;
  unPublishWorkflow(): Promise<void>;
  saveWorkflow(publish?: boolean): Promise<void>;
  saveWorkflowInternal(workflowModel?: WorkflowModel, publish?: boolean): Promise<void>;
  unpublishWorkflow(): Promise<void>;
  mapWorkflowModel(workflowDefinition: WorkflowDefinition): WorkflowModel;
  mapActivityModel(source: ActivityDefinition): ActivityModel;
  mapConnectionModel(source: ConnectionDefinition): ConnectionModel;
  handleContextMenuChange(state: ActivityContextMenuState): void;
  onShowWorkflowSettingsClick(): void;
  private onUpdateWorkflowSettings;
  onPublishClicked(): Promise<void>;
  onUnPublishClicked(): Promise<void>;
  onExportClicked(): Promise<void>;
  onImportClicked(file: File): Promise<void>;
  onDeleteActivityClick(e: Event): Promise<void>;
  onEditActivityClick(e: Event): Promise<void>;
  onActivityContextMenuButtonClicked(e: CustomEvent<ActivityContextMenuState>): void;
  render(): any;
  renderCanvas(): any;
  renderActivityContextMenu(): any;
  renderActivityPicker(): any;
  renderActivityEditor(): any;
  renderWorkflowSettingsButton(): any;
  renderWorkflowSettingsModal(): void;
  renderSavingIndicator(): any;
  renderNetworkError(): any;
  renderPublishButton(): any;
  private static createWorkflowDefinition;
}
