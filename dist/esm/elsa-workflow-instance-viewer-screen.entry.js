import { r as registerInstance, h, H as Host } from './index-efd13af9.js';
import { e as eventBus } from './event-bus-4cad9569.js';
import { a1 as collection } from './collection-ba33bbb1.js';
import { b as WorkflowStatus, W as WorkflowPersistenceBehavior, S as SyntaxNames } from './domain-b51fc213.js';
import { a as pluginManager, s as state, E as EventTypes, W as WorkflowDesignerMode } from './plugin-manager-35220ed1.js';
import { c as createElsaClient } from './elsa-client-e01ed0bb.js';
import { r as registerClickOutside } from './index-21749d0d.js';
import { h as hooks } from './moment-a59e1b50.js';
import { i as clip, j as durationToString } from './utils-2841e02a.js';
import './_commonjsHelpers-63c253cd.js';
import './activity-icon-provider-dd38871d.js';

const ElsaWorkflowInstanceViewerScreen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.activityContextMenuState = {
      shown: false,
      x: 0,
      y: 0,
      activity: null,
    };
    this.getActivityBorderColor = (activity) => {
      const workflowInstance = this.workflowInstance;
      const workflowFault = !!workflowInstance ? workflowInstance.fault : null;
      const activityData = workflowInstance.activityData[activity.activityId] || {};
      const lifecycle = activityData['_Lifecycle'] || {};
      const executing = !!lifecycle.Executing;
      const executed = !!lifecycle.Executed;
      if (!!workflowFault && workflowFault.faultedActivityId == activity.activityId)
        return 'red';
      if (executed)
        return 'green';
      if (executing)
        return 'blue';
      return null;
    };
    this.renderActivityStatsButton = (activity) => {
      const workflowInstance = this.workflowInstance;
      const workflowFault = !!workflowInstance ? workflowInstance.fault : null;
      const activityData = workflowInstance.activityData[activity.activityId] || {};
      const lifecycle = activityData['_Lifecycle'] || {};
      const executing = !!lifecycle.Executing;
      const executed = !!lifecycle.Executed;
      let icon;
      if (!!workflowFault && workflowFault.faultedActivityId == activity.activityId) {
        icon = `<svg class="elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>`;
      }
      else if (executed) {
        icon = `<svg class="elsa-h-6 elsa-w-6 elsa-text-green-500"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /> 
                <line x1="12" y1="16" x2="12" y2="12" /> 
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>`;
      }
      else if (executing) {
        icon = `<svg class="elsa-h-6 elsa-w-6 elsa-text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /> 
                <line x1="12" y1="16" x2="12" y2="12" /> 
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>`;
      }
      else {
        icon = `<svg class="h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>`;
      }
      return `<div class="context-menu-wrapper elsa-flex-shrink-0">
            <button aria-haspopup="true"
                    class="elsa-w-8 elsa-h-8 elsa-inline-flex elsa-items-center elsa-justify-center elsa-text-gray-400 elsa-rounded-full elsa-bg-transparent hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-text-gray-500 focus:elsa-bg-gray-100 elsa-transition elsa-ease-in-out elsa-duration-150">
              ${icon}
            </button>
          </div>`;
    };
    this.renderActivityPerformanceMenu = () => {
      const activityStats = this.activityStats;
      const renderFault = () => {
        if (!activityStats.fault)
          return;
        const workflowFault = this.workflowInstance.fault;
        const renderExceptionMessage = (exception) => {
          return (h("div", null, h("div", { class: "elsa-mb-4" }, h("strong", { class: "elsa-block elsa-font-bold" }, exception.type), exception.message), !!exception.innerException ? h("div", { class: "elsa-ml-4" }, renderExceptionMessage(exception.innerException)) : undefined));
        };
        return [
          h("div", { class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-red-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { cx: "12", cy: "12", r: "10" }), h("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), h("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Fault"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, renderExceptionMessage(workflowFault.exception), h("pre", { class: "elsa-overflow-x-scroll elsa-max-w-md", onClick: e => clip(e.currentTarget) }, JSON.stringify(workflowFault, null, 1))))),
          h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "4", y: "5", width: "16", height: "16", rx: "2" }), h("line", { x1: "16", y1: "3", x2: "16", y2: "7" }), h("line", { x1: "8", y1: "3", x2: "8", y2: "7" }), h("line", { x1: "4", y1: "11", x2: "20", y2: "11" }), h("line", { x1: "11", y1: "15", x2: "12", y2: "15" }), h("line", { x1: "12", y1: "15", x2: "12", y2: "18" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Faulted At"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, hooks(this.workflowInstance.faultedAt).format('DD-MM-YYYY HH:mm:ss'))))
        ];
      };
      const renderPerformance = () => {
        if (!!activityStats.fault)
          return;
        return [h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-indigo-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("circle", { cx: "12", cy: "12", r: "9" }), h("polyline", { points: "12 7 12 12 15 15" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Average Execution Time"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, durationToString(hooks.duration(activityStats.averageExecutionTime))))),
          h("a", { href: "#", class: "-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-green-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("circle", { cx: "12", cy: "12", r: "9" }), h("polyline", { points: "12 7 12 12 15 15" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Fastest Execution Time"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, durationToString(hooks.duration(activityStats.fastestExecutionTime))))),
          h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-yellow-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("circle", { cx: "12", cy: "12", r: "9" }), h("polyline", { points: "12 7 12 12 15 15" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Slowest Execution Time"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, durationToString(hooks.duration(activityStats.slowestExecutionTime))))),
          h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "4", y: "5", width: "16", height: "16", rx: "2" }), h("line", { x1: "16", y1: "3", x2: "16", y2: "7" }), h("line", { x1: "8", y1: "3", x2: "8", y2: "7" }), h("line", { x1: "4", y1: "11", x2: "20", y2: "11" }), h("line", { x1: "11", y1: "15", x2: "12", y2: "15" }), h("line", { x1: "12", y1: "15", x2: "12", y2: "18" })), h("div", { class: "elsa-ml-4" }, h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Last Executed At"), h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, hooks(activityStats.lastExecutedAt).format('DD-MM-YYYY HH:mm:ss'))))];
      };
      const renderStats = function () {
        return (h("div", null, h("div", null, h("table", { class: "elsa-min-w-full elsa-divide-y elsa-divide-gray-200 elsa-border-b elsa-border-gray-200" }, h("thead", { class: "elsa-bg-gray-50" }, h("tr", null, h("th", { scope: "col", class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider" }, "Event"), h("th", { scope: "col", class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider" }, "Count"))), h("tbody", { class: "elsa-bg-white elsa-divide-y elsa-divide-gray-200" }, activityStats.eventCounts.length > 0 ? activityStats.eventCounts.map(eventCount => (h("tr", null, h("td", { class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900" }, eventCount.eventName), h("td", { class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-text-gray-500" }, eventCount.count)))) : h("tr", null, h("td", { colSpan: 2, class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900" }, "No events record for this activity."))))), activityStats.eventCounts.length > 0 ? (h("div", { class: "elsa-relative elsa-grid elsa-gap-6 elsa-bg-white px-5 elsa-py-6 sm:elsa-gap-8 sm:elsa-p-8" }, renderFault(), renderPerformance())) : undefined));
      };
      const renderLoader = function () {
        return h("div", { class: "elsa-p-6 elsa-bg-white" }, "Loading...");
      };
      return h("div", { "data-transition-enter": "elsa-transition elsa-ease-out elsa-duration-100", "data-transition-enter-start": "elsa-transform elsa-opacity-0 elsa-scale-95", "data-transition-enter-end": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave": "elsa-transition elsa-ease-in elsa-duration-75", "data-transition-leave-start": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave-end": "elsa-transform elsa-opacity-0 elsa-scale-95", class: `${this.activityContextMenuState.shown ? '' : 'hidden'} elsa-absolute elsa-z-10 elsa-mt-3 elsa-px-2 elsa-w-screen elsa-max-w-xl sm:elsa-px-0`, style: { left: `${this.activityContextMenuState.x + 64}px`, top: `${this.activityContextMenuState.y - 256}px` }, ref: el => registerClickOutside(this, el, () => {
          this.handleContextMenuChange(0, 0, false, null);
        }) }, h("div", { class: "elsa-rounded-lg elsa-shadow-lg elsa-ring-1 elsa-ring-black elsa-ring-opacity-5 elsa-overflow-hidden" }, !!activityStats ? renderStats() : renderLoader()));
    };
    pluginManager.initialize();
  }
  async getServerUrl() {
    return this.serverUrl;
  }
  async workflowInstanceIdChangedHandler(newValue) {
    const workflowInstanceId = newValue;
    let workflowInstance = {
      id: null,
      definitionId: null,
      version: null,
      workflowStatus: WorkflowStatus.Idle,
      variables: { data: {} },
      blockingActivities: [],
      scheduledActivities: [],
      scopes: [],
      currentActivity: { activityId: '' }
    };
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
    if (workflowInstanceId && workflowInstanceId.length > 0) {
      try {
        workflowInstance = await client.workflowInstancesApi.get(workflowInstanceId);
        workflowBlueprint = await client.workflowRegistryApi.get(workflowInstance.definitionId, { version: workflowInstance.version });
      }
      catch (_a) {
        console.warn(`The specified workflow definition does not exist. Creating a new one.`);
      }
    }
    this.updateModels(workflowInstance, workflowBlueprint);
  }
  async serverUrlChangedHandler(newValue) {
    if (newValue && newValue.length > 0)
      await this.loadActivityDescriptors();
  }
  async componentWillLoad() {
    await this.serverUrlChangedHandler(this.serverUrl);
    await this.workflowInstanceIdChangedHandler(this.workflowInstanceId);
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
  updateModels(workflowInstance, workflowBlueprint) {
    this.workflowInstance = workflowInstance;
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
  handleContextMenuChange(x, y, shown, activity) {
    this.activityContextMenuState = {
      shown,
      x,
      y,
      activity,
    };
  }
  onShowWorkflowSettingsClick() {
    eventBus.emit(EventTypes.ShowWorkflowSettings);
  }
  onRecordSelected(e) {
    const record = e.detail;
    const activity = !!record ? this.workflowBlueprint.activities.find(x => x.id === record.activityId) : null;
    this.selectedActivityId = activity != null ? activity.parentId != null ? activity.parentId : activity.id : null;
  }
  async onActivitySelected(e) {
    this.selectedActivityId = e.detail.activityId;
    await this.journal.selectActivityRecord(this.selectedActivityId);
  }
  async onActivityDeselected(e) {
    if (this.selectedActivityId == e.detail.activityId)
      this.selectedActivityId = null;
    await this.journal.selectActivityRecord(this.selectedActivityId);
  }
  async onActivityContextMenuButtonClicked(e) {
    this.activityContextMenuState = e.detail;
    this.activityStats = null;
    if (!e.detail.shown) {
      return;
    }
    const elsaClient = createElsaClient(this.serverUrl);
    this.activityStats = await elsaClient.activityStatsApi.get(this.workflowInstanceId, e.detail.activity.activityId);
  }
  render() {
    const descriptors = state.activityDescriptors;
    return (h(Host, { class: "elsa-flex elsa-flex-col elsa-w-full elsa-relative", ref: el => this.el = el }, this.renderCanvas(), h("elsa-workflow-instance-journal", { ref: el => this.journal = el, workflowInstanceId: this.workflowInstanceId, serverUrl: this.serverUrl, activityDescriptors: descriptors, workflowBlueprint: this.workflowBlueprint, workflowModel: this.workflowModel, onRecordSelected: e => this.onRecordSelected(e) })));
  }
  renderCanvas() {
    return (h("div", { class: "elsa-flex-1 elsa-flex" }, h("elsa-designer-tree", { model: this.workflowModel, class: "elsa-flex-1", ref: el => this.designer = el, mode: WorkflowDesignerMode.Instance, activityContextMenuButton: this.renderActivityStatsButton, activityBorderColor: this.getActivityBorderColor, activityContextMenu: this.activityContextMenuState, selectedActivityIds: [this.selectedActivityId], onActivitySelected: e => this.onActivitySelected(e), onActivityDeselected: e => this.onActivityDeselected(e), onActivityContextMenuButtonClicked: e => this.onActivityContextMenuButtonClicked(e) }), this.renderActivityPerformanceMenu()));
  }
  static get watchers() { return {
    "workflowInstanceId": ["workflowInstanceIdChangedHandler"],
    "serverUrl": ["serverUrlChangedHandler"]
  }; }
};

export { ElsaWorkflowInstanceViewerScreen as elsa_workflow_instance_viewer_screen };
