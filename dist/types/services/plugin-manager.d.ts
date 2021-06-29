import { ElsaPlugin } from "./elsa-plugin";
export declare class PluginManager {
  plugins: ElsaPlugin;
  constructor();
  initialize(): void;
}
export declare const pluginManager: PluginManager;
