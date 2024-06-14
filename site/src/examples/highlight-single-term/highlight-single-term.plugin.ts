import { Text } from "slate";
import { Decorate } from "../../../../package/types/phyllite-plugin";
import { createPluginFactory } from "../../../../package/utils/create-plugin-factory";
export const createHighlightSingleTermPlugin = createPluginFactory({
  key: "highlight-single-term",
  hook: () => {
    const target = "example";
    const decorate: Decorate<{ highlight: boolean }> = (nodeEntry) => {
      const [node, path] = nodeEntry;

      if (!Text.isText(node)) return [];

      const text = node.text.toLowerCase();
      const find = target.toLowerCase();
      const ranges = [];
      let index = text.indexOf(find);
      while (index !== -1) {
        ranges.push({
          anchor: { path, offset: index },
          focus: { path, offset: index + find.length },
          highlight: true,
        });
        index = text.indexOf(find, index + find.length);
      }
      return ranges;
    };
    return {
      editableProps: {
        decorate,
      },
    };
  },
});
