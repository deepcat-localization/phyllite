import { PhyllitePlugin } from "../types/phyllite-plugin";

export function createPlugin<P, R>(
  key: string,
  hook: PhyllitePlugin<P, R>["hook"],
  props: P,
) {
  return {
    [key]: {
      hook,
      props,
    },
  };
}
