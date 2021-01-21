import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'
import FileFormat from '@sketch-hq/sketch-file-format-ts'

export const shapeLayerNames: RuleDefinition = {
  rule: async (context) => {

    const IGNORE_CLASSES = ['artboard', 'page', 'symbolMaster', 'text']
    type StyleId = string

    const { utils } = context
    const sharedStyles: Map<StyleId, FileFormat.SharedStyle> = new Map()

    for (const sharedStyle of utils.foreignObjects.sharedStyle) {
      if (typeof sharedStyle.do_objectID === 'string') {
        sharedStyles.set(sharedStyle.do_objectID, sharedStyle)
      }
    }

    for (const layer of utils.objects.anyLayer) {

      if (IGNORE_CLASSES.includes(layer._class)) continue // Ignore certain classes
      if (layer._class === 'group' && !layer.style?.shadows?.length) continue // Ignore groups with default styles
      if (typeof layer.sharedStyleID !== 'string') continue // Ignore if no shared style id
      const sharedStyle = sharedStyles.get(layer.sharedStyleID)
      if (!sharedStyle) continue // Ignore if shared style not found

      if (layer.name != sharedStyle.name) {
        context.utils.report("\'"+layer.name+"\' does not match the shared style name \'"+sharedStyle.name+"\'", layer)
      }

    }

  },
  name: 'nds-sketch-components-assistant/shape-layer-names',
  title: 'Shape Layer Names',
  description: 'Reports layer names that do not match their shared styles names in your component file.',
}
