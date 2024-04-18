import { prettify } from "./prettify";
import { VariableCollectionWithMode } from "./types";

export async function getVariableCollectionWithMode(
  event: CodegenEvent,
): Promise<VariableCollectionWithMode[]> {
  return await Promise.all(
    Object.keys(event.node?.resolvedVariableModes)?.map(async (key) => {
      const variableCollection =
        await figma.variables.getVariableCollectionByIdAsync(key);

      const currentMode = variableCollection?.modes.find(
        (mode) => mode.modeId === event.node?.resolvedVariableModes[key],
      );

      const defaultMode = variableCollection?.modes.find(
        (mode) => mode.modeId === variableCollection.defaultModeId,
      );

      const mode = currentMode ?? defaultMode;

      return {
        mode: prettify(mode?.name),
        variableCollectionName: prettify(variableCollection?.name),
      };
    }),
  );
}
