import { Parser } from "acorn";
import { generate } from "astring";
import { walk } from "estree-walker";

export const PLUGIN_NAME = "dynamic-import-plugin";

export const dynamicImportToConsolePlugin = {
  name: "dynamicImport-to-console",
  setup(build: any) {
    build.onLoad({ filter: /\.js$/ }, async (args: any) => {
      let contents = await require("fs").promises.readFile(args.path, "utf8");

      const ast = Parser.parse(contents, { ecmaVersion: 2020 });

      //@ts-ignore: errr Acorn.Node not the same as ESTree.Node? Will figure it out later
      walk(ast, {
        enter(node, parent, prop, index) {
          // some code happens
          if (node.type === "ImportExpression") {
            console.log("sds");
            this.replace({
              type: "CallExpression",
              callee: {
                type: "MemberExpression",
                object: {
                  type: "Identifier",
                  name: "console",
                },
                property: {
                  type: "Identifier",
                  name: "log",
                },
                computed: false,
                optional: false,
              },
              arguments: [
                {
                  type: "Literal",
                  value: "Hello",
                  raw: "",
                },
              ],
              optional: false,
            });
          }
        },
      });

      const code = generate(ast);
      return {
        contents: code,
        loader: "js",
      };
    });
  },
};
