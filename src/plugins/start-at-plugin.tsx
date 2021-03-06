import {ElsaPlugin} from "../services/elsa-plugin";
import {eventBus} from '../services/event-bus';
import {ActivityDesignDisplayContext, EventTypes} from "../models";
import {h} from "@stencil/core";

export class StartAtPlugin implements ElsaPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }

  onActivityDesignDisplaying(context: ActivityDesignDisplayContext) {
    const activityModel = context.activityModel;

    if (activityModel.type !== 'StartAt')
      return;

    const props = activityModel.properties || [];
    const condition = props.find(x => x.name == 'Instant') || { name: 'Instant', expressions: {'Literal': ''}, syntax: 'Literal'};
    const expression = condition.expressions[condition.syntax] || '';
    context.bodyDisplay = `<p>${expression}</p>`;
  }
}
