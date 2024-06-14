/// <reference types="vite/client" />
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type CustomElement = {
  type:
    | "paragraph"
    | "unordered-list"
    | "ordered-list"
    | "list-item-text"
    | "list-item";
  children: Descendant[];
};

type CustomText = {
  text: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
