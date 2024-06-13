import React from "react";
import { Plugin } from "../../../../package/types";
import { Text, Range, Editor } from "slate";
import { useSlateSelection, useSlate } from "slate-react";
import { isHotkey } from "is-hotkey";

export type FindReplaceProps = {
  find: string;
  replace: string;
  setFind: React.Dispatch<React.SetStateAction<string>>;
  setReplace: React.Dispatch<React.SetStateAction<string>>;
};
export type FindReplaceCustomProps = null;

export const FIND_REPLACE_KEY = "find-replace";

export type FindReplacePlugin = Plugin<
  typeof FIND_REPLACE_KEY,
  FindReplaceProps,
  FindReplaceCustomProps
>;

export const useFindReplacePlugin: FindReplacePlugin["hook"] = (props) => {
  const selection = useSlateSelection();
  const editor = useSlate();

  return {
    editableProps: {
      decorate: (nodeEntry) => {
        const [node, path] = nodeEntry;
        const ranges = [];
        // If the node is not a text node or the find prop is not set, return the ranges
        if (!Text.isText(node) || !props.find) {
          return [];
        }
        const text = node.text.toLowerCase();
        const find = props.find.toLowerCase();

        let index = text.indexOf(find);
        while (index !== -1) {
          ranges.push({
            anchor: { path, offset: index },
            focus: { path, offset: index + find.length },
            [FIND_REPLACE_KEY]: true,
          });
          index = text.indexOf(find, index + find.length);
        }
        return ranges;
      },
      onKeyDown: (event) => {
        if (isHotkey("mod+f", event)) {
          event.preventDefault();
          const selectedText =
            selection &&
            Range.isExpanded(selection) &&
            Editor.string(editor, selection);
          props.setFind(selectedText || "");
        }
      },
    },
  };
};
