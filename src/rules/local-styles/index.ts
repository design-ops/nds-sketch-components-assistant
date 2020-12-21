import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const localStyles: RuleDefinition = {
  rule: async (context) => {

    interface Style {
      id: string
      name: string
    }
    var localStyles: Array<Style> = [];
    for (const sharedStyle of context.utils.objects.sharedStyle) {
      if (typeof sharedStyle.do_objectID === 'string') {
        localStyles.push({ id: sharedStyle.do_objectID, name: sharedStyle.name });
      }
    }

    if (localStyles.length > 0) {
      for (const localStyle of localStyles) {
        context.utils.report("\'" + localStyle.name + "\' is a local style")
      }
    }

  },
  name: 'nds-sketch-components-assistant/local-styles',
  title: 'Local Styles',
  description: 'Reports if any local styles are present in your component file.',
}
