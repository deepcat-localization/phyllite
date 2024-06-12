import React from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";

const initValue = [
  {
    type: "paragraph",
    children: [{ text: "Hello, world!" }],
  },
];

export const Phyllite = () => {
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    [],
  );
  return (
    <Slate editor={editor} initialValue={initValue}>
      <Editable />
    </Slate>
  );
};
