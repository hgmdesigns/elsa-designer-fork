import { EventEmitter } from '../../../../stencil-public-runtime';
import { ActivityDescriptor, PagedList, WorkflowBlueprint, WorkflowExecutionLogRecord, WorkflowModel } from "../../../../models";
interface Tab {
  id: string;
  text: string;
  view: () => any;
}
export declare class ElsaWorkflowInstanceJournal {
  constructor();
  workflowInstanceId: string;
  serverUrl: string;
  activityDescriptors: Array<ActivityDescriptor>;
  workflowBlueprint: WorkflowBlueprint;
  workflowModel: WorkflowModel;
  recordSelected: EventEmitter<WorkflowExecutionLogRecord>;
  isVisible: boolean;
  records: PagedList<WorkflowExecutionLogRecord>;
  filteredRecords: Array<WorkflowExecutionLogRecord>;
  selectedRecordId?: string;
  selectedActivityId?: string;
  selectedTabId: string;
  el: HTMLElement;
  tabs: Array<Tab>;
  show(): Promise<void>;
  hide(): Promise<void>;
  selectActivityRecord(activityId?: string): Promise<void>;
  workflowInstanceIdChangedHandler(newValue: string): Promise<void>;
  componentWillLoad(): Promise<void>;
  filterRecords(): void;
  selectActivityRecordInternal(record?: WorkflowExecutionLogRecord): void;
  getEventColor(eventName: string): any;
  onCloseClick(): void;
  onShowClick(): void;
  onRecordClick(record: WorkflowExecutionLogRecord): void;
  onTabClick(e: Event, tab: Tab): void;
  render(): any;
  renderJournalButton(): any;
  renderPanel(): any;
  renderJournalTab: () => any;
  renderActivityStateTab: () => any;
}
export {};
