import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import FileFormat from '@sketch-hq/sketch-file-format-ts'

export const textLayerNames: RuleDefinition = {
  rule: async (context) => {

    type StyleId = string

    const { utils } = context
    const sharedStyles: Map<StyleId, FileFormat.SharedStyle> = new Map()

    for (const sharedStyle of utils.foreignObjects.sharedStyle) {
      if (typeof sharedStyle.do_objectID === 'string') {
        sharedStyles.set(sharedStyle.do_objectID, sharedStyle)
      }
    }

    for (const layer of utils.objects.text) {

      if (typeof layer.sharedStyleID !== 'string') continue // Ignore if no shared style id
      const sharedStyle = sharedStyles.get(layer.sharedStyleID)
      if (!sharedStyle) continue // Ignore if shared style not found

      if (layer.name != sharedStyle.name) {
        context.utils.report("\'"+layer.name+"\' does not match the shared style name \'"+sharedStyle.name+"\'", layer)
      }

    }

  },
  name: 'nds-sketch-components-assistant/text-layer-names',
  title: 'Text Layer Names',
  description: 'Reports layer names that do not match their shared styles names in your component file.',
}
