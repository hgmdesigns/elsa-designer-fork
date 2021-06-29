import { EventEmitter } from '../../../stencil-public-runtime';
import { ActivityDefinitionProperty, ActivityPropertyDescriptor } from "../../../models";
export declare class ElsaPropertyEditor {
  defaultSyntaxValueChanged: EventEmitter<string>;
  propertyDescriptor: ActivityPropertyDescriptor;
  propertyModel: ActivityDefinitionProperty;
  editorHeight: string;
  singleLineMode: boolean;
  context?: string;
  showLabel: boolean;
  onSyntaxChanged(e: CustomEvent<string>): void;
  onExpressionChanged(e: CustomEvent<string>): void;
  render(): any;
}
