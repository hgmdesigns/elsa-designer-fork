import { eventBus } from '../services/event-bus';
import { EventTypes } from "../models";
import { activityIconProvider } from "../services/activity-icon-provider";
export class ActivityIconProviderPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDescriptorDisplaying, this.onActivityDescriptorDisplaying);
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }
  onActivityDescriptorDisplaying(context) {
    const descriptor = context.activityDescriptor;
    const iconEntry = activityIconProvider.getIcon(descriptor.type);
    if (iconEntry)
      context.activityIcon = iconEntry;
  }
  onActivityDesignDisplaying(context) {
    const activityModel = context.activityModel;
    const iconEntry = activityIconProvider.getIcon(activityModel.type);
    if (iconEntry)
      context.activityIcon = iconEntry;
  }
}
