import { eventBus } from '../services/event-bus';
import { EventTypes } from "../models";
import { parseJson } from "../utils/utils";
export class SwitchPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Switch')
      return;
    const props = activityModel.properties || [];
    const syntax = 'Switch';
    const casesProp = props.find(x => x.name == 'Cases') || { expressions: { 'Switch': '' }, syntax: syntax };
    const expression = casesProp.expressions[syntax] || '[]';
    const cases = !!expression['$values'] ? expression['$values'] : parseJson(expression) || [];
    context.outcomes = [...cases.map(x => x.name), 'Default'];
  }
}
