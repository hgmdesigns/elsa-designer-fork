import { ElsaPlugin } from "../services/elsa-plugin";
import { ActivityDesignDisplayContext } from "../models";
export declare class CronPlugin implements ElsaPlugin {
  constructor();
  onActivityDesignDisplaying(context: ActivityDesignDisplayContext): void;
}
