import{r as i,h as e}from"./p-94a66dfc.js";const o=class{constructor(e){i(this,e)}componentWillLoad(){let i=this.match.params.id;i&&"new"==i.toLowerCase()&&(i=null),this.id=i}render(){return e("div",null,e("elsa-webhook-definition-editor-screen",{history:this.history,"server-url":this.serverUrl,"webhook-definition-id":this.id}))}};export{o as elsa_studio_webhook_definitions_edit}