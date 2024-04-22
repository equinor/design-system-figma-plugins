import { VariableCollectionMode } from "./types";

export function applyTemplateReplacements(
  template: string,
  replacements: VariableCollectionMode[],
): string {
  return replacements.reduce((currentTemplate, replacement) => {
    const regex = new RegExp(`\\$\\{${replacement.collectionName}\\}`, "g");
    return currentTemplate.replace(regex, replacement.mode);
  }, template);
}
