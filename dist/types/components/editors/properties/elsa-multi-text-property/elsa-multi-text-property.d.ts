import { ActivityDefinitionProperty, ActivityPropertyDescriptor, SelectListItem } from "../../../../models";
export declare class ElsaMultiTextProperty {
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  serverUrl: string;
  currentValue?: string;
  items: any[];
  componentWillLoad(): Promise<void>;
  onValueChanged(newValue: Array<string | number | boolean | SelectListItem>): void;
  onDefaultSyntaxValueChanged(e: CustomEvent): void;
  createKeyValueOptions(options: Array<SelectListItem>): SelectListItem[];
  componentWillRender(): Promise<void>;
  render(): any;
}
