import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { eventBus } from "../../../../services/event-bus";
import { EventTypes, WorkflowContextFidelity } from "../../../../models";
import { MarkerSeverity } from "monaco-editor";
import { FormContext, selectField, textArea, textInput } from "../../../../utils/forms";
export class ElsaWorkflowDefinitionSettingsModal {
  constructor() {
    this.selectedTab = 'Settings';
    this.newVariable = {};
  }
  handleWorkflowDefinitionChanged(newValue) {
    this.workflowDefinitionInternal = Object.assign({}, newValue);
    this.formContext = new FormContext(this.workflowDefinitionInternal, newValue => this.workflowDefinitionInternal = newValue);
  }
  componentWillLoad() {
    this.handleWorkflowDefinitionChanged(this.workflowDefinition);
  }
  componentDidLoad() {
    eventBus.on(EventTypes.ShowWorkflowSettings, async () => await this.dialog.show(true));
  }
  onTabClick(e, tab) {
    e.preventDefault();
    this.selectedTab = tab;
  }
  async onCancelClick() {
    await this.dialog.hide(true);
  }
  async onSubmit(e) {
    e.preventDefault();
    await this.dialog.hide(true);
    setTimeout(() => eventBus.emit(EventTypes.UpdateWorkflowSettings, this, this.workflowDefinitionInternal), 250);
  }
  onMonacoValueChanged(e) {
    // Don't try and parse JSON if it contains errors.
    const errorCount = e.markers.filter(x => x.severity == MarkerSeverity.Error).length;
    if (errorCount > 0)
      return;
    const newValue = e.value;
    let data = this.workflowDefinitionInternal.variables ? this.workflowDefinitionInternal.variables.data || {} : {};
    try {
      data = newValue.indexOf('{') >= 0 ? JSON.parse(newValue) : {};
    }
    catch (e) {
    }
    finally {
      this.workflowDefinitionInternal = Object.assign(Object.assign({}, this.workflowDefinitionInternal), { variables: { data: data } });
    }
  }
  render() {
    const tabs = ['Settings'];
    const selectedTab = this.selectedTab;
    const inactiveClass = 'elsa-border-transparent elsa-text-gray-500 hover:elsa-text-gray-700 hover:elsa-border-gray-300';
    const selectedClass = 'elsa-border-blue-500 elsa-text-blue-600';
    return (h(Host, null,
      h("elsa-modal-dialog", { ref: el => this.dialog = el },
        h("div", { slot: "content", class: "elsa-py-8 elsa-pb-0" },
          h("form", { onSubmit: e => this.onSubmit(e) },
            h("div", { class: "elsa-px-8 mb-8" },
              h("div", { class: "elsa-border-b elsa-border-gray-200" },
                h("nav", { class: "-elsa-mb-px elsa-flex elsa-space-x-8", "aria-label": "Tabs" }, tabs.map(tab => {
                  const isSelected = tab === selectedTab;
                  const cssClass = isSelected ? selectedClass : inactiveClass;
                  return h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} elsa-whitespace-nowrap elsa-py-4 elsa-px-1 elsa-border-b-2 elsa-font-medium elsa-text-sm` }, tab);
                })))),
            this.renderSelectedTab(),
            h("div", { class: "elsa-pt-5" },
              h("div", { class: "elsa-bg-gray-50 elsa-px-4 elsa-py-3 sm:elsa-px-6 sm:elsa-flex sm:elsa-flex-row-reverse" },
                h("button", { type: "submit", class: "elsa-ml-0 elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-transparent elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-blue-600 elsa-text-base elsa-font-medium elsa-text-white hover:elsa-bg-blue-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 sm:elsa-ml-3 sm:elsa-w-auto sm:elsa-text-sm" }, "Save"),
                h("button", { type: "button", onClick: () => this.onCancelClick(), class: "elsa-mt-3 elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-gray-300 elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-white elsa-text-base elsa-font-medium elsa-text-gray-700 hover:elsa-bg-gray-50 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 sm:elsa-mt-0 sm:elsa-ml-3 sm:elsa-w-auto sm:elsa-text-sm" }, "Cancel"))))),
        h("div", { slot: "buttons" }))));
  }
  renderSelectedTab() {
    const selectedTab = this.selectedTab;
    switch (selectedTab) {
      case 'Workflow Context':
        return this.renderWorkflowContextTab();
      case 'Variables':
        return this.renderVariablesTab();
      case 'Settings':
      default:
        return this.renderSettingsTab();
    }
  }
  renderSettingsTab() {
    const workflowDefinition = this.workflowDefinitionInternal;
    const formContext = this.formContext;
    const persistenceBehaviorOptions = [{
        text: 'Suspended',
        value: 'Suspended'
      }, {
        text: 'Workflow Burst',
        value: 'WorkflowBurst'
      }, {
        text: 'Workflow Pass Completed',
        value: 'WorkflowPassCompleted'
      }, {
        text: 'Activity Executed',
        value: 'ActivityExecuted'
      }];
    return (h("div", { class: "elsa-flex elsa-px-8" },
      h("div", { class: "elsa-space-y-8 elsa-w-full" },
        textInput(formContext, 'name', 'Name', workflowDefinition.name, 'The technical name of the workflow.', 'workflowName'),
        textArea(formContext, 'description', 'Description', workflowDefinition.description, null, 'workflowDescription'))));
  }
  renderVariablesTab() {
    const workflowDefinition = this.workflowDefinitionInternal;
    const variables = workflowDefinition.variables || { data: {} };
    const data = variables.data || {};
    const value = JSON.stringify(data, undefined, 3);
    const language = 'json';
    return (h("div", { class: "elsa-flex elsa-px-8" },
      h("div", { class: "elsa-space-y-8 elsa-w-full elsa-h-30" },
        h("elsa-monaco", { value: value, language: language, "editor-height": "30em", onValueChanged: e => this.onMonacoValueChanged(e.detail), ref: el => this.monacoEditor = el }))));
  }
  renderWorkflowContextTab() {
    const workflowDefinition = this.workflowDefinitionInternal;
    const formContext = this.formContext;
    const contextOptions = workflowDefinition.contextOptions || {
      contextType: undefined,
      contextFidelity: WorkflowContextFidelity.Burst
    };
    const fidelityOptions = [{
        text: 'Burst',
        value: 'Burst'
      }, {
        text: 'Activity',
        value: 'Activity'
      }];
    return (h("div", { class: "elsa-flex elsa-px-8" },
      h("div", { class: "elsa-space-y-8 elsa-w-full" },
        textInput(formContext, 'contextOptions.contextType', 'Type', contextOptions.contextType, 'The fully qualified workflow context type name.', 'workflowContextType'),
        selectField(formContext, 'contextOptions.contextFidelity', 'Fidelity', contextOptions.contextFidelity, fidelityOptions, 'The workflow context refresh fidelity controls the behavior of when to load and persist the workflow context.', 'workflowContextFidelity'))));
  }
  static get is() { return "elsa-workflow-settings-modal"; }
  static get properties() { return {
    "workflowDefinition": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "WorkflowDefinition",
        "resolved": "WorkflowDefinition",
        "references": {
          "WorkflowDefinition": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    }
  }; }
  static get states() { return {
    "workflowDefinitionInternal": {},
    "selectedTab": {},
    "newVariable": {}
  }; }
  static get watchers() { return [{
      "propName": "workflowDefinition",
      "methodName": "handleWorkflowDefinitionChanged"
    }]; }
}
