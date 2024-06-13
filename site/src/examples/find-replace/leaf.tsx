import { cn } from "../../utils/cn";
import { RenderLeafProps } from "slate-react";

type Props = {
  attributes: RenderLeafProps["attributes"];
  children: React.ReactNode;
  leaf: RenderLeafProps["leaf"] & {
    "find-replace"?: boolean;
  };
};

export default function Leaf({ attributes, children, leaf }: Props) {
  return (
    <span
      {...attributes}
      className={cn(leaf["find-replace"] && "bg-amber-200")}
    >
      {children}
    </span>
  );
}
