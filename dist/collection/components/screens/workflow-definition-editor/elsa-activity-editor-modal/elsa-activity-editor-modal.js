import { Component, h, Host, State } from '@stencil/core';
import { eventBus } from '../../../../services/event-bus';
import state from '../../../../utils/store';
import { EventTypes } from "../../../../models";
import { propertyDisplayManager } from '../../../../services/property-display-manager';
import { checkBox, FormContext, section, selectField, textArea, textInput } from "../../../../utils/forms";
export class ElsaActivityEditorModal {
  constructor() {
    this.workflowStorageDescriptors = [];
    this.selectedTab = 'Properties';
    // Force a new key every time we show the editor to make sure Stencil creates new components.
    // This prevents the issue where the designer has e.g. one activity where the user edits the properties, cancels out, then opens the editor again, seeing the entered value still there.
    this.timestamp = new Date();
  }
  componentDidLoad() {
    eventBus.on(EventTypes.ShowActivityEditor, async (activity, animate) => {
      this.activityModel = JSON.parse(JSON.stringify(activity));
      this.activityDescriptor = state.activityDescriptors.find(x => x.type == activity.type);
      this.workflowStorageDescriptors = state.workflowStorageDescriptors;
      this.formContext = new FormContext(this.activityModel, newValue => this.activityModel = newValue);
      this.selectedTab = 'Properties';
      this.timestamp = new Date();
      await this.dialog.show(animate);
    });
  }
  updateActivity(formData) {
    const activity = this.activityModel;
    const activityDescriptor = this.activityDescriptor;
    const inputProperties = activityDescriptor.inputProperties;
    for (const property of inputProperties)
      propertyDisplayManager.update(activity, property, formData);
  }
  async onCancelClick() {
    await this.dialog.hide(true);
  }
  async onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    this.updateActivity(formData);
    eventBus.emit(EventTypes.UpdateActivity, this, this.activityModel);
    await this.dialog.hide(true);
  }
  onTabClick(e, tab) {
    e.preventDefault();
    this.selectedTab = tab;
  }
  componentWillRender() {
    const activityDescriptor = this.activityDescriptor || { displayName: '', activityType: '', type: '', subType: '', action: '', event: '', outcomes: [], category: '', traits: 0, browsable: false, inputProperties: [], outputProperties: [], description: '' };
    const propertyCategories = activityDescriptor.inputProperties.filter(x => x.category).map(x => x.category).distinct();
    const defaultProperties = activityDescriptor.inputProperties.filter(x => !x.category || x.category.length == 0);
    let tabs = [];
    if (defaultProperties.length > 0) {
      tabs.push('Properties');
    }
    tabs = [...tabs, ...propertyCategories];
    // tabs.push('Common');
    // tabs.push('Storage');
    let selectedTab = this.selectedTab;
    if (tabs.findIndex(x => x === selectedTab) < 0)
      selectedTab = tabs[0];
    const activityModel = this.activityModel || { activityType: '', type: '', subType: '', activityId: '', action: '', event: '', outcomes: [], properties: [], propertyStorageProviders: {} };
    this.renderProps = {
      activityDescriptor,
      propertyCategories,
      defaultProperties,
      tabs,
      selectedTab,
      activityModel
    };
  }
  render() {
    const renderProps = this.renderProps;
    const activityDescriptor = renderProps.activityDescriptor;
    const propertyCategories = renderProps.propertyCategories;
    const tabs = renderProps.tabs;
    const selectedTab = renderProps.selectedTab;
    const activityModel = renderProps.activityModel;
    const inactiveClass = 'elsa-border-transparent elsa-text-gray-500 hover:elsa-text-gray-700 hover:elsa-border-gray-300';
    const selectedClass = 'elsa-border-blue-500 elsa-text-blue-600';
    return (h(Host, { class: "elsa-block" },
      h("elsa-modal-dialog", { ref: el => this.dialog = el },
        h("div", { slot: "content", class: "elsa-py-8 elsa-pb-0" },
          h("form", { onSubmit: e => this.onSubmit(e), ref: el => this.form = el, key: this.timestamp.getTime().toString() },
            h("div", { class: "elsa-flex elsa-px-8" },
              h("div", { class: "elsa-space-y-8 elsa-divide-y elsa-divide-gray-200 elsa-w-full" },
                h("div", null,
                  h("div", null,
                    h("h3", { class: "elsa-text-lg elsa-leading-6 elsa-font-medium elsa-text-gray-900" }, activityDescriptor.type),
                    h("p", { class: "elsa-mt-1 elsa-text-sm elsa-text-gray-500" }, activityDescriptor.description)),
                  h("div", { class: "elsa-border-b elsa-border-gray-200" },
                    h("nav", { class: "-elsa-mb-px elsa-flex elsa-space-x-8", "aria-label": "Tabs" }, tabs.map(tab => {
                      const isSelected = tab === selectedTab;
                      const cssClass = isSelected ? selectedClass : inactiveClass;
                      return h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} elsa-whitespace-nowrap elsa-py-4 elsa-px-1 elsa-border-b-2 elsa-font-medium elsa-text-sm` }, tab);
                    }))),
                  h("div", { class: "elsa-mt-8" }, this.renderSelectedTab(activityModel, activityDescriptor, propertyCategories))))),
            h("div", { class: "elsa-pt-5" },
              h("div", { class: "elsa-bg-gray-50 elsa-px-4 elsa-py-3 sm:elsa-px-6 sm:elsa-flex sm:elsa-flex-row-reverse" },
                h("button", { type: "submit", class: "elsa-ml-3 elsa-inline-flex elsa-justify-center elsa-py-2 elsa-px-4 elsa-border elsa-border-transparent elsa-shadow-sm elsa-text-sm elsa-font-medium elsa-rounded-md elsa-text-white elsa-bg-blue-600 hover:elsa-bg-blue-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" }, "Save"),
                h("button", { type: "button", onClick: () => this.onCancelClick(), class: "elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-gray-300 elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-white elsa-text-base elsa-font-medium elsa-text-gray-700 hover:elsa-bg-gray-50 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500 sm:elsa-mt-0 sm:elsa-ml-3 sm:elsa-w-auto sm:elsa-text-sm" }, "Cancel"))))),
        h("div", { slot: "buttons" }))));
  }
  renderSelectedTab(activityModel, activityDescriptor, categories) {
    return [
      // this.renderStorageTab(activityModel, activityDescriptor),
      // this.renderCommonTab(activityModel),
      this.renderPropertiesTab(activityModel, activityDescriptor),
      this.renderCategoryTabs(activityModel, activityDescriptor, categories),
    ];
  }
  renderStorageTab(activityModel, activityDescriptor) {
    const formContext = this.formContext;
    let storageDescriptorOptions = this.workflowStorageDescriptors.map(x => ({ value: x.name, text: x.displayName }));
    let outputProperties = activityDescriptor.outputProperties;
    storageDescriptorOptions = [{ value: null, text: 'Default' }, ...storageDescriptorOptions];
    const renderOutputProperty = function (propertyDescriptor) {
      const propertyName = propertyDescriptor.name;
      const fieldName = `propertyStorageProviders.${propertyName}`;
      return selectField(formContext, fieldName, propertyName, activityModel.propertyStorageProviders[propertyName], storageDescriptorOptions, null, fieldName);
    };
    return (h("div", { class: `flex ${this.getHiddenClass('Storage')}` },
      h("div", { class: "elsa-space-y-8 elsa-w-full" },
        section('Workflow Context'),
        checkBox(formContext, 'loadWorkflowContext', 'Load Workflow Context', activityModel.loadWorkflowContext, 'When enabled, this will load the workflow context into memory before executing this activity.', 'loadWorkflowContext'),
        checkBox(formContext, 'saveWorkflowContext', 'Save Workflow Context', activityModel.saveWorkflowContext, 'When enabled, this will save the workflow context back into storage after executing this activity.', 'saveWorkflowContext'),
        section('Workflow Instance'),
        checkBox(formContext, 'persistWorkflow', 'Save Workflow Instance', activityModel.persistWorkflow, 'When enabled, this will save the workflow instance back into storage right after executing this activity.', 'persistWorkflow'),
        Object.keys(outputProperties).length > 0 ? ([section('Activity Output', 'Configure the desired storage for each output property of this activity.'), outputProperties.map(renderOutputProperty)]) : undefined)));
  }
  renderCommonTab(activityModel) {
    const formContext = this.formContext;
    return (h("div", { class: `flex ${this.getHiddenClass('Common')}` },
      h("div", { class: "elsa-space-y-8 elsa-w-full" },
        textInput(formContext, 'name', 'Name', activityModel.name, 'The technical name of the activity.', 'activityName'),
        textInput(formContext, 'displayName', 'Display Name', activityModel.displayName, 'A friendly name of the activity.', 'activityDisplayName'),
        textArea(formContext, 'description', 'Description', activityModel.description, 'A custom description for this activity', 'activityDescription'))));
  }
  renderPropertiesTab(activityModel, activityDescriptor) {
    const propertyDescriptors = this.renderProps.defaultProperties;
    if (propertyDescriptors.length == 0)
      return undefined;
    const key = `activity-settings:${activityModel.activityId}`;
    return (h("div", { key: key, class: `elsa-grid elsa-grid-cols-1 elsa-gap-y-6 elsa-gap-x-4 sm:elsa-grid-cols-6 ${this.getHiddenClass('Properties')}` }, propertyDescriptors.map(property => this.renderPropertyEditor(activityModel, property))));
  }
  renderCategoryTabs(activityModel, activityDescriptor, categories) {
    const propertyDescriptors = activityDescriptor.inputProperties;
    return (categories.map(category => {
      const descriptors = propertyDescriptors.filter(x => x.category == category);
      const key = `activity-settings:${activityModel.activityId}:${category}`;
      return h("div", { key: key, class: `elsa-grid elsa-grid-cols-1 elsa-gap-y-6 elsa-gap-x-4 sm:elsa-grid-cols-6 ${this.getHiddenClass(category)}` }, descriptors.map(property => this.renderPropertyEditor(activityModel, property)));
    }));
  }
  renderPropertyEditor(activity, property) {
    const key = `activity-property-input:${activity.activityId}:${property.name}`;
    return h("div", { key: key, class: "sm:elsa-col-span-6" }, propertyDisplayManager.display(activity, property));
  }
  getHiddenClass(tab) {
    return this.renderProps.selectedTab == tab ? '' : 'hidden';
  }
  static get is() { return "elsa-activity-editor-modal"; }
  static get states() { return {
    "workflowStorageDescriptors": {},
    "activityModel": {},
    "activityDescriptor": {},
    "selectedTab": {}
  }; }
}
