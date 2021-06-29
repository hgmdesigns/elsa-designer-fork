import { ActivityDescriptor, ActivityModel, ActivityPropertyDescriptor, WorkflowStorageDescriptor } from "../../../../models";
import { FormContext } from "../../../../utils/forms";
export declare class ElsaActivityEditorModal {
  workflowStorageDescriptors: Array<WorkflowStorageDescriptor>;
  activityModel: ActivityModel;
  activityDescriptor: ActivityDescriptor;
  selectedTab: string;
  dialog: HTMLElsaModalDialogElement;
  form: HTMLFormElement;
  formContext: FormContext;
  renderProps: any;
  timestamp: Date;
  componentDidLoad(): void;
  updateActivity(formData: FormData): void;
  onCancelClick(): Promise<void>;
  onSubmit(e: Event): Promise<void>;
  onTabClick(e: Event, tab: string): void;
  componentWillRender(): void;
  render(): any;
  renderSelectedTab(activityModel: ActivityModel, activityDescriptor: ActivityDescriptor, categories: Array<string>): any[];
  renderStorageTab(activityModel: ActivityModel, activityDescriptor: ActivityDescriptor): any;
  renderCommonTab(activityModel: ActivityModel): any;
  renderPropertiesTab(activityModel: ActivityModel, activityDescriptor: ActivityDescriptor): any;
  renderCategoryTabs(activityModel: ActivityModel, activityDescriptor: ActivityDescriptor, categories: Array<string>): any[];
  renderPropertyEditor(activity: ActivityModel, property: ActivityPropertyDescriptor): any;
  getHiddenClass(tab: string): "" | "hidden";
}
