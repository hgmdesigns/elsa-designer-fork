import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import * as collection from 'lodash/collection';
import { SyntaxNames, WorkflowPersistenceBehavior } from "../../../../models";
import { createElsaClient } from "../../../../services/elsa-client";
import { pluginManager } from '../../../../services/plugin-manager';
import state from '../../../../utils/store';
import { WorkflowDesignerMode } from "../../../designers/tree/elsa-designer-tree/models";
export class ElsaWorkflowBlueprintViewerScreen {
  constructor() {
    pluginManager.initialize();
  }
  async getServerUrl() {
    return this.serverUrl;
  }
  async workflowDefinitionIdChangedHandler(newValue) {
    const workflowDefinitionId = newValue;
    let workflowBlueprint = {
      id: null,
      version: 1,
      activities: [],
      connections: [],
      persistenceBehavior: WorkflowPersistenceBehavior.WorkflowBurst,
      customAttributes: { data: {} },
      persistWorkflow: false,
      isLatest: false,
      isPublished: false,
      loadWorkflowContext: false,
      isSingleton: false,
      saveWorkflowContext: false,
      variables: { data: {} },
      activityType: null,
      type: null,
      subType: null,
      action: null,
      event: null,
      properties: { data: {} },
      propertyStorageProviders: {}
    };
    const client = createElsaClient(this.serverUrl);
    if (workflowDefinitionId && workflowDefinitionId.length > 0) {
      try {
        workflowBlueprint = await client.workflowRegistryApi.get(workflowDefinitionId, { isLatest: true });
      }
      catch (_a) {
        console.warn(`The specified workflow blueprint does not exist. Creating a new one.`);
      }
    }
    this.updateModels(workflowBlueprint);
  }
  async serverUrlChangedHandler(newValue) {
    if (newValue && newValue.length > 0)
      await this.loadActivityDescriptors();
  }
  async componentWillLoad() {
    await this.serverUrlChangedHandler(this.serverUrl);
    await this.workflowDefinitionIdChangedHandler(this.workflowDefinitionId);
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
  updateModels(workflowBlueprint) {
    this.workflowBlueprint = workflowBlueprint;
    this.workflowModel = this.mapWorkflowModel(workflowBlueprint);
  }
  mapWorkflowModel(workflowBlueprint) {
    return {
      activities: workflowBlueprint.activities.filter(x => x.parentId == workflowBlueprint.id || !x.parentId).map(this.mapActivityModel),
      connections: workflowBlueprint.connections.map(this.mapConnectionModel),
      persistenceBehavior: workflowBlueprint.persistenceBehavior,
    };
  }
  mapActivityModel(source) {
    const activityDescriptors = state.activityDescriptors;
    const activityDescriptor = activityDescriptors.find(x => x.type == source.type);
    const properties = collection.map(source.properties.data, (value, key) => {
      const propertyDescriptor = activityDescriptor.inputProperties.find(x => x.name == key);
      const defaultSyntax = propertyDescriptor.defaultSyntax || SyntaxNames.Literal;
      const expressions = {};
      expressions[defaultSyntax] = value;
      return ({ name: key, expressions: expressions, syntax: defaultSyntax });
    });
    return {
      activityId: source.id,
      description: source.description,
      displayName: source.displayName || source.name || source.type,
      name: source.name,
      activityType: source.activityType,
      type: source.type,
      subType: source.subType,
      action: source.action,
      event: source.event,
      properties: properties,
      outcomes: [...activityDescriptor.outcomes],
      persistWorkflow: source.persistWorkflow,
      saveWorkflowContext: source.saveWorkflowContext,
      loadWorkflowContext: source.loadWorkflowContext,
      propertyStorageProviders: source.propertyStorageProviders
    };
  }
  mapConnectionModel(connection) {
    return {
      sourceId: connection.sourceActivityId,
      targetId: connection.targetActivityId,
      outcome: connection.outcome
    };
  }
  render() {
    return (h(Host, { class: "elsa-flex elsa-flex-col elsa-w-full elsa-relative", ref: el => this.el = el }, this.renderCanvas()));
  }
  renderCanvas() {
    return (h("div", { class: "elsa-flex-1 elsa-flex" },
      h("elsa-designer-tree", { model: this.workflowModel, class: "elsa-flex-1", ref: el => this.designer = el, mode: WorkflowDesignerMode.Blueprint })));
  }
  static get is() { return "elsa-workflow-blueprint-viewer-screen"; }
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
      "reflect": false
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
    }
  }; }
  static get states() { return {
    "workflowBlueprint": {},
    "workflowModel": {}
  }; }
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
    }
  }; }
  static get watchers() { return [{
      "propName": "workflowDefinitionId",
      "methodName": "workflowDefinitionIdChangedHandler"
    }, {
      "propName": "serverUrl",
      "methodName": "serverUrlChangedHandler"
    }]; }
}