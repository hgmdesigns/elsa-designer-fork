import { EventEmitter } from '../../../stencil-public-runtime';
export interface MonacoValueChangedArgs {
  value: string;
  markers: Array<any>;
}
export declare class ElsaMonaco {
  monaco: any;
  editorHeight: string;
  value: string;
  language: string;
  singleLineMode: boolean;
  padding: string;
  valueChanged: EventEmitter<MonacoValueChangedArgs>;
  container: HTMLElement;
  editor: any;
  languageChangeHandler(newValue: string): void;
  setValue(value: string): Promise<void>;
  addJavaScriptLib(libSource: string, libUri: string): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  registerLiquid(): void;
  render(): any;
}
