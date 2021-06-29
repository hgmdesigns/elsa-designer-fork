import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
export declare class ElsaRadioListProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  serverUrl: string;
  currentValue?: string;
  monacoEditor: HTMLElsaMonacoElement;
  items: any[];
  componentWillLoad(): Promise<void>;
  onCheckChanged(e: Event): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  componentWillRender(): Promise<void>;
  render(): any;
}
