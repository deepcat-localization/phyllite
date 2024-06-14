import { PhylliteEditableProps } from "../types/phyllite-plugin";

export function createPluginFactory({
  key,
  hook,
}: {
  key: string;
  hook: (props: unknown) => {
    editableProps?: PhylliteEditableProps;
    customProps?: unknown;
  };
}) {
  // Return a plugin factory (a function that returns a plugin object)
  const pluginFactory = (props?: unknown) => {
    return {
      props,
      hook,
      key,
    };
  };
  return pluginFactory;
}
