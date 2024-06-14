import { RenderElementProps } from "slate-react";
import { Element, Node, createEditor } from "slate";
import { Descendant } from "slate/dist/interfaces";
import { Phyllite } from "../../../../package/components/phyllite";
import { PhylliteContent } from "../../../../package/components/phyllite-content";
import {
  ListType,
  ListsSchema,
  withLists,
  onKeyDown,
} from "@prezly/slate-lists";
import { useMemo } from "react";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "This is an example of a nested list with indentation. The list items are:",
      },
    ],
  },
  {
    type: "unordered-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            type: "list-item-text",
            children: [{ text: "Item 1" }],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "list-item-text",
            children: [{ text: "Item 2" }],
          },
          {
            type: "ordered-list",
            children: [
              {
                type: "list-item",
                children: [
                  { type: "list-item-text", children: [{ text: "Subitem 1" }] },
                ],
              },
              {
                type: "list-item",
                children: [
                  {
                    type: "list-item-text",
                    children: [{ text: "Subitem 1" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "list-item-text",
            children: [{ text: "Item 3" }],
          },
        ],
      },
    ],
  },
];

const schema: ListsSchema = {
  isConvertibleToListTextNode(node: Node) {
    return Element.isElementType(node, "paragraph");
  },
  isDefaultTextNode(node: Node) {
    return Element.isElementType(node, "paragraph");
  },
  isListNode(node: Node, type?: ListType) {
    if (type === ListType.ORDERED) {
      return Element.isElementType(node, "ordered-list");
    }
    if (type === ListType.UNORDERED) {
      return Element.isElementType(node, "unordered-list");
    }
    return (
      Element.isElementType(node, "ordered-list") ||
      Element.isElementType(node, "unordered-list")
    );
  },
  isListItemNode(node: Node) {
    return Element.isElementType(node, "list-item");
  },
  isListItemTextNode(node: Node) {
    return Element.isElementType(node, "list-item-text");
  },
  createDefaultTextNode(props = {}) {
    return { children: [{ text: "" }], ...props, type: "paragraph" };
  },
  createListNode(type: ListType = ListType.UNORDERED, props = {}) {
    const nodeType =
      type === ListType.ORDERED ? "ordered-list" : "unordered-list";
    return { children: [{ text: "" }], ...props, type: nodeType };
  },
  createListItemNode(props = {}) {
    return { children: [{ text: "" }], ...props, type: "list-item" };
  },
  createListItemTextNode(props = {}) {
    return { children: [{ text: "" }], ...props, type: "list-item-text" };
  },
};

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "unordered-list":
      return (
        <ul className="list-disc list-inside" {...props.attributes}>
          {props.children}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="list-decimal list-inside" {...props.attributes}>
          {props.children}
        </ol>
      );
    case "list-item":
      return (
        <li className="pl-6" {...props.attributes}>
          {props.children}
        </li>
      );
    case "list-item-text":
      return <span {...props.attributes}>{props.children}</span>;
    case "paragraph":
      return <p {...props.attributes}>{props.children}</p>;
    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

export default function IndentList() {
  const editor = useMemo(
    () => withLists(schema)(withHistory(withReact(createEditor()))),
    [],
  );
  return (
    <main className="w-full h-screen p-10 flex flex-col gap-2">
      <Phyllite editor={editor} initialValue={initialValue}>
        <PhylliteContent
          renderElement={renderElement}
          className="outline-0 p-2 border"
          onKeyDown={(event) => onKeyDown(editor, event)}
        />
      </Phyllite>
    </main>
  );
}
