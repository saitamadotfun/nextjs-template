import { block } from "saitamadotfun/bunshi";

export const Example = block(
  ({ name }) => (
    <section className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">{name} </h1>
    </section>
  ),
  {
    argsType: {
      name: {
        control: "input",
      },
    },
    args: {
      name: "saitama",
    },
  }
);
