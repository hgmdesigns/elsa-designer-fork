import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
import { parseJson } from "../utils/utils";
export class ForkPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'Fork')
      return;
    const props = activityModel.properties || [];
    const syntax = SyntaxNames.Json;
    const branches = props.find(x => x.name == 'Branches') || { expressions: { 'Json': '[]' }, syntax: syntax };
    const expression = branches.expressions[syntax] || '[]';
    context.outcomes = !!expression['$values'] ? expression['$values'] : parseJson(expression) || [];
  }
}
