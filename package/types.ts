import { BaseRange, BaseSelection, Descendant, NodeEntry } from "slate";

export type Decorate<K extends string> = (
  nodeEntry: NodeEntry,
) => (BaseRange & { [key in K]: boolean })[];

export type Plugin<K extends string, P, R> = {
  key: K;
  props: P;
  hook: (props: P) => {
    editableProps?: {
      decorate?: Decorate<K>;
      onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
      onChange?: (value: Descendant[]) => void;
      onValueChange?: (value: Descendant[]) => void;
      onSelectionChange?: (selection: BaseSelection) => void;
    };
    customProps?: R;
  };
};

export type Plugins = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Plugin<any, any, any>;
};
