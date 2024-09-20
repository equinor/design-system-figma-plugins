import { getVariableCollectionModes } from './lib/getVariableCollectionModes'
import { applyTemplateReplacements } from './lib/applyTemplateReplacements'
import { replacePropNameWithCSS } from './lib/replacePropNameWithCSS'

if (figma.mode === 'codegen') {
  figma.codegen.on('generate', async (event: CodegenEvent) => {
    const variables = event.node?.boundVariables

    if (variables) {
      const isTextNode = event.node?.type === 'TEXT'

      let snippet = ''

      const declarations = Object.entries(variables).map(async ([key, value]) => {
        const variable = Array.isArray(value) ? value[0] : value
        const variableId = variable.id as string
        const variableData = await figma.variables.getVariableByIdAsync(variableId)
        const codeSyntax = variableData?.codeSyntax.WEB ?? ''
        const variableCollectionModes = await getVariableCollectionModes(event)
        const code = applyTemplateReplacements(codeSyntax, variableCollectionModes)
        const CSSProp = await (key === 'fills'
          ? isTextNode
            ? replacePropNameWithCSS('color')
            : replacePropNameWithCSS('background-color')
          : replacePropNameWithCSS(key))

        return `${CSSProp}: var(${code});\n`
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
