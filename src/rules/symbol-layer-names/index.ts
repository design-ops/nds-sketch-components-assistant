import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const symbolLayerNames: RuleDefinition = {
  rule: async (context) => {

    const sharedSymbols: Map<string, string> = new Map()
    const localSymbols: Map<string, string> = new Map()

    for (const symbolMaster of context.utils.foreignObjects.symbolMaster) {
        sharedSymbols.set(symbolMaster.symbolID, symbolMaster.name)
    }

    for (const localSymbolMaster of context.utils.objects.symbolMaster) {
        localSymbols.set(localSymbolMaster.symbolID, localSymbolMaster.name)
    }

    for (const layer of context.utils.objects.anyLayer) {
      if (layer._class != 'symbolInstance') continue

      const symbolName = sharedSymbols.get(layer.symbolID)
      const localSymbolName = localSymbols.get(layer.symbolID)

      if (symbolName != undefined && layer.name != symbolName) {
        context.utils.report(layer.name + " - " + symbolName, layer)
      }

      if (localSymbolName != undefined && layer.name != localSymbolName) {
        context.utils.report(layer.name + " - " + localSymbolName, layer)
      }

    }

  },
  name: 'nds-sketch-components-assistant/symbol-layer-names',
  title: 'Symbol Layer Names',
  description: 'Reports symbol layer names that that do not match their symbol master names.',
}
