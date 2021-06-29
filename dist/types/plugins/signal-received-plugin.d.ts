import { ElsaPlugin } from "../services/elsa-plugin";
import { ActivityDesignDisplayContext } from "../models";
export declare class SignalReceivedPlugin implements ElsaPlugin {
  constructor();
  onActivityDisplaying(context: ActivityDesignDisplayContext): void;
}
