import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
export declare class ElsaMultiLineProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  currentValue: string;
  componentWillLoad(): void;
  getEditorHeight(options: any): {
    propertyEditor: string;
    textArea: number;
  };
  onChange(e: Event): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  render(): any;
}
