import { VariableCollectionWithMode } from "./types";

export function applyTemplateReplacements(
  template: string,
  replacements: VariableCollectionWithMode[],
): string {
  return replacements.reduce((currentTemplate, replacement) => {
    const regex = new RegExp(
      `\\$\\{${replacement.variableCollectionName}\\}`,
      "g",
    );
    return currentTemplate.replace(regex, replacement.mode);
  }, template);
}
