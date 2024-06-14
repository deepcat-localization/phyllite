import { Phyllite } from "../../../../package/components/phyllite";
import { PhylliteContent } from "../../../../package/components/phyllite-content";
import Leaf from "./leaf";
import { createPlugins } from "../../../../package/utils/create-plugins";
import { createHighlightSingleTermPlugin } from "./highlight-single-term.plugin";

export default function HighlightSingleTerm() {
  const plugins = createPlugins([createHighlightSingleTermPlugin()]);
  return (
    <main className="w-full h-screen p-10 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Highlight Single Term</h1>
      <Phyllite plugins={plugins}>
        <PhylliteContent
          className="outline-0 p-2 border"
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Phyllite>
    </main>
  );
}
