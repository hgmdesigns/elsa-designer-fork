import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
import { MonacoValueChangedArgs } from "../../../controls/elsa-monaco/elsa-monaco";
export declare class ElsaScriptProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  editorHeight: string;
  singleLineMode: boolean;
  context?: string;
  syntax?: string;
  serverUrl: string;
  workflowDefinitionId: string;
  currentValue?: string;
  monacoEditor: HTMLElsaMonacoElement;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  mapSyntaxToLanguage(syntax: string): any;
  onMonacoValueChanged(e: MonacoValueChangedArgs): void;
  render(): any;
}
