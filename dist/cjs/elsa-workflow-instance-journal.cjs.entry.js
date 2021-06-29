'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const collection = require('./collection-542fafac.js');
const moment = require('./moment-46bb99d3.js');
const index$1 = require('./index-169661bf.js');
const activityIconProvider = require('./activity-icon-provider-b089a264.js');
const elsaClient = require('./elsa-client-90ac335e.js');
const utils = require('./utils-bb625a12.js');
require('./_commonjsHelpers-206db00d.js');
require('./domain-ec2ef82c.js');

const ElsaWorkflowInstanceJournal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.recordSelected = index.createEvent(this, "recordSelected", 7);
    this.activityDescriptors = [];
    this.isVisible = true;
    this.records = { items: [], totalCount: 0 };
    this.filteredRecords = [];
    this.selectedTabId = 'journal';
    this.tabs = [];
    this.renderJournalTab = () => {
      const items = this.filteredRecords;
      const activityDescriptors = this.activityDescriptors;
      const workflowBlueprint = this.workflowBlueprint;
      const activityBlueprints = workflowBlueprint.activities || [];
      const selectedRecordId = this.selectedRecordId;
      const renderRecord = (record, index$1) => {
        const isLastItem = index$1 == items.length - 1;
        const nextItem = isLastItem ? null : items[index$1 + 1];
        const currentTimestamp = moment.hooks(record.timestamp);
        const nextTimestamp = isLastItem ? null : moment.hooks(nextItem.timestamp);
        const deltaTime = isLastItem ? null : moment.hooks.duration(nextTimestamp.diff(currentTimestamp));
        const activityType = record.activityType;
        const activityIcon = activityIconProvider.activityIconProvider.getIcon(activityType);
        const activityDescriptor = activityDescriptors.find(x => x.type === activityType);
        const activityBlueprint = activityBlueprints.find(x => x.id === record.activityId) || { name: null, displayName: null };
        const activityName = activityBlueprint.displayName || activityBlueprint.name || activityDescriptor.displayName || activityDescriptor.type;
        const eventName = record.eventName;
        const eventColor = this.getEventColor(eventName);
        const recordClass = record.id === selectedRecordId ? 'elsa-border-blue-600' : 'hover:elsa-bg-gray-100 elsa-border-transparent';
        const recordData = record.data || {};
        const filteredRecordData = {};
        const wellknownDataKeys = { State: true, Input: null, Outcomes: true, Exception: true };
        for (const key in recordData) {
          if (!recordData.hasOwnProperty(key))
            continue;
          if (!!wellknownDataKeys[key])
            continue;
          const value = recordData[key];
          if (!value)
            continue;
          let valueText = null;
          if (typeof value == 'string')
            valueText = value;
          else if (typeof value == 'object')
            valueText = JSON.stringify(value, null, 1);
          else if (typeof value == 'undefined')
            valueText = null;
          else
            valueText = value.toString();
          filteredRecordData[key] = valueText;
        }
        const deltaTimeText = utils.durationToString(deltaTime);
        const outcomes = !!recordData.Outcomes ? recordData.Outcomes || [] : [];
        const exception = !!recordData.Exception ? recordData.Exception : null;
        const renderExceptionMessage = (exception) => {
          return (index.h("div", null, index.h("div", { class: "elsa-mb-4" }, index.h("strong", { class: "elsa-block elsa-font-bold" }, exception.Type), exception.Message), !!exception.InnerException ? index.h("div", { class: "elsa-ml-4" }, renderExceptionMessage(exception.InnerException)) : undefined));
        };
        return (index.h("li", null, index.h("div", { onClick: () => this.onRecordClick(record), class: `${recordClass} elsa-border-2 elsa-cursor-pointer elsa-p-4 elsa-rounded` }, index.h("div", { class: "elsa-relative elsa-pb-10" }, isLastItem ? undefined : index.h("div", { class: "elsa-flex elsa-absolute top-8 elsa-left-4 -elsa-ml-px elsa-h-full elsa-w-0.5 elsa-bg-gray-200" }, index.h("div", { class: "elsa-flex elsa-flex-1 elsa-items-center elsa-relative elsa-right-10" }, index.h("span", { class: "elsa-flex-1 elsa-text-sm elsa-text-gray-500 elsa-w-max elsa-bg-white elsa-p-1 elsa-rounded" }, deltaTimeText))), index.h("div", { class: "elsa-relative elsa-flex elsa-space-x-3" }, index.h("div", null, index.h("span", { class: "elsa-h-8 elsa-w-8 elsa-rounded-full elsa-bg-green-500 elsa-flex elsa-items-center elsa-justify-center elsa-ring-8 elsa-ring-white", innerHTML: activityIcon })), index.h("div", { class: "elsa-min-w-0 elsa-flex-1 elsa-pt-1.5 elsa-flex elsa-justify-between elsa-space-x-4" }, index.h("div", null, index.h("h3", { class: "elsa-text-lg elsa-leading-6 elsa-font-medium elsa-text-gray-900" }, activityName)), index.h("div", null, index.h("span", { class: "elsa-relative elsa-inline-flex elsa-items-center elsa-rounded-full elsa-border elsa-border-gray-300 elsa-px-3 elsa-py-0.5 elsa-text-sm" }, index.h("span", { class: "elsa-absolute elsa-flex-shrink-0 elsa-flex elsa-items-center elsa-justify-center" }, index.h("span", { class: `elsa-h-1.5 elsa-w-1.5 elsa-rounded-full elsa-bg-${eventColor}-500`, "aria-hidden": "true" })), index.h("span", { class: "elsa-ml-3.5 elsa-font-medium elsa-text-gray-900" }, eventName))), index.h("div", { class: "elsa-text-right elsa-text-sm elsa-whitespace-nowrap elsa-text-gray-500" }, index.h("span", null, currentTimestamp.format('DD-MM-YYYY HH:mm:ss'))))), index.h("div", { class: "elsa-ml-12 elsa-mt-2" }, index.h("dl", { class: "sm:elsa-divide-y sm:elsa-divide-gray-200" }, index.h("div", { class: "elsa-grid elsa-grid-cols-2 elsa-gap-x-4 elsa-gap-y-8 sm:elsa-grid-cols-2" }, index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500" }, "Activity ID"), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900 elsa-mb-2" }, record.activityId)), outcomes.length > 0 ? (index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500" }, "Outcomes"), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900 elsa-mb-2" }, index.h("div", { class: "elsa-flex elsa-flex-col elsa-space-y-4 sm:elsa-space-y-0 sm:elsa-flex-row sm:elsa-space-x-4" }, outcomes.map(outcome => (index.h("span", { class: "elsa-inline-flex elsa-items-center elsa-px-3 elsa-py-0.5 elsa-rounded-full elsa-text-sm elsa-font-medium elsa-bg-blue-100 elsa-text-blue-800" }, outcome))))))) : undefined, !!record.message && !exception ? (index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500" }, "Message"), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900" }, record.message))) : undefined, !!exception ? ([index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500" }, "Exception"), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900" }, renderExceptionMessage(exception))),
          index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500" }, "Exception Details"), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900 elsa-overflow-x-auto" }, index.h("pre", { onClick: e => utils.clip(e.currentTarget) }, JSON.stringify(exception, null, 1))))]) : undefined, collection.collection.map(filteredRecordData, (v, k) => (index.h("div", { class: "sm:elsa-col-span-2" }, index.h("dt", { class: "elsa-text-sm elsa-font-medium elsa-text-gray-500 elsa-capitalize" }, k), index.h("dd", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-900 elsa-mb-2 elsa-overflow-x-auto" }, index.h("pre", { onClick: e => utils.clip(e.currentTarget) }, v))))))))))));
      };
      return (index.h("div", { class: "flow-root" }, index.h("ul", { class: "-elsa-mb-8" }, items.map(renderRecord))));
    };
    this.renderActivityStateTab = () => {
      const activityModel = !!this.workflowModel && this.selectedActivityId ? this.workflowModel.activities.find(x => x.activityId === this.selectedActivityId) : null;
      if (!activityModel)
        return index.h("p", null, "No activity selected");
      return (index.h("div", null, index.h("pre", null, JSON.stringify(activityModel, null, 2))));
    };
    this.tabs = [{
        id: 'journal',
        text: 'Journal',
        view: this.renderJournalTab
      }, {
        id: 'activityState',
        text: 'Activity State',
        view: this.renderActivityStateTab
      }];
  }
  async show() {
    if (this.isVisible)
      return;
    this.isVisible = true;
    index$1.enter(this.el);
  }
  async hide() {
    if (!this.isVisible)
      return;
    index$1.leave(this.el).then(() => this.isVisible = false);
  }
  async selectActivityRecord(activityId) {
    const record = !!activityId ? this.filteredRecords.find(x => x.activityId == activityId) : null;
    this.selectActivityRecordInternal(record);
    await this.show();
  }
  async workflowInstanceIdChangedHandler(newValue) {
    const workflowInstanceId = newValue;
    const client = elsaClient.createElsaClient(this.serverUrl);
    if (workflowInstanceId && workflowInstanceId.length > 0) {
      try {
        this.records = await client.workflowExecutionLogApi.get(workflowInstanceId);
        this.filteredRecords = this.records.items.filter(x => x.eventName != 'Executing' && x.eventName != 'Resuming');
      }
      catch (_a) {
        console.warn('The specified workflow instance does not exist.');
      }
    }
  }
  async componentWillLoad() {
    await this.workflowInstanceIdChangedHandler(this.workflowInstanceId);
  }
  filterRecords() {
    return;
  }
  selectActivityRecordInternal(record) {
    const activity = !!record ? this.workflowBlueprint.activities.find(x => x.id === record.activityId) : null;
    this.selectedRecordId = !!record ? record.id : null;
    this.selectedActivityId = activity != null ? !!activity.parentId && activity.parentId != this.workflowBlueprint.id ? activity.parentId : activity.id : null;
  }
  getEventColor(eventName) {
    const map = {
      'Executing': 'blue',
      'Executed': 'green',
      'Faulted': 'rose',
      'Warning': 'yellow',
      'Information': 'blue',
    };
    return map[eventName] || 'gray';
  }
  onCloseClick() {
    this.hide();
  }
  onShowClick() {
    this.show();
  }
  onRecordClick(record) {
    this.selectActivityRecordInternal(record);
    this.recordSelected.emit(record);
  }
  onTabClick(e, tab) {
    e.preventDefault();
    this.selectedTabId = tab.id;
  }
  render() {
    return (index.h(index.Host, null, this.renderJournalButton(), this.renderPanel()));
  }
  renderJournalButton() {
    return (index.h("button", { onClick: () => this.onShowClick(), type: "button", class: "workflow-settings-button elsa-fixed elsa-top-20 elsa-right-12 elsa-inline-flex elsa-items-center elsa-p-2 elsa-rounded-full elsa-border elsa-border-transparent elsa-bg-white elsa-shadow elsa-text-gray-400 hover:elsa-text-blue-500 focus:elsa-text-blue-500 hover:elsa-ring-2 hover:elsa-ring-offset-2 hover:elsa-ring-blue-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", stroke: "currentColor", fill: "none", class: "elsa-h-8 elsa-w-8" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }))));
  }
  renderPanel() {
    const panelHiddenClass = this.isVisible ? '' : 'hidden';
    const tabs = this.tabs;
    const selectedTabId = this.selectedTabId;
    const selectedTab = tabs.find(x => x.id === selectedTabId);
    return (index.h("section", { class: `${panelHiddenClass} elsa-fixed elsa-top-0 elsa-right-0 elsa-bottom-0 elsa-overflow-hidden`, "aria-labelledby": "slide-over-title", role: "dialog", "aria-modal": "true" }, index.h("div", { class: "elsa-absolute elsa-inset-0 elsa-overflow-hidden" }, index.h("div", { class: "elsa-absolute elsa-inset-0", "aria-hidden": "true" }), index.h("div", { class: "elsa-fixed elsa-inset-y-0 elsa-right-0 elsa-pl-10 max-elsa-w-full elsa-flex sm:elsa-pl-16" }, index.h("div", { ref: el => this.el = el, "data-transition-enter": "elsa-transform elsa-transition elsa-ease-in-out elsa-duration-500 sm:elsa-duration-700", "data-transition-enter-start": "elsa-translate-x-full", "data-transition-enter-end": "elsa-translate-x-0", "data-transition-leave": "elsa-transform elsa-transition elsa-ease-in-out elsa-duration-500 sm:elsa-duration-700", "data-transition-leave-start": "elsa-translate-x-0", "data-transition-leave-end": "elsa-translate-x-full", class: "elsa-w-screen elsa-max-w-2xl" }, index.h("div", { class: "elsa-h-full elsa-flex elsa-flex-col elsa-py-6 elsa-bg-white elsa-shadow-xl elsa-overflow-y-scroll" }, index.h("div", { class: "elsa-px-4 sm:elsa-px-6" }, index.h("div", { class: "elsa-flex elsa-flex-col elsa-items-end" }, index.h("div", { class: "elsa-ml-3 h-7 elsa-flex elsa-items-center" }, index.h("button", { type: "button", onClick: e => this.onCloseClick(), class: "elsa-bg-white elsa-rounded-md elsa-text-gray-400 hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" }, index.h("span", { class: "elsa-sr-only" }, "Close panel"), index.h("svg", { class: "elsa-h-6 elsa-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" }))))), index.h("div", null, index.h("div", null, index.h("div", { class: "elsa-border-b elsa-border-gray-200" }, index.h("nav", { class: "-elsa-mb-px elsa-flex elsa-space-x-8", "aria-label": "Tabs" }, tabs.map(tab => {
      const className = tab.id == selectedTabId ? 'elsa-border-blue-500 elsa-text-blue-600' : 'elsa-border-transparent elsa-text-gray-500 hover:elsa-text-gray-700 hover:elsa-border-gray-300';
      return index.h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${className} elsa-whitespace-nowrap elsa-py-4 elsa-px-1 elsa-border-b-2 elsa-font-medium elsa-text-sm` }, tab.text);
    })))))), index.h("div", { class: "elsa-mt-6 elsa-relative elsa-flex-1 elsa-px-4 sm:elsa-px-6" }, index.h("div", { class: "elsa-absolute elsa-inset-0 elsa-px-4 sm:elsa-px-6" }, selectedTab.view()))))))));
  }
  static get watchers() { return {
    "workflowInstanceId": ["workflowInstanceIdChangedHandler"]
  }; }
};

exports.elsa_workflow_instance_journal = ElsaWorkflowInstanceJournal;
