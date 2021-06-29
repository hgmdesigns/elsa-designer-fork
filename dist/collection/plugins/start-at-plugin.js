import { eventBus } from '../services/event-bus';
import { EventTypes } from "../models";
export class StartAtPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
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
