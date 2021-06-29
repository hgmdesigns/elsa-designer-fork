import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
export declare class ElsaCheckBoxProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  isChecked: boolean;
  componentWillLoad(): Promise<void>;
  onCheckChanged(e: Event): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  render(): any;
}
