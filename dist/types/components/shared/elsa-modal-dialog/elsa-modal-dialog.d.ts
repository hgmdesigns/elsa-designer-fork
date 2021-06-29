export declare class ElsaModalDialog {
  isVisible: boolean;
  overlay: HTMLElement;
  modal: HTMLElement;
  render(): any;
  show(animate: boolean): Promise<void>;
  hide(animate: boolean): Promise<void>;
  showInternal(animate: boolean): void;
  hideInternal(animate: boolean): void;
  renderModal(): any;
}
