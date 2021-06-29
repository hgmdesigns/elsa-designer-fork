import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
export class WebhookPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (!activityModel.type.endsWith('Webhook'))
      return;
    const props = activityModel.properties || [];
    const path = props.find(x => x.name == 'Path') || { name: 'Path', expressions: { 'Literal': '', syntax: SyntaxNames.Literal } };
    const syntax = path.syntax || SyntaxNames.Literal;
    context.bodyDisplay = `<p>${path.expressions[syntax]}</p>`;
  }
}
