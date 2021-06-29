import { EventEmitter } from '../../../stencil-public-runtime';
import { DropdownButtonItem, DropdownButtonOrigin } from "./models";
export declare class ElsaContextMenu {
  text: string;
  icon?: any;
  origin: DropdownButtonOrigin;
  items: Array<DropdownButtonItem>;
  itemSelected: EventEmitter<DropdownButtonItem>;
  contextMenu: HTMLElement;
  closeContextMenu(): void;
  toggleMenu(): void;
  getOriginClass(): string;
  onItemClick(e: Event, menuItem: DropdownButtonItem): Promise<void>;
  render(): any;
  renderMenu(): any;
  renderItems(): any[];
  renderIcon(): any;
}
