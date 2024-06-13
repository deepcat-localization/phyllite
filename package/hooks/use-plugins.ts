import { createContext, useContext } from "react";
import { Plugins } from "../types";

export const PluginsContext = createContext<{
  plugins: Plugins;
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

  const customProps = pluginReturns.map((pluginReturn) => {
    return {
      key: pluginReturn.key,
      ...pluginReturn.customProps,
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
