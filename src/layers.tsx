import { layer } from "saitamadotfun/bunshi";
import { Example } from "./components/Example";

export const layers = [
  layer(
    ({ children, className }) => <div className={className}>{children}</div>,
    {
      title: "HomePage",
      children: [Example],
    }
  ),
];
