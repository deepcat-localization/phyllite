import { Phyllite } from "../../package/components/phyllite";
import { PhylliteContent } from "../../package/components/phyllite-content";
function App() {
  return (
    <main className="p-10 w-full h-screen">
      <Phyllite>
        <PhylliteContent className="border-slate-800 border outline-0 p-2" />
      </Phyllite>
    </main>
  );
}

export default App;
