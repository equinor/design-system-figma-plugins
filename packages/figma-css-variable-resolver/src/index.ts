import { getVariableCollectionModes } from './lib/getVariableCollectionModes'
import { applyTemplateReplacements } from './lib/applyTemplateReplacements'

if (figma.mode === 'codegen') {
  figma.codegen.on('generate', async (event: CodegenEvent) => {
    const variables = event.node?.boundVariables

    if (variables) {
      let snippet = 'No variables found'

      const declarations = Object.keys(variables).map(async (key) => {
        const variable = variables[key]?.[0] ?? variables[key]
        const variableId = variable.id
        const variableData = await figma.variables.getVariableByIdAsync(variableId)
        const codeSyntax = variableData?.codeSyntax.WEB ?? ''
        const variableCollectionModes = await getVariableCollectionModes(event)
        const code = applyTemplateReplacements(codeSyntax, variableCollectionModes)
        return `${key}: var(${code});\n`
      })

      await Promise.all(declarations).then((values) => {
        snippet = values.join('')
      })

      return [
        {
          title: 'CSS variable resolver',
          code: snippet,
          language: 'CSS',
        },
      ]
    }

    return [
      {
        title: 'CSS variable resolver',
        code: 'No variables found',
        language: 'CSS',
      },
    ]
  })
}
