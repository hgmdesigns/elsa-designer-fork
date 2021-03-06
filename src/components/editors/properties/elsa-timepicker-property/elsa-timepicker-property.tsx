import {Component, h, Prop, State} from '@stencil/core';
import {ActivityDefinitionProperty, ActivityPropertyDescriptor, SyntaxNames} from "../../../../models";

@Component({
  tag: 'elsa-timepicker-property',
  shadow: false,
})
export class ElsaTimepickerProperty {

  @Prop() propertyDescriptor: ActivityPropertyDescriptor;
  @Prop() propertyModel: ActivityDefinitionProperty;
  @State() currentValue: string;

  onChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.propertyModel.expressions[defaultSyntax] = this.currentValue = (input.firstElementChild as HTMLInputElement).value;  
  }

  componentWillLoad() {    
    const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
    this.currentValue = this.propertyModel.expressions[defaultSyntax] || undefined;
  }

  onDefaultSyntaxValueChanged(e: CustomEvent) {
    this.currentValue = e.detail;
  }

  render() {        
    const propertyDescriptor = this.propertyDescriptor;
    const propertyModel = this.propertyModel;
    const propertyName = propertyDescriptor.name;
    const isDisabled = propertyDescriptor.isDisabled;
    // const fieldId = propertyName;
    const fieldName = propertyName;
    let value = this.currentValue;
    

    if (value == undefined) {
      const defaultValue = this.propertyDescriptor.defaultValue;
      value = defaultValue ? defaultValue.toString() : undefined;
    }

    if (isDisabled)
    {      
      const defaultSyntax = this.propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
      this.propertyModel.expressions[defaultSyntax] = value;
    }

    return (
      <elsa-property-editor propertyDescriptor={propertyDescriptor}
                            propertyModel={propertyModel}
                            onDefaultSyntaxValueChanged={e => this.onDefaultSyntaxValueChanged(e)}
                            editor-height="5em"
                            single-line={true}>
        <st-timepicker name={fieldName} selected={value} step="5"  onChange={e => this.onChange(e)} class="disabled:elsa-opacity-50 disabled:elsa-cursor-not-allowed focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300" disabled={isDisabled} ></st-timepicker>
      </elsa-property-editor>
    );
  }
}
