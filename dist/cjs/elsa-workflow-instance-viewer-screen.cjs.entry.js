'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const eventBus = require('./event-bus-468c034a.js');
const collection = require('./collection-542fafac.js');
const domain = require('./domain-ec2ef82c.js');
const pluginManager = require('./plugin-manager-64cf2928.js');
const elsaClient = require('./elsa-client-90ac335e.js');
const index$1 = require('./index-1d5f86ef.js');
const moment = require('./moment-46bb99d3.js');
const utils = require('./utils-bb625a12.js');
require('./_commonjsHelpers-206db00d.js');
require('./activity-icon-provider-b089a264.js');

const ElsaWorkflowInstanceViewerScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
          return (index.h("div", null, index.h("div", { class: "elsa-mb-4" }, index.h("strong", { class: "elsa-block elsa-font-bold" }, exception.type), exception.message), !!exception.innerException ? index.h("div", { class: "elsa-ml-4" }, renderExceptionMessage(exception.innerException)) : undefined));
        };
        return [
          index.h("div", { class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-red-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("circle", { cx: "12", cy: "12", r: "10" }), index.h("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), index.h("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Fault"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, renderExceptionMessage(workflowFault.exception), index.h("pre", { class: "elsa-overflow-x-scroll elsa-max-w-md", onClick: e => utils.clip(e.currentTarget) }, JSON.stringify(workflowFault, null, 1))))),
          index.h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("rect", { x: "4", y: "5", width: "16", height: "16", rx: "2" }), index.h("line", { x1: "16", y1: "3", x2: "16", y2: "7" }), index.h("line", { x1: "8", y1: "3", x2: "8", y2: "7" }), index.h("line", { x1: "4", y1: "11", x2: "20", y2: "11" }), index.h("line", { x1: "11", y1: "15", x2: "12", y2: "15" }), index.h("line", { x1: "12", y1: "15", x2: "12", y2: "18" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Faulted At"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, moment.hooks(this.workflowInstance.faultedAt).format('DD-MM-YYYY HH:mm:ss'))))
        ];
      };
      const renderPerformance = () => {
        if (!!activityStats.fault)
          return;
        return [index.h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-indigo-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("circle", { cx: "12", cy: "12", r: "9" }), index.h("polyline", { points: "12 7 12 12 15 15" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Average Execution Time"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, utils.durationToString(moment.hooks.duration(activityStats.averageExecutionTime))))),
          index.h("a", { href: "#", class: "-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-green-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("circle", { cx: "12", cy: "12", r: "9" }), index.h("polyline", { points: "12 7 12 12 15 15" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Fastest Execution Time"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, utils.durationToString(moment.hooks.duration(activityStats.fastestExecutionTime))))),
          index.h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-yellow-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("circle", { cx: "12", cy: "12", r: "9" }), index.h("polyline", { points: "12 7 12 12 15 15" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Slowest Execution Time"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, utils.durationToString(moment.hooks.duration(activityStats.slowestExecutionTime))))),
          index.h("a", { href: "#", class: "-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("rect", { x: "4", y: "5", width: "16", height: "16", rx: "2" }), index.h("line", { x1: "16", y1: "3", x2: "16", y2: "7" }), index.h("line", { x1: "8", y1: "3", x2: "8", y2: "7" }), index.h("line", { x1: "4", y1: "11", x2: "20", y2: "11" }), index.h("line", { x1: "11", y1: "15", x2: "12", y2: "15" }), index.h("line", { x1: "12", y1: "15", x2: "12", y2: "18" })), index.h("div", { class: "elsa-ml-4" }, index.h("p", { class: "elsa-text-base elsa-font-medium elsa-text-gray-900" }, "Last Executed At"), index.h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, moment.hooks(activityStats.lastExecutedAt).format('DD-MM-YYYY HH:mm:ss'))))];
      };
      const renderStats = function () {
        return (index.h("div", null, index.h("div", null, index.h("table", { class: "elsa-min-w-full elsa-divide-y elsa-divide-gray-200 elsa-border-b elsa-border-gray-200" }, index.h("thead", { class: "elsa-bg-gray-50" }, index.h("tr", null, index.h("th", { scope: "col", class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider" }, "Event"), index.h("th", { scope: "col", class: "elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider" }, "Count"))), index.h("tbody", { class: "elsa-bg-white elsa-divide-y elsa-divide-gray-200" }, activityStats.eventCounts.length > 0 ? activityStats.eventCounts.map(eventCount => (index.h("tr", null, index.h("td", { class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900" }, eventCount.eventName), index.h("td", { class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-text-gray-500" }, eventCount.count)))) : index.h("tr", null, index.h("td", { colSpan: 2, class: "elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900" }, "No events record for this activity."))))), activityStats.eventCounts.length > 0 ? (index.h("div", { class: "elsa-relative elsa-grid elsa-gap-6 elsa-bg-white px-5 elsa-py-6 sm:elsa-gap-8 sm:elsa-p-8" }, renderFault(), renderPerformance())) : undefined));
      };
      const renderLoader = function () {
        return index.h("div", { class: "elsa-p-6 elsa-bg-white" }, "Loading...");
      };
      return index.h("div", { "data-transition-enter": "elsa-transition elsa-ease-out elsa-duration-100", "data-transition-enter-start": "elsa-transform elsa-opacity-0 elsa-scale-95", "data-transition-enter-end": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave": "elsa-transition elsa-ease-in elsa-duration-75", "data-transition-leave-start": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave-end": "elsa-transform elsa-opacity-0 elsa-scale-95", class: `${this.activityContextMenuState.shown ? '' : 'hidden'} elsa-absolute elsa-z-10 elsa-mt-3 elsa-px-2 elsa-w-screen elsa-max-w-xl sm:elsa-px-0`, style: { left: `${this.activityContextMenuState.x + 64}px`, top: `${this.activityContextMenuState.y - 256}px` }, ref: el => index$1.registerClickOutside(this, el, () => {
          this.handleContextMenuChange(0, 0, false, null);
        }) }, index.h("div", { class: "elsa-rounded-lg elsa-shadow-lg elsa-ring-1 elsa-ring-black elsa-ring-opacity-5 elsa-overflow-hidden" }, !!activityStats ? renderStats() : renderLoader()));
    };
    pluginManager.pluginManager.initialize();
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
      workflowStatus: domain.WorkflowStatus.Idle,
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
    const client = elsaClient.createElsaClient(this.serverUrl);
    pluginManager.state.activityDescriptors = await client.activitiesApi.list();
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
    eventBus.eventBus.emit(pluginManager.EventTypes.ShowWorkflowSettings);
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
    const elsaClient$1 = elsaClient.createElsaClient(this.serverUrl);
    this.activityStats = await elsaClient$1.activityStatsApi.get(this.workflowInstanceId, e.detail.activity.activityId);
  }
  render() {
    const descriptors = pluginManager.state.activityDescriptors;
    return (index.h(index.Host, { class: "elsa-flex elsa-flex-col elsa-w-full elsa-relative", ref: el => this.el = el }, this.renderCanvas(), index.h("elsa-workflow-instance-journal", { ref: el => this.journal = el, workflowInstanceId: this.workflowInstanceId, serverUrl: this.serverUrl, activityDescriptors: descriptors, workflowBlueprint: this.workflowBlueprint, workflowModel: this.workflowModel, onRecordSelected: e => this.onRecordSelected(e) })));
  }
  renderCanvas() {
    return (index.h("div", { class: "elsa-flex-1 elsa-flex" }, index.h("elsa-designer-tree", { model: this.workflowModel, class: "elsa-flex-1", ref: el => this.designer = el, mode: pluginManager.WorkflowDesignerMode.Instance, activityContextMenuButton: this.renderActivityStatsButton, activityBorderColor: this.getActivityBorderColor, activityContextMenu: this.activityContextMenuState, selectedActivityIds: [this.selectedActivityId], onActivitySelected: e => this.onActivitySelected(e), onActivityDeselected: e => this.onActivityDeselected(e), onActivityContextMenuButtonClicked: e => this.onActivityContextMenuButtonClicked(e) }), this.renderActivityPerformanceMenu()));
  }
  static get watchers() { return {
    "workflowInstanceId": ["workflowInstanceIdChangedHandler"],
    "serverUrl": ["serverUrlChangedHandler"]
  }; }
};

exports.elsa_workflow_instance_viewer_screen = ElsaWorkflowInstanceViewerScreen;
