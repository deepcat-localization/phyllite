import { useState } from "react";
import { Phyllite } from "../../../../package/components/phyllite";
import { PhylliteContent } from "../../../../package/components/phyllite-content";
import Leaf from "./leaf";
import { createPlugins } from "../../../../package/utils/create-plugins";
import { createFindReplacePlugin } from "./find-replace-plugin";

export default function FindReplace() {
  const [find, setFind] = useState<string>("world");
  const [replace, setReplace] = useState<string>("");

  const plugins = createPlugins([
    createFindReplacePlugin({ find, setFind, replace, setReplace }),
  ]);

  return (
    <main className="w-full h-screen p-10 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Find and Replace</h1>
      <div className="border flex gap-2">
        <input
          className="p-2 border"
          value={find}
          onChange={(e) => setFind(e.target.value)}
        />
        <input
          className="p-2 border"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
        />
      </div>
      <Phyllite plugins={plugins}>
        <PhylliteContent
          className="outline-0 p-2 border"
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Phyllite>
    </main>
  );
}
