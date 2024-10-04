# Resolve CSS variables

Resolve CSS variables for selected variables and mode using the codeSyntax of the variable as a template.

In the Equinor Design System we use variable modes extensively in Figma to make it as easy as possible for the designers to use variables. Ideally binding properties to variables should take minimum effort, and then setting the variable modes afterwards is where the design decisions are made.

However, simplifying the workflow for the designers means there’s no easy way for the developers to find the design tokens in code that correspond to the design decisions in Figma. That’s where this plugin comes in.

By adding the name of the variable collections as segments in the Code Syntax, the plugin will resolve to the current mode in context of the selected layer.

Example using the **Typography** component from the **Spacing & Typography** library:

- Code syntax: `--eds-typography-${font-family}-${font-size}-${lineheight}`
- Output: `line-height: var(--eds-typography-ui-body-md-squished);`
