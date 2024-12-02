import { Example } from "@/components/Example";
import props from "../../.saitama/saitama.json";

export default function Home() {
  return <Example {...props.HomePage.Example} />;
}
