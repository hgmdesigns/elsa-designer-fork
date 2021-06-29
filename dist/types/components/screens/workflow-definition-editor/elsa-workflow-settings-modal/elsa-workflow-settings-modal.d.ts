import { WorkflowDefinition } from "../../../../models";
import { MonacoValueChangedArgs } from "../../../controls/elsa-monaco/elsa-monaco";
import { FormContext } from "../../../../utils/forms";
interface VariableDefinition {
  name?: string;
  value?: string;
}
export declare class ElsaWorkflowDefinitionSettingsModal {
  workflowDefinition: WorkflowDefinition;
  workflowDefinitionInternal: WorkflowDefinition;
  selectedTab: string;
  newVariable: VariableDefinition;
  dialog: HTMLElsaModalDialogElement;
  monacoEditor: HTMLElsaMonacoElement;
  formContext: FormContext;
  handleWorkflowDefinitionChanged(newValue: WorkflowDefinition): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  onTabClick(e: Event, tab: string): void;
  onCancelClick(): Promise<void>;
  onSubmit(e: Event): Promise<void>;
  onMonacoValueChanged(e: MonacoValueChangedArgs): void;
  render(): any;
  renderSelectedTab(): any;
  renderSettingsTab(): any;
  renderVariablesTab(): any;
  renderWorkflowContextTab(): any;
}
export {};
