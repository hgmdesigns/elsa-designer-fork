import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
export class SendEmailPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SendEmail')
      return;
    const props = activityModel.properties || [];
    const to = props.find(x => x.name == 'To') || { expressions: { 'Json': '' }, syntax: SyntaxNames.Json };
    const expression = to.expressions[to.syntax || SyntaxNames.Json] || '';
    const description = activityModel.description;
    const bodyText = description && description.length > 0 ? description : expression;
    context.bodyDisplay = `<p>To: ${bodyText}</p>`;
  }
}
