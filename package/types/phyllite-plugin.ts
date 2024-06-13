import { BaseRange, BaseSelection, Descendant, NodeEntry } from "slate";

export type Decorate<T> = (nodeEntry: NodeEntry) => (BaseRange & T)[];
export type PhylliteEditableProps = {
  decorate?: Decorate<unknown>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onChange?: (value: Descendant[]) => void;
  onValueChange?: (value: Descendant[]) => void;
  onSelectionChange?: (selection: BaseSelection) => void;
};

export type PhyllitePlugin<P, R> = {
  props: P;
  hook: (props: P) => {
    editableProps?: PhylliteEditableProps;
    customProps?: R;
  };
};

export type PhyllitePluginContainer = {
  [key: string]: PhyllitePlugin<unknown, unknown>;
};
