import {
  PhylliteEditableProps,
  PhyllitePlugin,
} from "../types/phyllite-plugin";

type TempPlugin<P, R> = {
  key: string;
  props: P;
  hook: (props: P) => {
    editableProps?: PhylliteEditableProps;
    customProps?: R;
  };
};
export function createPlugins(plugins: TempPlugin<unknown, unknown>[]) {
  return plugins.reduce(
    (acc, plugin) => {
      acc[plugin.key] = {
        props: plugin.props,
        hook: plugin.hook,
      } as PhyllitePlugin<unknown, unknown>;
      return acc;
    },
    {} as Record<string, PhyllitePlugin<unknown, unknown>>,
  );
}
