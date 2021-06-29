'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const collection = require('./collection-542fafac.js');
const domain = require('./domain-ec2ef82c.js');
const elsaClient = require('./elsa-client-90ac335e.js');
const pluginManager = require('./plugin-manager-64cf2928.js');
require('./_commonjsHelpers-206db00d.js');
require('./event-bus-468c034a.js');
require('./utils-bb625a12.js');
require('./activity-icon-provider-b089a264.js');

const ElsaWorkflowBlueprintViewerScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    pluginManager.pluginManager.initialize();
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
      persistenceBehavior: domain.WorkflowPersistenceBehavior.WorkflowBurst,
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
    const client = elsaClient.createElsaClient(this.serverUrl);
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
    const client = elsaClient.createElsaClient(this.serverUrl);
    pluginManager.state.activityDescriptors = await client.activitiesApi.list();
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
    const activityDescriptors = pluginManager.state.activityDescriptors;
    const activityDescriptor = activityDescriptors.find(x => x.type == source.type);
    const properties = collection.collection.map(source.properties.data, (value, key) => {
      const propertyDescriptor = activityDescriptor.inputProperties.find(x => x.name == key);
      const defaultSyntax = propertyDescriptor.defaultSyntax || domain.SyntaxNames.Literal;
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
    return (index.h(index.Host, { class: "elsa-flex elsa-flex-col elsa-w-full elsa-relative", ref: el => this.el = el }, this.renderCanvas()));
  }
  renderCanvas() {
    return (index.h("div", { class: "elsa-flex-1 elsa-flex" }, index.h("elsa-designer-tree", { model: this.workflowModel, class: "elsa-flex-1", ref: el => this.designer = el, mode: pluginManager.WorkflowDesignerMode.Blueprint })));
  }
  static get watchers() { return {
    "workflowDefinitionId": ["workflowDefinitionIdChangedHandler"],
    "serverUrl": ["serverUrlChangedHandler"]
  }; }
};

exports.elsa_workflow_blueprint_viewer_screen = ElsaWorkflowBlueprintViewerScreen;
