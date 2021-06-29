import { Component, Event, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { addConnection, findActivity, getChildActivities, getInboundConnections, getOutboundConnections, removeActivity, removeConnection } from '../../../../utils/utils';
import { ActivityTraits, EventTypes, WorkflowPersistenceBehavior, } from '../../../../models';
import { eventBus } from '../../../../services/event-bus';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import state from '../../../../utils/store';
import { ActivityIcon } from '../../../icons/activity-icon';
import { LayoutDirection, WorkflowDesignerMode } from "./models";
export class ElsaWorkflowDesigner {
  constructor() {
    this.model = { activities: [], connections: [], persistenceBehavior: WorkflowPersistenceBehavior.WorkflowBurst };
    this.selectedActivityIds = [];
    this.mode = WorkflowDesignerMode.Edit;
    this.layoutDirection = LayoutDirection.Vertical;
    this.activityContextMenuState = {
      shown: false,
      x: 0,
      y: 0,
      activity: null,
    };
    this.zoomParams = { x: 0, y: 0, scale: 1 };
    this.dagreD3Renderer = new dagreD3.render();
    this.graph = new dagreD3.graphlib.Graph().setGraph({});
    this.addingActivity = false;
    this.activityDisplayContexts = {};
    this.selectedActivities = {};
    this.onActivityPicked = async (args) => {
      const activityDescriptor = args;
      const activityModel = this.newActivity(activityDescriptor);
      this.addingActivity = true;
      this.showActivityEditorInternal(activityModel, false);
    };
    this.onUpdateActivity = args => {
      const activityModel = args;
      if (this.addingActivity) {
        console.debug(`adding activity with ID ${activityModel.activityId}`);
        const connectFromRoot = !this.parentActivityOutcome || this.parentActivityOutcome == '';
        const sourceId = connectFromRoot ? null : this.parentActivityId;
        const targetId = connectFromRoot ? this.parentActivityId : null;
        this.addActivity(activityModel, sourceId, targetId, this.parentActivityOutcome);
        this.addingActivity = false;
      }
      else {
        console.debug(`updating activity with ID ${activityModel.activityId}`);
        this.updateActivity(activityModel);
      }
    };
  }
  handleContextMenuChange(state) {
    this.activityContextMenuState = state;
    this.activityContextMenuButtonClicked.emit(state);
  }
  handleModelChanged(newValue) {
    this.updateWorkflowModel(newValue, false);
  }
  handleSelectedActivityIdsChanged(newValue) {
    const ids = newValue || [];
    const selectedActivities = this.workflowModel.activities.filter(x => ids.includes(x.activityId));
    const map = {};
    for (const activity of selectedActivities)
      map[activity.activityId] = activity;
    this.selectedActivities = map;
    this.tryRerenderTree();
  }
  handleActivityContextMenuChanged(newValue) {
    this.activityContextMenuState = newValue;
  }
  async removeActivity(activity) {
    this.removeActivityInternal(activity);
  }
  async showActivityEditor(activity, animate) {
    this.showActivityEditorInternal(activity, animate);
  }
  connectedCallback() {
    eventBus.on(EventTypes.ActivityPicked, this.onActivityPicked);
    eventBus.on(EventTypes.UpdateActivity, this.onUpdateActivity);
  }
  disconnectedCallback() {
    eventBus.off(EventTypes.ActivityPicked, this.onActivityPicked);
    eventBus.off(EventTypes.UpdateActivity, this.onUpdateActivity);
    d3.selectAll('.node').on('click', null);
    d3.selectAll('.edgePath').on('contextmenu', null);
  }
  componentWillLoad() {
    this.workflowModel = this.model;
  }
  componentDidLoad() {
    this.svgD3Selected = d3.select(this.svg);
    this.innerD3Selected = d3.select(this.inner);
    this.tryRerenderTree(1200);
  }
  componentWillRender() {
    const activityModels = this.workflowModel.activities;
    const displayContexts = {};
    const activityDescriptors = state.activityDescriptors;
    for (const model of activityModels) {
      const descriptor = activityDescriptors.find(x => x.type == model.type);
      const description = model.description;
      const bodyText = description && description.length > 0 ? description : undefined;
      const bodyDisplay = bodyText ? `<p>${bodyText}</p>` : undefined;
      const color = (descriptor.traits &= ActivityTraits.Trigger) == ActivityTraits.Trigger ? 'rose' : 'light-blue';
      const displayName = model.displayName;
      const displayContext = {
        activityModel: model,
        activityIcon: h(ActivityIcon, { color: color }),
        bodyDisplay: bodyDisplay,
        displayName: displayName,
        outcomes: [...model.outcomes],
      };
      eventBus.emit(EventTypes.ActivityDesignDisplaying, this, displayContext);
      displayContexts[model.activityId] = displayContext;
    }
    this.activityDisplayContexts = displayContexts;
  }
  showActivityEditorInternal(activity, animate) {
    eventBus.emit(EventTypes.ShowActivityEditor, this, activity, animate);
  }
  handleEditActivity(activity) {
    this.showActivityEditorInternal(activity, true);
  }
  updateWorkflowModel(model, emitEvent = true) {
    this.workflowModel = this.cleanWorkflowModel(model);
    if (emitEvent)
      this.workflowChanged.emit(model);
    this.tryRerenderTree();
  }
  cleanWorkflowModel(model) {
    // Detect duplicate activities and throw.
    const activityIds = model.activities.map(x => x.activityId);
    const count = ids => ids.reduce((a, b) => (Object.assign(Object.assign({}, a), { [b]: (a[b] || 0) + 1 })), {});
    const duplicates = dict => Object.keys(dict).filter((a) => dict[a] > 1);
    const duplicateIds = duplicates(count(activityIds));
    if (duplicateIds.length > 0) {
      console.error(duplicateIds);
      throw Error(`Found duplicate activities. Throwing for now until we find the root cause.`);
    }
    model.connections = model.connections.filter(connection => {
      const sourceId = connection.sourceId;
      const targetId = connection.targetId;
      const sourceExists = model.activities.findIndex(x => x.activityId == sourceId) != null;
      const targetExists = model.activities.findIndex(x => x.activityId == targetId) != null;
      if (!sourceExists)
        connection.sourceId = null;
      if (!targetExists)
        connection.targetId = null;
      return !!connection.sourceId || !!connection.targetId;
    });
    return model;
  }
  removeActivityInternal(activity) {
    let workflowModel = Object.assign({}, this.workflowModel);
    const incomingConnections = getInboundConnections(workflowModel, activity.activityId);
    const outgoingConnections = getOutboundConnections(workflowModel, activity.activityId);
    // Remove activity (will also remove its connections).
    workflowModel = removeActivity(workflowModel, activity.activityId);
    // For each incoming activity, try to connect it to a outgoing activity based on outcome.
    for (const incomingConnection of incomingConnections) {
      const incomingActivity = findActivity(workflowModel, incomingConnection.sourceId);
      const outgoingConnection = outgoingConnections.find(x => x.outcome === incomingConnection.outcome);
      if (outgoingConnection)
        workflowModel = addConnection(workflowModel, incomingActivity.activityId, outgoingConnection.targetId, incomingConnection.outcome);
    }
    this.updateWorkflowModel(workflowModel);
  }
  newActivity(activityDescriptor) {
    const activity = {
      activityId: uuid(),
      activityType: activityDescriptor.activityType,
      type: activityDescriptor.type,
      subType: activityDescriptor.subType,
      action: activityDescriptor.action,
      event: activityDescriptor.event,
      outcomes: activityDescriptor.outcomes,
      displayName: activityDescriptor.displayName,
      properties: [],
      propertyStorageProviders: {}
    };
    for (const property of activityDescriptor.inputProperties) {
      activity.properties[property.name] = {
        syntax: '',
        expression: '',
      };
    }
    return activity;
  }
  createAndAddActivity(activityDescriptor, sourceActivityId, targetActivityId, outcome) {
    outcome = outcome || 'Done';
    const activity = this.newActivity(activityDescriptor);
    this.addActivity(activity, sourceActivityId, targetActivityId, outcome);
    return activity;
  }
  addActivity(activity, sourceActivityId, targetActivityId, outcome) {
    outcome = outcome || 'Done';
    const workflowModel = Object.assign(Object.assign({}, this.workflowModel), { activities: [...this.workflowModel.activities, activity] });
    if (targetActivityId) {
      const existingConnection = workflowModel.connections.find(x => x.targetId == targetActivityId && x.outcome == outcome);
      if (existingConnection) {
        workflowModel.connections = workflowModel.connections.filter(x => x != existingConnection);
        const replacementConnection = Object.assign(Object.assign({}, existingConnection), { sourceId: activity.activityId });
        workflowModel.connections.push(replacementConnection);
      }
      else {
        workflowModel.connections.push({ sourceId: activity.activityId, targetId: targetActivityId, outcome: outcome });
      }
    }
    if (sourceActivityId != null) {
      const existingConnection = workflowModel.connections.find(x => x.sourceId == sourceActivityId && x.outcome == outcome);
      if (existingConnection != null) {
        workflowModel.connections = workflowModel.connections.filter(x => x != existingConnection);
        const replacementConnection = Object.assign(Object.assign({}, existingConnection), { targetId: activity.activityId });
        workflowModel.connections.push(replacementConnection);
        const connection = { sourceId: activity.activityId, targetId: existingConnection.targetId, outcome };
        workflowModel.connections.push(connection);
      }
      else {
        const connection = { sourceId: sourceActivityId, targetId: activity.activityId, outcome: outcome };
        workflowModel.connections.push(connection);
      }
    }
    this.updateWorkflowModel(workflowModel);
    this.parentActivityId = null;
    this.parentActivityOutcome = null;
  }
  getRootActivities() {
    return getChildActivities(this.workflowModel, null);
  }
  addConnection(sourceActivityId, targetActivityId, outcome) {
    const workflowModel = Object.assign({}, this.workflowModel);
    const connection = { sourceId: sourceActivityId, targetId: targetActivityId, outcome: outcome };
    workflowModel.connections.push(connection);
    this.updateWorkflowModel(workflowModel);
    this.parentActivityId = null;
    this.parentActivityOutcome = null;
  }
  updateActivity(activity) {
    let workflowModel = Object.assign({}, this.workflowModel);
    const activities = [...workflowModel.activities];
    const index = activities.findIndex(x => x.activityId === activity.activityId);
    activities[index] = activity;
    this.updateWorkflowModel(Object.assign(Object.assign({}, workflowModel), { activities: activities }));
  }
  showActivityPicker() {
    eventBus.emit(EventTypes.ShowActivityPicker);
  }
  removeConnection(sourceId, outcome) {
    let workflowModel = Object.assign({}, this.workflowModel);
    workflowModel = removeConnection(workflowModel, sourceId, outcome);
    this.updateWorkflowModel(workflowModel);
  }
  applyZoom() {
    this.zoom = d3.zoom().on('zoom', event => {
      const { transform } = event;
      this.innerD3Selected.attr('transform', transform);
      this.zoomParams = {
        x: transform.x,
        y: transform.y,
        scale: transform.k,
      };
    });
    this.svgD3Selected.call(this.zoom);
  }
  setEntities() {
    this.graph = new dagreD3.graphlib.Graph().setGraph({});
    const layoutDirection = this.layoutDirection;
    this.graph.graph().rankdir = layoutDirection == LayoutDirection.Vertical ? 'TB' : 'LR';
    const rootActivities = this.getRootActivities();
    // Start node.
    this.graph.setNode('start', {
      shape: 'rect',
      label: this.mode == WorkflowDesignerMode.Edit
        ? `<button class="elsa-px-6 elsa-py-3 elsa-border elsa-border-transparent elsa-text-base elsa-leading-6 elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-green-600 hover:elsa-bg-green-500 focus:elsa-outline-none focus:elsa-border-green-700 focus:elsa-shadow-outline-green active:elsa-bg-green-700 elsa-transition elsa-ease-in-out elsa-duration-150">Start</button>`
        : `<button class="elsa-px-6 elsa-py-3 elsa-border elsa-border-transparent elsa-text-base elsa-leading-6 elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-green-600 focus:elsa-outline-none elsa-cursor-default">Start</button>`,
      rx: 5,
      ry: 5,
      labelType: 'html',
      class: 'start',
    });
    // Connections between Start and root activities.
    rootActivities.forEach(activity => {
      this.graph.setEdge('start', `${activity.activityId}/start`, {
        arrowhead: 'undirected',
      });
      this.graph.setNode(`${activity.activityId}/start`, { shape: 'rect', activity, label: this.renderOutcomeButton(), labelType: 'html', class: 'add' });
      this.graph.setEdge(`${activity.activityId}/start`, activity.activityId, { arrowhead: 'undirected' });
    });
    // Connections between activities and their outcomes.
    this.workflowModel.activities.forEach(activity => {
      this.graph.setNode(activity.activityId, this.createActivityOptions(activity));
      const displayContext = this.activityDisplayContexts[activity.activityId] || undefined;
      const outcomes = !!displayContext ? displayContext.outcomes : activity.outcomes || [];
      outcomes.forEach(outcome => {
        this.graph.setNode(`${activity.activityId}/${outcome}`, { shape: 'rect', outcome, activity, label: this.renderOutcomeButton(), labelType: 'html', class: 'add' });
        this.graph.setEdge(activity.activityId, `${activity.activityId}/${outcome}`, {
          label: `<p class="elsa-outcome elsa-mb-4 elsa-relative elsa-z-10 elsa-px-2.5 elsa-py-0.5 elsa-rounded-full elsa-text-xs elsa-font-medium elsa-leading-4 elsa-bg-cool-gray-100 elsa-text-cool-gray-800 elsa-capitalize elsa-cursor-default">${outcome}</p>`,
          labelpos: 'c',
          labelType: 'html',
          arrowhead: 'undirected',
        });
      });
    });
    this.workflowModel.connections.forEach(({ sourceId, targetId, outcome }) => {
      const sourceName = `${sourceId}/${outcome}`;
      if (!this.graph.hasNode(sourceName)) {
        console.warn(`No source node with ID '${sourceName}' exists.`);
        return;
      }
      this.graph.setEdge(sourceName, targetId, { arrowhead: 'undirected' });
    });
  }
  tryRerenderTree(waitTime, attempt) {
    const maxTries = 3;
    waitTime = waitTime || 50;
    attempt = attempt || 0;
    setTimeout(() => {
      try {
        this.rerenderTree();
      }
      catch (e) {
        console.warn(`Attempt ${attempt + 1} failed while trying to render tree. Retrying ${maxTries - attempt + 1} more times.`);
        if (attempt < maxTries)
          this.tryRerenderTree(100, attempt + 1);
      }
    }, waitTime);
  }
  renderNodes() {
    const prevTransform = this.innerD3Selected.attr('transform');
    const scaleAfter = this.zoomParams.scale;
    this.svgD3Selected.call(this.zoom.scaleTo, 1);
    this.dagreD3Renderer(this.innerD3Selected, this.graph);
    this.svgD3Selected.call(this.zoom.scaleTo, scaleAfter);
    this.innerD3Selected.attr('transform', prevTransform);
    if (this.mode == WorkflowDesignerMode.Edit) {
      d3.selectAll('.node.add').each((n) => {
        const node = this.graph.node(n);
        d3.select(node.elem)
          .on('click', e => {
          e.preventDefault();
          d3.selectAll('.node.add svg').classed('elsa-text-green-400', false).classed('elsa-text-gray-400', true).classed('hover:elsa-text-blue-500', true);
          this.parentActivityId = node.activity.activityId;
          this.parentActivityOutcome = node.outcome;
          if (e.shiftKey) {
            d3.select(node.elem).select('svg').classed('elsa-text-green-400', true).classed('elsa-text-gray-400', false).classed('hover:elsa-text-blue-500', false);
            return;
          }
          this.showActivityPicker();
        })
          .on("mouseover", e => {
          if (e.shiftKey)
            d3.select(node.elem).select('svg').classed('elsa-text-green-400', true).classed('hover:elsa-text-blue-500', false);
        })
          .on("mouseout", e => {
          d3.select(node.elem).select('svg').classed('elsa-text-green-400', false).classed('hover:elsa-text-blue-500', true);
        });
      });
      d3.selectAll('.node.start').each((n) => {
        const node = this.graph.node(n);
        d3.select(node.elem).on('click', e => {
          this.showActivityPicker();
        });
      });
      d3.selectAll('.edgePath').append(appendClickableEl).attr('class', 'label-clickable');
      function appendClickableEl() {
        const originalD = this.querySelector('.path').getAttribute('d');
        const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        newPath.setAttribute('d', originalD);
        return this.appendChild(newPath);
      }
      d3.selectAll('.edgePath').each((edg) => {
        const edge = this.graph.edge(edg);
        d3.select(edge.elem).on('contextmenu', e => {
          e.preventDefault();
          const from = edg.v.split('/');
          const to = edg.w.split('/');
          const fromActivityId = from[0];
          const outcome = from[1] || to[1];
          this.removeConnection(fromActivityId, outcome);
        });
      });
    }
    d3.selectAll('.node.activity').each((n) => {
      const node = this.graph.node(n);
      const activity = node.activity;
      const activityId = activity.activityId;
      d3.select(node.elem).on('click', () => {
        // If a parent activity was selected to connect to:
        if (this.mode == WorkflowDesignerMode.Edit && this.parentActivityId && this.parentActivityOutcome) {
          this.addConnection(this.parentActivityId, activityId, this.parentActivityOutcome);
        }
        else {
          // When clicking an activity:
          if (!!this.selectedActivities[activityId])
            delete this.selectedActivities[activityId];
          else {
            for (const key in this.selectedActivities) {
              this.activityDeselected.emit(this.selectedActivities[key]);
            }
            this.selectedActivities = {};
            this.selectedActivities[activityId] = activity;
            this.activitySelected.emit(activity);
          }
          this.rerenderTree();
        }
      });
      if (this.mode == WorkflowDesignerMode.Edit || this.mode == WorkflowDesignerMode.Instance) {
        d3.select(node.elem)
          .select('.context-menu-button-container button')
          .on('click', evt => {
          evt.stopPropagation();
          this.handleContextMenuChange({ x: evt.clientX, y: evt.clientY, shown: true, activity: node.activity });
        });
      }
    });
  }
  rerenderTree() {
    this.applyZoom();
    this.setEntities();
    this.renderNodes();
  }
  createActivityOptions(activity) {
    return {
      shape: 'rect',
      label: this.renderActivity(activity),
      rx: 5,
      ry: 5,
      labelType: 'html',
      class: 'activity',
      activity,
    };
  }
  createOutcomeActivityOptions() {
    return { shape: 'circle', label: this.renderOutcomeButton(), labelType: 'html', class: 'add', width: 32, height: 32 };
  }
  renderOutcomeButton() {
    const cssClass = this.mode == WorkflowDesignerMode.Edit ? 'hover:elsa-text-blue-500 elsa-cursor-pointer' : 'elsa-cursor-default';
    return `<svg class="elsa-h-8 elsa-w-8 elsa-text-gray-400 ${cssClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;
  }
  renderActivity(activity) {
    const displayContext = this.activityDisplayContexts[activity.activityId] || undefined;
    const activityContextMenuButton = !!this.activityContextMenuButton ? this.activityContextMenuButton(activity) : '';
    const activityBorderColor = !!this.activityBorderColor ? this.activityBorderColor(activity) : 'gray';
    const selectedColor = !!this.activityBorderColor ? activityBorderColor : 'blue';
    const cssClass = !!this.selectedActivities[activity.activityId] ? `elsa-border-${selectedColor}-600` : `elsa-border-${activityBorderColor}-200 hover:elsa-border-${selectedColor}-600`;
    const displayName = displayContext.displayName || activity.displayName;
    return `<div id=${`activity-${activity.activityId}`} 
    class="activity elsa-border-2 elsa-border-solid elsa-rounded elsa-bg-white elsa-text-left elsa-text-black elsa-text-lg elsa-select-none elsa-max-w-md elsa-shadow-sm elsa-relative ${cssClass}">
      <div class="elsa-p-5">
        <div class="elsa-flex elsa-justify-between elsa-space-x-8">
          <div class="elsa-flex-shrink-0">
          ${(displayContext === null || displayContext === void 0 ? void 0 : displayContext.activityIcon) || ''}
          </div>
          <div class="elsa-flex-1 elsa-font-medium elsa-leading-8">
            <p class="elsa-overflow-ellipsis">${displayName}</p>
          </div>
          <div class="context-menu-button-container">
            ${activityContextMenuButton}
          </div>
        </div>
      </div>
      ${this.renderActivityBody(displayContext)}
      </div>`;
  }
  renderActivityBody(displayContext) {
    const activityPropertiesContent = [];
    displayContext.activityModel.properties.forEach(property => {
      activityPropertiesContent.push(this.renderActivityProperties(property));
    });
    return `<div class="elsa-border-t elsa-border-t-solid">
    <div class="elsa-p-6 elsa-text-gray-400 elsa-text-sm">
      <div class="elsa-mb-2">${!!displayContext.bodyDisplay ? displayContext.bodyDisplay : ''}</div>
      ${activityPropertiesContent.join('<br>')}
    </div>
</div>`;
  }
  renderActivityProperties(property) {
    return (`
      <div>
      <span class="elsa-inline-flex elsa-items-center elsa-px-2.5 elsa-py-0.5 elsa-rounded-full elsa-text-xs elsa-font-medium elsa-bg-gray-100 elsa-text-gray-500">
        <svg class="-elsa-ml-0.5 elsa-mr-1.5 elsa-h-2 elsa-w-2 elsa-text-gray-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        <div class="elsa-inline-flex">
        <b class="elsa-mr-1.5">${property.name}:</b>
        <p>${property.expressions.Literal}</p>
        </div><br>
       
      </span>
    </div>
    
      `);
  }
  render() {
    return (h(Host, { class: "workflow-canvas elsa-flex-1 elsa-flex", ref: el => (this.el = el) },
      h("svg", { ref: el => (this.svg = el), id: "svg", style: { height: 'calc(100vh - 64px)', width: '100%', pointerEvents: this.activityContextMenuState.shown ? 'none' : '' } },
        h("g", { ref: el => (this.inner = el) }))));
  }
  static get is() { return "elsa-designer-tree"; }
  static get originalStyleUrls() { return {
    "$": ["elsa-designer-tree.css"]
  }; }
  static get styleUrls() { return {
    "$": ["elsa-designer-tree.css"]
  }; }
  static get assetsDirs() { return ["assets"]; }
  static get properties() { return {
    "model": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "WorkflowModel",
        "resolved": "WorkflowModel",
        "references": {
          "WorkflowModel": {
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
      },
      "defaultValue": "{activities: [], connections: [], persistenceBehavior: WorkflowPersistenceBehavior.WorkflowBurst}"
    },
    "selectedActivityIds": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Array<string>",
        "resolved": "string[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[]"
    },
    "activityContextMenuButton": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(activity: ActivityModel) => string",
        "resolved": "(activity: ActivityModel) => string",
        "references": {
          "ActivityModel": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "activityBorderColor": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(activity: ActivityModel) => string",
        "resolved": "(activity: ActivityModel) => string",
        "references": {
          "ActivityModel": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "activityContextMenu": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ActivityContextMenuState",
        "resolved": "ActivityContextMenuState",
        "references": {
          "ActivityContextMenuState": {
            "location": "import",
            "path": "./models"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "mode": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "WorkflowDesignerMode",
        "resolved": "WorkflowDesignerMode.Blueprint | WorkflowDesignerMode.Edit | WorkflowDesignerMode.Instance",
        "references": {
          "WorkflowDesignerMode": {
            "location": "import",
            "path": "./models"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "mode",
      "reflect": false,
      "defaultValue": "WorkflowDesignerMode.Edit"
    },
    "layoutDirection": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "LayoutDirection",
        "resolved": "LayoutDirection.Horizontal | LayoutDirection.Vertical",
        "references": {
          "LayoutDirection": {
            "location": "import",
            "path": "./models"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "layout-direction",
      "reflect": false,
      "defaultValue": "LayoutDirection.Vertical"
    }
  }; }
  static get states() { return {
    "workflowModel": {},
    "activityContextMenuState": {}
  }; }
  static get events() { return [{
      "method": "workflowChanged",
      "name": "workflow-changed",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "WorkflowModel",
        "resolved": "WorkflowModel",
        "references": {
          "WorkflowModel": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      }
    }, {
      "method": "activitySelected",
      "name": "activitySelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "ActivityModel",
        "resolved": "ActivityModel",
        "references": {
          "ActivityModel": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      }
    }, {
      "method": "activityDeselected",
      "name": "activityDeselected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "ActivityModel",
        "resolved": "ActivityModel",
        "references": {
          "ActivityModel": {
            "location": "import",
            "path": "../../../../models"
          }
        }
      }
    }, {
      "method": "activityContextMenuButtonClicked",
      "name": "activityContextMenuButtonClicked",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "ActivityContextMenuState",
        "resolved": "ActivityContextMenuState",
        "references": {
          "ActivityContextMenuState": {
            "location": "import",
            "path": "./models"
          }
        }
      }
    }]; }
  static get methods() { return {
    "removeActivity": {
      "complexType": {
        "signature": "(activity: ActivityModel) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "ActivityModel": {
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
    "showActivityEditor": {
      "complexType": {
        "signature": "(activity: ActivityModel, animate: boolean) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }, {
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "ActivityModel": {
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
    }
  }; }
  static get watchers() { return [{
      "propName": "model",
      "methodName": "handleModelChanged"
    }, {
      "propName": "selectedActivityIds",
      "methodName": "handleSelectedActivityIdsChanged"
    }, {
      "propName": "activityContextMenu",
      "methodName": "handleActivityContextMenuChanged"
    }]; }
}
