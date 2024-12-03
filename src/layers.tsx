import { layer } from "saitamadotfun/bunshi";
import { Example } from "./components/Example";
import { Config } from "./components/Config";

export const layers = [
  layer(
    ({ children, className }) => <div className={className}>{children}</div>,
    {
      title: "HomePage",
      children: [Example, Config],
    }
  ),
];
