import props from "../../.saitama/saitama.json";

import { Config } from "@/components/Config";
import { Example } from "@/components/Example";

export default function Home() {
  return (
    <>
      <Example {...props.HomePage.Example} />
      <Config {...props.HomePage.Config} />
    </>
  );
}
