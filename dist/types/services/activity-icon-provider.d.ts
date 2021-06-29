import { Map } from '../utils/utils';
export declare class ActivityIconProvider {
  map: Map<() => any>;
  register(activityType: string, icon: () => any): void;
  getIcon(activityType: string): any;
}
export declare const activityIconProvider: ActivityIconProvider;
