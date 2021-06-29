import { eventBus } from '../services/event-bus';
import { EventTypes, SyntaxNames } from "../models";
export class SignalReceivedPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDisplaying);
  }
  onActivityDisplaying(context) {
    const activityModel = context.activityModel;
    if (activityModel.type !== 'SignalReceived')
      return;
    const props = activityModel.properties || [];
    const signalName = props.find(x => x.name == 'Signal') || { name: 'Signal', expressions: { 'Literal': '', syntax: SyntaxNames.Literal } };
    const syntax = signalName.syntax || SyntaxNames.Literal;
    context.bodyDisplay = `<p>${signalName.expressions[syntax]}</p>`;
  }
}
