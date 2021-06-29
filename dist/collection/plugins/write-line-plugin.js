import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
export class WriteLinePlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'WriteLine')
      return;
    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Text') || { name: 'Text', expressions: { 'Literal': '' }, syntax: SyntaxNames.Literal };
    const expression = condition.expressions[condition.syntax || 'Literal'] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}
