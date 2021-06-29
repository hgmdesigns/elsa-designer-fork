import { ActivityModel } from "../../../../models";
export declare enum WorkflowDesignerMode {
  Edit = 0,
  Instance = 1,
  Blueprint = 2
}
export interface ActivityContextMenuState {
  shown: boolean;
  x: number;
  y: number;
  activity?: ActivityModel | null;
}
export declare enum LayoutDirection {
  Horizontal = 0,
  Vertical = 1
}
