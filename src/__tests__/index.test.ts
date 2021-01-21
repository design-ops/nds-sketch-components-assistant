import { resolve } from 'path'
import { testRuleInAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '..'

test('Duplicate components', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './duplicate-components.sketch'),
    Assistant,
    "nds-sketch-components-assistant/duplicate-components"
  )
  expect(violations[0].message).toBe("'_navbar' has a duplicate component")
  expect(violations).toHaveLength(1)
})

test('Component names', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './component-names.sketch'),
    Assistant,
    "nds-sketch-components-assistant/component-names"
  )
  expect(violations[0].message).toBe("'navbar' component name must start with '_'")
  expect(violations).toHaveLength(1)
})

test('Shape layer names', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './shape-layer-names.sketch'),
    Assistant,
    "nds-sketch-components-assistant/shape-layer-names"
  )
  expect(violations[0].message).toBe("'Rectangle' does not match the shared style name 'background'")
  expect(violations).toHaveLength(1)
})

test('Text layer names', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './text-layer-names.sketch'),
    Assistant,
    "nds-sketch-components-assistant/text-layer-names"
  )
  expect(violations[0].message).toBe("'Type something' does not match the shared style name 'title'")
  expect(violations).toHaveLength(1)
})

test('Local styles', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './local-styles.sketch'),
    Assistant,
    "nds-sketch-components-assistant/local-styles"
  )
  expect(violations[0].message).toBe("'background' is a local style")
  expect(violations[1].message).toBe("'title' is a local style")
  expect(violations).toHaveLength(2)
})

test('Symbol layer names', async () => {
  const { violations } = await testRuleInAssistant(
    resolve(__dirname, './symbol-layer-names.sketch'),
    Assistant,
    "nds-sketch-components-assistant/symbol-layer-names"
  )
  expect(violations[0].message).toBe("'Button 2' does not match the symbol master name '_button-primary'")
  expect(violations[1].message).toBe("'Wand' does not match the symbol master name 'icon-wand'")
  expect(violations).toHaveLength(2)
})
