import { Component, Host, h } from '@stencil/core';
import { eventBus } from '../../../../services/event-bus';
import { EventTypes } from "../../../../models";
export class ElsaWorkflowEditorNotifications {
  constructor() {
    this.onWorkflowPublished = async (workflowDefinition) => await this.toastNotificationElement.show({
      autoCloseIn: 1500,
      title: 'Workflow Published',
      message: `Workflow successfully published at version ${workflowDefinition.version}.`
    });
    this.onWorkflowRetracted = async (workflowDefinition) => await this.toastNotificationElement.show({
      autoCloseIn: 1500,
      title: 'Workflow Retracted',
      message: `Workflow successfully retracted at version ${workflowDefinition.version}.`
    });
    this.onWorkflowImported = async (workflowDefinition) => await this.toastNotificationElement.show({ autoCloseIn: 1500, title: 'Workflow Imported', message: `Workflow successfully imported.` });
  }
  connectedCallback() {
    eventBus.on(EventTypes.WorkflowPublished, this.onWorkflowPublished);
    eventBus.on(EventTypes.WorkflowRetracted, this.onWorkflowRetracted);
    eventBus.on(EventTypes.WorkflowImported, this.onWorkflowImported);
  }
  disconnectedCallback() {
    eventBus.off(EventTypes.WorkflowPublished, this.onWorkflowPublished);
    eventBus.off(EventTypes.WorkflowRetracted, this.onWorkflowRetracted);
    eventBus.off(EventTypes.WorkflowImported, this.onWorkflowImported);
  }
  render() {
    return (h(Host, { class: "elsa-block" },
      h("elsa-toast-notification", { ref: el => this.toastNotificationElement = el })));
  }
  static get is() { return "elsa-workflow-definition-editor-notifications"; }
}
