import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const componentNames: RuleDefinition = {
  rule: async (context) => {

    for (const symbol of context.utils.objects.symbolMaster) {
      if (!symbol.name.startsWith("_")) {
        context.utils.report("\'"+symbol.name+"\' component name must start with '_'", symbol)
      }
    }

  },
  name: 'nds-sketch-components-assistant/component-names',
  title: 'Component Names',
  description: 'Reports component names that are not properly formatted in your component file.',
}
