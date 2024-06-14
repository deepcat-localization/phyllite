import React from "react";
import { BaseEditor, Descendant, createEditor } from "slate";
import { ReactEditor, Slate, withReact } from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";
import { initialValue as INIT_VAL } from "../constants/initial-value";
import { PhyllitePluginContainer } from "../types/phyllite-plugin";
import { PluginsContext } from "../hooks/use-plugins";

type Props = {
  children: React.ReactNode;
  plugins?: PhyllitePluginContainer;
  pluginsDisabled?: boolean;
  initialValue?: Descendant[];
  editor?: BaseEditor & ReactEditor & HistoryEditor;
};

export const Phyllite = ({
  children,
  plugins,
  pluginsDisabled,
  initialValue,
  editor: initEditor,
}: Props) => {
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    [],
  );
  return (
    <Slate
      editor={initEditor || editor}
      initialValue={initialValue || INIT_VAL}
    >
      <PluginsContext.Provider
        value={{
          plugins: plugins || {},
          pluginsDisabled: pluginsDisabled || false,
        }}
      >
        {children}
      </PluginsContext.Provider>
    </Slate>
  );
};
