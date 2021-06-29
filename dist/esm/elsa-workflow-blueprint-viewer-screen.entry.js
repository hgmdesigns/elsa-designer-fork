import { r as registerInstance, h, H as Host } from './index-efd13af9.js';
import { a1 as collection } from './collection-ba33bbb1.js';
import { W as WorkflowPersistenceBehavior, S as SyntaxNames } from './domain-b51fc213.js';
import { c as createElsaClient } from './elsa-client-e01ed0bb.js';
import { a as pluginManager, s as state, W as WorkflowDesignerMode } from './plugin-manager-35220ed1.js';
import './_commonjsHelpers-63c253cd.js';
import './event-bus-4cad9569.js';
import './utils-2841e02a.js';
import './activity-icon-provider-dd38871d.js';

const ElsaWorkflowBlueprintViewerScreen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h("div", { class: "elsa-flex-1 elsa-flex" }, h("elsa-designer-tree", { model: this.workflowModel, class: "elsa-flex-1", ref: el => this.designer = el, mode: WorkflowDesignerMode.Blueprint })));
  }
  static get watchers() { return {
    "workflowDefinitionId": ["workflowDefinitionIdChangedHandler"],
    "serverUrl": ["serverUrlChangedHandler"]
  }; }
};

export { ElsaWorkflowBlueprintViewerScreen as elsa_workflow_blueprint_viewer_screen };
