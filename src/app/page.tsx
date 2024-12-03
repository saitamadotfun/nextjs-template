import props from "../../.saitama/saitama.json";

import { Example } from "@/components/Example";

export default function Home() {
  return <Example {...props.HomePage.Example} />;
}
