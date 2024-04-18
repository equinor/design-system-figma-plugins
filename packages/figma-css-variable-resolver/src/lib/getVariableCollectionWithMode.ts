import { removeEmojis } from "./removeEmojis";

export async function getVariableCollectionWithMode(event: CodegenEvent) {
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

      const nameTrimmed = variableCollection?.name?.trim() ?? "no-name";
      const name = removeEmojis(nameTrimmed).toLowerCase();
      const value = removeEmojis(mode?.name ?? "no-mode").toLowerCase();

      return {
        key: name.replace(" ", "-"),
        value,
      };
    }),
  );
}
