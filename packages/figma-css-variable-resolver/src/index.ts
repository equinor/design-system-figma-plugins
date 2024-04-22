import { getVariableCollectionModes } from "./lib/getVariableCollectionModes";
import { applyTemplateReplacements } from "./lib/applyTemplateReplacements";

if (figma.mode === "codegen") {
  figma.codegen.on("generate", async (event: CodegenEvent) => {
    const fill = event.node?.boundVariables?.fills?.[0];
    const stroke = event.node?.boundVariables?.strokes?.[0];

    if (fill || stroke) {
      let background = "";
      let border = "";
      const variableCollectionModes = await getVariableCollectionModes(event);

      if (fill) {
        const variable = await figma.variables.getVariableByIdAsync(fill.id);
        const codeSyntax = variable?.codeSyntax.WEB ?? "";
        const code = applyTemplateReplacements(
          codeSyntax,
          variableCollectionModes,
        );

        const node = await figma.getNodeByIdAsync(event.node?.id);
        const isTextNode = node?.type === "TEXT";
        const property = isTextNode ? "color" : "background-color";
        background = `${property}: ${code};`;
      }

      if (stroke) {
        const variable = await figma.variables.getVariableByIdAsync(stroke.id);
        const codeSyntax = variable?.codeSyntax.WEB ?? "";
        const code = applyTemplateReplacements(
          codeSyntax,
          variableCollectionModes,
        );
        border = `border-color: ${code};`;
      }

      let snippet;
      if (background && border) {
        snippet = `${background}\n${border}`;
      } else {
        snippet = background || border;
      }

      return [
        {
          title: "CSS variable resolver",
          code: snippet,
          language: "CSS",
        },
      ];
    }

    return [
      {
        title: "CSS variable resolver",
        code: "no fill found",
        language: "CSS",
      },
    ];
  });
}
