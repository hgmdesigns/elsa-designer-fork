import { ElsaPlugin } from "../services/elsa-plugin";
import { PropertyDisplayDriver } from "../services/property-display-driver";
export declare class DefaultDriversPlugin implements ElsaPlugin {
  constructor();
  addDriver<T extends PropertyDisplayDriver>(controlType: string, c: new () => T): void;
}
