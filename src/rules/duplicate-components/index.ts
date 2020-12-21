import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

export const duplicateComponents: RuleDefinition = {
  rule: async (context) => {
    interface Duplicate {
      name: string
      number: number
    }

    var duplicates: Array<Duplicate> = [];
    var totalDuplicates: Array<Duplicate> = [];

    for (const symbol of context.utils.objects.symbolMaster) {
      var existingElement = duplicates.find((element) => element.name == symbol.name);
      if (existingElement != null)
        existingElement.number++;
      else
        duplicates.push({ name: symbol.name, number: 1 });
    }

    totalDuplicates = (duplicates.filter((element) => element.number > 1));

    totalDuplicates.forEach(element => context.utils.report('• \'' + element.name + '\' has a duplicate component'));

  },
  name: 'nds-sketch-components-assistant/duplicate-components',
  title: 'Duplicate Components',
  description: 'Reports duplicate components in your NDS component file.',
}
