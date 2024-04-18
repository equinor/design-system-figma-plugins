import { KeyValue } from "./types";

export function applyTemplateReplacements(
  template: string,
  replacements: KeyValue[],
): string {
  return replacements.reduce((currentTemplate, replacement) => {
    const regex = new RegExp(`\\$\\{${replacement.key}\\}`, "g");
    return currentTemplate.replace(regex, replacement.value);
  }, template);
}
