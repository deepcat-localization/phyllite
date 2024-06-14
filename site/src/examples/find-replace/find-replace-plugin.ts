import { Text } from "slate";
import { createPluginFactory } from "../../../../package/utils/create-plugin-factory";
import { Decorate } from "../../../../package/types/phyllite-plugin";
import React from "react";

type FindReplaceProps = {
  find: string;
  setFind: React.Dispatch<React.SetStateAction<string>>;
  replace: string;
  setReplace: React.Dispatch<React.SetStateAction<string>>;
};

export const createFindReplacePlugin = createPluginFactory({
  key: "find-replace",
  hook: (props) => {
    const decorate: Decorate<{ highlight: boolean }> = (nodeEntry) => {
      const [node, path] = nodeEntry;
      // Important: We need to cast props to FindReplaceProps
      const { find } = props as FindReplaceProps;

      if (!Text.isText(node) || find === "") return [];

      const text = node.text.toLowerCase();
      const findLower = find.toLowerCase();
      const ranges = [];
      let index = text.indexOf(findLower);

      let count = 0;
      while (index !== -1) {
        if (count > 100) break;
        count++;
        ranges.push({
          anchor: { path, offset: index },
          focus: { path, offset: index + findLower.length },
          highlight: true,
        });
        index = text.indexOf(findLower, index + findLower.length);
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
