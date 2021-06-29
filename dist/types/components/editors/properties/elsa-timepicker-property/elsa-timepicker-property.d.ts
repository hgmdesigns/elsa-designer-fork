import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
export declare class ElsaTimepickerProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  currentValue: string;
  onChange(e: Event): void;
  componentWillLoad(): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  render(): any;
}
