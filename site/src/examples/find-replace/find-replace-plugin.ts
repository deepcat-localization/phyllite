import React from "react";
import {
  Decorate,
  PhyllitePlugin,
} from "../../../../package/types/phyllite-plugin";
import { Text, Range, Editor } from "slate";
import { useSlateSelection, useSlate } from "slate-react";
import { isHotkey } from "is-hotkey";

export type FindReplaceProps = {
  find: string;
  replace: string;
  setFind: React.Dispatch<React.SetStateAction<string>>;
  setReplace: React.Dispatch<React.SetStateAction<string>>;
};
export type FindReplaceCustomProps = void;

export const FIND_REPLACE_KEY = "find-replace";

export type FindReplacePlugin = PhyllitePlugin<
  FindReplaceProps,
  FindReplaceCustomProps
>;

export const useFindReplacePlugin: FindReplacePlugin["hook"] = (props) => {
  const selection = useSlateSelection();
  const editor = useSlate();

  const decorate: Decorate<{ [FIND_REPLACE_KEY]: boolean }> = (nodeEntry) => {
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
  };

  return {
    editableProps: {
      decorate: decorate,
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
