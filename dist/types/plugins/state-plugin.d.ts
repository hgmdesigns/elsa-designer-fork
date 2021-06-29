import { ElsaPlugin } from "../services/elsa-plugin";
import { ActivityDesignDisplayContext } from "../models";
export declare class StatePlugin implements ElsaPlugin {
  constructor();
  onActivityDesignDisplaying(context: ActivityDesignDisplayContext): void;
}
