import { createContext, useContext } from "react";
import { PhyllitePluginContainer } from "../types/phyllite-plugin";

export const PluginsContext = createContext<{
  plugins: PhyllitePluginContainer;
  pluginsDisabled: boolean;
}>({
  plugins: {},
  pluginsDisabled: false,
});

export function usePlugins() {
  const context = useContext(PluginsContext);
  const pluginReturns = Object.entries(context.plugins).map(([key, plugin]) => {
    return {
      ...plugin.hook(plugin.props),
      key: key,
    };
  });

  const editableProps = pluginReturns.map((pluginReturn) => {
    return {
      key: pluginReturn.key,
      ...pluginReturn.editableProps,
    };
  });

  let customProps: Record<string, unknown> = {};
  pluginReturns.forEach((pluginReturn) => {
    customProps = {
      ...customProps,
      [pluginReturn.key]: pluginReturn.customProps,
    };
  });

  if (!context) {
    throw new Error("usePlugins must be used within a PluginsProvider");
  }
  return {
    plugins: context.plugins,
    pluginsDisabled: context.pluginsDisabled,
    editableProps,
    customProps,
  };
}
