import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../../models";
export declare class ElsaDropdownProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  serverUrl: string;
  currentValue?: string;
  items: any[];
  componentWillLoad(): Promise<void>;
  onChange(e: Event): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  render(): any;
}
