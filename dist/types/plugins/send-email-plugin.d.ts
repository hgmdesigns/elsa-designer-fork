import { ElsaPlugin } from "../services/elsa-plugin";
import { ActivityDesignDisplayContext } from "../models";
export declare class SendEmailPlugin implements ElsaPlugin {
  constructor();
  onActivityDesignDisplaying(context: ActivityDesignDisplayContext): void;
}
