import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'

import { shapeLayerNames } from './rules/shape-layer-names'
import { textLayerNames } from './rules/text-layer-names'
import { componentNames } from './rules/component-names'
import { symbolLayerNames } from './rules/symbol-layer-names'
import { duplicateComponents } from './rules/duplicate-components'
import { localStyles } from './rules/local-styles'

const assistant: AssistantPackage = async () => {
  return {
    name: 'nds-sketch-components-assistant',
    rules: [
      shapeLayerNames,
      textLayerNames,
      componentNames,
      symbolLayerNames,
      duplicateComponents,
      localStyles,
    ],
    config: {
      rules: {
        'nds-sketch-components-assistant/shape-layer-names': { active: true },
        'nds-sketch-components-assistant/text-layer-names': { active: true },
        'nds-sketch-components-assistant/component-names': { active: true },
        'nds-sketch-components-assistant/symbol-layer-names': { active: true },
        'nds-sketch-components-assistant/duplicate-components': { active: true },
        'nds-sketch-components-assistant/local-styles': { active: true },
      },
    },
  }
}

export default assistant
