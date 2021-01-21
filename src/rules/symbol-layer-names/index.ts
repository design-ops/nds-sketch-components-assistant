import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const symbolLayerNames: RuleDefinition = {
  rule: async (context) => {

    const foreignSymbols: Map<string, string> = new Map()
    const localSymbols: Map<string, string> = new Map()

    for (const foreignSymbolMaster of context.utils.foreignObjects.symbolMaster) {
        foreignSymbols.set(foreignSymbolMaster.symbolID, foreignSymbolMaster.name)
    }

    for (const localSymbolMaster of context.utils.objects.symbolMaster) {
        localSymbols.set(localSymbolMaster.symbolID, localSymbolMaster.name)
    }

    for (const layer of context.utils.objects.anyLayer) {
      if (layer._class != 'symbolInstance') continue

      const foreignSymbolName = foreignSymbols.get(layer.symbolID)
      const localSymbolName = localSymbols.get(layer.symbolID)

      if (foreignSymbolName != undefined && layer.name != foreignSymbolName) {
        context.utils.report("\'"+layer.name+"\' does not match the symbol master name \'"+foreignSymbolName+"\'", layer)
      }

      if (localSymbolName != undefined && layer.name != localSymbolName) {
        context.utils.report("\'"+layer.name+"\' does not match the symbol master name \'"+localSymbolName+"\'", layer)
      }

    }

  },
  name: 'nds-sketch-components-assistant/symbol-layer-names',
  title: 'Symbol Layer Names',
  description: 'Reports symbol layer names that that do not match their symbol master names.',
}
