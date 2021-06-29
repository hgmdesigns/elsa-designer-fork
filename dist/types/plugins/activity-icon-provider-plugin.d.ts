import { ElsaPlugin } from "../services/elsa-plugin";
import { ActivityDescriptorDisplayContext, ActivityDesignDisplayContext } from "../models";
export declare class ActivityIconProviderPlugin implements ElsaPlugin {
  constructor();
  onActivityDescriptorDisplaying(context: ActivityDescriptorDisplayContext): void;
  onActivityDesignDisplaying(context: ActivityDesignDisplayContext): void;
}
