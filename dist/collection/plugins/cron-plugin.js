import { eventBus } from '../services/event-bus';
import { EventTypes } from "../models";
export class CronPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
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
