import { WorkflowDefinition } from "../../../../models";
export declare class ElsaWorkflowEditorNotifications {
  toastNotificationElement: HTMLElsaToastNotificationElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  onWorkflowPublished: (workflowDefinition: WorkflowDefinition) => Promise<void>;
  onWorkflowRetracted: (workflowDefinition: WorkflowDefinition) => Promise<void>;
  onWorkflowImported: (workflowDefinition: WorkflowDefinition) => Promise<void>;
  render(): any;
}
