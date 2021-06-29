'use strict';

const index = require('./index-ca95b980.js');
const eventBus = require('./event-bus-468c034a.js');
const domain = require('./domain-ec2ef82c.js');
const utils = require('./utils-bb625a12.js');
const activityIconProvider = require('./activity-icon-provider-b089a264.js');

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = ({ on }) => {
    const elmsToUpdate = new Map();
    if (typeof index.getRenderingRef === 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        on('dispose', () => {
            elmsToUpdate.clear();
        });
        on('get', (propName) => {
            const elm = index.getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        });
        on('set', (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(index.forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        });
        on('reset', () => {
            elmsToUpdate.forEach((elms) => elms.forEach(index.forceUpdate));
            cleanupElements(elmsToUpdate);
        });
    }
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => subscriptions.forEach((subscription) => {
        if (subscription.set) {
            on('set', subscription.set);
        }
        if (subscription.get) {
            on('get', subscription.get);
        }
        if (subscription.reset) {
            on('reset', subscription.reset);
        }
    });
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    stencilSubscription(map);
    return map;
};

const { state, onChange } = createStore({
  activityDescriptors: [],
  workflowStorageDescriptors: [],
  monacoLibPath: ''
});

const EventTypes = {
  ShowActivityPicker: 'show-activity-picker',
  ShowWorkflowSettings: 'show-workflow-settings',
  ActivityPicked: 'activity-picked',
  ShowActivityEditor: 'show-activity-editor',
  UpdateActivity: 'update-activity',
  UpdateWorkflowSettings: 'update-workflow-settings',
  WorkflowModelChanged: 'workflow-model-changed',
  ActivityDesignDisplaying: 'activity-design-displaying',
  ActivityDescriptorDisplaying: 'activity-descriptor-displaying',
  WorkflowPublished: 'workflow-published',
  WorkflowRetracted: 'workflow-retracted',
  WorkflowImported: 'workflow-imported',
};

class CheckListDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-check-list-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class CheckboxDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-checkbox-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class CodeEditorDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    const options = property.options || {};
    const editorHeight = this.getEditorHeight(options);
    const context = options.context;
    const syntax = options.syntax;
    return index.h("elsa-script-property", { propertyDescriptor: property, propertyModel: prop, "editor-height": editorHeight, syntax: syntax, context: context });
  }
  update(activity, property, form) {
    const value = form.get(property.name);
    utils.setActivityModelProperty(activity, property.name, value, "Literal");
  }
  getEditorHeight(options) {
    const editorHeightName = options.editorHeight || 'Default';
    switch (editorHeightName) {
      case 'Large':
        return '20em';
      case 'Default':
      default:
        return '8em';
    }
  }
}

class DropdownDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-dropdown-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class MultiTextDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-multi-text-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class MultilineDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-multi-line-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class NullPropertyDriver {
  display(activity, property) {
    return undefined;
  }
  update(activity, property, form) {
  }
}

class SingleLineDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-single-line-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class TimepickerDriver {
  display(activity, property) {
    utils.getOrCreateProperty(activity, property.name);
    // return <elsa-timepicker-property propertyDescriptor={property} propertyModel={prop}/>;
  }
  update(activity, property, form) {
  }
}

class SwitchCaseBuilderDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-switch-cases-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class PropertyDisplayManager {
  constructor() {
    this.drivers = {};
  }
  addDriver(controlType, driver) {
    this.drivers[controlType] = () => driver;
  }
  display(activity, property) {
    const driver = this.getDriver(property.uiHint);
    return driver.display(activity, property);
  }
  update(activity, property, form) {
    const driver = this.getDriver(property.uiHint);
    return driver.update(activity, property, form);
  }
  getDriver(type) {
    const driverFactory = this.drivers[type] || (() => new NullPropertyDriver());
    return driverFactory();
  }
}
const propertyDisplayManager = new PropertyDisplayManager();

exports.WorkflowDesignerMode = void 0;
(function (WorkflowDesignerMode) {
  WorkflowDesignerMode[WorkflowDesignerMode["Edit"] = 0] = "Edit";
  WorkflowDesignerMode[WorkflowDesignerMode["Instance"] = 1] = "Instance";
  WorkflowDesignerMode[WorkflowDesignerMode["Blueprint"] = 2] = "Blueprint";
})(exports.WorkflowDesignerMode || (exports.WorkflowDesignerMode = {}));
exports.LayoutDirection = void 0;
(function (LayoutDirection) {
  LayoutDirection[LayoutDirection["Horizontal"] = 0] = "Horizontal";
  LayoutDirection[LayoutDirection["Vertical"] = 1] = "Vertical";
})(exports.LayoutDirection || (exports.LayoutDirection = {}));

class IfPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'If')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Condition') || { name: 'Condition', expressions: { 'Literal': '' }, syntax: 'Literal' };
    const expression = condition.expressions[condition.syntax] || '';
    const description = activityModel.description;
    const bodyText = description && description.length > 0 ? description : expression;
    context.bodyDisplay = `<p>${bodyText}</p>`;
  }
}

class HttpEndpointPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'HttpEndpoint')
      return;
    const props = activityModel.properties || [];
    const path = props.find(x => x.name == 'Path') || { name: 'Path', expressions: { 'Literal': '', syntax: domain.SyntaxNames.Literal } };
    const syntax = path.syntax || domain.SyntaxNames.Literal;
    context.bodyDisplay = `<p>${path.expressions[syntax]}</p>`;
  }
}

class TimerPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Timer')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Timeout') || { name: 'Timeout', expressions: { 'Literal': '' }, syntax: 'Literal' };
    const expression = condition.expressions[condition.syntax] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}

class WriteLinePlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'WriteLine')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Text') || { name: 'Text', expressions: { 'Literal': '' }, syntax: domain.SyntaxNames.Literal };
    const expression = condition.expressions[condition.syntax || 'Literal'] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}

class SendEmailPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SendEmail')
      return;
    const props = activityModel.properties || [];
    const to = props.find(x => x.name == 'To') || { expressions: { 'Json': '' }, syntax: domain.SyntaxNames.Json };
    const expression = to.expressions[to.syntax || domain.SyntaxNames.Json] || '';
    const description = activityModel.description;
    const bodyText = description && description.length > 0 ? description : expression;
    context.bodyDisplay = `<p>To: ${bodyText}</p>`;
  }
}

class RadioListDriver {
  display(activity, property) {
    const prop = utils.getOrCreateProperty(activity, property.name);
    return index.h("elsa-radio-list-property", { propertyDescriptor: property, propertyModel: prop });
  }
  update(activity, property, form) {
  }
}

class DefaultDriversPlugin {
  constructor() {
    this.addDriver('single-line', SingleLineDriver);
    this.addDriver('multi-line', MultilineDriver);
    this.addDriver('check-list', CheckListDriver);
    this.addDriver('radio-list', RadioListDriver);
    this.addDriver('checkbox', CheckboxDriver);
    this.addDriver('dropdown', DropdownDriver);
    this.addDriver('multi-text', MultiTextDriver);
    this.addDriver('code-editor', CodeEditorDriver);
    this.addDriver('switch-case-builder', SwitchCaseBuilderDriver);
    this.addDriver('timepicker', TimepickerDriver);
  }
  addDriver(controlType, c) {
    propertyDisplayManager.addDriver(controlType, new c());
  }
}

class ForkPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Fork')
      return;
    const props = activityModel.properties || [];
    const syntax = domain.SyntaxNames.Json;
    const branches = props.find(x => x.name == 'Branches') || { expressions: { 'Json': '[]' }, syntax: syntax };
    const expression = branches.expressions[syntax] || '[]';
    context.outcomes = !!expression['$values'] ? expression['$values'] : utils.parseJson(expression) || [];
  }
}

class RunJavascriptPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'RunJavaScript')
      return;
    const props = activityModel.properties || [];
    const outcomes = props.find(x => x.name == 'PossibleOutcomes') || { expressions: { 'Json': '' }, syntax: domain.SyntaxNames.Json };
    const expression = outcomes.expressions[domain.SyntaxNames.Json] || '[]';
    context.outcomes = utils.parseJson(expression) || ['Done'];
    if (context.outcomes.length == 0)
      context.outcomes = ['Done'];
  }
}

class ActivityIconProviderPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDescriptorDisplaying, this.onActivityDescriptorDisplaying);
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDescriptorDisplaying(context) {
    const descriptor = context.activityDescriptor;
    const iconEntry = activityIconProvider.activityIconProvider.getIcon(descriptor.type);
    if (iconEntry)
      context.activityIcon = iconEntry;
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    const iconEntry = activityIconProvider.activityIconProvider.getIcon(activityModel.type);
    if (iconEntry)
      context.activityIcon = iconEntry;
  }
}

class SwitchPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Switch')
      return;
    const props = activityModel.properties || [];
    const syntax = 'Switch';
    const casesProp = props.find(x => x.name == 'Cases') || { expressions: { 'Switch': '' }, syntax: syntax };
    const expression = casesProp.expressions[syntax] || '[]';
    const cases = !!expression['$values'] ? expression['$values'] : utils.parseJson(expression) || [];
    context.outcomes = [...cases.map(x => x.name), 'Default'];
  }
}

class WhilePlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'While')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Condition') || { name: 'Condition', expressions: { 'Literal': '' }, syntax: 'Literal' };
    const expression = condition.expressions[condition.syntax] || '';
    const description = activityModel.description;
    const bodyText = description && description.length > 0 ? description : expression;
    context.bodyDisplay = `<p>${bodyText}</p>`;
  }
}

class StartAtPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'StartAt')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Instant') || { name: 'Instant', expressions: { 'Literal': '' }, syntax: 'Literal' };
    const expression = condition.expressions[condition.syntax] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}

class CronPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Cron')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'CronExpression') || { name: 'CronExpression', expressions: { 'Literal': '' }, syntax: 'Literal' };
    const expression = condition.expressions[condition.syntax] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}

class SignalReceivedPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SignalReceived')
      return;
    const props = activityModel.properties || [];
    const signalName = props.find(x => x.name == 'Signal') || { name: 'Signal', expressions: { 'Literal': '', syntax: domain.SyntaxNames.Literal } };
    const syntax = signalName.syntax || domain.SyntaxNames.Literal;
    context.bodyDisplay = `<p>${signalName.expressions[syntax]}</p>`;
  }
}

class SendSignalPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SendSignal')
      return;
    const props = activityModel.properties || [];
    const signalName = props.find(x => x.name == 'Signal') || { name: 'Signal', expressions: { 'Literal': '', syntax: domain.SyntaxNames.Literal } };
    const syntax = signalName.syntax || domain.SyntaxNames.Literal;
    context.bodyDisplay = `<p>${signalName.expressions[syntax]}</p>`;
  }
}

class UserTaskPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'UserTask')
      return;
    const props = activityModel.properties || [];
    const syntax = domain.SyntaxNames.Json;
    const branches = props.find(x => x.name == 'Actions') || { expressions: { 'Json': '[]' }, syntax: syntax };
    const expression = branches.expressions[syntax] || '[]';
    context.outcomes = !!expression['$values'] ? expression['$values'] : utils.parseJson(expression) || [];
  }
}

class StatePlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'State')
      return;
    const props = activityModel.properties || [];
    const stateNameProp = props.find(x => x.name == 'StateName') || { name: 'Text', expressions: { 'Literal': '' }, syntax: domain.SyntaxNames.Literal };
    context.displayName = stateNameProp.expressions[stateNameProp.syntax || 'Literal'] || 'State';
    const transitionsSyntax = domain.SyntaxNames.Json;
    const transitions = props.find(x => x.name == 'Transitions') || { expressions: { 'Json': '[]' }, syntax: transitionsSyntax };
    const transitionsExpression = transitions.expressions[transitionsSyntax] || '[]';
    context.outcomes = !!transitionsExpression['$values'] ? transitionsExpression['$values'] : utils.parseJson(transitionsExpression) || [];
  }
}

class SendHttpRequestPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SendHttpRequest')
      return;
    const props = activityModel.properties || [];
    const syntax = domain.SyntaxNames.Json;
    const supportedStatusCodes = props.find(x => x.name == 'SupportedStatusCodes') || { expressions: { 'Json': '[]' }, syntax: syntax };
    const expression = supportedStatusCodes.expressions[syntax] || '[]';
    let outcomes = !!expression['$values'] ? expression['$values'] : utils.parseJson(expression) || [];
    outcomes = [...outcomes, 'Done', 'Unsupported Status Code'];
    context.outcomes = outcomes;
  }
}

class WebhookPlugin {
  constructor() {
    eventBus.eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (!activityModel.type.endsWith('Webhook'))
      return;
    const props = activityModel.properties || [];
    const path = props.find(x => x.name == 'Path') || { name: 'Path', expressions: { 'Literal': '', syntax: domain.SyntaxNames.Literal } };
    const syntax = path.syntax || domain.SyntaxNames.Literal;
    context.bodyDisplay = `<p>${path.expressions[syntax]}</p>`;
  }
}

class PluginManager {
  constructor() {
    this.plugins = [];
    this.plugins = [
      new DefaultDriversPlugin(),
      new ActivityIconProviderPlugin(),
      new IfPlugin(),
      new WhilePlugin(),
      new ForkPlugin(),
      new SwitchPlugin(),
      new HttpEndpointPlugin(),
      new SendHttpRequestPlugin(),
      new TimerPlugin(),
      new StartAtPlugin(),
      new CronPlugin(),
      new SignalReceivedPlugin(),
      new SendSignalPlugin(),
      new WriteLinePlugin(),
      new StatePlugin(),
      new RunJavascriptPlugin(),
      new UserTaskPlugin(),
      new SendEmailPlugin(),
      new WebhookPlugin()
    ];
  }
  initialize() {
  }
}
const pluginManager = new PluginManager();

exports.EventTypes = EventTypes;
exports.pluginManager = pluginManager;
exports.propertyDisplayManager = propertyDisplayManager;
exports.state = state;
