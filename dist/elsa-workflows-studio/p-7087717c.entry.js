import{r as e,h as t}from"./p-94a66dfc.js";import{S as r}from"./p-b514879f.js";const s=class{constructor(t){e(this,t)}componentWillLoad(){this.currentValue=this.propertyModel.expressions[this.propertyDescriptor.defaultSyntax||r.Literal]||void 0}getEditorHeight(e){switch(e.editorHeight||"Default"){case"Large":return{propertyEditor:"20em",textArea:6};case"Default":default:return{propertyEditor:"15em",textArea:3}}}onChange(e){this.propertyModel.expressions.Literal=this.currentValue=e.currentTarget.value}onDefaultSyntaxValueChanged(e){this.currentValue=e.detail}render(){const e=this.propertyDescriptor,r=this.propertyModel,s=e.name,a=e.options||{},o=this.getEditorHeight(a),i=a.context,l=s,n=s;let h=this.currentValue;if(null==h){const e=this.propertyDescriptor.defaultValue;h=e?e.toString():void 0}return t("elsa-property-editor",{propertyDescriptor:e,propertyModel:r,onDefaultSyntaxValueChanged:e=>this.onDefaultSyntaxValueChanged(e),"editor-height":o.propertyEditor,context:i},t("textarea",{id:l,name:n,value:h,onChange:e=>this.onChange(e),class:"focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300",rows:o.textArea}))}};export{s as elsa_multi_line_property}