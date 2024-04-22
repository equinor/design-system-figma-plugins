import { prettify } from "./prettify";
import { VariableCollectionMode } from "./types";

export async function getVariableCollectionModes(
  event: CodegenEvent,
): Promise<VariableCollectionMode[]> {
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

      const currentCollectionMode = {
        collectionName: prettify(variableCollection?.name),
        mode: prettify(mode?.name),
      };

      return currentCollectionMode;
    }),
  );
}
