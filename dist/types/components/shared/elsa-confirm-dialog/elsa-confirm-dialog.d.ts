export declare class ElsaConfirmDialog {
  caption: string;
  message: string;
  dialog: HTMLElsaModalDialogElement;
  fulFill: (value: (PromiseLike<boolean> | boolean)) => void;
  reject: () => void;
  show(caption: string, message: string): Promise<boolean>;
  hide(): Promise<void>;
  onDismissClick(): Promise<void>;
  onAcceptClick(): Promise<void>;
  render(): any;
}
