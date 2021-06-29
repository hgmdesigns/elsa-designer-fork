import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
import { parseJson } from "../utils/utils";
export class SendHttpRequestPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SendHttpRequest')
      return;
    const props = activityModel.properties || [];
    const syntax = SyntaxNames.Json;
    const supportedStatusCodes = props.find(x => x.name == 'SupportedStatusCodes') || { expressions: { 'Json': '[]' }, syntax: syntax };
    const expression = supportedStatusCodes.expressions[syntax] || '[]';
    let outcomes = !!expression['$values'] ? expression['$values'] : parseJson(expression) || [];
    outcomes = [...outcomes, 'Done', 'Unsupported Status Code'];
    context.outcomes = outcomes;
  }
}
