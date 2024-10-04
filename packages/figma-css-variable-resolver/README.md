# Resolve CSS variables

Resolve CSS variables for selected variables and mode using the codeSyntax of the variable as a template.

If you add codeSyntax to your variable and add ${variableModeAlias} as part of the syntax this plugin will resolve to the current mode in context of your element.

Example:

- Code syntax: `--color-surface-action-${prominence}`
- Output when variable mode is set to primary: `var(--color-surface-action-primary)`
