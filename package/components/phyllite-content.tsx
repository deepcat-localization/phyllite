import React, { useEffect } from "react";
import { Editable, useSlate, useSlateSelection } from "slate-react";
import { cn } from "../utils/cn";
import { usePlugins } from "../hooks/use-plugins";

type Props = Parameters<typeof Editable>[0];

export const PhylliteContent = (props: Props) => {
  const editor = useSlate();
  const selection = useSlateSelection();

  // Get plugins and pluginsDisabled from context
  const { pluginsDisabled, editableProps } = usePlugins();

  // Handle onSelectionChange
  useEffect(() => {
    if (pluginsDisabled) return;
    editableProps.map((p) => {
      if (p.onSelectionChange) {
        p.onSelectionChange(selection);
      }
    });
  }, [selection, editableProps, pluginsDisabled]);

  // Handle onValueChange
  useEffect(() => {
    if (pluginsDisabled) return;
    editableProps.map((p) => {
      if (p.onValueChange) {
        p.onValueChange(editor.children);
      }
    });
  }, [editor.children, editableProps, pluginsDisabled]);

  // Handle onChange
  useEffect(() => {
    if (pluginsDisabled) return;
    editableProps.map((p) => {
      if (p.onChange) {
        p.onChange(editor.children);
      }
    });
  }, [editor.children, editableProps, selection, pluginsDisabled]);

  return (
    <Editable
      className={cn(props.className)}
      onKeyDown={(event) => {
        if (pluginsDisabled) return;
        editableProps.map((p) => {
          if (p.onKeyDown) {
            p.onKeyDown(event);
          }
        });
      }}
      decorate={(entry) => {
        if (pluginsDisabled) return [];
        return editableProps
          .map((p) => {
            if (!p.decorate) return [];
            return p.decorate(entry);
          })
          .flat();
      }}
      {...props}
    />
  );
};
