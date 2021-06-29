import { LocationSegments, RouterHistory } from "@stencil/router";
export declare class ElsaPager {
  page: number;
  pageSize: number;
  totalCount: number;
  location: LocationSegments;
  history?: RouterHistory;
  basePath: string;
  componentWillLoad(): void;
  navigate(path: string): void;
  onNavigateClick(e: Event): void;
  render(): any;
}
