import { cn } from "../../utils/cn";
import { RenderLeafProps } from "slate-react";

type Props = {
  attributes: RenderLeafProps["attributes"];
  children: React.ReactNode;
  leaf: RenderLeafProps["leaf"] & {
    highlight?: boolean;
  };
};

export default function Leaf({ attributes, children, leaf }: Props) {
  return (
    <span {...attributes} className={cn(leaf["highlight"] && "bg-amber-200")}>
      {children}
    </span>
  );
}
