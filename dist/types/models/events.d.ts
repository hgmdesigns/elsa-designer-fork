import { ActivityModel } from "./view";
import { ActivityDescriptor } from "./domain";
export declare const EventTypes: {
  ShowActivityPicker: string;
  ShowWorkflowSettings: string;
  ActivityPicked: string;
  ShowActivityEditor: string;
  UpdateActivity: string;
  UpdateWorkflowSettings: string;
  WorkflowModelChanged: string;
  ActivityDesignDisplaying: string;
  ActivityDescriptorDisplaying: string;
  WorkflowPublished: string;
  WorkflowRetracted: string;
  WorkflowImported: string;
};
export interface AddActivityEventArgs {
  sourceActivityId?: string;
}
export interface ActivityPickedEventArgs {
  activityType: string;
}
export interface ActivityDesignDisplayContext {
  activityModel: ActivityModel;
  activityIcon: any;
  displayName?: string;
  bodyDisplay: string;
  outcomes: Array<string>;
}
export interface ActivityDescriptorDisplayContext {
  activityDescriptor: ActivityDescriptor;
  activityIcon: any;
}
