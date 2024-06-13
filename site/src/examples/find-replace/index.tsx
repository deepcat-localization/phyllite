import { useState } from "react";
import { Phyllite } from "../../../../package/components/phyllite";
import { PhylliteContent } from "../../../../package/components/phyllite-content";
import { useFindReplacePlugin } from "./find-replace-plugin";
import Leaf from "./leaf";
import { PhyllitePlugin } from "../../../../package/types/phyllite-plugin";

export default function FindReplace() {
  const [find, setFind] = useState<string>("world");
  const [replace, setReplace] = useState<string>("");
  const plugins = {
    "find-replace": {
      props: {
        find,
        replace,
        setFind,
        setReplace,
      },
      hook: useFindReplacePlugin,
    } as PhyllitePlugin<unknown, unknown>,
  };
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
