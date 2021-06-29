import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { eventBus } from '../../../../services/event-bus';
import { EventTypes, WorkflowPersistenceBehavior } from "../../../../models";
import { createElsaClient } from "../../../../services/elsa-client";
import { pluginManager } from '../../../../services/plugin-manager';
import state from '../../../../utils/store';
import Tunnel from '../../../../data/workflow-editor';
import { downloadFromBlob } from "../../../../utils/download";
import { WorkflowDesignerMode } from "../../../designers/tree/elsa-designer-tree/models";
import { registerClickOutside } from "stencil-click-outside";
export class ElsaWorkflowDefinitionEditorScreen {
  constructor() {
    this.activityContextMenuState = {
      shown: false,
      x: 0,
      y: 0,
      activity: null,
    };
    this.onUpdateWorkflowSettings = async (workflowDefinition) => {
      this.updateWorkflowDefinition(workflowDefinition);
      await this.saveWorkflowInternal(this.workflowModel);
    };
    pluginManager.initialize();
  }
  async getServerUrl() {
    return this.serverUrl;
  }
  async getWorkflowDefinitionId() {
    return this.workflowDefinition.definitionId;
  }
  async exportWorkflow() {
    const client = createElsaClient(this.serverUrl);
    const workflowDefinition = this.workflowDefinition;
    const versionOptions = { version: workflowDefinition.version };
    const response = await client.workflowDefinitionsApi.export(workflowDefinition.definitionId, versionOptions);
    downloadFromBlob(response.data, { contentType: 'application/json', fileName: response.fileName });
  }
  async importWorkflow(file) {
    const client = createElsaClient(this.serverUrl);
    this.importing = true;
    this.imported = false;
    this.networkError = null;
    try {
      const workflowDefinition = await client.workflowDefinitionsApi.import(this.workflowDefinition.definitionId, file);
      this.workflowDefinition = workflowDefinition;
      this.workflowModel = this.mapWorkflowModel(workflowDefinition);
      this.importing = false;
      this.imported = true;
      setTimeout(() => this.imported = false, 500);
      eventBus.emit(EventTypes.WorkflowImported, this, this.workflowDefinition);
    }
    catch (e) {
      console.error(e);
      this.importing = false;
      this.imported = false;
      this.networkError = e.message;
      setTimeout(() => this.networkError = null, 10000);
    }
  }
  async workflowDefinitionIdChangedHandler(newValue) {
    const workflowDefinitionId = newValue;
    let workflowDefinition = ElsaWorkflowDefinitionEditorScreen.createWorkflowDefinition();
    workflowDefinition.definitionId = workflowDefinitionId;
    const client = createElsaClient(this.serverUrl);
    if (workflowDefinitionId && workflowDefinitionId.length > 0) {
      try {
        workflowDefinition = await client.workflowDefinitionsApi.getByDefinitionAndVersion(workflowDefinitionId, { isLatest: true });
      }
      catch (_a) {
        console.warn(`The specified workflow definition does not exist. Creating a new one.`);
      }
    }
    this.updateWorkflowDefinition(workflowDefinition);
  }
  async serverUrlChangedHandler(newValue) {
    if (newValue && newValue.length > 0) {
      await this.loadActivityDescriptors();
      await this.loadWorkflowStorageDescriptors();
    }
  }
  async monacoLibPathChangedHandler(newValue) {
    state.monacoLibPath = newValue;
  }
  async workflowChangedHandler(event) {
    const workflowModel = event.detail;
    await this.saveWorkflowInternal(workflowModel);
  }
  async componentWillLoad() {
    await this.serverUrlChangedHandler(this.serverUrl);
    await this.workflowDefinitionIdChangedHandler(this.workflowDefinitionId);
    await this.monacoLibPathChangedHandler(this.monacoLibPath);
  }
  connectedCallback() {
    eventBus.on(EventTypes.UpdateWorkflowSettings, this.onUpdateWorkflowSettings);
  }
  disconnectedCallback() {
    eventBus.detach(EventTypes.UpdateWorkflowSettings, this.onUpdateWorkflowSettings);
  }
  componentDidLoad() {
    if (!this.designer) {
      this.designer = this.el.querySelector("elsa-designer-tree");
      this.designer.model = this.workflowModel;
    }
  }
  async loadActivityDescriptors() {
    const client = createElsaClient(this.serverUrl);
    state.activityDescriptors = await client.activitiesApi.list();
  }
  async loadWorkflowStorageDescriptors() {
    const client = createElsaClient(this.serverUrl);
    state.workflowStorageDescriptors = await client.workflowStorageProvidersApi.list();
  }
  updateWorkflowDefinition(value) {
    this.workflowDefinition = value;
    this.workflowModel = this.mapWorkflowModel(value);
  }
  async publishWorkflow() {
    this.publishing = true;
    await this.saveWorkflow(true);
    this.publishing = false;
    eventBus.emit(EventTypes.WorkflowPublished, this, this.workflowDefinition);
  }
  async unPublishWorkflow() {
    this.unPublishing = true;
    await this.unpublishWorkflow();
    this.unPublishing = false;
    eventBus.emit(EventTypes.WorkflowRetracted, this, this.workflowDefinition);
  }
  async saveWorkflow(publish) {
    await this.saveWorkflowInternal(null, publish);
  }
  async saveWorkflowInternal(workflowModel, publish) {
    if (!this.serverUrl || this.serverUrl.length == 0)
      return;
    workflowModel = workflowModel || this.workflowModel;
    const client = createElsaClient(this.serverUrl);
    let workflowDefinition = this.workflowDefinition;
    const request = {
      workflowDefinitionId: workflowDefinition.definitionId || this.workflowDefinitionId,
      contextOptions: workflowDefinition.contextOptions,
      deleteCompletedInstances: workflowDefinition.deleteCompletedInstances,
      description: workflowDefinition.description,
      displayName: workflowDefinition.displayName,
      isSingleton: workflowDefinition.isSingleton,
      name: workflowDefinition.name,
      tag: workflowDefinition.tag,
      persistenceBehavior: workflowDefinition.persistenceBehavior,
      publish: publish || false,
      variables: workflowDefinition.variables,
      activities: workflowModel.activities.map(x => ({
        activityId: x.activityId,
        activityType: x.activityType,
        type: x.type,
        subType: x.subType,
        action: x.action,
        event: x.event,
        name: x.name,
        displayName: x.displayName,
        description: x.description,
        persistWorkflow: x.persistWorkflow,
        loadWorkflowContext: x.loadWorkflowContext,
        saveWorkflowContext: x.saveWorkflowContext,
        properties: x.properties,
        propertyStorageProviders: x.propertyStorageProviders
      })),
      connections: workflowModel.connections.map(x => ({
        sourceActivityId: x.sourceId,
        targetActivityId: x.targetId,
        outcome: x.outcome
      })),
    };
    this.saving = !publish;
    this.publishing = publish;
    try {
      console.debug("Saving workflow...");
      workflowDefinition = await client.workflowDefinitionsApi.save(request);
      this.workflowDefinition = workflowDefinition;
      this.workflowModel = this.mapWorkflowModel(workflowDefinition);
      this.saving = false;
      this.saved = !publish;
      this.publishing = false;
      setTimeout(() => this.saved = false, 500);
      this.workflowSaved.emit(workflowDefinition);
    }
    catch (e) {
      console.error(e);
      this.saving = false;
      this.saved = false;
      this.networkError = e.message;
      setTimeout(() => this.networkError = null, 10000);
    }
  }
  async unpublishWorkflow() {
    const client = createElsaClient(this.serverUrl);
    const workflowDefinitionId = this.workflowDefinition.definitionId;
    this.unPublishing = true;
    try {
      this.workflowDefinition = await client.workflowDefinitionsApi.retract(workflowDefinitionId);
      this.unPublishing = false;
      this.unPublished = true;
      setTimeout(() => this.unPublished = false, 500);
    }
    catch (e) {
      console.error(e);
      this.unPublishing = false;
      this.unPublished = false;
      this.networkError = e.message;
      setTimeout(() => this.networkError = null, 2000);
    }
  }
  mapWorkflowModel(workflowDefinition) {
    return {
      activities: workflowDefinition.activities.map(this.mapActivityModel),
      connections: workflowDefinition.connections.map(this.mapConnectionModel),
      persistenceBehavior: workflowDefinition.persistenceBehavior,
    };
  }
  mapActivityModel(source) {
    const activityDescriptors = state.activityDescriptors;
    const activityDescriptor = activityDescriptors.find(x => x.type == source.type);
    return {
      activityId: source.activityId,
      description: source.description,
      displayName: source.displayName,
      name: source.name,
      activityType: source.activityType,
      type: source.type,
      subType: source.type,
      action: source.action,
      event: source.event,
      properties: source.properties,
      outcomes: [...activityDescriptor.outcomes],
      persistWorkflow: source.persistWorkflow,
      saveWorkflowContext: source.saveWorkflowContext,
      loadWorkflowContext: source.loadWorkflowContext,
      propertyStorageProviders: source.propertyStorageProviders
    };
  }
  mapConnectionModel(source) {
    return {
      sourceId: source.sourceActivityId,
      targetId: source.targetActivityId,
      outcome: source.outcome
    };
  }
  handleContextMenuChange(state) {
    this.activityContextMenuState = state;
  }
  onShowWorkflowSettingsClick() {
    eventBus.emit(EventTypes.ShowWorkflowSettings);
  }
  async onPublishClicked() {
    await this.publishWorkflow();
  }
  async onUnPublishClicked() {
    await this.unPublishWorkflow();
  }
  async onExportClicked() {
    await this.exportWorkflow();
  }
  async onImportClicked(file) {
    await this.importWorkflow(file);
  }
  async onDeleteActivityClick(e) {
    e.preventDefault();
    await this.designer.removeActivity(this.activityContextMenuState.activity);
    this.handleContextMenuChange({ x: 0, y: 0, shown: false, activity: null });
  }
  async onEditActivityClick(e) {
    e.preventDefault();
    await this.designer.showActivityEditor(this.activityContextMenuState.activity, true);
    this.handleContextMenuChange({ x: 0, y: 0, shown: false, activity: null });
  }
  onActivityContextMenuButtonClicked(e) {
    this.activityContextMenuState = e.detail;
  }
  render() {
    const tunnelState = {
      serverUrl: this.serverUrl,
      workflowDefinitionId: this.workflowDefinition.definitionId
    };
    return (h(Host, { class: "elsa-flex elsa-flex-col elsa-w-full", ref: el => this.el = el },
      h(Tunnel.Provider, { state: tunnelState },
        this.renderCanvas(),
        this.renderActivityPicker(),
        this.renderActivityEditor())));
  }
  renderCanvas() {
    const activityContextMenuButton = (activity) => `<div class="context-menu-wrapper elsa-flex-shrink-0">
            <button aria-haspopup="true"
                    class="elsa-w-8 elsa-h-8 elsa-inline-flex elsa-items-center elsa-justify-center elsa-text-gray-400 elsa-rounded-full elsa-bg-transparent hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-text-gray-500 focus:elsa-bg-gray-100 elsa-transition elsa-ease-in-out elsa-duration-150">
              <svg class="elsa-h-6 elsa-w-6 elsa-text-gray-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                   stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="5" cy="12" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
              </svg>
            </button>
          </div>`;
    return (h("div", { class: "elsa-flex-1 elsa-flex elsa-relative" },
      h("elsa-designer-tree", { model: this.workflowModel, mode: WorkflowDesignerMode.Edit, activityContextMenuButton: activityContextMenuButton, onActivityContextMenuButtonClicked: e => this.onActivityContextMenuButtonClicked(e), activityContextMenu: this.activityContextMenuState, class: "elsa-flex-1", ref: el => this.designer = el }),
      this.renderWorkflowSettingsButton(),
      this.renderActivityContextMenu(),
      h("elsa-workflow-settings-modal", { workflowDefinition: this.workflowDefinition }),
      h("elsa-workflow-definition-editor-notifications", null),
      h("div", { class: "elsa-fixed elsa-bottom-10 elsa-right-12" },
        h("div", { class: "elsa-flex elsa-items-center elsa-space-x-4" },
          this.renderSavingIndicator(),
          this.renderNetworkError(),
          this.renderPublishButton()))));
  }
  renderActivityContextMenu() {
    return h("div", { "data-transition-enter": "elsa-transition elsa-ease-out elsa-duration-100", "data-transition-enter-start": "elsa-transform elsa-opacity-0 elsa-scale-95", "data-transition-enter-end": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave": "elsa-transition elsa-ease-in elsa-duration-75", "data-transition-leave-start": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave-end": "elsa-transform elsa-opacity-0 elsa-scale-95", class: `${this.activityContextMenuState.shown ? '' : 'hidden'} context-menu elsa-z-10 elsa-mx-3 elsa-w-48 elsa-mt-1 elsa-rounded-md elsa-shadow-lg elsa-absolute`, style: { left: `${this.activityContextMenuState.x}px`, top: `${this.activityContextMenuState.y - 64}px` }, ref: el => registerClickOutside(this, el, () => {
        this.handleContextMenuChange({ x: 0, y: 0, shown: false, activity: null });
      }) },
      h("div", { class: "elsa-rounded-md elsa-bg-white elsa-shadow-xs", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "pinned-project-options-menu-0" },
        h("div", { class: "elsa-py-1" },
          h("a", { onClick: e => this.onEditActivityClick(e), href: "#", class: "elsa-block elsa-px-4 elsa-py-2 elsa-text-sm elsa-leading-5 elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900 focus:elsa-outline-none focus:elsa-bg-gray-100 focus:elsa-text-gray-900", role: "menuitem" }, "Edit")),
        h("div", { class: "elsa-border-t elsa-border-gray-100" }),
        h("div", { class: "elsa-py-1" },
          h("a", { onClick: e => this.onDeleteActivityClick(e), href: "#", class: "elsa-block elsa-px-4 elsa-py-2 elsa-text-sm elsa-leading-5 elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900 focus:elsa-outline-none focus:elsa-bg-gray-100 focus:elsa-text-gray-900", role: "menuitem" }, "Delete"))));
  }
  renderActivityPicker() {
    return h("elsa-activity-picker-modal", null);
  }
  renderActivityEditor() {
    return h("elsa-activity-editor-modal", null);
  }
  renderWorkflowSettingsButton() {
    return (h("button", { onClick: () => this.onShowWorkflowSettingsClick(), type: "button", class: "workflow-settings-button elsa-fixed elsa-top-20 elsa-right-12 elsa-inline-flex elsa-items-center elsa-p-2 elsa-rounded-full elsa-border elsa-border-transparent elsa-bg-white shadow elsa-text-gray-400 hover:elsa-text-blue-500 focus:elsa-text-blue-500 hover:elsa-ring-2 hover:elsa-ring-offset-2 hover:elsa-ring-blue-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" },
      h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", stroke: "currentColor", fill: "none", class: "elsa-h-8 elsa-w-8" },
        h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
        h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }))));
  }
  renderWorkflowSettingsModal() {
    return;
  }
  renderSavingIndicator() {
    if (this.publishing)
      return undefined;
    const message = this.unPublishing ? 'Deactivating...' : this.unPublished ? 'Deactivated'
      : this.saving ? 'Saving...' : this.saved ? 'Saved'
        : this.importing ? 'Importing...' : this.imported ? 'Imported'
          : null;
    if (!message)
      return undefined;
    return (h("div", null,
      h("span", { class: "elsa-text-gray-400 elsa-text-sm" }, message)));
  }
  renderNetworkError() {
    if (!this.networkError)
      return undefined;
    return (h("div", null,
      h("span", { class: "elsa-text-rose-400 elsa-text-sm" },
        "An error occurred: ",
        this.networkError)));
  }
  renderPublishButton() {
    return h("elsa-workflow-publish-button", { publishing: this.publishing, workflowDefinition: this.workflowDefinition, onPublishClicked: () => this.onPublishClicked(), onUnPublishClicked: () => this.onUnPublishClicked(), onExportClicked: () => this.onExportClicked(), onImportClicked: e => this.onImportClicked(e.detail) });
  }
  static createWorkflowDefinition() {
    return {
      definitionId: null,
      version: 1,
      activities: [],
      connections: [],
      persistenceBehavior: WorkflowPersistenceBehavior.WorkflowBurst,
    };
  }
  static get is() { return "elsa-workflow-definition-editor-screen"; }
  static get properties() { return {
    "workflowDefinitionId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "workflow-definition-id",
      "reflect": true
    },
    "serverUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "server-url",
      "reflect": true
    },
    "monacoLibPath": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "monaco-lib-path",
      "reflect": true
    }
  }; }
  static get states() { return {
    "workflowDefinition": {},
    "workflowModel": {},
    "publishing": {},
    "unPublishing": {},
    "unPublished": {},
    "saving": {},
    "saved": {},
    "importing": {},
    "imported": {},
    "networkError": {},
    "activityContextMenuState": {}
  }; }
  static get events() { return [{
      "method": "workflowSaved",
      "name": "workflowSaved",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "WorkflowDefinition",
        "resolved": "WorkflowDefinition",
        "references": {
          "WorkflowDefinition": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      }
    }]; }
  static get methods() { return {
    "getServerUrl": {
      "complexType": {
        "signature": "() => Promise<string>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<string>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "getWorkflowDefinitionId": {
      "complexType": {
        "signature": "() => Promise<string>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<string>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "exportWorkflow": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "VersionOptions": {
            "location": "import",
            "path": "../../../../models"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "importWorkflow": {
      "complexType": {
        "signature": "(file: File) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "File": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get watchers() { return [{
      "propName": "workflowDefinitionId",
      "methodName": "workflowDefinitionIdChangedHandler"
    }, {
      "propName": "serverUrl",
      "methodName": "serverUrlChangedHandler"
    }, {
      "propName": "monacoLibPath",
      "methodName": "monacoLibPathChangedHandler"
    }]; }
  static get listeners() { return [{
      "name": "workflow-changed",
      "method": "workflowChangedHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
