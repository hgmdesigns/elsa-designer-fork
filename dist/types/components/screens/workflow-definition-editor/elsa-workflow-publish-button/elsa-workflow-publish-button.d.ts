import { EventEmitter } from '../../../../stencil-public-runtime';
import { WorkflowDefinition } from "../../../../models";
export declare class ElsaWorkflowPublishButton {
  workflowDefinition: WorkflowDefinition;
  publishing: boolean;
  publishClicked: EventEmitter;
  unPublishClicked: EventEmitter;
  exportClicked: EventEmitter;
  importClicked: EventEmitter<File>;
  menu: HTMLElement;
  fileInput: HTMLInputElement;
  closeMenu(): void;
  toggleMenu(): void;
  onPublishClick(): void;
  onUnPublishClick(e: Event): void;
  onExportClick(e: Event): Promise<void>;
  onImportClick(e: Event): Promise<void>;
  onFileInputChange(e: Event): Promise<void>;
  render(): any;
  renderPublishButton(): any;
  renderPublishingButton(): any;
  renderUnpublishButton(): any;
}
